import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import supabase from "../../utils/SupabaseClient";

// function simulateNetworkRequest() {
//   return new Promise((resolve) => setTimeout(resolve, 4000));
// }

const LogInPage = () => {
  const [email, setEmail] = useState();
  const [faStatus, setFaStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const [loadingRef, setLoadingRef] = useState(false);
  const router = useRouter();

  async function signInWithGoogle(e) {
    setIsLoading(true);
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (data) {
      console.log(data);
    } else {
      console.log(error);
      setIsLoading(false);
    }
  }

  // async function LoginFn(e) {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const email  =emailInputRef.current.value;
  //   const password = passwordInputRef.current.value;
  //   // setPasswordCondition(false);

  //   var regularExpression =
  //     /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  //   if (!email || !password) {
  //     toast.error("Please provide all credentials !!");
  //     setIsLoading(false);
  //     setLoadingRef(false)
  //     return;
  //   }

  //   if (!email.includes(".com")) {
  //     toast.error("Please provides valid email address!!");
  //     setIsLoading(false);
  //     setLoadingRef(false)
  //     return;
  //   }

  //   if (!regularExpression.test(password)) {
  //     setPasswordCondition(true);
  //     setIsLoading(false);

  //     return false;
  //   }

  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password,
  //   });

  //   if (error) {
  //     console.log(error);
  //     toast.error("Invalid Login credentials!!");
  //     setIsLoading(false);
  //     setLoadingRef(false)
  //     // setPasswordCondition(false);
  //     return;
  //   }

  //   if (data) {
  //     console.log(data, "Email");

  //     setTimeout(() => {
  //       router.push("/");
  //     });
  //   }
  // }

  const handleLogin = async (event) => {
    event.preventDefault();
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

  // useEffect(() => {
  //   if (isLoading) {
  //     simulateNetworkRequest().then(() => {
  //       setLoadingRef(false);
  //     });
  //   }
  // }, [isLoading]);

  // const handleClick = () => setLoadingRef(false);

  return (
    <div id="home-inner">
      <div className="dark-overlay">
        <div className="container">
          <div className="row">
            <ToastContainer />
            <div className="column">
              <div className="card text-center text-success card-form">
                <div
                  className="card-body text-light"
                  id="card-setting"
                  style={{ marginBottom: "4px" }}
                >
                       <div className="text">
                    <h3> PROFILE LOGIN PAGE</h3>
                  </div>
                 
                  <p>
                    Please provide the Valid credentails to login into your
                    profile
                  </p>
                  <form>
                    <div className="form-group form mt-2 mb-2" id="input-groups">
                      <input
                        type="text"
                        name="number"
                        className="form-control"
                        id="form-controls"
                        placeholder="Enter Your Email"
                        style={{ textAlign: "left" }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {/* <div className="form-group form mb-4 text-center">
                      <input
                        ref={passwordInputRef}
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        style={{ textAlign: "left" }}
                      />
                      <p style={{ textAlign: "left !important" }}>
                        Your password must be at least 8 characters long, should
                        contain at least one number and special character have a
                        mixture of uppercase and lowercase letters.
                      </p>
                    </div> */}

                    <div className="google-btn">
                      <Button
                        variant="secondary"
                        className="form-group w-100 btn-outline-light mb-0"
                        id="create-btn"
                        type="submit"
                        style={{marginTop:"0rem !important"}}
                        disabled={isLoading}
                        onClick={(e) => handleLogin(e)}
                      >
                        {isLoading ? "Loading…" : "   Submit"}
                      </Button>{" "}
                      <h5>or</h5>
                      <button
                        type="button"
                        onClick={(e) => signInWithGoogle(e)}
                        // disabled={loading}
                        className="btn"
                        id="main-btns-up"
                      >
                        <img id="icon-set" src="/google-icon.webp" alt="" />
                        {/* <i id="icon-set" class="bi bi-google"></i> */}
                        Continue With Google
                      </button>
                    </div>
                    <div className="did-txt mt-2">
                      <p>
                        {" "}
                        New user{" "}
                        <a
                          href="/"
                          style={{
                            cursor: "pointer",
                            color: "white",
                            textDecoration: "underline  ",
                            fontWeight:"600",
                          }}
                          className="resend-txt "
                        >
                          SignUp
                        </a>{" "}
                        First!{" "}
                        {/* <a
                          href="/forgotPassword"
                          style={{
                            cursor: "pointer",
                            color: "white",
                            textDecoration: "underline  ",
                          }}
                          className="resend-txt "
                        >
                          Forgot Password?
                        </a>{" "} */}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
