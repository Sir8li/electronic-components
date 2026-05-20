import { Link } from 'react-router-dom';
import { 
  Zap, 
  Search, 
  Database, 
  ArrowRight,
  Cpu,
  Layers
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CircuitIcon from '../components/CircuitIcon';
import { categories, components, componentClasses, activeSubCategories } from '../data/components';
import { circuitDiagrams } from '../data/circuitDiagrams';
import { circuitBoards } from '../data/circuitBoards';
import { useLanguage } from '../LanguageContext';
import './Home.css';

const Home = () => {
  const { t } = useLanguage();
  const totalComponents = components.length;
  const totalCategories = categories.length + activeSubCategories.length;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={16} />
            <span>{t('home.subtitle')}</span>
          </div>
          <h1 className="hero-title">
            {t('home.title')}
          </h1>
          <p className="hero-subtitle">
            {t('home.subtitle')}
          </p>
          <div className="hero-search">
            <SearchBar size="large" />
          </div>
          <div className="hero-stats">
            <div className="stat">
              <Database size={20} />
              <span className="stat-value">{totalComponents}+</span>
              <span className="stat-label">{t('home.components')}</span>
            </div>
            <div className="stat">
              <Zap size={20} />
              <span className="stat-value">{circuitDiagrams.length}</span>
              <span className="stat-label">{t('home.diagrams')}</span>
            </div>
            <div className="stat">
              <Layers size={20} />
              <span className="stat-value">{circuitBoards.length}</span>
              <span className="stat-label">{t('home.boards')}</span>
            </div>
          </div>
        </div>

      </section>

      {/* Quick Access Section */}
      <section className="quick-access-section">
        <div className="section-header">
          <h2>{t('home.quickLinks')}</h2>
          <p>{t('home.subtitle')}</p>
        </div>
        <div className="quick-access-grid">
          <Link to="/components" className="quick-card components">
            <div className="quick-icon">
              <Cpu size={40} />
            </div>
            <h3>{t('nav.components')}</h3>
            <p>{totalComponents} {t('common.types')}</p>
            <span className="quick-arrow"><ArrowRight size={20} /></span>
          </Link>
          <Link to="/diagrams" className="quick-card diagrams">
            <div className="quick-icon">
              <Zap size={40} />
            </div>
            <h3>{t('nav.diagrams')}</h3>
            <p>{circuitDiagrams.length} {t('home.diagrams')}</p>
            <span className="quick-arrow"><ArrowRight size={20} /></span>
          </Link>
          <Link to="/boards" className="quick-card boards">
            <div className="quick-icon">
              <Layers size={40} />
            </div>
            <h3>{t('nav.boards')}</h3>
            <p>{circuitBoards.length} {t('home.boards')}</p>
            <span className="quick-arrow"><ArrowRight size={20} /></span>
          </Link>
        </div>
      </section>

      {/* Passive Components Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>{t('home.passiveComponents')}</h2>
          <p>{t('home.subtitle')}</p>
        </div>
        <div className="sub-categories-grid passive-grid">
          {componentClasses.find(c => c.key === 'passive')?.categories.map((category) => {
            const count = components.filter(c => c.category === category.key).length;
            return (
              <Link 
                key={category.key} 
                to={`/components?category=${category.key}`}
                className="sub-category-card passive-card"
              >
                <span className="sub-category-icon"><CircuitIcon type={category.key} size={36} /></span>
                <span className="sub-category-name">{t(`categories.${category.key}`)}</span>
                <span className="sub-category-desc">{category.description}</span>
                <span className="sub-category-count">{count} {t('common.types')}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Active Components Main Categories */}
      <section className="categories-section">
        <div className="section-header">
          <h2>{t('home.activeComponents')}</h2>
          <p>{t('home.subtitle')}</p>
        </div>
        <div className="sub-categories-grid active-grid">
          {componentClasses.find(c => c.key === 'active')?.categories.map((category) => {
            const count = components.filter(c => c.category === category.key).length;
            return (
              <Link 
                key={category.key} 
                to={`/components?category=${category.key}`}
                className="sub-category-card active-card"
              >
                <span className="sub-category-icon"><CircuitIcon type={category.key} size={36} /></span>
                <span className="sub-category-name">{t(`categories.${category.key}`)}</span>
                <span className="sub-category-desc">{category.description}</span>
                <span className="sub-category-count">{count} {t('common.types')}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Active Components Sub-Categories */}
      <section className="categories-section">
        <div className="section-header">
          <h2>{t('home.icCategories')}</h2>
          <p>{t('home.subtitle')}</p>
        </div>
        <div className="sub-categories-grid ic-grid">
          {activeSubCategories.map((subCat) => {
            const count = components.filter(c => c.category === subCat.key).length;
            return (
              <Link 
                key={subCat.key} 
                to={`/components?category=${subCat.key}`}
                className="sub-category-card ic-card"
              >
                <span className="sub-category-icon">{subCat.icon}</span>
                <span className="sub-category-name">{t(`categories.${subCat.key}`)}</span>
                <span className="sub-category-desc">{subCat.description}</span>
                <span className="sub-category-count">{count} {t('common.types')}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>{t('home.features')}</h2>
          <p>{t('home.subtitle')}</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Search size={28} />
            </div>
            <h3>{t('home.featureSearch')}</h3>
            <p>{t('home.featureSearchDesc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Database size={28} />
            </div>
            <h3>{t('home.featureParams')}</h3>
            <p>{t('home.featureParamsDesc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={28} />
            </div>
            <h3>{t('home.featureCircuits')}</h3>
            <p>{t('home.featureCircuitsDesc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Layers size={28} />
            </div>
            <h3>{t('home.featurePCB')}</h3>
            <p>{t('home.featurePCBDesc')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>{t('home.explore')}</h2>
          <p>{t('home.subtitle')}</p>
          <div className="cta-buttons">
            <Link to="/components" className="cta-btn primary">
              {t('home.browseComponents')}
              <ArrowRight size={18} />
            </Link>
            <Link to="/diagrams" className="cta-btn secondary">
              {t('home.viewDiagrams')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
