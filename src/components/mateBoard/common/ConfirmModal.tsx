"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  position?: { x: number; y: number };
}

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
  position,
}: ConfirmModalProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleConfirm = () => {
    if (!isClicked) {
      setIsClicked(true);
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (!isClicked) {
      setIsClicked(true);
      onCancel();
    }
  };

  const modalStyle = position && {
    position: "fixed" as const,
    top: position.y,
    left: position.x,
    transform: "translate(-50%, -50%)",
    zIndex: 50,
  };

  return createPortal(
    <div className="bg-opacity-50" style={modalStyle}>
      <div className="bg-white rounded-lg p-6 w-80">
        <p className="mb-4 text-center text-sm text-gray-700">{message}</p>
        <div className="flex justify-between">
          <Button
            onClick={handleConfirm}
            className="w-1/2 mr-2"
            disabled={isClicked}
          >
            예
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-1/2"
            disabled={isClicked}
          >
            아니요
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
