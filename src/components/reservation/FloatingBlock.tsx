export default function FloatingReservationBlock() {
  return (
    <section className="col-span-2">
      <div className="sticky top-10 bg-customGray-100 shadow-lg rounded-2xl p-8">
        <div className="text-3xl font-bold">
          플래닛으로 <br />
          숙소 예약하기
        </div>
        <div className="font-medium text-xl mt-5">체크인</div>
        <button
          onClick={() => {
            alert("예약버튼");
          }}
          className="mt-4 w-full bg-customBlue-100 text-white py-2 rounded-lg cursor-pointer"
        >
          예약하기
        </button>
      </div>
    </section>
  );
}
