/**
 * Utility to sanitize and normalize ANY image path or URL
 * Handles Data URLs, relative paths, public folder prefixes, Windows paths, etc.
 */
export function formatImageUrl(url, fallback = '/projects/project-1/img1.jpg') {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }

  const clean = url.trim();

  // If it's a data URI, blob URI, or external HTTP/HTTPS URL, return directly
  if (
    clean.startsWith('data:') ||
    clean.startsWith('blob:') ||
    clean.startsWith('http://') ||
    clean.startsWith('https://')
  ) {
    return clean;
  }

  // Handle Windows paths or paths with backslashes
  let normalized = clean.replace(/\\/g, '/');

  // Strip workspace absolute path prefixes or /public/ prefix
  if (normalized.includes('/public/')) {
    normalized = normalized.substring(normalized.indexOf('/public/') + 7);
  } else if (normalized.startsWith('public/')) {
    normalized = '/' + normalized.substring(7);
  }

  // Ensure leading slash for web-root public assets
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }

  return normalized;
}

/**
 * Utility to compress and convert image files to optimized base64 Data URLs
 * Prevents localStorage quota overflow while maintaining crisp visuals.
 */
export function compressImage(file, maxWidth = 900, maxHeight = 700, quality = 0.78) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Invalid image file'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target.result);
          return;
        }

        // Fill background in case of transparent png converting to jpeg/webp
        ctx.fillStyle = '#080c14';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Always use image/webp with fallback to image/jpeg for high compression ratio
        let compressedDataUrl = '';
        try {
          compressedDataUrl = canvas.toDataURL('image/webp', quality);
          if (!compressedDataUrl.startsWith('data:image/webp')) {
            compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch {
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
  });
}

/**
 * Process multiple image files in batch
 */
export async function processMultipleImages(fileList, maxWidth = 1200, maxHeight = 900, quality = 0.82) {
  const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
  const results = [];

  for (const file of files) {
    try {
      const compressed = await compressImage(file, maxWidth, maxHeight, quality);
      results.push(compressed);
    } catch (err) {
      console.warn('Failed to process image:', file.name, err);
    }
  }

  return results;
}
