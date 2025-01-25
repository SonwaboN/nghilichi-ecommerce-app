import React from 'react';

    interface ErrorBoundaryProps {
      children: React.ReactNode;
    }

    interface ErrorBoundaryState {
      hasError: boolean;
      error: Error | null;
    }

    class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
      constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
      }

      static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
      }

      componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
      }

      render() {
        if (this.state.hasError) {
          return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong.</h2>
              <p className="text-gray-600">
                An unexpected error occurred. Please try again later.
              </p>
              {this.state.error && (
                <details className="mt-4">
                  <summary className="text-gray-700 cursor-pointer">
                    Show error details
                  </summary>
                  <pre className="bg-gray-100 p-4 rounded-md mt-2 overflow-x-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          );
        }
        return this.props.children;
      }
    }

    export default ErrorBoundary;
