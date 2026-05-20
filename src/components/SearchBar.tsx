import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import './SearchBar.css';

interface SearchBarProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  size?: 'normal' | 'large';
}

const SearchBar = ({ 
  initialValue = '', 
  onSearch, 
  placeholder,
  size = 'normal'
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/components?search=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  // 使用传入的 placeholder 或默认翻译
  const searchPlaceholder = placeholder || t('components.searchPlaceholder');

  return (
    <form 
      className={`search-bar ${size === 'large' ? 'large' : ''}`} 
      onSubmit={handleSubmit}
    >
      <Search className="search-icon" size={size === 'large' ? 24 : 20} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={searchPlaceholder}
        className="search-input"
      />
      {query && (
        <button 
          type="button" 
          className="clear-btn" 
          onClick={handleClear}
        >
          <X size={18} />
        </button>
      )}
      <button type="submit" className="search-btn">
        {t('nav.search')}
      </button>
    </form>
  );
};

export default SearchBar;
