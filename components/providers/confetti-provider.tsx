"use client";

import { useConfettiStore } from "@/hooks/useConfettiStore";
import ReactConfetii from "react-confetti";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) {
    return null;
  }

  return (
    <ReactConfetii
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};
