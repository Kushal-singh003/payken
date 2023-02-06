import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../Component/ui/Navbar";
import Footer from "../Component/ui/Footer";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import {useRouter} from 'next/router';
import { useState,useEffect } from 'react'
// import { SessionProvider } from "next-auth/react";

// import Footer from '../Component/ui/Footer';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return(<SessionContextProvider
  // return <SessionProvider session={pageProps.session}>
  //   {/* <Head>
  //   <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
  //   </Head> */}
  //   <SSRProvider>
  //       <Navbar />
  //       <Component {...pageProps} />
  //       <Footer/>

  //       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" integrity="sha384-xeJqLiuOvjUBq3iGOjvSQSIlwrpqjSHXpduPd6rQpuiM3f5/ijby8pCsnbu5S81n" crossOrigin="anonymous"/>
  //       <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></Script>
  //     </SSRProvider>
  //     </SessionProvider>
  
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession} >
<Head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <Script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
  crossOrigin="anonymous"/>
  <Navbar/>

    <Component {...pageProps}  />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.9.1/font/bootstrap-icons.min.css" integrity="sha512-5PV92qsds/16vyYIJo3T/As4m2d8b6oWYfoqV+vtizRB6KhF1F9kYzWzQmsO6T3z3QG2Xdhrx7FQ+5R1LiQdUA==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.9.1/font/bootstrap-icons.min.css" integrity="sha512-5PV92qsds/16vyYIJo3T/As4m2d8b6oWYfoqV+vtizRB6KhF1F9kYzWzQmsO6T3z3QG2Xdhrx7FQ+5R1LiQdUA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

    {/* <Script src="js/bootstrap.bundle.min.js"></Script> */}
    <Footer/>
    </SessionContextProvider>
  );

}

export default MyApp;

// return <SessionProvider session={pageProps.session}>
//           </SessionProvider>
