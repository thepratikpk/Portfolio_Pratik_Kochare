export const VIDEO_CONFIG = {
  // Cloudinary optimization settings
  THUMBNAIL: {
    width: 400,
    height: 300,
    crop: 'fill',
    format: 'jpg',
    quality: 'auto',
    startOffset: 2 // seconds
  },
  
  PREVIEW: {
    width: 480, // Reduced size for faster loading
    height: 320,
    crop: 'fill',
    quality: 'auto:good',
    format: 'mp4', // Force MP4 for better compatibility
    bitrate: '400k' // Balanced quality/speed
  },
  
  FULL_QUALITY: {
    quality: 'auto:good',
    format: 'auto'
  },

  // Loading behavior
  LOADING: {
    hoverDelay: 100, // ms before starting video load on hover (faster response)
    preloadDistance: 200, // px from viewport to start preloading (larger area)
    maxConcurrentLoads: 5, // max videos loading simultaneously (increased)
    retryAttempts: 2,
    retryDelay: 1000, // ms
    minBufferPercent: 5, // minimum % buffered before allowing playback (reduced)
    progressiveLoad: true, // enable YouTube-style progressive loading
    aggressivePreload: true, // preload metadata immediately when visible
    hoverStabilization: 100 // ms delay before pausing on mouse leave
  },

  // Performance thresholds
  PERFORMANCE: {
    slowConnection: 1000, // ms - consider connection slow if ping > this
    lowBandwidth: 500000, // bytes/s - consider bandwidth low if < this
    enableAdaptiveQuality: true
  }
};

// Generate optimized Cloudinary URLs with production-safe error handling
export const generateCloudinaryUrl = (originalUrl, options = {}) => {
  // Production-safe input validation
  if (!originalUrl || typeof originalUrl !== 'string') {
    console.warn('Invalid video URL provided:', originalUrl);
    return originalUrl || '';
  }

  if (!originalUrl.includes('cloudinary.com')) {
    return originalUrl;
  }

  try {
    const urlParts = originalUrl.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) {
      console.warn('Invalid Cloudinary URL structure:', originalUrl);
      return originalUrl;
    }
    
    const publicId = urlParts[urlParts.length - 1]?.replace(/\.[^/.]+$/, "");
    if (!publicId) {
      console.warn('Could not extract public ID from URL:', originalUrl);
      return originalUrl;
    }
    
    const baseUrl = urlParts.slice(0, uploadIndex + 1).join('/');
    
    // Build transformation string with validation
    const transformations = [];
    
    if (options.width && !isNaN(options.width)) transformations.push(`w_${options.width}`);
    if (options.height && !isNaN(options.height)) transformations.push(`h_${options.height}`);
    if (options.crop && typeof options.crop === 'string') transformations.push(`c_${options.crop}`);
    if (options.quality && typeof options.quality === 'string') transformations.push(`q_${options.quality}`);
    if (options.format && typeof options.format === 'string') transformations.push(`f_${options.format}`);
    if (options.bitrate && typeof options.bitrate === 'string') transformations.push(`br_${options.bitrate}`);
    if (options.startOffset && !isNaN(options.startOffset)) transformations.push(`so_${options.startOffset}`);
    
    const transformString = transformations.join(',');
    
    const finalUrl = transformString 
      ? `${baseUrl}/${transformString}/${publicId}`
      : originalUrl;
      
    // Validate final URL
    if (!finalUrl.startsWith('http')) {
      console.warn('Generated invalid URL:', finalUrl);
      return originalUrl;
    }
    
    return finalUrl;
      
  } catch (error) {
    console.error('Error generating Cloudinary URL:', error);
    return originalUrl;
  }
};

// Detect connection quality with production-safe fallbacks
export const detectConnectionQuality = () => {
  return new Promise((resolve) => {
    try {
      // Check if navigator and connection API are available
      if (typeof navigator !== 'undefined' && 'connection' in navigator && navigator.connection) {
        const connection = navigator.connection;
        const effectiveType = connection.effectiveType;
        
        const quality = {
          'slow-2g': 'low',
          '2g': 'low', 
          '3g': 'medium',
          '4g': 'high'
        }[effectiveType] || 'medium';
        
        resolve(quality);
        return;
      }
      
      // Fallback: measure load time of a small resource
      if (typeof performance !== 'undefined' && performance.now) {
        const start = performance.now();
        const img = new Image();
        
        const timeout = setTimeout(() => {
          // If image takes too long, assume slow connection
          resolve('low');
        }, 3000);
        
        img.onload = img.onerror = () => {
          clearTimeout(timeout);
          const loadTime = performance.now() - start;
          const quality = loadTime < 200 ? 'high' : loadTime < 500 ? 'medium' : 'low';
          resolve(quality);
        };
        
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      } else {
        // Ultimate fallback
        resolve('medium');
      }
    } catch (error) {
      console.warn('Connection quality detection failed:', error);
      resolve('medium');
    }
  });
};