import React, { useState, useEffect } from "react";
import supabase from "@/components/Utils/SupabaseClient";
import { withToken } from "@/components/Utils/Functions";
import { withAuth } from "@/components/Utils/Functions";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ConfigContext } from "@/components/ui/UseContextHook";
import { Loading } from "@nextui-org/react";
import LoginModal from "@/components/ui/LoginModal";
import Login from "@/components/Login/Index";

let list = [];

export default function AllProducts() {
  const [products, setProducts] = useState();
  const router = useRouter();
  const [lengthOfData, setLengthOfData] = useState(null);
  const [open, setOpen] = useState(false);
  const { config, setConfig } = React.useContext(ConfigContext);
  const [cart, setCart] = useState([]);
  const [tokenData, setTokenData] = useState();
  const [showAdded, setShowAdded] = useState(false);
  const [showId, setShowId] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [session,setSession] = useState(null)

  async function getProductsFn(token) {
    const response = await withAuth({ query: "getsale" });
    console.log(response, "response");
    setProducts(response?.data?.data);
    setLengthOfData(response?.data?.data?.length);
    setOpen(false);
  }

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "session");
    setSession(session);
    const token = session?.access_token;
    setTokenData(session?.access_token);

    getProductsFn(token);
  }

  useEffect(() => {
    setOpen(true);
    getSession();
  }, []);

  function nextFn({ e, id }) {
    console.log(e, id, "id");

    router.push("/dashboard/allProducts/buyProduct/" + id);
  }

  async function addToCartFn({ e, item, idx }) {
    e.preventDefault();
    setShowId(item.id);
    setLoading1(true);
    console.log(item, "item");

    setConfig((oldArray) => [...oldArray, item]);
    // setCart(oldArray => [...oldArray,item])
    // list.push(item);
    // console.log(list,'list  of cart items')
    const newItem = { ...item, quantity: 1 };
    console.log(newItem, "newItem");

    const response = await withToken({
      data: newItem,
      token: tokenData,
      query: "addtocart",
    });
    console.log(response, "response");

    if (!response.Error) {
      console.log("success");
      setLoading1(false);
      setShowAdded(true);

      setTimeout(() => {
        setShowAdded(false);
        setShowId(null);
      }, [1000]);
    }

    if (response.Error) {
      console.log("error");
      setLoading1(false);
    }
  }

  function handleModalFn(){
    setShowModal(true);
  }

  console.log(config, "congig");

  return (
    <div className="productUploadHead">
      <Backdrop
        sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="container-fluid">
        <div className="products-heading">
          <h3>Products Collection</h3>
        </div>
        <div className="row">
          <div className="cards-head">
            {products?.map((item, idx) => {
              return (
                <>
                  <div className="card col-md-3">
                    <img
                      className="card-img"
                      onClick={(e) => nextFn({ e, id: item.id })}
                      src={item.image || "/img/money-transfer.png"}
                      alt=""
                    />
                    <div className="card-bodys">
                      <div className="cardFooter-sec">
                        <h4 className="productName">{item.productName}</h4>
                        <h4 className="productPrice">{item.price}MATIC</h4>
                      </div>

                      <div className="paymentBtn-sec cart-div ">
                        <button
                          onClick={(e) => addToCartFn({ e, item, idx })}
                          type="button"
                          className="btn addToCart cart-btn"
                        >
                          {showAdded && showId == item.id ? (
                            <span>
                              {" "}
                              <i className="bi bi-check2 "></i> added
                            </span>
                          ) : loading1 && showId == item.id ? (
                            <Loading size="sm" color="white" />
                          ) : (
                            "add to cart"
                          )}
                        </button>

                        <button
                          onClick={session ? (e) => nextFn({ e, id: item.id }) : handleModalFn}
                          type="button"
                          className="btn addToCart cart-btn"
                        >
                          buy
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

            <LoginModal showModal={showModal} setShowModal={setShowModal} />

            
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
    </div>
  );
}
