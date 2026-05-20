import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, Grid, List, Box, Layers, Ruler } from 'lucide-react';
import { 
  circuitBoards, 
  boardTypeLabels, 
  boardApplicationLabels,
  boardManufacturers,
  getBoardTypeLabel, 
  getBoardApplicationLabel 
} from '../data/circuitBoards';
import type { CircuitBoardType, CircuitBoardApplication } from '../types';
import './CircuitBoards.css';

const CircuitBoards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // 筛选状态
  const [selectedType, setSelectedType] = useState<CircuitBoardType | ''>('');
  const [selectedApplication, setSelectedApplication] = useState<CircuitBoardApplication | ''>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState<'price' | 'stock' | 'name'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // 筛选后的电路板列表
  const filteredBoards = useMemo(() => {
    let result = [...circuitBoards];

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.name.toLowerCase().includes(query) ||
        b.model.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // 类型过滤
    if (selectedType) {
      result = result.filter(b => b.type === selectedType);
    }

    // 应用领域过滤
    if (selectedApplication) {
      result = result.filter(b => b.application === selectedApplication);
    }

    // 制造商过滤
    if (selectedManufacturer) {
      result = result.filter(b => b.manufacturer === selectedManufacturer);
    }

    // 排序
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'stock':
          comparison = a.stock - b.stock;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, selectedType, selectedApplication, selectedManufacturer, sortBy, sortOrder]);

  // 清除所有筛选
  const clearFilters = () => {
    setSelectedType('');
    setSelectedApplication('');
    setSelectedManufacturer('');
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFilterCount = [selectedType, selectedApplication, selectedManufacturer, searchQuery].filter(Boolean).length;

  return (
    <div className="boards-page">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <h1><Layers size={28} /> 电路板库</h1>
          <p>共 {filteredBoards.length} 种电路板</p>
        </div>
        <div className="header-search">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索电路板名称、型号..."
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* 工具栏 */}
      <div className="toolbar">
        <div className="toolbar-left">
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span>筛选</span>
            {activeFilterCount > 0 && (
              <span className="filter-badge">{activeFilterCount}</span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button className="clear-filters" onClick={clearFilters}>
              <X size={16} />
              <span>清除筛选</span>
            </button>
          )}
        </div>
        
        <div className="toolbar-right">
          <div className="sort-select">
            <select 
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split('-') as ['price' | 'stock' | 'name', 'asc' | 'desc'];
                setSortBy(by);
                setSortOrder(order);
              }}
            >
              <option value="name-asc">名称 A-Z</option>
              <option value="name-desc">名称 Z-A</option>
              <option value="price-asc">价格 低-高</option>
              <option value="price-desc">价格 高-低</option>
              <option value="stock-asc">库存 低-高</option>
              <option value="stock-desc">库存 高-低</option>
            </select>
            <ChevronDown size={16} />
          </div>
          
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="main-content">
        {/* 筛选面板 */}
        <aside className={`filters-panel ${showFilters ? 'show' : ''}`}>
          <div className="filter-section">
            <h3>板类型</h3>
            <div className="filter-options small">
              {Object.entries(boardTypeLabels).map(([key, label]) => (
                <button
                  key={key}
                  className={`filter-option ${selectedType === key ? 'active' : ''}`}
                  onClick={() => setSelectedType(selectedType === key ? '' : key as CircuitBoardType)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>应用领域</h3>
            <div className="filter-options small">
              {Object.entries(boardApplicationLabels).map(([key, label]) => (
                <button
                  key={key}
                  className={`filter-option ${selectedApplication === key ? 'active' : ''}`}
                  onClick={() => setSelectedApplication(selectedApplication === key ? '' : key as CircuitBoardApplication)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>制造商</h3>
            <select 
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="filter-select"
            >
              <option value="">全部厂商</option>
              {boardManufacturers.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* 电路板列表 */}
        <main className="boards-main">
          {filteredBoards.length === 0 ? (
            <div className="empty-state">
              <p>没有找到匹配的电路板</p>
              <button onClick={clearFilters}>清除筛选条件</button>
            </div>
          ) : (
            <div className={`boards-grid ${viewMode}`}>
              {filteredBoards.map(board => (
                <div key={board.id} className="board-card">
                  <div className="card-header">
                    <span className="type-badge">
                      <Layers size={14} />
                      {getBoardTypeLabel(board.type)}
                    </span>
                    <span className={`stock-badge ${board.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {board.stock > 0 ? '有货' : '缺货'}
                    </span>
                  </div>
                  
                  <div className="card-body">
                    <h3 className="card-title">{board.name}</h3>
                    <p className="card-model">{board.model}</p>
                    <p className="card-description">{board.description}</p>
                    
                    <div className="card-specs">
                      <div className="spec-item">
                        <Ruler size={14} />
                        <span>{board.dimensions.length}×{board.dimensions.width}mm</span>
                      </div>
                      <div className="spec-item">
                        <Layers size={14} />
                        <span>{board.layers}层</span>
                      </div>
                      <div className="spec-item price">
                        <span>¥{board.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="card-application">
                      <span className="label">应用:</span>
                      <span className="value">{getBoardApplicationLabel(board.application)}</span>
                    </div>
                    
                    <div className="card-tags">
                      {board.tags.slice(0, 4).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <div className="footer-info">
                      <span className="manufacturer">{board.manufacturer}</span>
                      <span className="lead-time">交期: {board.leadTime}</span>
                    </div>
                    <span className="stock-count">库存: {board.stock.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CircuitBoards;
