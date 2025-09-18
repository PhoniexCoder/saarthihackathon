"use client";
import { useMobile } from "@/hooks/use-mobile";
import CustomCursor from "./custom-cursor";

export default function CursorWrapper() {
  const isMobile = useMobile();
  if (isMobile) return null;
  return <CustomCursor />;
}