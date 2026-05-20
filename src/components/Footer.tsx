import { Cpu, Globe, Mail, BookOpen } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-brand">
            <Cpu size={24} className="footer-icon" />
            <span>电子元器件、电路图、电路板库</span>
          </div>
          <p className="footer-desc">
            提供全面的电子元件参数查询服务，助力电子工程师快速选型
          </p>
        </div>
        
        <div className="footer-section">
          <h4>快速链接</h4>
          <ul>
            <li><a href="/components">元件列表</a></li>
            <li><a href="/search">高级搜索</a></li>
            <li><a href="/stats">数据统计</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>元件分类</h4>
          <ul>
            <li><a href="/components?category=resistor">电阻</a></li>
            <li><a href="/components?category=capacitor">电容</a></li>
            <li><a href="/components?category=ic">集成电路</a></li>
            <li><a href="/components?category=transistor">晶体管</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>联系我们</h4>
          <div className="footer-links">
            <a href="#" className="footer-link">
              <Globe size={18} />
              <span>GitHub</span>
            </a>
            <a href="#" className="footer-link">
              <Mail size={18} />
              <span>邮箱</span>
            </a>
            <a href="#" className="footer-link">
              <BookOpen size={18} />
              <span>文档</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 电子元器件、电路图、电路板库. 保留所有权利.</p>
      </div>
    </footer>
  );
};

export default Footer;
