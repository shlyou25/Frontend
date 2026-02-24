"use client";
import QuickConectCard from "./cards/QuickConectCard";

const GetStarted = () => {
  return (
    <>
      <QuickConectCard
        title="List With Domz" description="Partner with us and showcase your portfolio."
        mainButton="Get Started"
        subButton={true}
      />
    </>

  );
}

export default GetStarted