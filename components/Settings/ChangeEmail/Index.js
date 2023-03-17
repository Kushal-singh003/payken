import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
// import Arrow from "../public/arrow.svg";
import Link from "next/link";
import Button from "react-bootstrap/Button";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import SideBar from "../../Component/SideBar";
import supabase from "@/components/Utils/SupabaseClient";
import { withToken } from "@/components/Utils/Functions";

const ChangeEmail = () => {
  const [email, setEmail] = useState();
  const [newEmail, setNewEmail] = useState();
  const [verify, setVerify] = useState();
  const [merchant, setMerchant] = useState();
  const [token, setToken] = useState();
  const [showNewEmail, setShowNewEmail] = useState();
  const [vMerchant, setVMerchant] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "to get the session from supabase");
    setEmail(session?.user?.email);
    setShowNewEmail(session?.user?.new_email);
    setToken(session?.access_token);
    const d = session?.access_token;
    getMerchant(d);
  }
  useEffect(() => {
    getSession();
  }, []);

  async function emailModify(e) {
    e.preventDefault();

    setIsLoading(true);
    setVerify(true);
    if (!newEmail) {
      toast.error("Please Provide Credentils");
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("User Already Exist");
      return;
    }
    if (data) {
      console.log(data);
      setVerify(true);
      setIsLoading(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  }

  async function beMerchantFn() {
    setLoading(true);
    if (!merchant || merchant == false) {
      toast.error("Please Click on Checkbox first");
      return;
    }

    const response = await withToken({
      data: { status: merchant },
      token: token,
      query: "marchant",
    });
    console.log(response, "response");
    setLoading(false);
  }

  async function getMerchant(d) {
    const response = await withToken({ token: d, query: "getmarchant" });
    console.log(response, "response get merchant");
    setVMerchant(response?.data?.data[0].isMarchent);
  }

  return (
    <div id="home-inner" className="profile-sects pt-0 ">
      <div className="dark-overlay">
        <div className="container-fluid">
          <div className="row">
            <ToastContainer />
            <div className="col">
              <div className="card text-center card-form">
                <div className="card-body" id="emial-modify-inner">
                  <h2 className="settings-tab">Settings</h2>
                  <div className="Merchant-container">
                    <div className="Merchant-div">
                      <span>
                        {vMerchant == 1
                          ? "Merchant Account"
                          : "Become a Merchant"}
                      </span>
                      {vMerchant == 1 ? null : (
                        <input
                          onChange={(e) => setMerchant(e.target.checked)}
                          type="checkbox"
                        />
                      )}
                    </div>
                    {vMerchant == 1 ? (
                      <button disabled>Activated</button>
                    ) : (
                      <button onClick={beMerchantFn}>
                        {loading ? "Loading..." : "Save"}
                      </button>
                    )}
                  </div>
                  <div className="changeEmail-tab">
                    <h3>Change Your Email</h3>
                    {/* <p>
                    Please provide valid credentails to change your registered
                    email
                  </p> */}
                  </div>
                  <form>
                    <div className="form-group mb-4">
                      <input
                        defaultValue={showNewEmail || email}
                        type="email"
                        name="oldemail"
                        // disabled
                        className="form-control form-control-lg"
                        placeholder="Enter Your Registered Email"
                        style={{ textAlign: "left" }}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <input
                        type="email"
                        name="newemail"
                        className="form-control form-control-lg"
                        placeholder="Enter New Email Here"
                        style={{ textAlign: "left" }}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                    </div>
                    {verify && (
                      <p style={{ textAlign: "left" }}>
                        A Confirmation Link has been sent to your current and
                        New Email.. <br />
                        please click confirm on both to change email.
                      </p>
                    )}
                    <Button
                      className="form-group w-100 btn-outline-light"
                      // style={{
                      //   marginTop: "5px",
                      //   background: "#103703",
                      //   borderRadius: "100px",
                      //   marginBottom: "4px",
                      // }}
                      id="create-btns"
                      type="submit"
                      disabled={isLoading}
                      onClick={(e) => emailModify(e)}
                    >
                      {isLoading ? "Loading…" : "   Submit"}
                    </Button>
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

export default ChangeEmail;
