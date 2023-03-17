import { Mr_Dafoe } from "@next/font/google";
import Button from "react-bootstrap/Button";import React, { useState } from "react";
import Link from "next/link";
import supabase from "../Utils/SupabaseClient";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";


function LoginModal(props) {

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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="LoginModal"
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header> */}
<Modal.Body>

<div className="leftImgSide">
          <img src="/img/payken-qr.png" alt="" />
        </div>
        <div className="rightImgSide">
          <div className="closeImgSec">
            <img src="/img/close.svg" alt="" onClick={props.onHide} />
          </div>

            
            {/* <h4 className="HeadingText">Create Account</h4> */}
            
            <section className="signin">
          <h2 className="HeadingText">Sign In</h2>
          <p>Don't swap just Payken</p>
          <div className="signin-box" id="signin-box">
            {/* <img src="/img/payken.png" alt="" /> */}
            <button disabled={isLoading} onClick={(e)=> signInWithGoogle(e)} className="signin-google">
              <span>
                <img src="/img/google (2).png" alt="" />
              </span>
              <span> { isLoading ? 'Loading..' : 'Sign In With Google' }</span>
            </button>
            <Link href="" className="signin-apple">
              <span>
                <img src="/img/apple (2).png " alt="" />
              </span>
              <span>Sign In With Apple</span>
            </Link>
            <span className="or">or</span>
            <form onSubmit={handleSubmit} className="signin-form" id="signin-form">
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
            <button disabled={loading} type="submit"  className="signin-btn mb-3">
               {loading ? 'Loading...' : 'Login'}
            </button>
            </form>
            <div className="signin-checkbox" id="signin-checkbox">
              <span>
                Don't have an account? Click here to 
                <Link className="link" href="/registration">sign up</Link>
              </span>
            </div>
          </div>
        
      </section>


        
        </div> 


</Modal.Body>
      

      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default LoginModal;


