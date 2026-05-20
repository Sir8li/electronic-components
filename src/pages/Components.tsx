import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, Grid, List } from 'lucide-react';
import ComponentCard from '../components/ComponentCard';
import SearchBar from '../components/SearchBar';
import { components, categories, manufacturers, packageTypes } from '../data/components';
import type { ComponentCategory, PackageType } from '../types';
import './Components.css';

const Components = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // 筛选状态
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | ''>(
    (searchParams.get('category') as ComponentCategory) || ''
  );
  const [selectedPackage, setSelectedPackage] = useState<PackageType | ''>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // 搜索查询
  const searchQuery = searchParams.get('search') || '';

  // 筛选后的元件列表
  const filteredComponents = useMemo(() => {
    let result = [...components];

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.partNumber.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.manufacturer.toLowerCase().includes(query) ||
        c.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // 分类过滤
    if (selectedCategory) {
      result = result.filter(c => c.category === selectedCategory);
    }

    // 封装过滤
    if (selectedPackage) {
      result = result.filter(c => c.package === selectedPackage);
    }

    // 制造商过滤
    if (selectedManufacturer) {
      result = result.filter(c => c.manufacturer === selectedManufacturer);
    }

    // 价格过滤
    result = result.filter(c => c.price >= priceRange[0] && c.price <= priceRange[1]);

    // 库存过滤
    if (inStockOnly) {
      result = result.filter(c => c.stock > 0);
    }

    // 排序
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'stock':
          comparison = a.stock - b.stock;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedPackage, selectedManufacturer, priceRange, inStockOnly, sortBy, sortOrder]);

  // 清除所有筛选
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedPackage('');
    setSelectedManufacturer('');
    setPriceRange([0, 100]);
    setInStockOnly(false);
    setSearchParams({});
  };

  // 活跃筛选数量
  const activeFilterCount = [
    selectedCategory,
    selectedPackage,
    selectedManufacturer,
    priceRange[0] > 0 || priceRange[1] < 100,
    inStockOnly
  ].filter(Boolean).length;

  return (
    <div className="components-page">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <h1>元件列表</h1>
          <p>共 {filteredComponents.length} 种元件</p>
        </div>
        <div className="header-search">
          <SearchBar 
            initialValue={searchQuery}
            onSearch={(query) => {
              if (query) {
                setSearchParams({ search: query });
              } else {
                setSearchParams({});
              }
            }}
          />
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
                const [by, order] = e.target.value.split('-') as ['name' | 'price' | 'stock', 'asc' | 'desc'];
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
            <h3>元件分类</h3>
            <div className="filter-options">
              {categories.map(cat => (
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
            <h3>封装类型</h3>
            <div className="filter-options small">
              {packageTypes.map(pkg => (
                <button
                  key={pkg}
                  className={`filter-option ${selectedPackage === pkg ? 'active' : ''}`}
                  onClick={() => setSelectedPackage(selectedPackage === pkg ? '' : pkg)}
                >
                  {pkg}
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
              {manufacturers.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h3>价格范围</h3>
            <div className="price-range">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                placeholder="最低"
                step="0.01"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                placeholder="最高"
                step="0.01"
              />
            </div>
          </div>

          <div className="filter-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span>仅显示有货</span>
            </label>
          </div>
        </aside>

        {/* 元件列表 */}
        <main className="components-main">
          {filteredComponents.length === 0 ? (
            <div className="empty-state">
              <p>没有找到匹配的元件</p>
              <button onClick={clearFilters}>清除筛选条件</button>
            </div>
          ) : (
            <div className={`components-grid ${viewMode}`}>
              {filteredComponents.map(component => (
                <ComponentCard key={component.id} component={component} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Components;
