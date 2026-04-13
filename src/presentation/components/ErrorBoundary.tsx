import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md text-center border border-white/20">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Ops! Algo deu errado
              </h2>
              <p className="text-white/80 mb-6">
                Pedimos desculpas pelo inconveniente. Ocorreu um erro
                inesperado.
              </p>
              {import.meta.env.DEV && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="text-white/60 text-sm cursor-pointer hover:text-white/80 mb-2">
                    Detalhes técnicos
                  </summary>
                  <pre className="bg-black/30 p-3 rounded text-xs text-red-300 overflow-auto max-h-40">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="bg-white/20 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/30 transition"
                >
                  Tentar Novamente
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
                >
                  Recarregar Página
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
