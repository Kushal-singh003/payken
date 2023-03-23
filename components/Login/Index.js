import React, { useState } from "react";
import Link from "next/link";
import supabase from "../Utils/SupabaseClient";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const [formData,setFormData] = useState({
        email:'',
        password:'',
    })
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    async function signInWithGoogle(e) {
        e.preventDefault();
        setIsLoading(true)
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
        });
    
        if (data) {
          console.log(data);
          setIsLoading(false)
        } else {
          console.log(error);
          setIsLoading(false)
         
        }
      }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        console.log(formData);

      try {
          const { data,error } = await supabase.auth.signInWithOtp({ email:formData?.email });
          console.log(data,'data');
          toast.success("A Confirmation Link is sent to your email to continue");
          setLoading(false)
          console.log(error,'error');
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
        

          
    }

  return (
    <div>
      <ToastContainer/>
      <section className="signin">
        <div className="container">
          <h2>Sign In</h2>
          <h4>Don't swap just Payken</h4>
          <div className="signin-box">
            <img src="/img/payken.png" alt="" />
            <button disabled={isLoading} onClick={(e)=> signInWithGoogle(e)} className="signin-google">
              <span>
                <img src="/img/google (2).png" alt="" />
              </span>
              <span> { isLoading ? 'Loading..' : 'Sign In With Google' }</span>
            </button>
            <button className="signin-apple">
              <span>
                <img src="/img/apple (2).png " alt="" />
              </span>
              <span>Sign In With Apple</span>
            </button>
            <span className="or">or</span>
            <form onSubmit={handleSubmit} className="signin-form">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="signin-email"
                  placeholder="Email"
                  required
                  onChange={(e)=> setFormData({...formData,email:e.target.value})}
                />
              </div>
              {/* <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="signin-email"
                  placeholder="password"
                  onChange={(e)=> setFormData({...formData, password:e.target.value})}
                />
              </div> */}
            <button disabled={loading} type="submit"  className="signin-btn">
               {loading ? 'Loading...' : 'Login'}
            </button>
            </form>
            <div className="signin-checkbox">
              <span>
                Don't have an account? Click here to 
                <Link className="link" href="/registration">sign up</Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
