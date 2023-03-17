import React, { useState, useEffect } from "react";
import supabase from "@/components/Utils/SupabaseClient";
import { withToken } from "@/components/Utils/Functions";
import { MerchantApi } from "@/components/Utils/Functions";
import { useRouter } from "next/router";

export default function SellProducts() {
  const [image, setImage] = useState();
  const [productInfo, setProductInfo] = useState({ productName: '', price: '', image: '', description: '', link: '', })
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false)
  const router = useRouter();


  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      'session'
    );
    setToken(session?.access_token)

  }

  useEffect(() => {
    getSession();
  }, [])


  async function uploadImageFn(e) {
    e.preventDefault();
    console.log(e.target.files[0], 'hello')
    const url = URL.createObjectURL(e.target.files[0]);
    setImage(url)

    const productName = Math.floor(Math.random() * 999999999999999);

    const { data, error } = await supabase
      .storage
      .from('productimages')
      .upload(`${productName}`, e.target.files[0])

    if (data) {
      console.log(data, 'data')
      setProductInfo({ ...productInfo, image: 'https://ankjqfoklsiopugetikl.supabase.co/storage/v1/object/public/productimages/' + productName })

    }
    console.log(error, 'error');
  }

  async function onSubmitFn(e) {
    e.preventDefault();
    setLoading(true)
    const response = await MerchantApi({ token: token, data: productInfo, query: 'addsale' })
    console.log(response, 'response');
    setLoading(false)

    if (!response.Error) {
      router.push('/dashboard/listedProducts');
    }
    if (response.Error) {
      console.log('error')
    }

  }

  return (
    <div className="productUploadHead">
      <div className="productUploadDiv">
        {image ?
          <label htmlFor="img">
            <div className="upoadproduct-image">
              <img className="productImg" src={image || "/img/credit-card.png"} />
            </div>
          </label>
          :
          <label htmlFor="img">
            <div className="upoadproduct-image">
              <img src="/img/credit-card.png" />

            </div>
          </label>
        }

        <input type='file' accept="image/*" onChange={uploadImageFn} id="img" />

      </div>
      <div className="productDetail-div">
        <form className="productDetail-form" onSubmit={onSubmitFn}>
          <div className="firstDetail">
            <div className="inputSection">
              <h4 className="input-title">Name</h4>
              <input
                className="detailInput"
                type="text"
                onChange={(e) => setProductInfo({ ...productInfo, productName: e.target.value })}
                placeholder="Name"
              />
            </div>
            <div className="inputSection">
              <h4 className="input-title">Link</h4>
              <input
                className="detailInput"
                onChange={(e) => setProductInfo({ ...productInfo, link: e.target.value })}
                type="text"
                placeholder=" Link"
              />
            </div>
          </div>
          <div className="secondDetail">
            <div className="inputSection">
              <h4 className="input-title">Price</h4>
              <input
                className="detailInput"
                onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
                type="text"
                placeholder=" Price"
              />
            </div>
            <div className="inputSection">
              <h4 className="input-title">Description</h4>
              <input
                className="detailInput"
                type="text"
                onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
                placeholder=" Description"
              />
            </div>
          </div>

          <div className="productButton-div">
            <button className="btn submit-button" type="submit">{loading ? 'Loading...' : 'Submit'}</button>

          </div>
        </form>
      </div>
    </div>
  );
}
