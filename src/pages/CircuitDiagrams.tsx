import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, Grid, List, Eye, Download, Zap } from 'lucide-react';
import { 
  circuitDiagrams, 
  diagramCategories, 
  difficultyLabels,
  getDiagramCategoryLabel, 
  getDiagramCategoryIcon 
} from '../data/circuitDiagrams';
import type { CircuitDiagramCategory } from '../types';
import './CircuitDiagrams.css';

const CircuitDiagrams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // 筛选状态
  const [selectedCategory, setSelectedCategory] = useState<CircuitDiagramCategory | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | ''>('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState<'views' | 'downloads' | 'name'>('views');

  // 筛选后的电路图列表
  const filteredDiagrams = useMemo(() => {
    let result = [...circuitDiagrams];

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.application.toLowerCase().includes(query) ||
        d.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // 分类过滤
    if (selectedCategory) {
      result = result.filter(d => d.category === selectedCategory);
    }

    // 难度过滤
    if (selectedDifficulty) {
      result = result.filter(d => d.difficulty === selectedDifficulty);
    }

    // 排序
    result.sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.views - a.views;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  // 清除所有筛选
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFilterCount = [selectedCategory, selectedDifficulty, searchQuery].filter(Boolean).length;

  return (
    <div className="diagrams-page">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <h1><Zap size={28} /> 电路图库</h1>
          <p>共 {filteredDiagrams.length} 个电路图</p>
        </div>
        <div className="header-search">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索电路图名称、应用场景..."
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'views' | 'downloads' | 'name')}
            >
              <option value="views">浏览最多</option>
              <option value="downloads">下载最多</option>
              <option value="name">名称排序</option>
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
            <h3>电路类型</h3>
            <div className="filter-options">
              {diagramCategories.map(cat => (
                <button
                  key={cat.key}
                  className={`filter-option ${selectedCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(selectedCategory === cat.key ? '' : cat.key)}
                >
                  <span className="option-icon">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>难度等级</h3>
            <div className="filter-options small">
              {Object.entries(difficultyLabels).map(([key, value]) => (
                <button
                  key={key}
                  className={`filter-option ${selectedDifficulty === key ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(selectedDifficulty === key ? '' : key as any)}
                  style={{ '--accent-color': value.color } as React.CSSProperties}
                >
                  {value.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* 电路图列表 */}
        <main className="diagrams-main">
          {filteredDiagrams.length === 0 ? (
            <div className="empty-state">
              <p>没有找到匹配的电路图</p>
              <button onClick={clearFilters}>清除筛选条件</button>
            </div>
          ) : (
            <div className={`diagrams-grid ${viewMode}`}>
              {filteredDiagrams.map(diagram => (
                <div key={diagram.id} className="diagram-card">
                  <div className="card-header">
                    <span className="category-badge">
                      <span className="category-icon">{getDiagramCategoryIcon(diagram.category)}</span>
                      {getDiagramCategoryLabel(diagram.category)}
                    </span>
                    <span 
                      className="difficulty-badge"
                      style={{ background: difficultyLabels[diagram.difficulty].color }}
                    >
                      {difficultyLabels[diagram.difficulty].label}
                    </span>
                  </div>
                  
                  <div className="card-body">
                    <h3 className="card-title">{diagram.name}</h3>
                    <p className="card-description">{diagram.description}</p>
                    
                    <div className="card-info">
                      <div className="info-item">
                        <Zap size={14} />
                        <span>{diagram.voltage}</span>
                      </div>
                      {diagram.frequency && (
                        <div className="info-item">
                          <span className="info-label">频率:</span>
                          <span>{diagram.frequency}</span>
                        </div>
                      )}
                    </div>

                    <div className="card-application">
                      <span className="label">应用:</span>
                      <span className="value">{diagram.application}</span>
                    </div>
                    
                    <div className="card-tags">
                      {diagram.tags.slice(0, 4).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <div className="stats">
                      <span className="stat">
                        <Eye size={14} />
                        {diagram.views.toLocaleString()}
                      </span>
                      <span className="stat">
                        <Download size={14} />
                        {diagram.downloads.toLocaleString()}
                      </span>
                    </div>
                    <span className="author">{diagram.author}</span>
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

export default CircuitDiagrams;
