import React from "react";
import { useState } from "react";
import supabase from "../Utils/SupabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";


export default function Registration() {
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  })
  const router = useRouter();

  async function signInWithGoogle(e) {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (data) {
      console.log(data);
      setIsLoading(false)
    } else {
      console.log(error);
      toast.error("User Doesn' Exist");
      setIsLoading(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    console.log(formData);
    try {
      const { data, error } = await supabase.auth.signInWithOtp({ email: formData?.email });
      console.log(data, 'data');

      console.log(error, 'error');
      toast.success("A Confirmation Link is sent to your email to continue");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false)
      toast.error(error.error_description || error.message);
    }
  };


  return (
    <div>
      <section className="signup">
        <ToastContainer />
        <div className="container">
          <h2>Member Sign up</h2>
          <div className="signup-box">
            <img src="/img/payken.png" alt="" />
            <button disabled={loading} onClick={(e) => signInWithGoogle(e)} className="signup-google">
              <span>
                <img src="/img/google (2).png" alt="" />
              </span>
              <span> {loading ? 'Loading...' : 'Sign In With Google'}</span>
            </button>
            <Link href="" className="signup-apple">
              <span>
                <img src="/img/apple (2).png " alt="" />
              </span>
              <span>Sign In With Apple</span>
            </Link>
            <span className="or">or</span>
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="signup-email"
                  placeholder="Name"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="signup-email"
                  placeholder="Email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {/* <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="signup-email"
                  placeholder="Password"
                  onChange={(e)=> setFormData({...formData,password:e.target.value})}
                />
              </div> */}
              <button disabled={loading} type="submit" className="signup-btn">
                {loading ? 'Loading...' : 'Create a Account'}
              </button>
            </form>
            <div className="signin-checkbox">
              <span>
                Already have an account? Click here to
                <Link className="link" href="/login">sign in</Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
