import type { ReactNode } from "react";
import React from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              padding: "20px",
              backgroundColor: "#f5f5f5",
              overflowY: "auto",
              zIndex: 9999,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            <div
              style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "30px",
                backgroundColor: "white",
                border: "3px solid #ff4444",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <h1
                style={{
                  color: "#cc0000",
                  margin: "0 0 20px 0",
                  fontSize: "24px",
                }}
              >
                ⚠️ Une erreur s'est produite
              </h1>

              <div
                style={{
                  backgroundColor: "#fff7f7",
                  padding: "15px",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  border: "1px solid #ffcccc",
                }}
              >
                <p style={{ margin: 0, color: "#333", fontSize: "14px" }}>
                  <strong>Erreur:</strong>
                </p>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    color: "#cc0000",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    wordBreak: "break-word",
                  }}
                >
                  {this.state.error?.message || "Erreur inconnue"}
                </p>
              </div>

              {this.state.error?.stack && (
                <details
                  style={{
                    marginBottom: "20px",
                    fontSize: "13px",
                  }}
                >
                  <summary
                    style={{
                      cursor: "pointer",
                      color: "#666",
                      marginBottom: "10px",
                    }}
                  >
                    Stack trace
                  </summary>
                  <pre
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "12px",
                      borderRadius: "4px",
                      overflow: "auto",
                      color: "#666",
                      margin: 0,
                      fontSize: "12px",
                    }}
                  >
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <button
                onClick={this.resetError}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#cc0000",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Réessayer
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
