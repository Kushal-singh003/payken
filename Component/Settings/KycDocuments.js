import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import FormData from "form-data";
import SideBar from "../../Component/SideBar";
import supabase from "../../utils/SupabaseClient";

const KycProfile = () => {
  const documentNumberInputRef = useRef();
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();
  const [showImage1, setShowImage1] = useState();
  const [showImage2, setShowImage2] = useState();
  const [showImage3, setShowImage3] = useState();
  const [spinner, setSpinner] = useState();
  const [documentNumber, setDocumentNumber] = useState();
  const router = useRouter();

  async function getAvatar() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    // setAvatar(session?.user?.user_metadata?.avatar_url);
    setEmail(session?.user?.email);
  }

  useEffect(() => {
    getAvatar();
  }, []);

  async function formSubmitHandler(e){
    e.preventDefault();
    setIsLoading(true);

    if(!value){
      toast.error('Please select a document')
      setIsLoading(false)
      return;
    }

    if(!documentNumber){
      toast.error("Please Provide Valid Doument Number");
      setIsLoading(false)
      return;
    }

    if(!showImage1 || !showImage2 || !showImage3){
      toast.error('please upload documents')
      setIsLoading(false)
      return;
    }

    

    const {data, error} = await supabase.auth.updateUser({
      data:{
        document_Number: documentNumber,
      }
    })

    if (data){
      console.log(data)
      toast.success("Kyc Updated Successfully")
      router.push("/dashboard")
    }
    if(error){
      console.log(error)
      toast.error("Failed to upload Kyc")
    }
  }

  async function uploadDocument1(event) {
    event.preventDefault();

    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const mathRandom = Math.floor(Math.random() * 9999999999);
      const fileName = `${mathRandom}.${fileExt}`;
      const filePath = `${fileName}`;
      setShowImage1(URL.createObjectURL(file));

      const { error, data } = await supabase.storage
        .from("avatar")
        .upload(filePath, file);

      if (error) {
        throw error;
        setIsLoading(false);
      }

      if (data) {
        console.log(data.path);
        const imageUrl =
          "https://abnoypqlmlphutiagnsi.supabase.co/storage/v1/object/public/avatar/" +
          data.path;

        updateDocument1(imageUrl);
      }
    } catch (err) {
      console.log(err, "to get the error");
    }
  }

  async function updateDocument1(imageUrl) {
    const { data, error } = await supabase.auth.updateUser({
      data: { avatar_url: imageUrl },
    });

    if (data) {
      console.log(data, "to see the image uploaded");
    }

    if (error) {
      console.log(error, "to see the status of the error");
      toast.error("Failed to upload the image");
      setSpinner(false);
    }
  }

  async function uploadDocument2(event) {
    event.preventDefault();
    setIsLoading(false);

    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const mathRandom = Math.floor(Math.random() * 9999999999);
      const fileName = `${mathRandom}.${fileExt}`;
      const filePath = `${fileName}`;
      setShowImage2(URL.createObjectURL(file));

      const { error, data } = await supabase.storage
        .from("avatar")
        .upload(filePath, file);

      if (error) {
        throw error;
        setIsLoading(false);
      }

      if (data) {
        console.log(data.path);
        const imageUrl =
          "https://abnoypqlmlphutiagnsi.supabase.co/storage/v1/object/public/avatar/" +
          data.path;

        updateDocument2(imageUrl);
      }
    } catch (err) {
      console.log(err, "to get the error");
    }
  }

  async function updateDocument2(imageUrl) {
    const { data, error } = await supabase.auth.updateUser({
      data: { avatar_url1: imageUrl },
    });

    if (data) {
      console.log(data, "to see the image uploaded");
    }

    if (error) {
      console.log(error, "to see the status of the error");
      toast.error("Failed to upload the image");
      setSpinner(false);
    }
  }

  async function uploadDocument3(event) {
    event.preventDefault();
    setIsLoading(false);

    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const mathRandom = Math.floor(Math.random() * 9999999999);
      const fileName = `${mathRandom}.${fileExt}`;
      const filePath = `${fileName}`;
      setShowImage3(URL.createObjectURL(file));

      const { error, data } = await supabase.storage
        .from("avatar")
        .upload(filePath, file);

      if (error) {
        throw error;
        setIsLoading(false);
      }

      if (data) {
        console.log(data.path);
        const imageUrl =
          "https://abnoypqlmlphutiagnsi.supabase.co/storage/v1/object/public/avatar/" +
          data.path;

        updateDocument3(imageUrl);
      }
    } catch (err) {
      console.log(err, "to get the error");
    }
  }

  async function updateDocument3(imageUrl) {
    const { data, error } = await supabase.auth.updateUser({
      data: { avatar_url2: imageUrl },
    });

    if (data) {
      console.log(data, "to see the image uploaded");
    }

    if (error) {
      console.log(error, "to see the status of the error");
      toast.error("Failed to upload the image");
      setSpinner(false);
    }
  }
  function onChangeEvent(event) {
    setValue(event.currentTarget.value);
    

    if (!event.currentTarget.value) {
      notifyError("Please select the document type");
      return;
    }
  }

  return (
    <div id="kyc-inner" className="profile-sects pt-0">
      <div className="dark-overlay">
        <div className="container">
          <div className="row">
            <SideBar />
            <ToastContainer />
            <div className="col" id="col-header">
              {/* <div className="card text-center text-light card-form"> */}
              <div className="card-body">
                <h3>KYC Verification Form</h3>
                <p>Please Fill Out This Form to Complete Your KYC</p>
                <form>
                  <div className="form-group form mb-3">
                    {/* <label htmlFor="email">Email</label> */}
                    <input
                      type="email"
                      name="email"
                      defaultValue={email}
                      disabled
                      className="form-control form-control-lg formText"
                      style={{ textAlign: "left" }}
                    />
                  </div>
                  <div className="form-group form mb-3">
                    {/* <label htmlFor="documentType">Document Type</label> */}
                    <select
                      style={{ textAlign: "left" }}
                      className="form-control formText"
                      onChange={(event) => onChangeEvent(event)}
                    >
                      <option>Please Select the Document type</option>
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="Pan Card">Pan Card</option>
                      <option value="Driving License">Driving License</option>
                    </select>
                  </div>
                  <div className="form-group form mb-3 text-left">
                    {/* <label htmlFor="documentNumber">Document Number</label> */}
                    <input
                      defaultValue={documentNumber}
                      type="text"
                      name="documentNumber"
                      className="form-control form-control-lg formText"
                      placeholder="Document Number"
                      style={{ textAlign: "left" }}
                      onChange={(e)=> setDocumentNumber(e.target.value)}
                    />
                  </div>

                  {value == "Aadhar Card" ||
                  value == "Driving License" ||
                  value == "Pan Card" ? (
                    <>
                      <div className="kyc-part">
                        <h6 style={{ marginBottom: "10px", textAlign: "left" }}>
                          Upload Front Side
                        </h6>
                        {showImage1 ? (
                          <>
                            <img
                              style={{ height: "100px", width: "250px" }}
                              className="kyc-image"
                              src={showImage1}
                              type="file"
                            ></img>
                          </>
                        ) : null}
                        <input
                          type="file"
                          placeholder="Upload Front Side"
                          style={{ marginTop: "10px" }}
                          onChange={(e) => uploadDocument1(e)}
                        />
                      </div>
                      <div className="kyc-part">
                        <h6 style={{ marginBottom: "10px", textAlign: "left" }}>
                          Upload Back Side
                        </h6>
                        {showImage2 ? (
                          <>
                            <img
                              style={{ height: "100px", width: "250px" }}
                              className="kyc-image"
                              src={showImage2}
                              type="file"
                            ></img>
                          </>
                        ) : null}

                        <input
                          type="file"
                          placeholder="Upload Front Side"
                          style={{ marginTop: "10px" }}
                          onChange={(e) => uploadDocument2(e)}
                        />
                      </div>
                      <div className="kyc-part">
                        <h6 style={{ marginBottom: "10px", textAlign: "left" }}>
                          Selfie With Document
                        </h6>
                        {showImage3 ? (
                          <>
                            <img
                              style={{ height: "100px", width: "250px" }}
                              className="kyc-image"
                              src={showImage3}
                              type="file"
                            ></img>
                          </>
                        ) : null}

                        <input
                          type="file"
                          placeholder="Upload Front Side"
                          style={{ marginTop: "10px" }}
                          onChange={(e) => uploadDocument3(e)}
                        />
                      </div>
                    </>
                  ) : null}

                  <Button
                    variant="secondary"
                    className="form-group w-100 btn-outline-light mb-0"
                    id="create-btns"
                    style={{
                     width:"100% !important"
                    }}
                    type="submit"
                    disabled={isLoading}
                    onClick={(e)=> formSubmitHandler(e)}
                  >
                    {isLoading ? "Loading…" : "   Submit"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default KycProfile;
