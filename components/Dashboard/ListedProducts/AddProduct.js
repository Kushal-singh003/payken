import React, { useState, useEffect } from "react";
import supabase from "@/components/Utils/SupabaseClient";
import { withToken } from "@/components/Utils/Functions";
import { MerchantApi } from "@/components/Utils/Functions";
import { useRouter } from "next/router";
import IncrementalAddressFields from "../ui/IncAddressField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

let id = [];
let percentage = [];
let commission;
let cAddress;

export default function AddProduct() {
  const [image, setImage] = useState();
  const [productInfo, setProductInfo] = useState({
    quantity: "",
    productName: "",
    price: "",
    image: "",
    description: "",
    link: "",
  });
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [inputFields, setInputFields] = useState([
    { address: "", percentage: "" },
    { address: "", percentage: "" },
  ]);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "session");
    setToken(session?.access_token);
  }

  useEffect(() => {
    getSession();
  }, []);

  console.log(inputFields?.length, "inputfield length");

  async function uploadImageFn(e) {
    e.preventDefault();
    setLoader(true);
    console.log(e.target.files[0], "hello");
    const url = URL.createObjectURL(e.target.files[0]);
    setImage(url);

    const productName = Math.floor(Math.random() * 999999999999999);

    const { data, error } = await supabase.storage
      .from("productimages")
      .upload(`${productName}`, e.target.files[0]);

    if (data) {
      console.log(data, "data");
      setProductInfo({
        ...productInfo,
        image:
          "https://ankjqfoklsiopugetikl.supabase.co/storage/v1/object/public/productimages/" +
          productName,
      });
      setLoader(false);
    }

    if (error) {
      setLoader(false);
      console.log(error, "error");
    }
  }

  async function onSubmitFn(e) {
    e.preventDefault();
    setLoading(true);
    console.log(productInfo, "product info");

    if (!productInfo?.image) {
      toast.error("Please select a product image");
      setLoading(false);
      return;
    }

    if (show) {
      if (inputFields?.length == 1) {
        const first = Number(inputFields[0]?.percentage);
        if (first != 100) {
          toast.error("Sum of percentage distribution must be 100");
          setErrMsg(true);
          setLoading(false);
          return;
        }
      }

      if (inputFields?.length == 2) {
        const first = Number(inputFields[0]?.percentage);
        const second = Number(inputFields[1]?.percentage);
        const total = first + second;

        if (total != 100) {
          toast.error("Sum of percentage distribution must be 100");
          setErrMsg(true);
          setLoading(false);
          return;
        }
      }

      if (inputFields?.length == 3) {
        const first = Number(inputFields[0]?.percentage);
        const second = Number(inputFields[1]?.percentage);
        const third = Number(inputFields[2]?.percentage);
        const total = first + second + third;

        if (total != 100) {
          toast.error("Sum of percentage distribution must be 100");
          setErrMsg(true);
          setLoading(false);
          return;
        }
      }

      if (inputFields?.length == 4) {
        const first = Number(inputFields[0]?.percentage);
        const second = Number(inputFields[1]?.percentage);
        const third = Number(inputFields[2]?.percentage);
        const fourth = Number(inputFields[3]?.percentage);
        const total = first + second + third + fourth;

        if (total != 100) {
          toast.error("Sum of percentage distribution must be 100");
          setErrMsg(true);
          setLoading(false);
          return;
        }
      }

      for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i]?.address == "" || inputFields[i]?.percentage == "") {
          toast.error("Please provide all credentials!");
          setLoading(false);
          return;
        }
        id[i] = inputFields[i]?.address;
        percentage[i] = inputFields[i]?.percentage;
        // id.push(inputFields[i]?.address)
        // percentage.push(inputFields[i]?.percentage)
      }

      console.log(id, percentage, "id and percentage");
      console.log(productInfo, "product info");

      commission = percentage;
      cAddress = id;

      // for (let i = 0; i < inputFields.length; i++){
      //   toast.error('Please provide all credentials')
      //   setLoading(false)
      //   return;
      // }
    }

    const data = {
      productName: productInfo?.productName,
      quantity: productInfo?.quantity,
      price: productInfo?.price,
      link: productInfo?.link,
      description: productInfo?.description,
      commision: commission ? commission : [],
      cAddress: cAddress ? cAddress : [],
      image: productInfo?.image,
    };

    console.log(data, "data");

    const response = await MerchantApi({
      token: token,
      data: data,
      query: "addsale",
    });
    console.log(response, "response");
    setLoading(false);

    if (!response.Error) {
      toast.success("Added successfully");
      setTimeout(() => {
        router.push("/dashboard/listedProducts");
      }, [1000]);
    }
    if (response.Error) {
      console.log("error");
      toast.error("Something went wrong! Please try again");
    }
  }
  console.log(productInfo, "productInfo");

  return (
    <div className="productUploadHead">
      <div className="addProduct--div">
        <ToastContainer />
        <div className="productUploadDiv">
          {image ? (
            <label htmlFor="img">
              <div className="upoadproduct-image">
                <img
                  className={loader ? "productImg filter-img" : "productImg"}
                  src={image}
                />
                {loader ? (
                  <Box className="img-loader" sx={{ display: "flex" }}>
                    <CircularProgress color="success" />
                  </Box>
                ) : null}
              </div>
            </label>
          ) : (
            <>
              <label htmlFor="img">
                <div className="upoadproduct-image">
                  <img className="upload-img" src="/img/upload.png" />
                  <span>uplaod image</span>
                  {loader ? (
                    <Box className="img-loader" sx={{ display: "flex" }}>
                      <CircularProgress color="success" />
                    </Box>
                  ) : null}
                </div>
              </label>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={uploadImageFn}
            id="img"
          />
        </div>
        <div className="productDetail-div">
          <form className="productDetail-form" onSubmit={onSubmitFn}>
            <div className="firstDetail">
              <div className="inputSection">
                <h4 className="input-title">Product Name</h4>
                <input
                  className="detailInput"
                  type="text"
                  defaultValue={products?.productName}
                  onChange={(e) =>
                    setProductInfo({
                      ...productInfo,
                      productName: e.target.value,
                    })
                  }
                  required
                  placeholder="Name"
                />
              </div>
              <div className="inputSection">
                <h4 className="input-title">Link</h4>
                <input
                  className="detailInput"
                  required
                  defaultValue={products?.link}
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, link: e.target.value })
                  }
                  type="text"
                  placeholder=" Link"
                />
              </div>
            </div>
            <div className="secondDetail">
              <div className="inputSection">
                <h4 className="input-title">
                  Price <span className="inpu-desc">(In USD)</span>
                </h4>

                <input
                  className="detailInput"
                  defaultValue={products?.price}
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, price: e.target.value })
                  }
                  type="number"
                  step={"0.001"}
                  placeholder=" Price"
                  required
                />
              </div>
              <div className="inputSection">
                <h4 className="input-title">Total Quantity</h4>
                <input
                  className="detailInput"
                  type="number"
                  required
                  defaultValue={products?.description}
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, quantity: e.target.value })
                  }
                  placeholder=" Quantity"
                />
              </div>
            </div>
            <div className="secondDetail">
              <div className="inputSection">
                <IncrementalAddressFields
                  inputFields={inputFields}
                  setInputFields={setInputFields}
                  setShow={setShow}
                  show={show}
                />
                {errMsg && (
                  <div className="error-msg--div">
                    <span className="error-msg">
                      Sum of percentage distribution must be 100
                    </span>{" "}
                  </div>
                )}
              </div>
            </div>
            <div className="secondDetail">
              <div className="inputSection">
                <h4 className="input-title">Description</h4>
                <textarea
                  className="detailInput"
                  style={{ height: "100px" }}
                  rows="4"
                  required
                  defaultValue={products?.price}
                  onChange={(e) =>
                    setProductInfo({
                      ...productInfo,
                      description: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>

            <div className="productButton-div">
              <button className="btn submit-button" type="submit">
                {loading ? (
                  "Loading..."
                ) : (
                  <span>
                    {" "}
                    <span>ADD</span> <i className="bi bi-plus"></i>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
