import React from "react";
import { useEffect, useState } from "react";
import { withToken } from "@/components/Utils/Functions";
import supabase from "@/components/Utils/SupabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import LoginModal from "@/components/ui/LoginModal";

let list3 = [];

export default function Step1({setClientSecret,setShow1,setShow2,max,price,tokenId,maticPrice}) {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(1);
    const [token,setToken] = useState();
    const [sessionData,setSessionData] = useState(null)
    const [showModal,setShowModal] = useState(false);
   
   
    const router = useRouter();

    useEffect(() => {
        getSession();
        console.log(router.query,'query')
    }, [router?.query]);

    async function getSession() {
        const {
            data: { session },
        } = await supabase.auth.getSession();

      console.log(session,'session');
      setSessionData(session)

      if(session == null){
        setShowModal(true);
      }
      setToken(session?.access_token)
    }



    function incrementFn(e) {
        console.log(e.target.value,'e');
        if(count == max)return;

        setCount(count+1)
        
    }

    function decrementFn(e) {
        console.log(e,'e');
       if(count ===1) return;
        setCount(count-1)
    }

    async function createPaymentIntent() {

        setLoading(true);
        try {
            const data = {
                amount: price * count,
                // tokenId: router?.query?.id,
                tokenId: tokenId,
                quantity: count,
            }
            let req = await axios.post("/api/create-productPayment-intent",{data:data,token:token});
            console.log(req,'res');
            setClientSecret(req?.data?.clientSecret)
            localStorage.setItem('clientSecret',req?.data?.paymentIntentId)
            setShow1(false)
            setShow2(true)
    
          setLoading(false)
        } catch (error) {
            console.log('error')
            toast.error('Supply amount is over!')
            setLoading(false)
        }

      
    }


    return (
        <div>
            <ToastContainer/>
            <div className="purchase-nft">
                <h3>Purchase</h3>
                <h4>Purchase your NFT with Payken</h4>
                <h6>Choose quantity</h6>

                <div>
                    <div className="increment">
                        <div className="increment-btn">
                            <input
                                value={count}
                                disabled
                                className="btn2-btn values-field"
                            />
                        </div>
                        <div className="increment-arrow">
                            <img
                                onClick={(e) => incrementFn(e)}
                                src="/img/Polygon 1.png"
                                alt=""
                            />
                            <img
                                onClick={(e) => decrementFn(e)}
                                src="/img/Polygon 3.png"
                                alt=""
                            />
                        </div>
                    </div>
                    {/* <p className="super-dope">{'1'}</p> */}
                </div>





                <p className="max-6">Maximum {max}</p>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                        I accept and agree that all sales are final. NFTs are subject to a
                        holding period and identity checks. Refunds are not available.
                    </label>
                </div>
                <button onClick={sessionData ? createPaymentIntent : ()=> setShowModal(true)} className="card-continue">
                    {" "}
                    {loading ? "Loading..." : `Pay ${parseFloat(price * maticPrice * count).toFixed(3)} $` }
                </button>
                <LoginModal showModal={showModal} setShowModal={setShowModal} />
            </div>

        </div>
    );
}
