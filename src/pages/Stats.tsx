import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3, Package } from 'lucide-react';
import { components, categories, manufacturers } from '../data/components';
import './Stats.css';

const COLORS = [
  '#00d4ff', '#0099cc', '#00b8d4', '#00e5ff', 
  '#1de9b6', '#00c853', '#64ffda', '#69f0ae',
  '#76ff03', '#c6ff00', '#eeff41', '#f4ff81'
];

const Stats = () => {
  // 按分类统计元件数量
  const categoryData = categories.map(cat => ({
    name: cat.label,
    value: components.filter(c => c.category === cat.key).length,
    icon: cat.icon
  }));

  // 按制造商统计
  const manufacturerData = manufacturers.slice(0, 10).map(m => ({
    name: m,
    value: components.filter(c => c.manufacturer === m).length
  }));

  // 按封装类型统计
  const packageData = [
    { name: 'SMD', value: components.filter(c => c.package === 'SMD').length },
    { name: 'DIP', value: components.filter(c => c.package === 'DIP').length },
    { name: 'QFP', value: components.filter(c => c.package === 'QFP').length },
    { name: 'TO-220', value: components.filter(c => c.package === 'TO-220').length },
    { name: '0805', value: components.filter(c => c.package === '0805').length },
    { name: '0603', value: components.filter(c => c.package === '0603').length },
  ].filter(d => d.value > 0);

  // 库存分布
  const stockDistribution = [
    { name: '高库存(>10k)', value: components.filter(c => c.stock > 10000).length, color: '#00c853' },
    { name: '中库存(1k-10k)', value: components.filter(c => c.stock >= 1000 && c.stock <= 10000).length, color: '#00d4ff' },
    { name: '低库存(<1k)', value: components.filter(c => c.stock < 1000).length, color: '#ff9800' },
  ];

  // 价格分布
  const priceRanges = [
    { range: '¥0-0.5', count: components.filter(c => c.price <= 0.5).length },
    { range: '¥0.5-1', count: components.filter(c => c.price > 0.5 && c.price <= 1).length },
    { range: '¥1-2', count: components.filter(c => c.price > 1 && c.price <= 2).length },
    { range: '¥2-5', count: components.filter(c => c.price > 2 && c.price <= 5).length },
    { range: '>¥5', count: components.filter(c => c.price > 5).length },
  ];

  // 总体统计
  const totalComponents = components.length;
  const totalStock = components.reduce((sum, c) => sum + c.stock, 0);
  const avgPrice = components.reduce((sum, c) => sum + c.price, 0) / totalComponents;
  const inStockCount = components.filter(c => c.stock > 0).length;

  return (
    <div className="stats-page">
      <div className="stats-header">
        <h1>数据统计</h1>
        <p>电子元器件、电路图、电路板库数据分析与可视化</p>
      </div>

      {/* 概览卡片 */}
      <div className="overview-cards">
        <div className="overview-card">
          <div className="card-icon blue">
            <Package size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{totalComponents}</span>
            <span className="card-label">元件总数</span>
          </div>
        </div>
        <div className="overview-card">
          <div className="card-icon green">
            <TrendingUp size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{(totalStock / 1000).toFixed(0)}K</span>
            <span className="card-label">总库存量</span>
          </div>
        </div>
        <div className="overview-card">
          <div className="card-icon cyan">
            <BarChart3 size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">¥{avgPrice.toFixed(2)}</span>
            <span className="card-label">平均单价</span>
          </div>
        </div>
        <div className="overview-card">
          <div className="card-icon orange">
            <PieChartIcon size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{manufacturers.length}</span>
            <span className="card-label">制造商数</span>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="charts-grid">
        {/* 分类分布饼图 */}
        <div className="chart-card">
          <h3>
            <PieChartIcon size={20} />
            元件分类分布
          </h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#1e1e30', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 制造商分布柱状图 */}
        <div className="chart-card">
          <h3>
            <BarChart3 size={20} />
            制造商元件数量
          </h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={manufacturerData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#888" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#888" 
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1e1e30', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#00d4ff" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 封装类型分布 */}
        <div className="chart-card">
          <h3>
            <Package size={20} />
            封装类型分布
          </h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={packageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1e1e30', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#1de9b6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 价格分布 */}
        <div className="chart-card">
          <h3>
            <TrendingUp size={20} />
            价格区间分布
          </h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceRanges}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="range" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1e1e30', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#00d4ff" 
                  strokeWidth={3}
                  dot={{ fill: '#00d4ff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 库存状态 */}
      <div className="stock-status-section">
        <h2>库存状态分布</h2>
        <div className="stock-bars">
          {stockDistribution.map((item, index) => (
            <div key={index} className="stock-bar-item">
              <div className="stock-bar-header">
                <span className="stock-name">{item.name}</span>
                <span className="stock-count">{item.value} 种</span>
              </div>
              <div className="stock-bar-track">
                <div 
                  className="stock-bar-fill" 
                  style={{ 
                    width: `${(item.value / totalComponents) * 100}%`,
                    background: item.color 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 分类详情表格 */}
      <div className="category-table-section">
        <h2>分类详情</h2>
        <div className="category-table">
          <div className="table-header">
            <span>分类</span>
            <span>元件数</span>
            <span>占比</span>
            <span>总库存</span>
            <span>平均价格</span>
          </div>
          {categories.map((cat, index) => {
            const catComponents = components.filter(c => c.category === cat.key);
            const catStock = catComponents.reduce((sum, c) => sum + c.stock, 0);
            const catAvgPrice = catComponents.length > 0 
              ? catComponents.reduce((sum, c) => sum + c.price, 0) / catComponents.length 
              : 0;
            
            return (
              <div key={index} className="table-row">
                <span className="cat-name">
                  <span className="cat-icon">{cat.icon}</span>
                  {cat.label}
                </span>
                <span>{catComponents.length}</span>
                <span>{((catComponents.length / totalComponents) * 100).toFixed(1)}%</span>
                <span>{catStock.toLocaleString()}</span>
                <span>¥{catAvgPrice.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stats;
