import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#1A0A2E' }}>
      <div
        className="relative w-full max-w-[390px] overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: '2px solid #F0E8FF',
          borderRadius: 36,
          minHeight: 680,
          maxHeight: 780,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;
