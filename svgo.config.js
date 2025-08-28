/**
 * SVGO Configuration for Bank Logo Optimization
 * 
 * This configuration optimizes SVG bank logos while preserving
 * essential attributes needed for proper display and accessibility.
 */

module.exports = {
  plugins: [
    // Use default preset with modifications
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep viewBox for responsive scaling
          removeViewBox: false,
          // Keep width/height for SEO and performance
          removeDimensions: false,
          // Keep title and desc for accessibility
          removeTitle: false,
          removeDesc: false,
          // Keep IDs that might be referenced
          cleanupIds: {
            remove: false,
            minify: true
          }
        }
      }
    },
    
    // Additional optimizations
    'cleanupAttrs',           // Clean up attributes
    'removeDoctype',          // Remove DOCTYPE
    'removeXMLProcInst',      // Remove XML processing instructions
    'removeComments',         // Remove comments
    'removeMetadata',         // Remove metadata
    'removeEditorsNSData',    // Remove editor-specific namespaces
    'cleanupEnableBackground', // Clean up enable-background
    'convertStyleToAttrs',    // Convert style to attributes
    'convertColors',          // Convert colors to shorter formats
    'convertPathData',        // Optimize path data
    'convertTransform',       // Optimize transforms
    'removeUnusedNS',         // Remove unused namespaces
    'removeEmptyAttrs',       // Remove empty attributes
    'removeEmptyText',        // Remove empty text elements
    'removeEmptyContainers',  // Remove empty containers
    'mergePaths',             // Merge paths where possible
    
    // Security: Remove potentially harmful elements
    'removeScriptElement',    // Remove <script> elements
    'removeStyleElement',     // Remove <style> elements (convert to attrs instead)
    
    // Custom plugin for bank logo specific optimizations
    {
      name: 'customBankLogoOptimization',
      fn: () => {
        return {
          element: {
            enter: (node) => {
              // Ensure proper dimensions for bank logos
              if (node.name === 'svg') {
                // Ensure viewBox exists for responsiveness
                if (!node.attributes.viewBox) {
                  const width = node.attributes.width;
                  const height = node.attributes.height;
                  if (width && height) {
                    node.attributes.viewBox = `0 0 ${width} ${height}`;
                  }
                }
                
                // Ensure proper accessibility attributes
                if (!node.attributes['aria-hidden']) {
                  node.attributes.focusable = 'false';
                }
                
                // Add proper namespace if missing
                if (!node.attributes.xmlns) {
                  node.attributes.xmlns = 'http://www.w3.org/2000/svg';
                }
              }
            }
          }
        };
      }
    }
  ],
  
  // Global configuration
  multipass: true,        // Run multiple optimization passes
  floatPrecision: 2,     // Limit decimal places for smaller file size
  transformPrecision: 2,  // Transform precision
  
  // File processing options
  js2svg: {
    indent: 2,            // Indentation for readability (development)
    pretty: false         // Minimize whitespace for production
  }
};