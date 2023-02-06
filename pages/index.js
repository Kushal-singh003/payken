import React from "react";
import RegistrationPage from "../Component/Profile/RegistrationPage";
import { useEffect, useState } from "react";
import supabase from "../utils/SupabaseClient";
import Dashboard from "../Component/Dashboard";
// import Navigation frbaseClient } from '@supabase/auth-helpers-react'

const registrationPage = () => {
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
    <div>{!session ? <RegistrationPage /> : <Dashboard key={session} />}</div>
  );
};

export default registrationPage;
