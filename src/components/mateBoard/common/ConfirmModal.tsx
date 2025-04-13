"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
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
    </div>
  );
}
