import axios from 'axios';
import React from 'react'
import { Button } from 'react-bootstrap'

const PageOne = ({isLoading,emailInputRef,emailCheckHandler,setPage}) => {

  async function emailCheckHandler(e) {
    e.preventDefault();

    const email = emailInputRef.current.value;

    if (!email) {
      toast.error("Please Provide the payken email");
      return;
    }

    if (!email.includes(".com")) {
      toast.error("Please Provide valid Email");
      return;
    }

    setCheckEmail(email);
    try {
      const response = axios.post('/api/checkEmail',{data:email})
      console.log(response,'check email');
    } catch (error) {
      console.log(error);
    }
    setPage(2)
  }
  return (

    
    <form id="email-form" onSubmit={emailCheckHandler}>
    <div className="purchase-heading">
      <h3 className="purchase-txt">PURCHASE </h3>
      <p>Set 1 of 3</p>
    </div>
    <div className="progress" id="purchase-progress">
      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{ width: "100%" }}
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <div className="input-group mb-0 p-0" id="emailCheck">
      <input
        ref={emailInputRef}
        type="email"
        className="form-control"
        placeholder="Enter Your Email Here"
        // aria-label="Email"
        // aria-describedby="basic-addon1"
      />
      <h6 style={{ textAlign: "left", marginTop: "20px" }}>
        Please Provide Payken Email to Purchase the selected
        NFT
      </h6>
    </div>
    <div className="google-btn ">
      <Button
        variant="secondary"
        className="form-group w-100 btn-outline-light"
        id="create-btn"
        style={{ marginTop: "0rem !important" }}
        type="submit"
        disabled={isLoading}
        // onClick={emailCheckHandler}
      >
        {isLoading ? "Loading…" : "   Submit"}
      </Button>
    </div>
  </form>
  )
}

export default PageOne