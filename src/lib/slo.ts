// /src/lib/slo.ts
import fs from 'fs';
import path from 'path';

export interface SLOConfig {
  web_vitals: {
    lcp_p75_ms: number;
    inp_p75_ms: number;
    cls_p75: number;
  };
  growth: {
    hero_ctr_min: number;
    search_cr_min: number;
  };
  ads: {
    viewability_min: number;
    view_time_p50_ms: number;
  };
  uptime: {
    p28_days: number;
  };
}

export interface SLOResult {
  status: 'pass' | 'warn' | 'fail';
  metric: string;
  current: number;
  target: number;
  delta: number;
  description: string;
  severity: 'ok' | 'warn' | 'critical';
}

export interface SLOSummary {
  overall_status: 'pass' | 'warn' | 'fail';
  pass_count: number;
  warn_count: number;
  fail_count: number;
  total_count: number;
  results: SLOResult[];
  compliance_percentage: number;
}

/**
 * Load SLO configuration
 */
function loadSLOConfig(): SLOConfig {
  try {
    const configPath = path.join(process.cwd(), 'config', 'slo.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData.replace(/^\/\/ .*$/m, '')); // Remove comment line
  } catch (error) {
    console.warn('[slo] Failed to load slo.json, using defaults:', error.message);
    return {
      web_vitals: {
        lcp_p75_ms: 2500,
        inp_p75_ms: 200,
        cls_p75: 0.1
      },
      growth: {
        hero_ctr_min: 0.03,
        search_cr_min: 0.15
      },
      ads: {
        viewability_min: 0.5,
        view_time_p50_ms: 1000
      },
      uptime: {
        p28_days: 0.999
      }
    };
  }
}

/**
 * Evaluate a single metric against SLO
 */
function evaluateMetric(
  metric: string,
  current: number,
  target: number,
  higherIsBetter: boolean = true
): SLOResult {
  let status: 'pass' | 'warn' | 'fail';
  let severity: 'ok' | 'warn' | 'critical';
  let delta: number;
  let description: string;

  if (higherIsBetter) {
    // For metrics where higher values are better (CTR, conversion rate, uptime)
    delta = ((current - target) / target) * 100;
    
    if (current >= target) {
      status = 'pass';
      severity = 'ok';
      description = `${metric} is meeting SLO target (+${delta.toFixed(1)}%)`;
    } else if (current >= target * 0.9) {
      status = 'warn';
      severity = 'warn';
      description = `${metric} is below SLO target but within warning range (${delta.toFixed(1)}%)`;
    } else {
      status = 'fail';
      severity = 'critical';
      description = `${metric} is significantly below SLO target (${delta.toFixed(1)}%)`;
    }
  } else {
    // For metrics where lower values are better (LCP, INP, CLS)
    delta = ((current - target) / target) * 100;
    
    if (current <= target) {
      status = 'pass';
      severity = 'ok';
      description = `${metric} is meeting SLO target (${delta.toFixed(1)}% vs target)`;
    } else if (current <= target * 1.1) {
      status = 'warn';
      severity = 'warn';
      description = `${metric} is above SLO target but within warning range (+${delta.toFixed(1)}%)`;
    } else {
      status = 'fail';
      severity = 'critical';
      description = `${metric} is significantly above SLO target (+${delta.toFixed(1)}%)`;
    }
  }

  return {
    status,
    metric,
    current,
    target,
    delta,
    description,
    severity
  };
}

/**
 * Summarize performance against SLOs
 */
export function summarizeAgainstSLO(summary: any, sloConfig?: SLOConfig): SLOSummary {
  const config = sloConfig || loadSLOConfig();
  const results: SLOResult[] = [];

  // Web Vitals SLOs
  if (summary.vitals) {
    // LCP P75 (lower is better)
    if (summary.vitals.lcp && summary.vitals.lcp.p75) {
      results.push(evaluateMetric(
        'LCP P75',
        summary.vitals.lcp.p75,
        config.web_vitals.lcp_p75_ms,
        false
      ));
    }

    // INP P75 (lower is better)
    if (summary.vitals.inp && summary.vitals.inp.p75) {
      results.push(evaluateMetric(
        'INP P75',
        summary.vitals.inp.p75,
        config.web_vitals.inp_p75_ms,
        false
      ));
    }

    // CLS P75 (lower is better)
    if (summary.vitals.cls && summary.vitals.cls.p75) {
      results.push(evaluateMetric(
        'CLS P75',
        summary.vitals.cls.p75,
        config.web_vitals.cls_p75,
        false
      ));
    }
  }

  // Growth SLOs
  if (summary.today) {
    // Hero CTR (higher is better)
    if (summary.today.heroCTR !== undefined) {
      results.push(evaluateMetric(
        'Hero CTR',
        summary.today.heroCTR / 100, // Convert percentage to decimal
        config.growth.hero_ctr_min,
        true
      ));
    }

    // Search Conversion Rate (higher is better)
    if (summary.today.searchConversionRate !== undefined) {
      results.push(evaluateMetric(
        'Search Conversion',
        summary.today.searchConversionRate / 100, // Convert percentage to decimal
        config.growth.search_cr_min,
        true
      ));
    }
  }

  // Ads SLOs
  if (summary.today && summary.today.adViewability !== undefined) {
    results.push(evaluateMetric(
      'Ad Viewability',
      summary.today.adViewability / 100, // Convert percentage to decimal
      config.ads.viewability_min,
      true
    ));
  }

  // Calculate summary statistics
  const passCount = results.filter(r => r.status === 'pass').length;
  const warnCount = results.filter(r => r.status === 'warn').length;
  const failCount = results.filter(r => r.status === 'fail').length;
  const totalCount = results.length;

  let overallStatus: 'pass' | 'warn' | 'fail' = 'pass';
  if (failCount > 0) {
    overallStatus = 'fail';
  } else if (warnCount > 0) {
    overallStatus = 'warn';
  }

  const compliancePercentage = totalCount > 0 ? (passCount / totalCount) * 100 : 100;

  return {
    overall_status: overallStatus,
    pass_count: passCount,
    warn_count: warnCount,
    fail_count: failCount,
    total_count: totalCount,
    results,
    compliance_percentage: compliancePercentage
  };
}

/**
 * Get SLO status badge info for dashboard
 */
export function getSLOBadge(sloSummary: SLOSummary): {
  icon: string;
  color: string;
  text: string;
  className: string;
} {
  switch (sloSummary.overall_status) {
    case 'pass':
      return {
        icon: '✅',
        color: 'green',
        text: `SLO: ${sloSummary.compliance_percentage.toFixed(0)}%`,
        className: 'bg-green-50 text-green-700 border-green-200'
      };
    case 'warn':
      return {
        icon: '⚠️',
        color: 'yellow',
        text: `SLO: ${sloSummary.compliance_percentage.toFixed(0)}%`,
        className: 'bg-yellow-50 text-yellow-700 border-yellow-200'
      };
    case 'fail':
      return {
        icon: '❌',
        color: 'red',
        text: `SLO: ${sloSummary.compliance_percentage.toFixed(0)}%`,
        className: 'bg-red-50 text-red-700 border-red-200'
      };
  }
}

/**
 * Get SLO result for specific metric
 */
export function getSLOResultForMetric(sloSummary: SLOSummary, metricName: string): SLOResult | null {
  return sloSummary.results.find(r => 
    r.metric.toLowerCase().includes(metricName.toLowerCase())
  ) || null;
}

/**
 * Format SLO result for display
 */
export function formatSLOResult(result: SLOResult): string {
  const direction = result.delta >= 0 ? '+' : '';
  return `${result.description} (Current: ${formatMetricValue(result.current, result.metric)}, Target: ${formatMetricValue(result.target, result.metric)}, Δ${direction}${result.delta.toFixed(1)}%)`;
}

/**
 * Format metric value based on type
 */
function formatMetricValue(value: number, metric: string): string {
  if (metric.toLowerCase().includes('ms')) {
    return `${Math.round(value)}ms`;
  }
  if (metric.toLowerCase().includes('cls')) {
    return value.toFixed(3);
  }
  if (metric.toLowerCase().includes('ctr') || 
      metric.toLowerCase().includes('conversion') || 
      metric.toLowerCase().includes('viewability')) {
    return `${(value * 100).toFixed(1)}%`;
  }
  if (metric.toLowerCase().includes('uptime')) {
    return `${(value * 100).toFixed(3)}%`;
  }
  return value.toString();
}

/**
 * SLO evaluation helpers for dashboard
 */
export const sloEvaluator = {
  loadConfig: loadSLOConfig,
  evaluate: summarizeAgainstSLO,
  getBadge: getSLOBadge,
  getResultForMetric: getSLOResultForMetric,
  formatResult: formatSLOResult
};