export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0, // 소수점 제거
  }).format(price);
};
