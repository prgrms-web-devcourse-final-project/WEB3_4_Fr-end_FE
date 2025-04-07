"use client";

import dynamic from "next/dynamic";

// 클라이언트 전용으로 dynamic import 수행 (ssr: false 옵션 사용)
const PlanContainer = dynamic(() => import("@/components/plan/PlanContainer"), {
  ssr: false,
});

export default function PlanContainerClient() {
  return <PlanContainer />;
}
