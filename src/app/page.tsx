import Image from "next/image";
import Header from "./components/header";
import HeroMain from "./components/hero/heroMain";
import FeaturedMain from "./components/featured/featuredMain";
import TrendingMain from "./components/trending/trendingMain";
import SpecialMain from "./components/special/specialMain";
import TopProducts from "./components/topProducts/TopProducts";
import BrandsMain from "./components/brands/BrandsMain";

export default function Home() {
  return (
    <div className="">
      {/* <Header></Header> */}
      <HeroMain></HeroMain>
      <FeaturedMain></FeaturedMain>
      <TrendingMain></TrendingMain>
      <SpecialMain></SpecialMain>
      <TopProducts></TopProducts>
      <BrandsMain></BrandsMain>
      {/* <div className="h-500"></div> */}
    </div>
  );
}
