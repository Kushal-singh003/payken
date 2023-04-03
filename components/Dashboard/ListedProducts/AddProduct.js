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
import axios from "axios";

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
    dynamicPrice: false,
    dynamicQuantity: false,
  });
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [priceType, setPriceType] = useState(false);
  const [quantityType, setQuantityType] = useState(false)
  const [inputFields, setInputFields] = useState([
    { address: "", percentage: "" },
    { address: "", percentage: "" },
  ]);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [maticPrice,setMaticPrice] = useState();
  const [minPrice,setMinPrice] = useState();

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "session");
    setToken(session?.access_token);
  }

  async function getMaticPriceFn(){
    try {
      const response = await axios.get('https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=3DP8EIJ53A49TPYD6WWUCVE919S7W7N2RU');
      console.log(response,'matic price')
      const a = response?.data?.result?.maticusd;
      setMaticPrice(a)
     
    } catch (error) {
      console.log(error,'error')
    }
   
  }

  useEffect(() => {
    getSession();
    getMaticPriceFn();
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

    if(productInfo?.price == 'false'){
      if(productInfo?.price < (0.54 / maticPrice) ){
        toast.error(`Min price must be ${parseFloat(0.54 / maticPrice).toFixed(3)}`)
        setLoading(false);
        return;
      }
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
      dynamicPrice:productInfo?.dynamicPrice,
      dynamicQuantity:productInfo?.dynamicQuantity,
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

  function handleDynamicPriceFn(e){
    setPriceType(e.target.checked)
    setProductInfo({...productInfo,dynamicPrice:e.target.checked})
    
  }

  function handleDynamicQuantityFn(e){
    setQuantityType(e.target.checked)
    setProductInfo({...productInfo,dynamicQuantity:e.target.checked})
  }

  

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
                <h4 className="input-title">Link<span className="inpu-desc">(optional)</span></h4>
                <input
                  className="detailInput"

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

              <div className="dynamic-div">
             
             
                <div className="inputSection dynamic-price">
                  <h4 className="input-title">
                    Price <span className="inpu-desc">(In MATIC & min price {parseFloat(0.54 / maticPrice).toFixed(3)} MATIC)</span>
                  </h4>
                  <h6 style={{color:'grey'}}>1 Matic = {maticPrice}USD</h6>

                  <input
                    className="detailInput"
                    defaultValue={products?.price}
                    disabled={ priceType == '1' ? true : false}
                    onChange={(e) =>
                      setProductInfo({ ...productInfo, price: e.target.value })
                    }
                    type="number"
                    step={"0.001"}
                    placeholder=" Price"
                    required
                  />
                </div>
               

                 <div className="inputSection dynamic-toggle">
                <h4 className="input-title">
                  {/* Price <span className="inpu-desc">(In USD)</span> */}
                  Dynamic Price
                </h4>
                {/* <select onChange={(e)=> setPriceType(e.target.value)} defaultValue='0' className="detailInput">
                <option value='0' disabled>--select--</option>
                  <option value='1'>Set a fix price</option>
                  <option value='2'>Set a dynamic price</option>
                </select> */}

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    onChange={(e) => handleDynamicPriceFn(e)}
                  />

                </div>


              </div>


              </div>
              </div>

              <div className="secondDetail">
                <div className="dynamic-div">
                <div className="inputSection dynamic-price">
                  <h4 className="input-title">Total Quantity</h4>
                  <input
                    className="detailInput"
                    type="number"
                    required
                    disabled={ quantityType == '1' ? true : false}
                    defaultValue={products?.description}
                    onChange={(e) =>
                      setProductInfo({ ...productInfo, quantity: e.target.value })
                    }
                    placeholder=" Quantity"
                  />
                </div>
              
                  <div className="inputSection dynamic-toggle">
                <h4 className="input-title">
                  Infinite Quantity
                </h4>
                {/* <select onChange={(e)=> setQuantityType(e.target.value)} defaultValue='0' className="detailInput">
                <option value='0' disabled>--select--</option>
                  <option value='1'>Set a fix Quantity</option>
                  <option value='2'>Set a dynamic Quantity</option>
                </select> */}

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    onChange={(e) => handleDynamicQuantityFn(e)}
                  />

                </div>

                {/* <label className="form-check-label" for="flexSwitchCheckChecked">
            Checked switch checkbox input
          </label> */}
              </div>
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
                <h4 className="input-title">Description<span className="inpu-desc">(optional)</span></h4>
                <textarea
                  className="detailInput"
                  style={{ height: "100px" }}
                  rows="4"
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
