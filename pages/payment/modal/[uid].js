import Modal from '@/components/Payment/Modal/Index'
import React from 'react'
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import axios from 'axios';
import Step5 from '@/components/Payment/Modal/step5';

export default function id({ response, price }) {
  return (
    <div>
        <Modal props={response} price={price}  />
        {/* <Step5/> */}
    </div>
  )
}


export async function getServerSideProps(context) {
  let { params } = await context;
  let contractIdentity = await params.uid;
  const supabase = createServerSupabaseClient(context);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session,'sessiinon')
  const token = session?.access_token;

    var config = {
      method: "post",
      url: "http://52.9.60.249:4000/api/v1/auth/getci",

      data: { contractIdentity: contractIdentity },

      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    };

  const res = await axios(config);
  console.log(res,'res')
  const response = res.data;
  console.log(response,'response is here')
  
  // console.log(response,"to get the response from api to get data by contract Identity")
  var config = {
    method: "get",
    url: "https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=3DP8EIJ53A49TPYD6WWUCVE919S7W7N2RU",
  };
  let res2 = await axios(config);
  console.log(res2, "to get the response from api to get eth value");
  let rate = res2.data.result.maticusd;

  return {
    props: {
      response,
      price: rate,
    },
  };
}