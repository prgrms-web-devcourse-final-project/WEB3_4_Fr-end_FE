import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="text-3xl">
        <p className="font-thin">프리텐다드 thin</p>
        <p className="font-extralight">프리텐다드 extralight</p>
        <p className="font-light">프리텐다드 light</p>
        <p className="font-normal">프리텐다드 normal (default)</p>
        <p className="font-medium">프리텐다드 medium </p>
        <p className="font-semibold">프리텐다드 semibold</p>
        <p className="font-bold">프리텐다드 bold</p>
        <p className="font-extrabold">프리텐다드 extrabold</p>
        <p className="font-black">프리텐다드 black</p>
        <p className="font-paperlogy">페이퍼로지 Bold(페이퍼로지 default)</p>
        <div className="bg-customGray-100">customGray-100</div>
        <div className="bg-customGray-200">customGray-200</div>
        <div className="bg-customGray-300">customGray-300</div>
        <div className="bg-customGray-400">customGray-400</div>
        <div className="bg-customGray-500">customGray-500</div>
        <div className="bg-customGray-600">customGray-600</div>
        <div className="bg-customGray-700">customGray-700</div>
        <div className="bg-customBlack-100  text-white">customBlack-100</div>
        <div className="bg-customBlack-200 text-white">customBlack-200</div>
        <div className="bg-customBlack-300 text-white">customBlack-300</div>
        <div className="bg-customBlack-400 text-white">customBlack-400</div>
        <div className="bg-customPink-100 ">customPink-100 </div>
        <div className="bg-customPink-200"> customPink-200</div>
        <div className="bg-customPink-300">customPink-300 </div>
        <div className="bg-customBlue-100"> customBlue-100 </div>
        <div className="bg-customBlue-200"> customBlue-200 </div>
        <div className="bg-customGreen-100">customGreen-100 </div>
        <div className="bg-customGreen-200">customGreen-200 </div>
        <div className="bg-customViloet-100">customViloet-100 </div>
        <div className="bg-customViloet-200">customViloet-200 </div>
        <div className="bg-customYellow-100"> customYellow-100</div>
      </div>
      <Footer />
    </>
  );
}
