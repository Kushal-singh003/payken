import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import SideBar from "../SideBar";
import supabase from "../../utils/SupabaseClient";

// function simulateNetworkRequest() {
//   return new Promise((resolve) => setTimeout(resolve, 4000));
// }

const UpdateProfile = () => {
  const [email, setEmail] = useState();
  const [showNewEmail,setShowNewEmail] = useState();
  const [token,setToken]=useState();
  const [newEmail,setNewEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [showImage, setShowImage] = useState();
  const [spinner,setSpinner] = useState(false);
  const [profile,setProfile]=useState();
  const router = useRouter();


  async function getUserProfile() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "to get the session from supabase");
    localStorage.setItem("token",session?.access_token)
    setToken(session?.access_token)
    setEmail(session?.user?.email);
    setNewEmail(session?.user?.new_email)
    setFirstName(session?.user?.user_metadata?.full_name);
    setLastName(session?.user?.user_metadata?.last_name);
    setAddress(session?.user?.user_metadata?.address);
    setCity(session?.user?.user_metadata?.city);
    setCountry(session?.user?.user_metadata?.country);
    setphoneNumber(session?.user?.user_metadata?.phoneNumber);
    setShowNewEmail(session?.user?.new_email)

  }
  useEffect(() => {
    getUserProfile();
  }, []);

  async function updateUserProfile(e) {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: firstName,
        last_name: lastName,
        address: address,
        city: city,
        country: country,
        phoneNumber: phoneNumber,
      },
    });
    if (data) {
      console.log(data, "to check the data to change the user profile");
      window.location="/dashboard";
    }
    if (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
 

  async  function getProfile(){
     try{
      const token=localStorage.getItem("token")
         const res= await axios.post("/api/userProfile",{token:token});
         const response=res.data;
         setProfile(response.data.data[0])
          console.log(response.data.data[0],"data from api")
     }catch(err){
         console.log(err)
     }
    
  }

  
  useEffect(()=>{
   
    getProfile()

  },[token])

  return (
    <div>
      <SideBar />
      <div id="home-inner-profile" className="profile-sects pt-0">
        <div className="dark-overlay">
          <div className="container-fluid" >
            <div className="row">
              <ToastContainer />
              <div className="col" id="card-head">
                <div className="card text-center text-light card-form">
                  <div className="card-body ">
                    <h3>PROFILE UPDATE FORM</h3>
                    <p>Please Fill Out This Form to Complete Your KYC</p>
                    <form>
                      <div className="form-group form mb-2">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                          type="email"
                          name="email"
                          defaultValue={showNewEmail || email}
                          disabled
                          className="form-control form-control-lg formText"
                          style={{ textAlign: "left" }}
                        />
                      </div>
                      <div className="form-group form mb-2">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                          type="text"
                          name="firstname"
                          defaultValue={firstName}
                          placeholder="First Name"
                          className="form-control form-control-lg formText"
                          onChange={(e) => setFirstName(e.currentTarget.value)}
                          style={{ textAlign: "left" }}
                        />
                      </div>
                      <div className="form-group form mb-2">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          defaultValue={lastName}
                          className="form-control form-control-lg formText"
                          onChange={(e) => setLastName(e.currentTarget.value)}
                          style={{ textAlign: "left" }}
                        />
                      </div>
                      <div className="form-group form mb-2">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                          type="text"
                          name="wallet address"
                          placeholder="Wallet Address"
                          defaultValue={profile?.address}
                          className="form-control form-control-lg formText"
                          style={{ textAlign: "left", fontSize:"15px"}}
                          readonly='true'
                        />
                      </div>
                      <div className="form-group form mb-2">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          defaultValue={address}
                          className="form-control form-control-lg formText"
                          onChange={(e) => setAddress(e.currentTarget.value)}
                          style={{ textAlign: "left" }}
                        />
                      </div>
                      <div className="form-group form mb-2">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          defaultValue={city}
                          className="form-control form-control-lg formText"
                          onChange={(e) => setCity(e.currentTarget.value)}
                          style={{ textAlign: "left" }}
                        />
                      </div>
                      <div className="form-group form mb-2">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                          type="text"
                          name="country"
                          placeholder="Country"
                          defaultValue={country}
                          className="form-control form-control-lg formText"
                          onChange={(e) => setCountry(e.currentTarget.value)}
                          style={{ textAlign: "left" }}
                        />
                      </div>
                      <div className="form-group form mb-2">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                          type="number"
                          name="phoneNumber"
                          defaultValue={phoneNumber}
                          placeholder="Phone Number"
                          className="form-control form-control-lg formText"
                          onChange={(e) =>
                            setphoneNumber(e.currentTarget.value)
                          }
                          style={{ textAlign: "left" }}
                        />
                      </div>

                      {/* <div className="input-item mb-4" id="kyc-sec">
                        <h6 className="item-text"> Upload Profile Image</h6> */}

                        {/* {showImage ? (
                          <img
                            style={{ height: "200px", width: "450px" }}
                            className="kyc-image"
                            src={showImage}
                            type="file"
                          ></img>
                        ) : null} */}
                         {/* {
                          spinner ? <> <span style={{alignSelf:'center', marginTop:'20px'}} className="spinner-border "> </span> <span>Uploading Selected Image...</span></>
                          :
                          <input
                          type="file"
                          placeholder="Upload Front Side"
                          style={{ marginTop: "10px" }}
                          onChange={(e) => uploadAvatar(e)}
                        />
                         } */}
                        {/* <input
                          type="file"
                          placeholder="Upload Front Side"
                          style={{ marginTop: "10px" }}
                          onChange={(e) => uploadAvatar(e)}
                        />
                        {spinner ? <span className="spinner-border "></span> : null }
                         */}
                      {/* </div> */}

                      <div className="google-btn mt-2" >
                      <Button
                        variant="secondary"
                        className="form-group w-100 btn-outline-light"
                       id="create-btns"
                       style={{marginTop:"1rem !important"}}
                        type="submit"
                        disabled={isLoading}
                        onClick={(e) => updateUserProfile(e)}
                      >
                        {isLoading ? "Loading…" : "   Submit"}
                      </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
