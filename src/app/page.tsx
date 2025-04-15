import MainAbout from "@/components/main/MainAbout";
import MainBanner from "@/components/main/MainBanner";
import MainLocation from "@/components/main/MainLocation";
import MainLodging from "@/components/main/MainLodging";
import MainSchedule from "@/components/main/MainSchedule";

export default function Home() {
  return (
    <>
    <MainBanner/>
   <MainLodging/>
   <MainLocation/>
   <MainSchedule/>
   <MainAbout/>
    </>
  );
}
