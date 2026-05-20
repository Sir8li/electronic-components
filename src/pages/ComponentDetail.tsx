import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, Package, DollarSign, Box, Calendar,
  Tag, Building, FileText, ShoppingCart, Truck, Star, Phone, MapPin,
  Hash, Book, Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { components, getCategoryLabel, getCategoryIcon } from '../data/components';
import { searchGoogleBooks, searchOpenLibrary, searchWikipedia } from '../services/bookApi';
import type { Book as BookType } from '../services/bookApi';
import './ComponentDetail.css';

const ComponentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const component = components.find(c => c.id === id);
  const [books, setBooks] = useState<BookType[]>([]);
  const [wikiInfo, setWikiInfo] = useState<{title: string; extract: string; link: string} | null>(null);
  const [loadingBooks, setLoadingBooks] = useState(false);

  useEffect(() => {
    if (!component) return;
    
    const fetchBooks = async () => {
      setLoadingBooks(true);
      const searchQuery = component.name + ' ' + component.category;
      
      try {
        const [googleResult, olResult] = await Promise.all([
          searchGoogleBooks(searchQuery),
          searchOpenLibrary(searchQuery)
        ]);
        
        const allBooks = [...googleResult.books, ...olResult.books];
        const seen = new Set<string>();
        const uniqueBooks = allBooks.filter(book => {
          if (seen.has(book.title)) return false;
          seen.add(book.title);
          return true;
        });
        
        setBooks(uniqueBooks.slice(0, 6));
      } catch (error) {
        console.error('Book search error:', error);
      } finally {
        setLoadingBooks(false);
      }
    };

    const fetchWiki = async () => {
      try {
        const result = await searchWikipedia(component.name);
        if (result.books.length > 0) {
          setWikiInfo({
            title: result.books[0].title,
            extract: result.books[0].description || '',
            link: result.books[0].link || ''
          });
        }
      } catch (error) {
        console.error('Wiki search error:', error);
      }
    };

    fetchBooks();
    fetchWiki();
  }, [component]);

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

          {/* 相关图书资料 */}
          <div className="info-card">
            <h2>
              <Book size={20} />
              相关图书资料
            </h2>
            {loadingBooks ? (
              <div className="books-loading">
                <Loader2 className="spin" size={24} />
                <span>正在查询相关图书资料...</span>
              </div>
            ) : books.length > 0 ? (
              <div className="books-list">
                {books.map((book) => (
                  <div key={book.id} className="book-item">
                    <div className="book-item-cover">
                      {book.coverUrl ? (
                        <img src={book.coverUrl} alt={book.title} />
                      ) : (
                        <div className="book-item-no-cover">
                          <Book size={24} />
                        </div>
                      )}
                    </div>
                    <div className="book-item-info">
                      <h4 className="book-item-title">{book.title}</h4>
                      {book.authors.length > 0 && (
                        <p className="book-item-authors">{book.authors.join(', ')}</p>
                      )}
                      <div className="book-item-meta">
                        {book.publisher && <span>{book.publisher}</span>}
                        {book.publishDate && <span>{book.publishDate}</span>}
                        <span className="book-item-source">{book.source}</span>
                      </div>
                      {book.link && (
                        <a href={book.link} target="_blank" rel="noopener noreferrer" className="book-item-link">
                          <ExternalLink size={14} />
                          查看详情
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="books-empty">暂无相关图书资料</p>
            )}
          </div>

          {/* 维基百科资料 */}
          {wikiInfo && wikiInfo.extract && (
            <div className="info-card">
              <h2>
                <FileText size={20} />
                百科资料 (Wikipedia)
              </h2>
              <div className="wiki-info">
                <p className="wiki-extract">{wikiInfo.extract}</p>
                {wikiInfo.link && (
                  <a href={wikiInfo.link} target="_blank" rel="noopener noreferrer" className="wiki-link">
                    <ExternalLink size={14} />
                    在 Wikipedia 中查看更多
                  </a>
                )}
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
