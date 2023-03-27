import React, { useState, useEffect, useContext } from "react";
import supabase from "@/components/Utils/SupabaseClient";
import { withToken } from "@/components/Utils/Functions";
import { MerchantApi } from "@/components/Utils/Functions";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "react-bootstrap";
import { ConfigContext } from "@/components/ui/UseContextHook";
import LoginModal from "@/components/ui/LoginModal";

export default function ListedProducts() {
  const [products, setProducts] = useState();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [added, setAdded] = useState(0);
  const [deleteId, setDeleteId] = useState();
  const [lengthOfData, setLengthOfData] = useState(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { config, setConfig } = useContext(ConfigContext);
  const [sessionData,setSessionData] = useState(null);
  const [showModal,setShowModal] = useState(false);

  async function getProductsFn(token) {
    const response = await MerchantApi({
      token: token,
      query: "getsalebyuuid",
    });
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
    setSessionData(session)
    const token = session?.access_token;

    getProductsFn(token);
    setToken(session?.access_token);
  }

  useEffect(() => {
    getSession();
    setOpen(true);
    console.log(config, "confgig");
  }, [added]);

  function handleDeleteFn({ e, id }) {
    e.preventDefault();
    console.log(id, "id is here");
    setDeleteId(id);
    setVisible(true);
  }

  async function deleteProductFn(e) {
    e.preventDefault();
    setLoading(true);

    const response = await MerchantApi({
      token: token,
      data: { id: deleteId },
      query: "deletesale",
    });
    console.log(response, "response");

    if (response.Error) {
      console.log("error");
      setLoading(false);
    }

    if (!response.Error) {
      console.log("deleted");
      toast.success("Product deleted successfully");
      setLoading(false);
      setVisible(false);
      setAdded(added + 1);
    }
  }

  function nextFn({ e, id }) {
    router.push({
      pathname: "/dashboard/listedProducts/editProduct",

      query: { id },
    });
  }

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  function addNewFn(e) {
    e.preventDefault();
    router.push("/dashboard/listedProducts/addProduct");
  }

  function nextFn2({ e, id }) {
    console.log(e, id, "id");

    router.push("/dashboard/allProducts/buyProduct/" + id);
  }

  function handleModalFn(){
    setModalShow(true)
  }

  return (
    <div className="productUploadHead">
      <ToastContainer />
      <Backdrop
        sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="container-fluid">
        <div className="products-heading">
          <h3>Your Listed Products</h3>
          <button onClick={addNewFn}>Add New</button>
        </div>

        <div className="row">
          <div className="cards-head">
            {products?.map((item, idx) => {
              return (
                <>
                  <div className="card col-md-3">
                    <img
                      onClick={(e) => nextFn2({ e, id: item.id })}
                      className="card-img"
                      src={item.image || "/img/money-transfer.png"}
                      alt=""
                    />

                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success dropDown-color"
                        id="dropdown-basic"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {/* <Dropdown.Item
                          onClick={(e) => nextFn({ e, id: item.id })}
                        >
                          Edit
                        </Dropdown.Item> */}
                        <Dropdown.Item
                          onClick={(e) => handleDeleteFn({ e, id: item.id })}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <div className="card-bodys">
                      <div className="cardFooter-sec">
                        <h4 className="productName">{item.productName}</h4>
                        <h4 className="productPrice">
                          {" "}
                          <span>{item.price} </span> <span>MATIC</span>
                        </h4>
                      </div>

                      <div className="paymentBtn-sec">
                        {/* <button type="button" className="btn addToCart">
                          Add to Cart
                        </button> */}
                        <button
                          onClick={sessionData ? (e) => nextFn2({ e, id: item.id }) : handleModalFn()}
                          type="button"
                          className="btn addToCart"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

           
			  {lengthOfData == 0 ? <div className="not-found">
				<span>Not found</span>
			  </div>
			  : null}

			  {lengthOfData == null ? <div className="loading-div">
				<span></span>
			  </div>:null}
            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={visible}
              onClose={closeHandler}
            >
              <Modal.Body>
                <div className="merchant-pop">
                  <p>Do you want to delete this Product?</p>
                  <div className="merchant-btn">
                    <button onClick={(e) => deleteProductFn(e)}>
                      {loading ? "Loading..." : "Delete"}
                    </button>
                    <button onClick={closeHandler}>Cancel</button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
