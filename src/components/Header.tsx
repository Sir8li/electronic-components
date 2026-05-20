import { Link, useLocation } from 'react-router-dom';
import { Cpu, Home, List, BarChart3, Zap, Layers } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { LanguageSwitcher } from '../LanguageSwitcher';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Cpu size={32} className="logo-icon" />
          <span className="logo-text">
            <span className="logo-title">{t('home.title')}</span>
            <span className="logo-subtitle">Components, Diagrams & Boards</span>
          </span>
        </Link>
        
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
          >
            <Home size={18} />
            <span>{t('nav.home')}</span>
          </Link>
          <Link 
            to="/components" 
            className={`nav-item ${isActive('/components') || isActive('/component/') ? 'active' : ''}`}
          >
            <List size={18} />
            <span>{t('nav.components')}</span>
          </Link>
          <Link 
            to="/diagrams" 
            className={`nav-item ${isActive('/diagrams') ? 'active' : ''}`}
          >
            <Zap size={18} />
            <span>{t('nav.diagrams')}</span>
          </Link>
          <Link 
            to="/boards" 
            className={`nav-item ${isActive('/boards') ? 'active' : ''}`}
          >
            <Layers size={18} />
            <span>{t('nav.boards')}</span>
          </Link>
          <Link 
            to="/stats" 
            className={`nav-item ${isActive('/stats') ? 'active' : ''}`}
          >
            <BarChart3 size={18} />
            <span>{t('nav.stats')}</span>
          </Link>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
