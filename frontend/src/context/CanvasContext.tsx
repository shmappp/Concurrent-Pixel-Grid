import React, { createContext, useContext, useState, type ReactNode } from "react";

interface CanvasContextType {
  user: string | null;
  setUser: (user: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedColor, setSelectedColor] = useState('#000000')

    return (
        <CanvasContext.Provider value={{ user, setUser, selectedColor, setSelectedColor }}>
            {children}
        </CanvasContext.Provider>
    )
}

export const useCanvasContext = (): CanvasContextType => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvasContext must be used within a CanvasProvider');
  }
  return context;
};