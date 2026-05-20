import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { categories, manufacturers, packageTypes, components } from '../data/components';
import './AdvancedSearch.css';

const AdvancedSearch = () => {
  const navigate = useNavigate();
  
  const [keyword, setKeyword] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [stockMin, setStockMin] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (keyword) params.set('search', keyword);
    if (selectedCategories.length === 1) params.set('category', selectedCategories[0]);
    if (selectedPackages.length === 1) params.set('package', selectedPackages[0]);
    if (selectedManufacturers.length === 1) params.set('manufacturer', selectedManufacturers[0]);
    
    navigate(`/components?${params.toString()}`);
  };

  const handleReset = () => {
    setKeyword('');
    setSelectedCategories([]);
    setSelectedPackages([]);
    setSelectedManufacturers([]);
    setPriceMin('');
    setPriceMax('');
    setStockMin('');
  };

  const toggleSelection = (
    value: string, 
    selected: string[], 
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className="advanced-search-page">
      <div className="search-header">
        <h1>高级搜索</h1>
        <p>使用多条件组合搜索，精确定位目标元件</p>
      </div>

      <div className="search-form">
        {/* 关键词搜索 */}
        <div className="form-section">
          <h3>
            <Search size={20} />
            关键词搜索
          </h3>
          <div className="keyword-input">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="输入元件名称、型号、描述等关键词..."
            />
          </div>
        </div>

        {/* 分类选择 */}
        <div className="form-section">
          <h3>
            <Filter size={20} />
            元件分类
          </h3>
          <div className="checkbox-grid">
            {categories.map(cat => (
              <label 
                key={cat.key} 
                className={`checkbox-card ${selectedCategories.includes(cat.key) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.key)}
                  onChange={() => toggleSelection(cat.key, selectedCategories, setSelectedCategories)}
                />
                <span className="checkbox-icon">{cat.icon}</span>
                <span className="checkbox-label">{cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 封装类型 */}
        <div className="form-section">
          <h3>封装类型</h3>
          <div className="checkbox-grid small">
            {packageTypes.map(pkg => (
              <label 
                key={pkg} 
                className={`checkbox-card ${selectedPackages.includes(pkg) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedPackages.includes(pkg)}
                  onChange={() => toggleSelection(pkg, selectedPackages, setSelectedPackages)}
                />
                <span className="checkbox-label">{pkg}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 制造商 */}
        <div className="form-section">
          <h3>制造商</h3>
          <div className="checkbox-grid small">
            {manufacturers.map(m => (
              <label 
                key={m} 
                className={`checkbox-card ${selectedManufacturers.includes(m) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedManufacturers.includes(m)}
                  onChange={() => toggleSelection(m, selectedManufacturers, setSelectedManufacturers)}
                />
                <span className="checkbox-label">{m}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 价格范围 */}
        <div className="form-section">
          <h3>价格范围</h3>
          <div className="range-input">
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="最低价格"
              step="0.01"
            />
            <span className="range-separator">—</span>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="最高价格"
              step="0.01"
            />
          </div>
        </div>

        {/* 库存数量 */}
        <div className="form-section">
          <h3>最低库存</h3>
          <div className="range-input single">
            <input
              type="number"
              value={stockMin}
              onChange={(e) => setStockMin(e.target.value)}
              placeholder="输入最低库存数量"
            />
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="form-actions">
          <button className="reset-btn" onClick={handleReset}>
            <X size={18} />
            重置条件
          </button>
          <button className="search-btn" onClick={handleSearch}>
            <Search size={18} />
            开始搜索
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
