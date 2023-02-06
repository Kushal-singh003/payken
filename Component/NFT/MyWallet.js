import React from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import SideBar from "../SideBar";
import supabase from "../../utils/SupabaseClient";
import Web3 from 'web3';
import {useEffect,useState} from 'react'

function MyWallet() {
    const [address,setAddress]=useState();
    const [balance,setBalance]=useState();
    const[isCopied,setIsCopied]=useState(false);

    async  function getAddress(){
        try{
         const token=localStorage.getItem("token")
         console.log(token,"gggggggggggggggggg")
            const res= await axios.post("/api/userProfile",{token:token});
            const response=res.data;
            const address=response.data.data[0].address
            // setProfile(response.data.data[0])
            setAddress(response.data.data[0].address)
            getBalence(address)
             console.log(response.data.data[0],"data from api")
        }catch(err){
            console.log(err)
        }
       
     }
     
   
     useEffect(()=>{
      
       getAddress()
   
     },[])
   async function getBalence(address){
    console.log(address,"hhhhhhhhhhh")
    var   web3=new Web3("https://rpc-mumbai.maticvigil.com/v1/cb75b7548c2e412612d0d7658c884a4b2df438d4");
    const wei=  await web3.eth.getBalance(`${address}`)
    var balance = web3.utils.fromWei(wei, 'ether');
    console.log(balance)
    setBalance(balance);
   }

  
  
  return (
    <div>
    <SideBar />
    <div id="home-inner-profile" className="profile-sects pt-0">
      <div className="dark-overlay">
        <div className="container-fluid" >
          <div className="row">
            <ToastContainer />
            <div className="col" id="card-head">
              <div className="card text-center text-light card-form">
                <div className="card-body ">
                  <h3>My Wallet</h3>
                  <div className='float-start mt-3' style={{display:"block"}}>
                    
                    {/* <div className="form-group form mb-2  ">
                      <div className='float-start'>Wallet Address:</div>
                      <div> hhhhhxxxxxxxxxxxxxxxxxxxxxxxxhhhhh</div>

                    </div >
                    <div className="form-group form mb-2  ">
        
                     <div className='float-start'> Wallet Balance:</div>
                     <div> hhhh</div>
                    </div>
                    <div className="form-group form mb-2 ">
            
                      <div className='float-start'>Wallet NFT:</div>
                      <div> hhh</div>
                    </div> */}
                    <div className='mt-2'>
                        <span style={{fontSize:"17px" ,marginTop:"5px",textAlign:"left",marginBottom:"1px !important"}}>Wallet Address:{" "}</span>
                        <span style={{textAlign:"left",fontSize:"15px",marginRight:"5px",fontStyle:"italic"}}>{address?.replace(address?.slice(5,-5),"********")}</span>
                        {!isCopied?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="css-p5ejok" width='20PX'style={{marginLeft:"5px"}}  onClick={() =>  navigator.clipboard.writeText(`${address}`,setIsCopied(true))}>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z" fill="currentColor"></path></svg>:<span style={{color:'#269fe0',fontSize:"14px"}} >copied! <p style={{display:"none"}}>{setTimeout(() => {
                        setIsCopied(false)
                        
                      }, 2000)}</p></span> }
                        
                    </div >
                    <div className='mt-3'>
                        <p style={{fontSize:"17px ",marginTop:"5px",textAlign:"left",marginBottom:"1px !important"}}>Wallet Balance:  {balance}</p>
                    </div>
                    <div  className='mt-3' style={{marginLeft:"0px"}}>
                        <p style={{fontSize:"17px",marginTop:"5px" ,textAlign:"left"}}>Wallet NFT:</p>
                    </div>
                    </div>
                   
                   
                   

                    
                    <div className="google-btn mt-2" >
                    <Button
                      variant="secondary"
                      className="form-group w-100 btn-outline-light"
                     id="create-btns"
                     style={{marginTop:"1rem !important",marginBottom:"-10rem !important"}}
                      type="submit"
                    //   disabled={isLoading}
                      onClick={(e) => updateUserProfile(e)}
                    >
                      {/* {isLoading ? "Loading…" : "   Submit"} */}
                      Withdraw NFT
                    </Button>
                    </div>
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MyWallet ;