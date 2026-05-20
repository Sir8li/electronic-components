// 存储配置 - 支持外部对象存储
export const STORAGE_CONFIG = {
  // 当前使用的存储类型: 'local' | 'cloudflare' | 'aliyun' | 'aws'
  type: 'local' as const,

  // 本地存储（开发/小量）
  local: {
    baseUrl: '',
    imagePath: '/images/',
    videoPath: '/videos/',
  },

  // Cloudflare R2 / CDN - 推荐用于 elecdatasheet.com
  cloudflare: {
    baseUrl: 'https://cdn.elecdatasheet.com',  // 您的 CDN 域名
    imagePath: '/images/',
    videoPath: '/videos/',
    imageParams: '?width=800&quality=80',
    thumbnailParams: '?width=300&quality=60',
  },

  // 阿里云 OSS
  aliyun: {
    baseUrl: 'https://your-bucket.oss-cn-region.aliyuncs.com',
    imagePath: '/images/',
    videoPath: '/videos/',
    imageParams: '?x-oss-process=image/resize,w_800/quality,q_80',
    thumbnailParams: '?x-oss-process=image/resize,w_300/quality,q_60',
  },

  // AWS S3 / CloudFront
  aws: {
    baseUrl: 'https://cdn.elecdatasheet.com',
    imagePath: '/images/',
    videoPath: '/videos/',
  },
};

// 获取资源完整URL
export function getAssetUrl(type: 'image' | 'video', filename: string): string {
  const config = STORAGE_CONFIG[STORAGE_CONFIG.type];
  const path = type === 'image' ? config.imagePath : config.videoPath;
  return `${config.baseUrl}${path}${filename}`;
}

// 获取图片URL（带尺寸参数）
export function getImageUrl(filename: string, size: 'full' | 'thumbnail' = 'full'): string {
  const config = STORAGE_CONFIG[STORAGE_CONFIG.type];
  let url = `${config.baseUrl}${config.imagePath}${filename}`;

  if (STORAGE_CONFIG.type === 'cloudflare' || STORAGE_CONFIG.type === 'aliyun') {
    const params = size === 'thumbnail' ? config.thumbnailParams : config.imageParams;
    url += params;
  }

  return url;
}

// 获取视频URL
export function getVideoUrl(filename: string): string {
  return getAssetUrl('video', filename);
}
