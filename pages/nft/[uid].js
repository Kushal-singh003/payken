import React from "react";
import NFTDashboard from "../../Component/NFT/NFTDashboard";
import axios from "axios";

const nftDashboard = ({ id }) => {
  console.log(id);
  return (
    <div>
      <NFTDashboard userId={id} />
    </div>
  );
};

export default nftDashboard;

export async function getServerSideProps(context) {
  console.log("first");
  let { params } = await context;
  let id = await params.uid;
  console.log(id);

  // const response = await axios.post("http://52.9.60.249:4000/api/v1/auth/getnftbyid",id)
  // console.log(response,'rsfkdfkjd')

  // let res = await axios.post ("/api/getFinalDataById", {userId:userId})
  // const response = res.data.data;
  // // setData(response)
  // console.log(response, "to get the response from api to get data by Id")
  // console.log(id,"DataFrom");
  return {
    props: {
      id,
    },
  };
}
