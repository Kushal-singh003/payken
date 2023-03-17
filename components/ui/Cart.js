import React, { useState, useEffect } from "react";
import { ConfigContext } from "./UseContextHook";
import { withToken } from "../Utils/Functions";
import supabase from "../Utils/SupabaseClient";
import { Loading } from "@nextui-org/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";


export default function Cart() {
  const { config, setConfig } = React.useContext(ConfigContext);
  const [quantity, setQuantity] = useState(null);
  const [tokenData, setTokenData] = useState();
  const [cartData, setCartData] = useState();
  const [added, setAdded] = useState(0);
  const [itemId, setItemId] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [itemId2, setItemId2] = useState(null);
  const [open, setOpen] = useState(false);
  const [lengthOfData,setLengthOfData] = useState(null);
  const [total,setTotal] = useState();

  useEffect(() => {
    console.log(config, "config");
    setOpen(true);
    getSession();
  }, [added]);

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "session");
    const token = session?.access_token;
    setTokenData(session?.access_token);
    getCartDataFn(token);
  }

  async function getCartDataFn(token) {
    const response = await withToken({ token: token, query: "getcart" });
    console.log(response, "response get cart data");
	let sum=0;
    if (!response.Error) {
      console.log("success");
	  setLengthOfData(response?.data?.data?.length)
	  	  response?.data?.data?.forEach(value => {
		sum += value?.price * value?.quantity;
	  });

	  console.log(sum+1,'sum')
	  setTotal(sum)
      setCartData(response?.data?.data);
      setOpen(false);
    }

    if (response.Error) {
      console.log("error");
      setOpen(false);
    }
  }

  async function removeCartItemFn({ e, id }) {
    e.preventDefault();
    setItemId(id);
    setLoading1(true);
    const response = await withToken({
      token: tokenData,
      data: { id: id },
      query: "removefromcart",
    });
    console.log(response, "response,remove item");

    if (!response?.Error) {
      console.log("success");
      setLoading1(false);
      setItemId(null);
      setAdded(added + 1);
    }

    if (response?.Error) {
      console.log("errror");
      setLoading1(false);
      setItemId(null);
    }
  }

  async function changeQuantityFn({ e, id }) {
    e.preventDefault();

    setQuantity(e.target.value);
    setItemId2(id);

	const a = e.target.value;
	const b = id;
	let newItem=[];


	const updatedData  = cartData?.map((item,idx)=>{
		if(item.id == b){
			 newItem[idx]= {...item,quantity:a}
			console.log(newItem,'newItem')
		}else{
			newItem[idx]=item;
		}
		
	})

	var result = cartData.reduce(function(tot, arr) { 

		return tot + (arr.price * arr.quantity);
	  
		
	  },0);


	  setTotal(result+1)
	  console.log(result+1,'total')
	setCartData(newItem);

  }

  return (
    <div>
      <section className="cart-section">
        <Backdrop
          sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div id="cart" className="container main-section">
          <div className="row">
            <div className="col-lg-12 pb-2">
              <h4>Shoping Cart</h4>
            </div>
            <div className="col-lg-12 pl-3 pt-3">
              <table className="table  border bg-white">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th style={{ width: "10%" }}>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData?.map((item, idx) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <div className="row cart-main-div">
                              <div className="col-lg-2 Product-img">
                                <img
                                  src={
                                    item?.image ||
                                    "https://images.unsplash.com/photo-1562106783-b9ca87a40fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=60"
                                  }
                                  alt="..."
                                  className="img-responsive"
                                />
                              </div>
                              <div className="col-lg-10">
                                <h4 className="nomargin">
                                  {item?.productName}
                                </h4>
                              </div>
                            </div>
                          </td>
                          <td>
                            {" "}
                            <div className="cart-div">{item?.price}</div>{" "}
                          </td>
                          <td data-th="Quantity">
                            <div className="cart-div">
                              <input
                                type="number"
                                onChange={(e) =>
                                  changeQuantityFn({ e, id: item.id })
                                }
                                className="form-control text-center cart-input"
                                // defaultValue={
                                //   quantity && itemId2 == item?.id
                                //     ? quantity
                                //     : item?.quantity
                                // }
								defaultValue={item?.quantity}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="cart-div">
                              {quantity && itemId2 == item?.id
                                ? quantity * item?.price
                                : item?.quantity * item?.price}
                            </div>
                          </td>
                          <td
                            className="actions"
                            data-th=""
                            style={{ width: "10%" }}
                          >
                            {/* <button className="btn btn-warning btn-sm"><i className="fa fa-refresh"></i></button> */}
                            <div className="cart-div">
                              <button
                                onClick={(e) =>
                                  removeCartItemFn({ e, id: item?.id })
                                }
                                className="btn btn-danger btn-sm"
                              >
                                {loading1 && itemId == item?.id ? (
                                  <Loading size="sm" color="white" />
                                ) : (
                                  <i className="bi bi-trash3"></i>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
				{lengthOfData == 0 || lengthOfData == null ? null :
                <tfoot>
                  <tr className="tfoot-tr" id="tfoot-tr">
                    <td>
                      <a href="#" className="btn btn-info  cartCancel">
                        <i className="fa fa-angle-left"></i> Continue Shopping
                      </a>
                    </td>
                    <td colspan="2" className="hidden-xs"></td>
                    <td
                      className="hidden-xs text-center"
                      style={{ width: "10%" }}
                    >
                      <strong>Total : {total}</strong>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="btn btn-success btn-block cartCheckout"
                      >
                        Checkout <i className="fa fa-angle-right"></i>
                      </a>
                    </td>
                  </tr>
                </tfoot>}
              </table>

			  {lengthOfData == 0 ? <div className="not-found">
				<span>Not found</span>
			  </div>
			  : null}

			  {lengthOfData == null ? <div className="loading-div">
				<span></span>
			  </div>:null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
