import React from "react";
import { useEffect, useState } from "react";
import { withToken } from "@/components/Utils/Functions";
import supabase from "@/components/Utils/SupabaseClient";
import axios from "axios";
import { useRouter } from "next/router";
import { Cagliostro } from "@next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let list3 = [];

export default function Step3({
  setShow2,
  setShow3,
  contractIdentity,
  setClientSecret,
  setShow1,
  formData,
  customer,
  
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [maxMint, setMaxMint] = useState();
  const [count, setCount] = useState(1);
  const [formValues, setFormValues] = useState([]);
  const [nftDetails, setNftDetails] = useState({
    token: "",
    userId: "",
    nftPrice: "",
    description: "",
  });
  const [newValue, setNewValue] = useState([]);
  const [routerQuery, setRouterQuery] = useState();
  const [price, setPrice] = useState(null);
  const [maticPrice,setMaticPrice] = useState();
  const router = useRouter();

  useEffect(() => {
    getSession();
    getMaticPriceFn()
  }, [nftDetails?.token]);

  console.log(formData, "formdata step3");
  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setNftDetails({
      ...nftDetails,
      token: session?.access_token,
      userId: session?.user?.id,
    });
    getParameters(session?.access_token);
  }

  async function getParameters(token) {
    try {
      const response = await withToken({
        data: { contractIdentity: contractIdentity },
        token: token,
        query: "getdata",
      });
      const v = JSON.parse(response.data.data.data);
      setData(v);
      setMaxMint(response.data.data.maxPerMint);
      setNftDetails({
        ...nftDetails,
        description: response.data.data.description,
        nftPrice: response.data.data.nftPrice,
      });

      console.log(v, "vvvvvvvvvvvvvvvvvvvvvvvvvvv");
      const a = JSON.parse(router?.query?.parameters);

      v?.map((item, idx) => {
        if(item?.value == '1'){
        //  console.log(item.vlaue,'value of item')
        //  const g = [...formValues];
        //  g[idx] = 1;
        //  console.log(g,'g')
         list3[idx]= 1;
        //  setFormValues(g);
         return;
       }

   })

      v?.map((item, idx) => {
        for (let i = 0; i < a.length; i++) {
          if (item?.name === a[i]?.name) {
            // const updatedValues = [...formValues];
            // updatedValues[idx] = a[i]?.value;
            // list3.push(updatedValues)
            list3[idx] = a[i]?.value;
            // setFormValues(updatedValues);
          }
        }
      });

      setFormValues(list3)
      console.log(list3,'list3')


    } catch (error) {}
  }

  useEffect(() => {
    console.log(
      JSON.parse(router?.query?.parameters),
      "router quer  yyyyyyyyyyyyyyyy"
    );

    const a = JSON.parse(router?.query?.parameters);
    const b = router?.query?.price;

    if (b) {
      setPrice(b);
    }

    setRouterQuery(a);
  }, [router.query]);

  let handleChange = (idx, e) => {
    const updatedValues = [...formValues];
    updatedValues[idx] = e.target.value;
    setFormValues(updatedValues);
  };

  function incrementFn(e, idx) {
    e.preventDefault();
    const updatedValues = [...formValues];
    const newd = [...newValue];

    if (newValue[idx]) {
      if (newValue[idx]?.value == maxMint) return;
    } else {
      if (count == maxMint) return;
    }

    let total;

    if (newValue[idx]) {
      total = newValue[idx]?.value + 1;
    } else {
      total = count + 1;
    }

    newd[idx] = { id: idx, value: total };
    setNewValue(newd);

    updatedValues[idx] = total;
    setFormValues(updatedValues);
    setCount(total);
  }

  function decrementFn(e, idx) {
    e.preventDefault();
    const updatedValues = [...formValues];
    const newd = [...newValue];

    if (newValue[idx]) {
      if (newValue[idx]?.value == 1) return;
    } else {
      if (count == 1) return;
    }

    let total;
    if (newValue[idx]) {
      total = newValue[idx]?.value - 1;
    } else {
      total = count - 1;
    }

    newd[idx] = { id: idx, value: total };
    setNewValue(newd);
    updatedValues[idx] = total;
    setFormValues(updatedValues);

    setCount(total);
  }

  async function createPaymentIntent() {
    setLoading(true);
    console.log(formValues,'form')

    for (let i = 0; i < data?.length; i++) {
      if(!formValues[i]){
        toast.error('Please provide all credentials!')
        setLoading(false)
        return;
      }

    }

   

    let req = await axios.post("/api/create-payment-intent", {
      amount: price ? price * count : nftDetails?.nftPrice * count,
      maticPrice:  price ? price * count * maticPrice : nftDetails?.nftPrice * count * maticPrice,
      description: nftDetails?.description,
      email: formData?.email,
      quantity: count,
      userId: nftDetails?.userId,
      token: nftDetails?.token,
      contractIdentity: contractIdentity,
      name: formData?.name,
      address: formData?.address,
      city: formData?.city,
      state: formData?.state,
      country: formData?.country,
      data: formValues?.length == 0 ? [] : formValues,
      customer: customer,
    });
    //

    setClientSecret(req.data.clientSecret);
    setLoading(false);
    setShow3(true);
    setShow2(false);
    setShow1(false);
  }

  async function getMaticPriceFn(){
    try {
      const response = await axios.get('https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=3DP8EIJ53A49TPYD6WWUCVE919S7W7N2RU');
      console.log(response,'matic price')
      setMaticPrice(response?.data?.result?.maticusd)
    } catch (error) {
      console.log(error,'error')
    }
   
  }

  console.log(formValues, "fomrdjfkjk");

  return (
    <div>
      <ToastContainer/>
      <div className="purchase-nft">
        <h3>Purchase</h3>
        <h4>Purchase your NFT with Payken</h4>
        <h6>Choose quantity</h6>
        {data?.map((item, idx) => {
          return (
            <>
              {item.value == 1 ? (
                <div>
                  <div className="increment">
                    <div className="increment-btn">
                      <input
                        value={newValue[idx]?.value || 1}
                        disabled
                        className="btn2-btn values-field"
                      />
                    </div>
                    <div className="increment-arrow">
                      <img
                        onClick={(e) => incrementFn(e, idx)}
                        src="/img/Polygon 1.png"
                        alt=""
                      />
                      <img
                        onClick={(e) => decrementFn(e, idx)}
                        src="/img/Polygon 3.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <p className="super-dope">{item.name}</p>
                </div>
              ) : null}

              {item.value == 2 ? (
                <div>
                  <div className="increment">
                    <div className="increment-btn">
                      <input
                        placeholder="wallet address"
                        onChange={(e) => handleChange(idx, e)}
                        className="btn2-btn address-field"
                      />
                    </div>
                    {/* <div className="increment-arrow">
                         <img onClick={(e)=>incrementFn(e,idx)} src="/img/Polygon 1.png" alt="" />
                         <img onClick={(e)=> decrementFn(e,idx)} src="/img/Polygon 3.png" alt="" />
                       </div> */}
                  </div>
                  <p className="super-dope">{item.name}</p>
                </div>
              ) : null}

              {/* {item.value == 3 ? (
                <div>
                  <div className="increment">
                    
                    <input
                      placeholder="Dynamic Value"
                      onChange={(e) => handleChange(idx, e)}
                      className="btn2-btn address-field"
                    />
                  </div>
                  <p className="super-dope">{item.name}</p>
                </div>
              ) : null} */}
            </>
          );
        })}
        <p className="max-6">Maximum {maxMint}</p>
        {/* <div className="increment">
                            
                          <div className="increment-btn">
                            <button className="btn2-btn">2</button>
                          </div>
                          <div className="increment-arrow">
                            <img src="/img/Polygon 1.png" alt="" />
                            <img src="/img/Polygon 3.png" alt="" />
                          </div>
                        </div>
                        <p className="super-dope">SuperDope</p>
                        <p className="max-6">Maximum 6</p> */}
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
        <button onClick={createPaymentIntent} className="card-continue">
          {" "}
          {loading
            ? "Loading..."
            : <>Pay {price ? parseFloat(price * count * maticPrice).toFixed(3)  : parseFloat(nftDetails?.nftPrice * count * maticPrice).toFixed(3) }$</>}
        </button>
      </div>
    </div>
  );
}
