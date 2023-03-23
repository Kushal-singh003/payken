import React, { useEffect, useState, useRef } from "react";
import supabase from "../Utils/SupabaseClient";
import { withToken } from "../Utils/Functions";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';

let list3 = [];

export default function Nft() {
  const [data, setData] = useState([]);
  const [lengthOfData, setLengthOfData] = useState(null);
  const dataFetchedRef = useRef(false);
  // const [searchText,setSearchText] = useState();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [order,setOrder] = useState('DSC')


  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setOpen(true)
    getSession()
  }, [])

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

  async function getNftFinalData(token) {
    try {
      // let res = await axios.post("/api/getNftFinalData",{token:token})
      let res = await withToken({ token: token, query: 'getnftofuser' })
      const response = res?.data?.result;
      console.log(response, "to get the final of Purchased Nft")

      if(!response?.Error){

        setLengthOfData(response?.length)

        for (let i = 0; i < response?.length; i++) {

          const id = response[i].tokenId;
          const uri = response[i].uri;
          const d = uri?.split("$");

          const response2 = await axios.post("/api/nftData", {


            data: { id: id, uri: d[0] },
          });
          console.log(response2?.data?.data,'resjjj')
          let newValue = response2?.data?.data;
          newValue.amount = response[i].amount;
          newValue.id = response[i].id;

          setData(oldArray => [...oldArray,newValue] )

        // })
        }
       
      }
      
      setOpen(false)
    } catch (err) {
      console.log(err)
      setOpen(false)
    }
  }

  console.log(data,'data')
  console.log(list3,'list3')
 
  // Filters

  async function searchFilterFn(e){
    e.preventDefault();
  
    const searchText = e.target.value;
    if(searchText == null || searchText?.length == 0){
      setData([])
      setOpen(true)
      getSession();
      return;
    }
    console.log(searchText,'searchtext')

    const filteredData = data?.filter((item)=>{
      const name = item.name;
    
     return(name?.toLowerCase()?.includes(searchText?.toLowerCase()))

    })

    console.log(filteredData,'fitleredData searchFilterfn')
    setData(filteredData);
    setLengthOfData(filteredData?.length)
  }

async function sortFn(){
  if (order === "ASC") {
    const sorted = data?.sort((a, b) =>
      a?.name?.toLowerCase() > b?.name?.toLowerCase() ? 1 : -1
    );
    setData(sorted);
    console.log(sorted,'sorted ASC')
    setOrder("DSC");
  }
  if (order === "DSC") {
    const sorted = [...data].sort((a, b) =>
      a?.name?.toLowerCase() < b?.name?.toLowerCase() ? 1 : -1
    );
    setData(sorted);
    console.log(sorted,'sorted DSC')
    setOrder("ASC");
  }

};

async function sortASCFn(e){
  e.preventDefault()
  setOrder('DSC')
  sortFn()

}

async function sortDSCFn(e){
  e.preventDefault()
  setOrder('ASC')
  sortFn()

}

function nextFn({e,id}){
  e.preventDefault();

  router.push('/nft/nftDetails/'+id)
}



  return (
    <div>
      <Backdrop
        sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className="nft">
        <div className="container">
          <h2> NFT's </h2>
          <div className="nft-head">
            <div className="nfthead-left">
              {/* <img onClick={sortFn} src="img/filter.png" alt="" /> */}
              <span>
              <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      <span><img  src="img/filter.png" alt="" />  Filter & Sort</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={(e)=> sortASCFn(e)}><img src="/img/sort-az.png" className="sort-img" /> <span className="sort-span">a to z</span></Dropdown.Item>
        <Dropdown.Item onClick={(e)=> sortDSCFn(e)}><img src="/img/sort-za.png" className="sort-img" /> <span className="sort-span">z to a</span> </Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
    </span>
            </div>
            <div className="nfthead-right">
              <form onSubmit={searchFilterFn}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control nft-input"
                    placeholder="Search by name"
                    onChange={(e)=>searchFilterFn(e)}
                  />
                  
                  <span
                    className="input-group-text nft-search"
                    id="basic-addon2"
                  >
                    <img type="submit" src="img/search.png" alt="" />
                  </span>
                </div>
              </form>
            </div>
          </div>

         
          <div className="nft-cards">
            {data?.map((item, idx) => {
              return (
                <>
                  <div className="nftcard">
                    <img onClick={(e)=>nextFn({e,id:item.id})} className="nftCardImg" src={item.image || "img/Mask Group -1.png"} alt="" />
                    <div className="nftcard-lower">
                      <p>{item.name}</p>
                      <p className="price">Price</p>
                      <span>
                        {/* <img src="img/ethereum.png" alt="" /> */}
                        {item?.amount } MATIC
                      </span>
                    </div>
                  </div>
                </>
              )


            })}

            
			  {lengthOfData == 0 ? <div className="not-found">
				<span>Not found</span>
			  </div>
			  : null}

			  {lengthOfData == null ? <div className="loading-div">
				<span></span>
			  </div>:null}

            {/* <div className="nftcard">
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
            </div> */}
          </div>
        </div>
      </section>

    </div>
  );
}
