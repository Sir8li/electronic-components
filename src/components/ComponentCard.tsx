import { Link } from 'react-router-dom';
import { Package, DollarSign, Box, ArrowRight, Truck, Star } from 'lucide-react';
import type { Component } from '../types';
import { getCategoryLabel, getCategoryIcon } from '../data/components';
import './ComponentCard.css';

interface ComponentCardProps {
  component: Component;
}

const ComponentCard = ({ component }: ComponentCardProps) => {
  const topSupplier = component.suppliers?.[0];

  return (
    <div className="component-card">
      <div className="card-header">
        <span className="card-category">
          <span className="category-icon">{getCategoryIcon(component.category)}</span>
          {getCategoryLabel(component.category)}
        </span>
        <span className={`stock-badge ${component.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {component.stock > 0 ? '有货' : '缺货'}
        </span>
      </div>
      
      <div className="card-body">
        <h3 className="card-title">{component.name}</h3>
        <p className="card-part-number">{component.partNumber}</p>
        <p className="card-description">{component.description}</p>
        
        <div className="card-specs">
          <div className="spec-item">
            <Package size={16} />
            <span>{component.package}</span>
          </div>
          <div className="spec-item">
            <DollarSign size={16} />
            <span>¥{component.price.toFixed(2)}</span>
          </div>
          <div className="spec-item">
            <Box size={16} />
            <span>{component.stock.toLocaleString()} 件</span>
          </div>
        </div>
        
        <div className="card-tags">
          {component.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      
      {/* 供应商信息 */}
      {topSupplier && (
        <div className="card-supplier">
          <div className="supplier-main">
            <span className="supplier-label">供应商</span>
            <span className="supplier-name">{topSupplier.name}</span>
          </div>
          <div className="supplier-meta">
            {topSupplier.rating && (
              <span className="supplier-rating">
                <Star size={12} />
                {topSupplier.rating}
              </span>
            )}
            {topSupplier.deliveryDays !== undefined && (
              <span className="supplier-delivery">
                <Truck size={12} />
                {topSupplier.deliveryDays}天
              </span>
            )}
            <span className="supplier-count">
              共{component.suppliers.length}家
            </span>
          </div>
        </div>
      )}

      <div className="card-footer">
        <span className="manufacturer">{component.manufacturer}</span>
        <Link to={`/component/${component.id}`} className="view-detail-btn">
          查看详情
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ComponentCard;
