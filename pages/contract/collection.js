import Collection from "@/components/Contract/Collection";
import BottomNav from "@/components/ui/BottomNav";
import Footer from "@/components/ui/Footer";
import MobileLogo from "@/components/ui/MobileLogo";
import NavBar from "@/components/ui/NavBar";
import React from "react";

export default function collections() {
  return (
    <div>
      <NavBar />
      <MobileLogo/>
      <Collection />
      <BottomNav/>
      <Footer />
    </div>
  );
}
