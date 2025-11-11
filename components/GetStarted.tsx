"use client";
import QuickConectCard from "./cards/QuickConectCard";

const GetStarted = () => {
  return (
    <>
      <QuickConectCard
        title="Ready to list?" description="Choose the plan that fits you best — flexible, seller-first pricing."
        mainButton="Get Started"
        subButton={true}
      />
    </>

  );
}

export default GetStarted