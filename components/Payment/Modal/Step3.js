import React from 'react'
import { useEffect, useState } from 'react';
import { withToken } from '@/components/Utils/Functions';
import supabase from '@/components/Utils/SupabaseClient';
import axios from 'axios';

export default function Step3({setShow2,setShow3,contractIdentity,setClientSecret,setShow1,formData,customer}) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [maxMint, setMaxMint] = useState();
  const [count, setCount] = useState(1);
  const [formValues, setFormValues] = useState([]);
  const [nftDetails,setNftDetails] = useState({token:'',userId:'',nftPrice:'',description:''});
  const [newValue,setNewValue] = useState([]);


  useEffect(() => {
    getSession();
  }, [nftDetails?.token]);

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
  
    setNftDetails({...nftDetails,token:session?.access_token,userId:session?.user?.id})
    getParameters(session?.access_token)
  }

  async function getParameters(token) {
    console.log(token);
    try {
      const response = await withToken({ data: { contractIdentity: contractIdentity }, token: token, query: 'getdata' })
      console.log(response, "parameters");
      setData(JSON.parse(response.data.data.data));
      setMaxMint(response.data.data.maxPerMint)
     setNftDetails({...nftDetails,description:response.data.data.description,nftPrice:response.data.data.nftPrice})
    } catch (error) {
      console.log(error);
    }
  }

  console.log(nftDetails,contractIdentity,formData,customer,'nft details');

  let handleChange = (idx, e) => {
    const updatedValues = [...formValues];
    updatedValues[idx] = e.target.value;
    setFormValues(updatedValues)
  };



  console.log(formValues,'formvalues  ');

  function incrementFn(e, idx) {
    e.preventDefault();
    const updatedValues = [...formValues];
    const newd = [...newValue]

    if(newValue[idx]){
      if (newValue[idx]?.value == maxMint) return;
    }else{
      if (count == maxMint) return;
    }

    let total;

    if(newValue[idx]){
      total = newValue[idx]?.value + 1
    }else{
     total = count + 1;}

    newd[idx] = {id:idx,value:total};
    setNewValue(newd)
    console.log(total,'total');

    updatedValues[idx] = total;
    setFormValues(updatedValues)
    setCount(total)
  }

  function decrementFn(e, idx) {
    e.preventDefault();
    const updatedValues = [...formValues];
    const newd = [...newValue]


    if(newValue[idx]){
      if (newValue[idx]?.value == 1) return;
    }else{
      if (count == 1) return;
    }

    let total;
    if(newValue[idx]){
      total = newValue[idx]?.value - 1
    }else{
     total = count - 1;}

    newd[idx] = {id:idx,value:total};
    setNewValue(newd)
    updatedValues[idx] = total;
    setFormValues(updatedValues)

    setCount(total)
  }

  console.log(newValue,'newValue')

  async function createPaymentIntent() {
    setLoading(true)
    console.log(formValues,'formValues45')
    let req = await axios.post("/api/create-payment-intent", {
      amount: nftDetails?.nftPrice * count,
      description: nftDetails?.description,
      email: formData?.email,
      quantity: count,
      userId: nftDetails?.userId,
      token: nftDetails?.token,
      contractIdentity:contractIdentity,
      name:formData?.name,
      address:formData?.address,
      city:formData?.city,
      state:formData?.state,
      country:formData?.country,
       data:formValues?.length == 0 ? [] : formValues ,
       customer:customer,
    });
    // console.log(req.data.clientSecret)
    console.log(req.data.clientSecret,'clientsecret')
    setClientSecret(req.data.clientSecret);
    setLoading(false)
    setShow3(true)
    setShow2(false)
    setShow1(false)
  }


  return (
    <div>
      <div className="purchase-nft">
        <h3>Purchase</h3>
        <h4>Purchase your NFT with Payken</h4>
        <h6>Choose quantity</h6>
        {data?.map((item, idx) => {
          return (
            <>
              {item.value == 1 ?
                <div>
                  <div className="increment">

                    <div className="increment-btn">
                        
                            <input value= { newValue[idx]?.value || 1 } disabled  className="btn2-btn values-field" />
                       
                        
                    
                    </div>
                    <div className="increment-arrow">
                      <img onClick={(e) => incrementFn(e, idx)} src="/img/Polygon 1.png" alt="" />
                      <img onClick={(e) => decrementFn(e, idx)} src="/img/Polygon 3.png" alt="" />
                    </div>
                  </div>
                  <p className="super-dope">{item.name}</p>
                </div>
                : null}

              {item.value == 2 ?

                <div>
                  <div className="increment">

                    <div className="increment-btn">
                      <input placeholder='wallet address' onChange={(e) => handleChange(idx, e)} className="btn2-btn address-field" />
                    </div>
                    {/* <div className="increment-arrow">
                         <img onClick={(e)=>incrementFn(e,idx)} src="/img/Polygon 1.png" alt="" />
                         <img onClick={(e)=> decrementFn(e,idx)} src="/img/Polygon 3.png" alt="" />
                       </div> */}
                  </div>
                  <p className="super-dope">{item.name}</p>
                </div>
                : null}

              {item.value == 3 ?

                <div>
                  <div className="increment">

                    <div className="increment-btn">
                      <input placeholder='value' onChange={(e) => handleChange(idx, e)} className="btn2-btn" />
                    </div>
                 
                  </div>
                  <p className="super-dope">{item.name}</p>
                </div>
                : null}

              

            </>
          )
        })}
        <p  className="max-6">Maximum {maxMint}</p>
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
          <label
            className="form-check-label"
            for="flexCheckDefault"
          >
            I accept and agree that all sales are final. NFTs
            are subject to a holding period and identity checks.
            Refunds are not available.
          </label>
        </div>
        <button onClick={createPaymentIntent} className="card-continue"> {loading ? 'Loading...' : `Pay ${nftDetails?.nftPrice * count}`}</button>
      </div>
    </div>
  )
}
