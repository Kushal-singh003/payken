import React, { useState, useEffect } from "react";
import supabase from "@/components/Utils/SupabaseClient";
import { withToken } from "@/components/Utils/Functions";
import { MerchantApi } from "@/components/Utils/Functions";
import { useRouter } from "next/router";

export default function EditProduct() {
    const [image, setImage] = useState();
    const [productInfo, setProductInfo] = useState({id:'',quantity:'', productName: '', price: '', image: '', description: '', link: '', })
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(false);
    const [products,setProducts] = useState();
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
        const d = session?.access_token;
        getProductsFn(d)

    }

    useEffect(() => {
        getSession();
        console.log(router.query,'router query')
    }, [router?.query])


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
        console.log(productInfo,'product info');
        const response = await MerchantApi({ token: token, data: productInfo, query: 'updatesale' })
        console.log(response, 'response');
        setLoading(false)

        if (!response.Error) {
            router.push('/dashboard/listedProducts');
        }
        if (response.Error) {
            console.log('error')
        }

    }

    async function getProductsFn(d) {
        const response = await MerchantApi({ token: d, query: "getsalebyuuid" });
        console.log(response, "response");

        const filteredData = response?.data?.data?.filter((item)=>{
            if(item.id == router.query.id){
                return item;
            }
        })

        console.log(filteredData[0],'da');
        setImage(filteredData[0]?.image)
        setProductInfo({...productInfo,id:router?.query?.id,productName:filteredData[0]?.productName,link:filteredData[0]?.link,description:filteredData[0]?.description,image:filteredData[0]?.image,price:filteredData[0]?.price,quantity:filteredData[0]?.quantity}) 
        setProducts(filteredData[0]);
    }

    return (
        <div className="productUploadHead">
            <div className="addProduct--div">
            <div className="productUploadDiv">
                {image ?
                    <label htmlFor="img">
                        <div className="upoadproduct-image">
                            <img className="productImg" src={image} />
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
                            <h4 className="input-title">Product Name</h4>
                            <input
                                className="detailInput"
                                type="text"
                                defaultValue={products?.productName}
                                onChange={(e) => setProductInfo({ ...productInfo, productName: e.target.value })}
                                placeholder="Name"
                            />
                        </div>
                        <div className="inputSection">
                            <h4 className="input-title">Link</h4>
                            <input
                                className="detailInput"
                                defaultValue={products?.link}
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
                defaultValue={products?.price}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, price: e.target.value })
                }
                type="text"
                placeholder=" Price"
              />
            </div>
            <div className="inputSection">
              <h4 className="input-title">Total Quantity</h4>
              <input
                className="detailInput"
                type="number"
                defaultValue={products?.quantity}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, quantity: e.target.value })
                }
                placeholder=" Quantity"
              />
            </div>
          </div>
          <div className="secondDetail">
            <div className="inputSection">
              <h4 className="input-title">Description</h4>
              <textarea
                className="detailInput"
                style={{height:'100px'}}
                rows='4'
                defaultValue={products?.description}
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
                        <button className="btn submit-button" type="submit">{loading ? 'Loading...' : 'UPDATE'}</button>

                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}
