import Step5 from "@/components/Payment/Modal/step5";
import BottomNav from "@/components/ui/BottomNav";
import Footer from "@/components/ui/Footer";
import MobileLogo from "@/components/ui/MobileLogo";
import NavBar from "@/components/ui/NavBar";
import React from "react";

export default function step4() {
  return (
    <div>
      <NavBar/>
      <MobileLogo/>
      <Step5 />
      <BottomNav/>
    </div>
  );
}
