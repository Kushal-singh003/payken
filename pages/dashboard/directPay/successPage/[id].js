import React from 'react'
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import NavBar from '@/components/ui/NavBar';
import SuccessPage from '@/components/Dashboard/DirectPay/Pay/SuccessPage';
import BottomNav from '@/components/ui/BottomNav';
import MobileLogo from '@/components/ui/MobileLogo';


export default function successPage(props) {
  return (
    <div>
        <NavBar/>
        <MobileLogo/>
        <SuccessPage props={props?.query} response={props?.response}/>
        <BottomNav/>
    </div>
  )
}

export async function getServerSideProps(context) {
    let { params } = await context;
    console.log(params, "params");
    let id = await params.id;
    console.log(context.query,'query');
    const query = context.query;
  
    const supabase = createServerSupabaseClient(context);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "sessiinon");
    const token = session?.access_token;
    let Err;
    let resData;
  
    try {
      var config = {
        method: "post",
        url: 'http://52.9.60.249:5000/api/v1/marchent/updatedirectrequest',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data:{
          clientSecret: query?.payment_intent
        },
      };
      const response = await axios(config)
      resData = response?.data;
      console.log(response,'response')
    } catch (error) {
      console.log(error,'error')
       Err = error?.response?.data
    }
  
  
    
    return {
      props: {
        query,
        response: resData ||  Err
      },
    };
  }