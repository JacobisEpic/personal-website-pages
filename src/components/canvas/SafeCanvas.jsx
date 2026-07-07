import React from "react";
import { Canvas } from "@react-three/fiber";

let cachedWebGLAvailability;

export const isWebGLAvailable = () => {
  if (typeof cachedWebGLAvailability === "boolean") {
    return cachedWebGLAvailability;
  }

  if (typeof window === "undefined" || typeof document === "undefined") {
    cachedWebGLAvailability = false;
    return cachedWebGLAvailability;
  }

  if (!window.WebGLRenderingContext) {
    cachedWebGLAvailability = false;
    return cachedWebGLAvailability;
  }

  let context = null;

  try {
    const canvas = document.createElement("canvas");

    context =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    cachedWebGLAvailability = Boolean(context);
    return cachedWebGLAvailability;
  } catch {
    cachedWebGLAvailability = false;
    return cachedWebGLAvailability;
  } finally {
    const loseContext = context?.getExtension("WEBGL_lose_context");

    if (loseContext) {
      loseContext.loseContext();
    }
  }
};

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps) {
    if (this.state.hasError && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const SafeCanvas = ({ fallback = null, children, ...canvasProps }) => {
  const webglAvailable = React.useMemo(() => isWebGLAvailable(), []);

  if (!webglAvailable) {
    return fallback;
  }

  return (
    <CanvasErrorBoundary fallback={fallback} resetKey={webglAvailable}>
      <Canvas {...canvasProps}>{children}</Canvas>
    </CanvasErrorBoundary>
  );
};

export default SafeCanvas;
