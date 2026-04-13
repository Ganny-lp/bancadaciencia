import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Carregando...",
  size = "medium",
  fullScreen = false,
}) => {
  const sizeClasses = {
    small: "w-8 h-8 border-2",
    medium: "w-12 h-12 border-4",
    large: "w-16 h-16 border-4",
  };

  const textSizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-blue-600/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    : "flex flex-col items-center justify-center p-8";

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div
        className={`${sizeClasses[size]} border-blue-200 border-t-blue-600 rounded-full animate-spin`}
        aria-hidden="true"
      ></div>
      {message && (
        <p
          className={`mt-4 text-white/90 ${textSizeClasses[size]} font-medium`}
        >
          {message}
        </p>
      )}
      <span className="sr-only">{message}</span>
    </div>
  );
};

// Componente para skeleton loading
export const SkeletonLoader: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`animate-pulse bg-white/10 rounded ${className}`}
    aria-hidden="true"
  />
);

// Componente para loading inline
export const InlineLoader: React.FC = () => (
  <span className="inline-flex items-center gap-2" role="status">
    <span
      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
      aria-hidden="true"
    ></span>
    <span className="sr-only">Carregando...</span>
  </span>
);
