import { Inter } from '@next/font/google'
import supabase from '@/components/Utils/SupabaseClient'
import Index from '@/components/Index'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Dashboard from '@/components/Dashboard'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
        }
        setIsLoading(false);
      }
    }

    getInitialSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      mounted = false;

      subscription?.unsubscribe();
    };
  }, []);
  return (
    <>
    {session ? <Dashboard /> :
      <Index />  }
      
    </>
  )
}


// export async function getServerSideProps(context) {
//   const supabase = createServerSupabaseClient(context);
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   console.log(session,'sessiinon')

//   let resData;
//   let errData;

//   try {
//     var config = {
//       method: "post",
//       url: "http://52.9.60.249:5000/api/v1/member/getmarchant",
//       headers: {
//         Authorization: `Bearer ${session?.access_token}`,
//       },
//     };
    
//     const response = await axios(config);
//     console.log(response,'response');
//      resData = response?.data
//   } catch (error) {

//     console.log(error)
//      errData=error?.response?.data
    
//   }

  
 

  

//   return {
//     props: {
//       user:session,
//       response: resData || errData
//     },
//   };
// }