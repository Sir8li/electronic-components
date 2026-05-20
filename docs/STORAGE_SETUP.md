# 大规模图片/视频存储部署指南

## 概述

当网站需要存储大量图片、电路图和产品演示视频时，需要将静态资源迁移到专业的对象存储服务。

## 方案对比

| 方案 | 费用 | 适用场景 | 国内访问 |
|------|------|----------|----------|
| **Cloudflare R2 + CDN** | $0.015/GB/月 | 海外用户为主 | 一般 |
| **阿里云 OSS + CDN** | 0.12元/GB/月 | 国内用户为主 | 优秀 |
| **AWS S3 + CloudFront** | $0.023/GB/月 | 全球用户 | 一般 |
| **腾讯云 COS + CDN** | 0.15元/GB/月 | 国内用户为主 | 优秀 |

## 推荐方案：Cloudflare R2（海外用户）

### 1. 创建 Cloudflare 账户
- 访问 https://dash.cloudflare.com
- 注册/登录账户

### 2. 创建 R2 存储桶
```
1. 点击 "R2 Object Storage"
2. 点击 "Create bucket"
3. 输入桶名称：elec-components-assets
4. 选择位置：亚太地区（香港）
5. 点击 "Create bucket"
```

### 3. 配置自定义域名
```
1. 在 R2 桶设置中，点击 "Custom Domains"
2. 点击 "Connect domain"
3. 输入域名：cdn.yourdomain.com
4. 按照提示添加 DNS 记录
```

### 4. 创建 API Token
```
1. 点击 "Manage R2 API Tokens"
2. 点击 "Create API Token"
3. 选择权限：Object Read & Write
4. 复制 Access Key ID 和 Secret Access Key
```

### 5. 上传文件

使用 AWS CLI:
```bash
aws s3 cp ./images/ s3://elec-components-assets/images/ --recursive --endpoint-url https://[account-id].r2.cloudflarestorage.com
```

### 6. 修改网站配置

编辑 `src/config/storage.ts`：
```typescript
export const STORAGE_CONFIG = {
  type: 'cloudflare' as const,
  cloudflare: {
    baseUrl: 'https://cdn.yourdomain.com',
    imagePath: '/images/',
    videoPath: '/videos/',
  },
};
```

## 推荐方案：阿里云 OSS（国内用户）

### 1. 创建 OSS 存储桶
- 登录阿里云控制台
- 进入 "对象存储 OSS"
- 点击 "创建 Bucket"
- 输入名称：elec-components-assets
- 选择区域：华东1（杭州）
- 读写权限：公共读

### 2. 绑定自定义域名
- 在 Bucket 详情页，点击 "域名管理"
- 点击 "绑定域名"
- 输入域名：cdn.yourdomain.com

### 3. 配置 CDN 加速
- 进入 "CDN 控制台"
- 点击 "添加域名"
- 输入加速域名：cdn.yourdomain.com
- 源站类型：OSS 域名

### 4. 上传文件
```bash
ossutil cp -r ./images/ oss://elec-components-assets/images/
```

### 5. 修改网站配置
```typescript
export const STORAGE_CONFIG = {
  type: 'aliyun' as const,
  aliyun: {
    baseUrl: 'https://cdn.yourdomain.com',
    imagePath: '/images/',
    videoPath: '/videos/',
  },
};
```

## 视频存储方案

### 方案一：对象存储
- 适合：短视频（< 50MB）
- 费用：按流量计费

### 方案二：视频平台嵌入（推荐）
- **YouTube**：免费，适合海外用户
- **Bilibili**：免费，适合国内用户

## 费用估算

场景：1000张图片 + 100个视频（平均10MB）

| 项目 | Cloudflare R2 | 阿里云 OSS |
|------|---------------|------------|
| 存储费用 | $0.03/月 | 0.24元/月 |
| 流量费用 | $0 | 12元/月 |
| **总计** | **$0.03/月** | **~12元/月** |

## 使用新组件

### 图片组件
```tsx
import LazyImage from '../components/LazyImage';
<LazyImage src="resistor-1k.jpg" alt="1K电阻" size="full" />
```

### 视频组件
```tsx
import VideoPlayer from '../components/VideoPlayer';
<VideoPlayer src="product-demo.mp4" poster="thumb.jpg" title="演示视频" />
```
