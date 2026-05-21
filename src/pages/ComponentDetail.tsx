import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, Package, DollarSign, Box, Calendar,
  Tag, Building, FileText, ShoppingCart, Truck, Star, Phone, MapPin,
  Hash, Upload, Download, Trash2, Clock, Search, X, Eye
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { components, getCategoryLabel, getCategoryIcon } from '../data/components';
import './ComponentDetail.css';

// IndexedDB 工具函数
const DB_NAME = 'ComponentDatasheetDB';
const STORE_NAME = 'datasheets';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

const saveToIndexedDB = async (componentId: string, file: File): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id: componentId, file, fileName: file.name });
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

const getFromIndexedDB = async (componentId: string): Promise<{ file: File; fileName: string; url?: string } | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(componentId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result;
      if (result) {
        // 创建 Blob URL 用于显示
        const url = URL.createObjectURL(result.file);
        resolve({ ...result, url });
      } else {
        resolve(null);
      }
    };
  });
};

const deleteFromIndexedDB = async (componentId: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(componentId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// 下载历史记录
interface DownloadRecord {
  id: string;
  componentId: string;
  componentName: string;
  partNumber: string;
  fileName: string;
  downloadTime: number;
}

const HISTORY_KEY = 'component-download-history';
const MAX_RECORDS = 50;

const getHistory = (): DownloadRecord[] => {
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveHistory = (records: DownloadRecord[]) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
};

const addDownloadRecord = (componentId: string, componentName: string, partNumber: string, fileName: string) => {
  const history = getHistory();
  const newRecord: DownloadRecord = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    componentId,
    componentName,
    partNumber,
    fileName,
    downloadTime: Date.now(),
  };
  const newHistory = [newRecord, ...history].slice(0, MAX_RECORDS);
  saveHistory(newHistory);
};

const formatTime = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  const d = new Date(timestamp);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

const ComponentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const component = components.find(c => c.id === id);
  
  const [uploadedFile, setUploadedFile] = useState<{ file: File; fileName: string; url?: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [history, setHistory] = useState<DownloadRecord[]>([]);

  useEffect(() => {
    if (!component) return;
    
    // 加载已上传的文件
    getFromIndexedDB(component.id)
      .then(data => {
        if (data) setUploadedFile(data);
      })
      .catch(console.error);
    
    // 加载下载历史
    setHistory(getHistory());
  }, [component]);

  // 清理 Blob URL
  useEffect(() => {
    return () => {
      if (uploadedFile?.url) {
        URL.revokeObjectURL(uploadedFile.url);
      }
    };
  }, [uploadedFile]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!component || !e.target.files?.[0]) return;
    
    const file = e.target.files[0];
    if (file.type !== 'application/pdf') {
      alert('请上传 PDF 文件');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('文件大小不能超过 10MB');
      return;
    }
    
    setIsUploading(true);
    try {
      await saveToIndexedDB(component.id, file);
      const url = URL.createObjectURL(file);
      setUploadedFile({ file, fileName: file.name, url });
    } catch (error) {
      console.error('Upload failed:', error);
      alert('上传失败');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!component) return;
    if (!confirm('确定删除已上传的数据手册？')) return;
    
    try {
      await deleteFromIndexedDB(component.id);
      if (uploadedFile?.url) {
        URL.revokeObjectURL(uploadedFile.url);
      }
      setUploadedFile(null);
      setShowPdfViewer(false);
    } catch (error) {
      console.error('Delete failed:', error);
      alert('删除失败');
    }
  };

  const handleDownload = async () => {
    if (!component || !uploadedFile) return;
    
    try {
      const url = URL.createObjectURL(uploadedFile.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = uploadedFile.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // 添加到下载历史
      addDownloadRecord(component.id, component.name, component.partNumber, uploadedFile.fileName);
      setHistory(getHistory());
    } catch (error) {
      console.error('Download failed:', error);
      alert('下载失败');
    }
  };

  const handlePreview = () => {
    setShowPdfViewer(true);
  };

  const componentHistory = history.filter(r => r.componentId === component?.id);

  if (!component) {
    return (
      <div className="not-found">
        <h2>元件未找到</h2>
        <p>抱歉，没有找到该元件信息</p>
        <Link to="/components" className="back-link">
          <ArrowLeft size={18} />
          返回列表
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="breadcrumb">
        <Link to="/">首页</Link>
        <span>/</span>
        <Link to="/components">元件列表</Link>
        <span>/</span>
        <Link to={`/components?category=${component.category}`}>
          {getCategoryLabel(component.category)}
        </Link>
        <span>/</span>
        <span className="current">{component.name}</span>
      </div>

      <div className="detail-content">
        <div className="detail-main">
          <div className="info-card">
            <div className="info-header">
              <div className="category-badge">
                <span className="category-icon">{getCategoryIcon(component.category)}</span>
                {getCategoryLabel(component.category)}
              </div>
              <span className={`stock-status ${component.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                <Box size={16} />
                {component.stock > 0 ? `库存 ${component.stock.toLocaleString()} 件` : '缺货'}
              </span>
            </div>
            
            <h1 className="component-name">{component.name}</h1>
            <p className="part-number">{component.partNumber}</p>
            <p className="description">{component.description}</p>
            
            <div className="quick-info">
              <div className="info-item">
                <Package size={18} />
                <div>
                  <span className="label">封装</span>
                  <span className="value">{component.package}</span>
                </div>
              </div>
              <div className="info-item">
                <Building size={18} />
                <div>
                  <span className="label">制造商</span>
                  <span className="value">{component.manufacturer}</span>
                </div>
              </div>
              <div className="info-item price">
                <DollarSign size={18} />
                <div>
                  <span className="label">单价</span>
                  <span className="value">¥{component.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="tags">
              <Tag size={16} />
              {component.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="info-card">
            <h2>
              <FileText size={20} />
              规格参数
            </h2>
            <div className="specs-table">
              {Object.entries(component.specifications).map(([key, value]) => (
                <div key={key} className="spec-row">
                  <span className="spec-key">{key}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 数据手册上传下载区域 */}
          <div className="info-card datasheet-card">
            <h2>
              <FileText size={20} />
              数据手册
            </h2>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUpload}
              accept=".pdf,application/pdf"
              style={{ display: 'none' }}
            />
            
            {uploadedFile ? (
              <div className="uploaded-file-info">
                <div className="file-info">
                  <FileText size={20} />
                  <span className="file-name">{uploadedFile.fileName}</span>
                </div>
                <div className="datasheet-actions">
                  <button className="preview-btn" onClick={handlePreview}>
                    <Eye size={16} />
                    在线查看
                  </button>
                  <button className="download-btn" onClick={handleDownload} disabled={isUploading}>
                    <Download size={16} />
                    下载
                  </button>
                  <button className="delete-btn" onClick={handleDelete}>
                    <Trash2 size={16} />
                    删除
                  </button>
                </div>
              </div>
            ) : (
              <div className="upload-area">
                <button className="upload-btn" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                  <Upload size={16} />
                  {isUploading ? '上传中...' : '上传数据手册 (PDF)'}
                </button>
                <p className="upload-hint">支持 PDF 格式，最大 10MB</p>
              </div>
            )}
            
            {component.datasheet && (
              <a 
                href={component.datasheet} 
                target="_blank" 
                rel="noopener noreferrer"
                className="official-datasheet-link"
              >
                <ExternalLink size={14} />
                查看官方数据手册
              </a>
            )}
            
            <div className="external-search-link">
              <a 
                href={`https://www.alldatasheetcn.com/view.jsp?Searchword=${encodeURIComponent(component.partNumber)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="alldatasheet-link"
              >
                <Search size={14} />
                在 alldatasheetcn.com 搜索更多数据手册
              </a>
            </div>
          </div>

          {/* PDF 在线查看区域 - 直接在页面中显示 */}
          {showPdfViewer && uploadedFile?.url && (
            <div className="info-card pdf-viewer-card">
              <div className="pdf-viewer-header">
                <h2>
                  <FileText size={20} />
                  PDF 预览
                </h2>
                <button className="close-pdf-btn" onClick={() => setShowPdfViewer(false)}>
                  <X size={20} />
                  关闭预览
                </button>
              </div>
              <div className="pdf-container">
                <iframe
                  src={uploadedFile.url}
                  width="100%"
                  height="600px"
                  style={{ border: 'none', borderRadius: '8px' }}
                  title="PDF Preview"
                />
              </div>
            </div>
          )}

          {/* 下载历史 */}
          {componentHistory.length > 0 && (
            <div className="info-card">
              <h2>
                <Clock size={20} />
                下载历史
              </h2>
              <div className="download-history">
                {componentHistory.map((record) => (
                  <div key={record.id} className="history-item">
                    <div className="history-info">
                      <FileText size={14} />
                      <span className="history-filename">{record.fileName}</span>
                      <span className="history-time">{formatTime(record.downloadTime)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {component.suppliers && component.suppliers.length > 0 && (
            <div className="info-card suppliers-card">
              <h2>
                <Truck size={20} />
                供应商信息
              </h2>
              <div className="suppliers-list">
                {component.suppliers.map((supplier, index) => (
                  <div key={index} className="supplier-row">
                    <div className="supplier-header">
                      <span className="supplier-name">{supplier.name}</span>
                      {supplier.rating && (
                        <span className="supplier-rating">
                          <Star size={14} />
                          {supplier.rating}
                        </span>
                      )}
                    </div>
                    <div className="supplier-details">
                      {supplier.location && (
                        <div className="supplier-detail-item">
                          <MapPin size={14} />
                          <span>{supplier.location}</span>
                        </div>
                      )}
                      {supplier.contact && (
                        <div className="supplier-detail-item">
                          <Phone size={14} />
                          <span>{supplier.contact}</span>
                        </div>
                      )}
                      {supplier.moq !== undefined && (
                        <div className="supplier-detail-item">
                          <Hash size={14} />
                          <span>起订量: {supplier.moq} 件</span>
                        </div>
                      )}
                      {supplier.deliveryDays !== undefined && (
                        <div className="supplier-detail-item">
                          <Truck size={14} />
                          <span>交货: {supplier.deliveryDays} 天</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="detail-sidebar">
          <div className="action-card">
            <div className="price-display">
              <span className="price-label">单价</span>
              <span className="price-value">¥{component.price.toFixed(2)}</span>
            </div>
            
            <div className="stock-info">
              <span className="stock-label">库存数量</span>
              <span className="stock-value">{component.stock.toLocaleString()} 件</span>
            </div>

            <button className="buy-btn">
              <ShoppingCart size={18} />
              加入购物车
            </button>

            {component.datasheet && (
              <a 
                href={component.datasheet} 
                target="_blank" 
                rel="noopener noreferrer"
                className="datasheet-btn"
              >
                <FileText size={18} />
                下载数据手册
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <div className="meta-card">
            <h3>元数据</h3>
            <div className="meta-item">
              <Calendar size={16} />
              <span>创建日期: {component.createdAt}</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} />
              <span>更新日期: {component.updatedAt}</span>
            </div>
          </div>

          <button 
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            返回上一页
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetail;
