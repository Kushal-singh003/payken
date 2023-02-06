import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import Link from "next/link";
import SideBar from "../Component/SideBar";
import supabase from "../utils/SupabaseClient";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState();
  const router = useRouter();


  // async function emailModiy(e) {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();
  //   console.log(
  //     session,
  //     "to get the session from supabase to upload the Avatar"
  //   );
  //   console.log(session?.user?.email, "email is here!!");
  //   const email = session?.user?.email;

  //   const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  //     redirectTo: "http://localhost:3000/changePassword",
  //   });
  //   toast.success("A Link to Change Password Sent to Your Registered Email");

  //   if (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  //   if (data) {
  //     console.log(data);
  //   }
  // }

  return (
    <div id="dashboard-inner" className="profile-sects">
      <div className="dark-overlay">
        <div className="container">
          <ToastContainer />
          <div className="row">
            <SideBar />
            <div
              className="col"
              id="dashboard-col"
              style={{ marginTop: "0px", display: "flex", flexWrap: "wrap" }}
            >
              <Link href="/profilePages/userProfile">
                <div className="col-sm-4" style={{ cursor: "pointer" }}>
                  Update Profile
                </div>
              </Link>
              {/* <Link href="/myreferrals">
                <div className="col-sm-4" style={{ cursor: "pointer" }}>
                  My Referrals
                </div>
              </Link> */}
              <Link href="/nftPages/nftStart">
                <div className="col-sm-4" style={{ cursor: "pointer" }}>
                  Payken Pay
                </div>
              </Link>
              {/* <button
                onClick={(e) => changePassword(e)}
                className="col-sm-4"
                href="/changePassword"
              >
                <div style={{ cursor: "pointer" }}>Change Password</div>
              </button> */}

                {/* <Link href="/settings/2fa">
                  <div className="col-sm-4" style={{ cursor: "pointer" }}>
                    2FA
                  </div>
                </Link> */}

              <Link href="/settings/kycDocuments">
                <div className="col-sm-4" style={{ cursor: "pointer" }}>
                  KYC
                </div>
              </Link>

              <Link href="/settings/emailModify">
                <div className="col-sm-4" style={{ cursor: "pointer" }}>
                  Email Modify
                </div>
              </Link>
              <Link href="/nftPages/successPage">
                <div className="col-sm-4" style={{ cursor: "pointer" }}>
                My NFT
                </div>
              </Link>

              <Link href="/nftPages/myWallet">
                <div className="col-sm-4" style={{ cursor: "pointer" }}>
                  Wallet Address
                </div>
              </Link>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
