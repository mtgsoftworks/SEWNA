import React, { useState, useEffect } from 'react';
import WelcomePage from './components/WelcomePage';
import CustomRequestPage from './components/CustomRequestPage';
import DesignerPortfolioUpload from './components/DesignerPortfolioUpload';
import DesignerDiscoveryPage from './components/DesignerDiscoveryPage';
import Header from './components/Header';

type View = 'welcome' | 'customRequest' | 'designerPortfolio' | 'designerDiscovery';

const App: React.FC = () => {
  const [view, setView] = useState<View>('welcome');

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && view !== 'welcome') {
        setView('welcome');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [view]);

  // Update page title based on current view
  useEffect(() => {
    const titles = {
      welcome: 'SEWNA - Your Vision, Tailored',
      customRequest: 'Create Custom Request - SEWNA',
      designerPortfolio: 'Designer Portfolio - SEWNA',
      designerDiscovery: 'Discover Designers - SEWNA'
    };
    
    document.title = titles[view];
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case 'customRequest':
        return <CustomRequestPage onBack={() => setView('welcome')} />;
      case 'designerPortfolio':
        return <DesignerPortfolioUpload onBack={() => setView('welcome')} />;
      case 'designerDiscovery':
        return <DesignerDiscoveryPage onBack={() => setView('welcome')} />;
      case 'welcome':
      default:
        return (
          <WelcomePage
            onSelectNeedDesigner={() => setView('customRequest')}
            onSelectAmDesigner={() => setView('designerPortfolio')}
            onSelectDiscoverDesigners={() => setView('designerDiscovery')}
          />
        );
    }
  };

  return (
    <div className="bg-white min-h-screen text-black antialiased">
      <Header onLogoClick={() => setView('welcome')} />
      <main className="pt-16" id="main-content">
        {renderContent()}
      </main>
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-200">
        <p>&copy; {new Date().getFullYear()} SEWNA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;