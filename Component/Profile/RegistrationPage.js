import React from "react";
import { useState } from "react";
import supabase from "../../utils/SupabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


export default function Signup() {
  const [loading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const [check, setCheck] = useState();

  async function signInWithGoogle(e) {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (data) {
      console.log(data);
    } else {
      console.log(error);
      toast.error("User Doesn' Exist");
      setIsLoading(false);
    }
  }

 

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if(!email){
      toast.error('Please provide credentials')
      setIsLoading(false)
      return;
    }
    
    if(check != 'agree'){
      toast.error('Please agree terms and conditions')
      setIsLoading(false)
      return;
    }

    

    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      toast.success("A Confirmation Link is sent to your email to continue");
      setIsLoading(true);
    } catch (error) {
      toast.error(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="home-inner">
      <ToastContainer />
      <section className="dark-overlay">
        <div className="container">
          <div className="row ">
            <div className="column">
              <div className="card text-center text-success card-form">
                <div className="card-body" id="card-setting">
                  <div className="text">
                    <h2>Member Sign Up</h2>
                  </div>
                  <div className="google-btn">
                    <button
                      type="button"
                      onClick={(e) => signInWithGoogle(e)}
                      disabled={loading}
                      className="btn"
                      id="main-btns-up"
                    >
                      <img id="icon-set" src="/google-icon.webp" alt="" />
                      {/* <i id="icon-set" class="bi bi-google"></i> */}
                      SignUp With Google
                    </button>
                  </div>

                  <h6 className="or-text">OR</h6>

                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-check" id="form-checker">
                    <input
                    required
                      className="form-check-input checker-setting"
                      type="checkbox"
                      value="agree"
                      id="defaultCheck1"
                      onChange={(e) =>  setCheck(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="defaultCheck1" id="agree-text-two">
                      I Agreed to all terms and conditions
                    </label>
                  </div>

                  <button
                    onClick={(e) => handleLogin(e)}
                    disabled={loading}
                    type="button"
                    className="btn "
                    id="create-btn"
                  >
                    {loading ? "loading..." : "Create Account"}
                  </button>

                  <div className="inner-line">
                    <p>
                      Already a member?{" "}
                      <a href="/profilePages/login">Sign in</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
