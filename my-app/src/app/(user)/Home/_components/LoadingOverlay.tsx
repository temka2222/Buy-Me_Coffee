"use client";
import { Loader } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <Loader className="animate-spin w-20 h-20 text-gray-500" />
    </div>
  );
}