import React, { useEffect, useState } from "react";
import supabase from "../Utils/SupabaseClient";
import { withToken } from "../Utils/Functions";

export default function Nft() {
  const [data,setData] = useState();
 

  useEffect(()=>{
    getSession()
  },[])

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );

   getNftFinalData(session?.access_token)
    
  }

  async function getNftFinalData(token){
    try {
      // let res = await axios.post("/api/getNftFinalData",{token:token})
      let res = await withToken({token:token,query:'sendmint'})
      const response = res.data;
      console.log(response.data,"to get the final of Purchased Nft")
      setData(response.data)
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <section className="nft">
        <div className="container">
          <h2> NFT's </h2>
          <div className="nft-head">
            <div className="nfthead-left">
              <img src="img/filter.png" alt="" />
              <span>Filter & Sort</span>
            </div>
            <div className="nfthead-right">
              <form action="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control nft-input"
                    placeholder="Search by name"
                  />
                  <span
                    className="input-group-text nft-search"
                    id="basic-addon2"
                  >
                    <img src="img/search.png" alt="" />
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="nft-cards">
            {data?.map((item,idx)=>{
                  return(
                    <>
                     <div className="nftcard">
              <img src="img/Mask Group -1.png" alt="" />
              <div className="nftcard-lower">
                <p>Cool NFT #1234</p>
                <p className="price">Price</p>
                <span>
                  <img src="img/ethereum.png" alt="" />
                  {item.nftPrice} ETH
                </span>
              </div>
            </div>
                    </>
                  )
          
           
              })}
            <div className="nftcard">
              <img src="img/Mask Group -2.png" alt="" />
              <div className="nftcard-lower">
                <p>Cool NFT #1234</p>
                <p className="price">Price</p>
                <span>
                  <img src="img/ethereum.png" alt="" />
                  2.8349 ETH
                </span>
              </div>
            </div>
            <div className="nftcard">
              <img src="img/Mask Group -3.png" alt="" />
              <div className="nftcard-lower">
                <p>Cool NFT #1234</p>
                <p className="price">Price</p>
                <span>
                  <img src="img/ethereum.png" alt="" />
                  2.8349 ETH
                </span>
              </div>
            </div>
            <div className="nftcard">
              <img src="img/Mask Group 13.png" alt="" />
              <div className="nftcard-lower">
                <p>Cool NFT #1234</p>
                <p className="price">Price</p>
                <span>
                  <img src="img/ethereum.png" alt="" />
                  2.8349 ETH
                </span>
              </div>
            </div>
            <div className="nftcard">
              <img src="img/Mask Group -5.png" alt="" />
              <div className="nftcard-lower">
                <p>Cool NFT #1234</p>
                <p className="price">Price</p>
                <span>
                  <img src="img/ethereum.png" alt="" />
                  2.8349 ETH
                </span>
              </div>
            </div>
            <div className="nftcard">
              <img src="img/Mask Group -6.png" alt="" />
              <div className="nftcard-lower">
                <p>Cool NFT #1234</p>
                <p className="price">Price</p>
                <span>
                  <img src="img/ethereum.png" alt="" />
                  2.8349 ETH
                </span>
              </div>
            </div>
            <div className="nftcard">
              <img src="img/Mask Group -7.png" alt="" />
              <div className="nftcard-lower">
                <p>Cool NFT #1234</p>
                <p className="price">Price</p>
                <span>
                  <img src="img/ethereum.png" alt="" />
                  2.8349 ETH
                </span>
              </div>
            </div>
            <div className="nftcard">
              <img src="img/Mask Group 13.png" alt="" />
              <div className="nftcard-lower">
                <p>Cool NFT #1234</p>
                <p className="price">Price</p>
                <span>
                  <img src="img/ethereum.png" alt="" />
                  2.8349 ETH
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
