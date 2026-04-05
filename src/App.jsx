import { useState, useEffect } from 'react';
import useStore from './store/useStore';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';
import { Menu } from 'lucide-react';
import './App.css';

function App() {
  const { activePage, theme } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync data-theme attribute with Zustand store
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const renderPage = () => {
    switch (activePage) {
      case 'transactions':
        return <TransactionsPage />;
      case 'insights':
        return <InsightsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <main className="main-content">
        <header className="topbar">
          <button
            className="topbar__menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </header>
        <div className="main-content__inner">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
