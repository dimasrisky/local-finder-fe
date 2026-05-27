import React from "react";

interface GradientPanelProps {
  children: React.ReactNode;
}

const GradientPanel = ({ children }: GradientPanelProps) => (
  <div
    className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #4f6ef7 0%, #7c5ce8 55%, #9b59d0 100%)",
    }}
  >
    {/* subtle dot-grid texture */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
    <div className="relative z-10 flex flex-col justify-between h-full">
      {children}
    </div>
  </div>
);

export default GradientPanel;
