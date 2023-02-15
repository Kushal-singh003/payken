import React from "react";
import axios from "axios";
import BuyNft from "@/components/Nft/BuyNft/Index";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

const nftDashboard = ({ id }) => {
  console.log(id);
  return (
    <div>
      <NavBar/>
      <BuyNft userId={id} />
      <Footer/>
    </div>
  );
};

export default nftDashboard;

export async function getServerSideProps(context) {
  let { params } = await context;
  let id = await params.id;
  console.log(id);
  return {
    props: {
      id,
    },
  };
}
