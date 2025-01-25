import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import App from './App.tsx';
    import './index.css';
    import ErrorBoundary from './components/ErrorBoundary';

    try {
      createRoot(document.getElementById('root')!).render(
        <StrictMode>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </StrictMode>
      );
    } catch (error) {
      console.error('Error during rendering:', error);
    }
