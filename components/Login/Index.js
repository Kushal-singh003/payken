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

    async function signInWithGoogle(e) {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
        });
    
        if (data) {
          console.log(data);
        } else {
          console.log(error);
         
        }
      }

    async function handleSubmit(e){
        e.preventDefault();
        console.log(formData);

      try {
                  
          // const { data, error } = await supabase.auth.signInWithPassword({
          //   email: formData?.email,
          //   password: formData?.password,
          // })

          const { data,error } = await supabase.auth.signInWithOtp({ email:formData?.email });
          console.log(data,'data');
          toast.success("A Confirmation Link is sent to your email to continue");
          // setTimeout(()=>{
          //   router.push('/')

          // },[1000])
          console.log(error,'error');
      } catch (error) {
        console.log(error);
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
            <button onClick={(e)=> signInWithGoogle(e)} className="signin-google">
              <span>
                <img src="/img/google (2).png" alt="" />
              </span>
              <span>Sign In With Google</span>
            </button>
            <Link href="" className="signin-apple">
              <span>
                <img src="/img/apple (2).png " alt="" />
              </span>
              <span>Sign In With Apple</span>
            </Link>
            <span className="or">or</span>
            <form onSubmit={handleSubmit} className="signin-form">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="signin-email"
                  placeholder="Email"
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
            <button type="submit"  className="signin-btn">
              Login
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
