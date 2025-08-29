// /src/pages/Dashboard.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { KpiCard, WebVitalsCard } from '../components/KpiCard';
import { SessionsSparkline, CTRSparkline, ConversionSparkline, ViewabilitySparkline } from '../components/Sparkline';
import { summaryGenerator } from '../lib/summary';
import { vitalsAggregator } from '../lib/vitals-aggregate';
import { alertsEngine } from '../lib/alerts';
import { funnelAnalyzer } from '../lib/funnel';
import { alertsFormatter } from '../lib/alerts-format';
import { AlertsBanner } from '../components/AlertsBanner';
import { FunnelCard } from '../components/FunnelCard';
import { sloEvaluator, SLOSummary } from '../lib/slo';
import { Modal } from '../components/Modal';
import html2canvas from 'html2canvas';
import { RolloutManager } from '../lib/rollout';
import { useFeatureFlag } from '../lib/flags';

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [kpiData, setKpiData] = useState<any>(null);
  const [alerts, setAlerts] = useState<any>(null);
  const [funnelData, setFunnelData] = useState<any>(null);
  const [sloSummary, setSloSummary] = useState<SLOSummary | null>(null);
  const [showSLOModal, setShowSLOModal] = useState(false);
  const [exportingPNG, setExportingPNG] = useState(false);
  const [sharingToWebhook, setSharingToWebhook] = useState(false);
  const [rolloutStatus, setRolloutStatus] = useState<any>(null);
  const [showRolloutModal, setShowRolloutModal] = useState(false);

  // Feature flag for hero CTA color experiment
  const heroCTAFlag = useFeatureFlag('hero_cta_color');

  // Detect data source based on consent
  const hasConsent = localStorage.getItem('analytics_consent') === 'accepted';
  
  // Check webhook configuration
  const webhookConfigured = process.env.REACT_APP_WEBHOOK_URL || 
                           localStorage.getItem('webhook_configured') === 'true';

  const loadData = useCallback(async () => {
    setLoading(true);
    
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Generate summaries
      const todaySummary = summaryGenerator.generateDailySummary(today);
      const yesterdaySummary = summaryGenerator.generateDailySummary(yesterday);
      
      // Get comparison data
      const comparison = summaryGenerator.generateComparison(todaySummary, yesterdaySummary);
      
      // Get Web Vitals data
      const vitalsData = vitalsAggregator.getVitalsSummary(7);
      
      // Evaluate alerts
      const alertsSummary = await alertsEngine.evaluateKpis({
        today: todaySummary,
        yesterday: yesterdaySummary
      });
      
      // Build funnel data
      const searchFunnel = funnelAnalyzer.buildSearchFunnel(todaySummary);
      const previousFunnel = funnelAnalyzer.buildSearchFunnel(yesterdaySummary);
      
      // Generate sparkline data
      const sessionsSparkline = summaryGenerator.generateTimeSeries('sessions', 7);
      const ctrSparkline = summaryGenerator.generateTimeSeries('heroCTR', 7);
      const searchConvSparkline = summaryGenerator.generateTimeSeries('searchConversionRate', 7);
      const adViewabilitySparkline = summaryGenerator.generateTimeSeries('adViewabilityRate', 7);
      
      setKpiData({
        today: todaySummary,
        yesterday: yesterdaySummary,
        comparison,
        vitals: vitalsData,
        sparklines: {
          sessions: sessionsSparkline,
          ctr: ctrSparkline,
          searchConv: searchConvSparkline,
          adViewability: adViewabilitySparkline
        }
      });
      
      setAlerts(alertsSummary);
      setFunnelData({ current: searchFunnel, previous: previousFunnel });
      
      // Evaluate SLOs
      const sloEvaluation = sloEvaluator.evaluate({
        today: todaySummary,
        vitals: vitalsData
      });
      setSloSummary(sloEvaluation);
      
      // Load rollout status
      try {
        const rollout = new RolloutManager();
        const status = rollout.getStatus();
        const currentPercentage = rollout.getCurrentPercentage();
        setRolloutStatus({ ...status, currentPercentage });
      } catch (error) {
        console.warn('Rollout manager not available:', error.message);
        setRolloutStatus(null);
      }
      
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  const getKpiStatus = (value: number, threshold: number): 'good' | 'warning' | 'critical' => {
    if (value >= threshold) return 'good';
    if (value >= threshold * 0.7) return 'warning';
    return 'critical';
  };

  const exportCSV = useCallback(async () => {
    if (!kpiData) return;

    const summaries = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      summaries.push(summaryGenerator.generateDailySummary(date));
    }

    const csv = summaryGenerator.exportSummaryCSV(summaries);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    link.href = URL.createObjectURL(blob);
    link.download = `kolay-kredi-dashboard-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }, [kpiData]);

  const exportPNG = useCallback(async () => {
    const dashboardElement = document.getElementById('dashboard-content');
    if (!dashboardElement) return;

    setExportingPNG(true);
    try {
      const canvas = await html2canvas(dashboardElement, {
        backgroundColor: '#f9fafb',
        scale: 2,
        logging: false,
        useCORS: true
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `kolay-kredi-dashboard-${new Date().toISOString().split('T')[0]}.png`;
      link.click();
    } catch (error) {
      console.error('Failed to export PNG:', error);
      alert('Export failed. Please try again.');
    } finally {
      setExportingPNG(false);
    }
  }, []);

  const shareToWebhook = useCallback(async () => {
    if (!webhookConfigured || !kpiData || !alerts || !funnelData) {
      console.log('Webhook sharing not available or data not ready');
      return;
    }

    setSharingToWebhook(true);
    try {
      // Format current dashboard state
      const notification = alertsFormatter.formatDashboardShare(
        alerts,
        kpiData.today,
        funnelData.current
      );

      // Send to backend webhook endpoint
      const response = await fetch('/api/webhook/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...notification,
          link: window.location.href,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Show success notification
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        toast.textContent = '✅ Dashboard shared to webhook successfully';
        document.body.appendChild(toast);
        
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 3000);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to share to webhook:', error);
      
      // Show error notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toast.textContent = '❌ Failed to share dashboard';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    } finally {
      setSharingToWebhook(false);
    }
  }, [webhookConfigured, kpiData, alerts, funnelData]);

  if (!kpiData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Real-time growth metrics and analytics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* SLO Badge */}
              {sloSummary && (
                <div className={`px-3 py-1 rounded-full border text-xs font-medium ${sloEvaluator.getBadge(sloSummary).className}`}>
                  <span className="mr-1">{sloEvaluator.getBadge(sloSummary).icon}</span>
                  {sloEvaluator.getBadge(sloSummary).text}
                </div>
              )}
              <span className="text-sm text-gray-500">
                Data source: {hasConsent ? 'Google Analytics' : 'Local Storage'}
              </span>
              <button
                onClick={exportCSV}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                Export CSV
              </button>
              <button
                onClick={exportPNG}
                className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                disabled={loading || exportingPNG}
              >
                {exportingPNG ? 'Exporting...' : 'Export PNG'}
              </button>
              
              {/* Webhook Share Button */}
              <button
                onClick={shareToWebhook}
                className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  webhookConfigured
                    ? 'text-purple-600 bg-purple-50 hover:bg-purple-100 focus:ring-purple-500'
                    : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                }`}
                disabled={loading || !webhookConfigured || sharingToWebhook}
                title={!webhookConfigured ? 'Webhook not configured' : 'Share current dashboard view to webhook'}
                aria-label="Share dashboard to configured webhook channel"
              >
                {sharingToWebhook ? 'Sharing...' : '📤 Share to Webhook'}
              </button>

              {/* Rollout Panel Button */}
              <button
                onClick={() => setShowRolloutModal(true)}
                className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  rolloutStatus && rolloutStatus.status === 'active'
                    ? 'text-orange-600 bg-orange-50 hover:bg-orange-100 focus:ring-orange-500'
                    : rolloutStatus
                    ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 focus:ring-blue-500' 
                    : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                }`}
                disabled={loading || !rolloutStatus}
                title={rolloutStatus ? `A/B Test Rollout: ${rolloutStatus.currentPercentage}%` : 'No active rollout'}
              >
                {rolloutStatus?.status === 'active' ? '🔄' : '🧪'} A/B Rollout
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Banner */}
        {alerts && (
          <AlertsBanner 
            alertsSummary={alerts} 
            loading={loading} 
            className="mb-6"
          />
        )}

        <div id="dashboard-content">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <KpiCard
              title="Daily Sessions"
              value={kpiData.today.sessions}
              icon={<span className="text-lg">👥</span>}
              status={getKpiStatus(kpiData.today.sessions, 100)}
              alertStatus={alerts?.alerts.find(a => a.metric === 'sessions')?.status}
              sloStatus={sloSummary ? sloEvaluator.getResultForMetric(sloSummary, 'sessions') : null}
              change={{
                value: Math.abs(kpiData.comparison.sessions.percentage),
                trend: kpiData.comparison.sessions.trend,
                isGood: kpiData.comparison.sessions.isGood
              }}
              loading={loading}
            />

            <KpiCard
              title="Hero CTR"
              value={kpiData.today.heroCTR.toFixed(1)}
              unit="%"
              icon={<span className="text-lg">🎯</span>}
              status={getKpiStatus(kpiData.today.heroCTR, 2)}
              alertStatus={alerts?.alerts.find(a => a.metric === 'ctr_hero')?.status}
              sloStatus={sloSummary ? sloEvaluator.getResultForMetric(sloSummary, 'hero') : null}
              change={{
                value: Math.abs(kpiData.comparison.heroCTR.percentage),
                trend: kpiData.comparison.heroCTR.trend,
                isGood: kpiData.comparison.heroCTR.isGood
              }}
              loading={loading}
            />

            <KpiCard
              title="Search Conversion"
              value={kpiData.today.searchConversionRate.toFixed(1)}
              unit="%"
              icon={<span className="text-lg">🔍</span>}
              status={getKpiStatus(kpiData.today.searchConversionRate, 10)}
              alertStatus={alerts?.alerts.find(a => a.metric === 'search_conv')?.status}
              sloStatus={sloSummary ? sloEvaluator.getResultForMetric(sloSummary, 'search') : null}
              change={{
                value: Math.abs(kpiData.comparison.searchConversionRate.percentage),
                trend: kpiData.comparison.searchConversionRate.trend,
                isGood: kpiData.comparison.searchConversionRate.isGood
              }}
              loading={loading}
            />

            <KpiCard
              title="Ad Viewability"
              value={kpiData.today.adViewabilityRate.toFixed(1)}
              unit="%"
              icon={<span className="text-lg">📺</span>}
              status={getKpiStatus(kpiData.today.adViewabilityRate, 50)}
              alertStatus={alerts?.alerts.find(a => a.metric === 'ad_viewability')?.status}
              sloStatus={sloSummary ? sloEvaluator.getResultForMetric(sloSummary, 'viewability') : null}
              change={{
                value: Math.abs(kpiData.comparison.adViewabilityRate.percentage),
                trend: kpiData.comparison.adViewabilityRate.trend,
                isGood: kpiData.comparison.adViewabilityRate.isGood
              }}
              loading={loading}
            />
          </div>

          {/* Sparklines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Sessions Trend</h3>
              <SessionsSparkline
                data={kpiData.sparklines.sessions}
                showDots={false}
                showAnnotations={true}
                className="h-12"
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-700 mb-2">CTR Trend</h3>
              <CTRSparkline
                data={kpiData.sparklines.ctr}
                showDots={false}
                showAnnotations={true}
                className="h-12"
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Search Conv Trend</h3>
              <ConversionSparkline
                data={kpiData.sparklines.searchConv}
                showDots={false}
                showAnnotations={true}
                className="h-12"
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Ad Viewability Trend</h3>
              <ViewabilitySparkline
                data={kpiData.sparklines.adViewability}
                showDots={false}
                showAnnotations={true}
                className="h-12"
              />
            </div>
          </div>

          {/* Web Vitals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <WebVitalsCard
              metric="lcp"
              value={kpiData.vitals.lcp.value}
              rating={kpiData.vitals.lcp.rating as 'good' | 'needs-improvement' | 'poor'}
              sloStatus={sloSummary ? sloEvaluator.getResultForMetric(sloSummary, 'lcp') : null}
              change={{
                value: Math.abs(kpiData.vitals.lcp.change),
                trend: kpiData.vitals.lcp.trend,
                isGood: kpiData.vitals.lcp.trend === 'up' // For LCP, 'up' means improvement (lower is better)
              }}
              loading={loading}
            />

            <WebVitalsCard
              metric="cls"
              value={kpiData.vitals.cls.value}
              rating={kpiData.vitals.cls.rating as 'good' | 'needs-improvement' | 'poor'}
              sloStatus={sloSummary ? sloEvaluator.getResultForMetric(sloSummary, 'cls') : null}
              change={{
                value: Math.abs(kpiData.vitals.cls.change),
                trend: kpiData.vitals.cls.trend,
                isGood: kpiData.vitals.cls.trend === 'up' // For CLS, 'up' means improvement (lower is better)
              }}
              loading={loading}
            />

            <WebVitalsCard
              metric="inp"
              value={kpiData.vitals.inp.value}
              rating={kpiData.vitals.inp.rating as 'good' | 'needs-improvement' | 'poor'}
              sloStatus={sloSummary ? sloEvaluator.getResultForMetric(sloSummary, 'inp') : null}
              change={{
                value: Math.abs(kpiData.vitals.inp.change),
                trend: kpiData.vitals.inp.trend,
                isGood: kpiData.vitals.inp.trend === 'up' // For INP, 'up' means improvement (lower is better)
              }}
              loading={loading}
            />
          </div>

          {/* Search Funnel */}
          {funnelData && (
            <div className="mb-6">
              <FunnelCard
                funnelData={funnelData.current}
                previousFunnelData={funnelData.previous}
                loading={loading}
              />
            </div>
          )}

          {/* Incident Center */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Incident Center</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Live status</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-label="System operational"></div>
              </div>
            </div>
            
            {/* Incident Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm font-semibold">0</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-900">Active</p>
                    <p className="text-xs text-green-600">No incidents</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-sm font-semibold">0</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-yellow-900">Warning</p>
                    <p className="text-xs text-yellow-600">Under review</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-sm font-semibold">0</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-900">Critical</p>
                    <p className="text-xs text-red-600">Immediate attention</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">5</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-900">Resolved (7d)</p>
                    <p className="text-xs text-blue-600">Past week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Maintenance Mode:</span>
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    Off
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Auto-resolve:</span>
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Enabled
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  View All Incidents
                </button>
                <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Create Maintenance
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
              <div className="text-center text-gray-500 py-4">
                <p className="text-sm">No recent incident activity</p>
                <p className="text-xs mt-1">All systems operating normally</p>
              </div>
            </div>
          </div>

          {/* SLOs Panel */}
          {sloSummary && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Service Level Objectives</h2>
                <div className={`px-3 py-1 rounded-full border text-sm font-medium ${sloEvaluator.getBadge(sloSummary).className}`}>
                  <span className="mr-1">{sloEvaluator.getBadge(sloSummary).icon}</span>
                  Compliance: {sloSummary.compliance_percentage.toFixed(0)}%
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{sloSummary.pass_count}</div>
                  <div className="text-sm text-gray-600">Passing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{sloSummary.warn_count}</div>
                  <div className="text-sm text-gray-600">Warning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{sloSummary.fail_count}</div>
                  <div className="text-sm text-gray-600">Failing</div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setShowSLOModal(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  View SLO Report
                </button>
              </div>
            </div>
          )}

          {/* A/B Testing Results */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">A/B Testing Results</h2>
            
            {kpiData.today.abTestResults && kpiData.today.abTestResults.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Test Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Variant A CTR
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Variant B CTR  
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delta / Winner
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        P-Value / Sample
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {kpiData.today.abTestResults.map((test: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {test.testName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {test.variantA.ctr.toFixed(2)}%
                          <br />
                          <span className="text-xs text-gray-500">
                            {test.variantA.clicks}/{test.variantA.exposures}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {test.variantB.ctr.toFixed(2)}%
                          <br />
                          <span className="text-xs text-gray-500">
                            {test.variantB.clicks}/{test.variantB.exposures}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {(test.variantA.exposures + test.variantB.exposures) < 500 ? (
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              Need More Data
                            </span>
                          ) : test.pValue < 0.05 ? (
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              test.isSignificant ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {test.isSignificant ? 'Significant' : 'Not Significant'}
                            </span>
                          ) : (
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                              Running
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {test.delta > 0 ? '+' : ''}{test.delta.toFixed(1)}%
                          {test.pValue < 0.05 && (
                            <span className="ml-2 text-xs text-green-600">
                              Winner: {test.variantB.ctr > test.variantA.ctr ? 'B' : 'A'}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          p = {test.pValue.toFixed(4)}
                          <br />
                          <span className="text-xs">
                            n = {(test.variantA.exposures + test.variantB.exposures).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No A/B tests running or insufficient data</p>
                <p className="text-sm mt-2">A/B test results will appear here when data is available</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Webhook Configuration Info */}
        {!webhookConfigured && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-gray-400 text-sm" aria-hidden="true">📤</span>
              </div>
              <div className="ml-2 text-xs text-gray-600">
                <p><strong>Webhook Sharing:</strong> Configure WEBHOOK_URL environment variable to enable sharing dashboard snapshots to Slack/Teams.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SLO Report Modal */}
      <Modal
        isOpen={showSLOModal}
        onClose={() => setShowSLOModal(false)}
        title="Service Level Objectives Report"
        size="lg"
      >
        {sloSummary && (
          <div className="space-y-6">
            {/* Overall Status */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Overall SLO Status</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {sloSummary.pass_count} of {sloSummary.total_count} objectives are meeting targets
                </p>
              </div>
              <div className={`px-4 py-2 rounded-lg border text-sm font-medium ${sloEvaluator.getBadge(sloSummary).className}`}>
                <span className="mr-2">{sloEvaluator.getBadge(sloSummary).icon}</span>
                {sloSummary.compliance_percentage.toFixed(1)}% Compliance
              </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Objective Details</h4>
              {sloSummary.results.map((result, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  result.status === 'pass' ? 'bg-green-50 border-green-200' :
                  result.status === 'warn' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="mr-2">
                          {result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌'}
                        </span>
                        <h5 className="font-medium text-sm">{result.metric}</h5>
                      </div>
                      <p className="text-sm mt-2 opacity-90">{result.description}</p>
                    </div>
                    <div className="text-right text-sm ml-4">
                      <div>
                        Current: <strong>{sloEvaluator.formatResult(result).split('(Current: ')[1]?.split(',')[0] || result.current.toString()}</strong>
                      </div>
                      <div>
                        Target: <strong>{sloEvaluator.formatResult(result).split('Target: ')[1]?.split(',')[0] || result.target.toString()}</strong>
                      </div>
                      <div className="text-xs opacity-75">
                        Δ {result.delta >= 0 ? '+' : ''}{result.delta.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSLOModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
              {sloSummary.overall_status !== 'pass' && (
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    // TODO: Navigate to incident creation or escalation
                    console.log('Create incident for SLO violations');
                  }}
                >
                  Create Incident
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Rollout Management Modal */}
      <Modal isOpen={showRolloutModal} onClose={() => setShowRolloutModal(false)} title="A/B Test Progressive Rollout">
        {rolloutStatus && (
          <div className="space-y-6">
            {/* Rollout Status Header */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {rolloutStatus.experimentId.replace(/_/g, ' ').toUpperCase()}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  rolloutStatus.status === 'active' ? 'bg-green-100 text-green-800' :
                  rolloutStatus.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                  rolloutStatus.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  rolloutStatus.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {rolloutStatus.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Winner Variant:</span>
                  <div className="font-semibold">{rolloutStatus.winner}</div>
                </div>
                <div>
                  <span className="text-gray-500">Current Stage:</span>
                  <div className="font-semibold">{rolloutStatus.currentStage + 1}/{rolloutStatus.schedule.length}</div>
                </div>
                <div>
                  <span className="text-gray-500">Rollout:</span>
                  <div className="font-semibold text-lg">{rolloutStatus.currentPercentage}%</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Rollout Progress</span>
                <span>{rolloutStatus.currentPercentage}% of users</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${rolloutStatus.currentPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                {rolloutStatus.schedule.map((percentage: number, index: number) => (
                  <span key={index} className={index <= rolloutStatus.currentStage ? 'font-semibold' : ''}>
                    {percentage}%
                  </span>
                ))}
              </div>
            </div>

            {/* Current Metrics (Mocked) */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">Current Metrics vs Baseline</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">CTR Lift:</span>
                  <div className="font-semibold text-green-600">+12.5% ✅</div>
                </div>
                <div>
                  <span className="text-blue-700">Sample Size:</span>
                  <div className="font-semibold">1,547 users ✅</div>
                </div>
                <div>
                  <span className="text-blue-700">Significance:</span>
                  <div className="font-semibold text-green-600">p &lt; 0.02 ✅</div>
                </div>
                <div>
                  <span className="text-blue-700">Web Vitals:</span>
                  <div className="font-semibold text-green-600">Improved ✅</div>
                </div>
              </div>
            </div>

            {/* Next Stages */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Rollout Schedule</h4>
              {rolloutStatus.schedule.map((percentage: number, index: number) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  index < rolloutStatus.currentStage ? 'bg-green-50 border border-green-200' :
                  index === rolloutStatus.currentStage ? 'bg-blue-50 border border-blue-200' :
                  'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      index < rolloutStatus.currentStage ? 'bg-green-500 text-white' :
                      index === rolloutStatus.currentStage ? 'bg-blue-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {index < rolloutStatus.currentStage ? '✓' : index + 1}
                    </span>
                    <span className="font-medium">Stage {index + 1}</span>
                  </div>
                  <span className="font-semibold">{percentage}%</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowRolloutModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
              
              {rolloutStatus.status === 'active' && (
                <>
                  <button
                    className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    onClick={() => {
                      // TODO: Implement pause functionality
                      console.log('Pause rollout');
                    }}
                  >
                    ⏸️ Pause
                  </button>
                  
                  <button
                    className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => {
                      // TODO: Implement abort functionality
                      console.log('Abort rollout');
                    }}
                  >
                    🛑 Abort
                  </button>
                </>
              )}
              
              {(rolloutStatus.status === 'ready' || rolloutStatus.status === 'active') && rolloutStatus.currentStage < rolloutStatus.schedule.length - 1 && (
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => {
                    // TODO: Implement promotion functionality
                    console.log('Promote to next stage');
                  }}
                >
                  🚀 Promote to {rolloutStatus.schedule[rolloutStatus.currentStage + 1]}%
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;