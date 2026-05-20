import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Components from './pages/Components';
import ComponentDetail from './pages/ComponentDetail';
import Stats from './pages/Stats';
import AdvancedSearch from './pages/AdvancedSearch';
import CircuitDiagrams from './pages/CircuitDiagrams';
import CircuitBoards from './pages/CircuitBoards';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/components" element={<Components />} />
              <Route path="/component/:id" element={<ComponentDetail />} />
              <Route path="/diagrams" element={<CircuitDiagrams />} />
              <Route path="/boards" element={<CircuitBoards />} />
              <Route path="/search" element={<AdvancedSearch />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
