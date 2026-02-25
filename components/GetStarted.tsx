"use client";
// import Subscribe from "@/utils/subscribe";
import QuickConectCard from "./cards/QuickConectCard";

const GetStarted = () => {
  return (
    <>
      <QuickConectCard
        title="List with Domz" description="Choose the plan that fits you best — flexible, seller-first pricing."
        mainButton="Get Started"
        subButton={true}
      />
       {/* <Subscribe  buttonText="Get Started" heading="List With Domz" text="Partner with us and showcase your portfolio."/> */}
    </>

  );
}

export default GetStarted