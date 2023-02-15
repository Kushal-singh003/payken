import { Inter } from '@next/font/google'
import supabase from '@/components/Utils/SupabaseClient'
import Index from '@/components/Index'
import TransferFunds from '@/components/Wallet/TransferFunds'
import { useState,useEffect } from 'react'

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
    {session ? <TransferFunds/> : 
      <Index/> }
      
    </>
  )
}
