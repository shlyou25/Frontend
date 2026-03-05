"use client";
// import Subscribe from "@/utils/subscribe";
import QuickConectCard from "./cards/QuickConectCard";

const GetStarted = () => {
  return (
    <>
      <QuickConectCard
        title="List with Domz" description="Partner with us and showcase your portfolio"
        mainButton="Get Started"
        subButton={true}
      />
    </>

  );
}

export default GetStarted