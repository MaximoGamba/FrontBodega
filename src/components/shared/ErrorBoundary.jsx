import { Component } from "react";

class ErrorBoundary extends Component {
  state = { tieneError: false };

  static getDerivedStateFromError() {
    return { tieneError: true };
  }

  render() {
    if (!this.state.tieneError) return this.props.children;

    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "28px", marginBottom: "12px" }}>
          Algo salió mal
        </p>
        <p style={{ color: "var(--gray)", marginBottom: "32px", fontSize: "14px" }}>
          {this.props.mensaje || "Esta sección no está disponible en este momento."}
        </p>
        <button
          onClick={() => this.setState({ tieneError: false })}
          style={{ background: "var(--primary)", color: "white", border: "none", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
        >
          Reintentar
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
