import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap';
import supabase from "../../../utils/SupabaseClient"

let list = [];
  let list2 = [];

const PageTwo = ({
  max,
  min,
  price,
  upCount,
  setUpCount,
  createPaymentIntent,
  formValues,
  setFormValues,
}) => {
  console.log(max, min, price, upCount, "data");
  const [token, setToken] = useState();
  const [data, setData] = useState();
  // const [formValues, setFormValues] = useState([
  //   //  { name: "", value:"",type:"" },
  // ]);

  // async function addClickHandler(e) {
  //   if (upCount + 1 > max) return;
  //   setUpCount(upCount + 1);
  //   handleChange2(e[1]);
  // }

  // let handleChange2 = (e) => {
  //   const name = e;

  //   list[name] = upCount;

  //   // list[index][name] = value;
  //   // list.forEach(function (element, index) {
  //   //   element.id = index;
  //   // });

  //   setFormValues( list );
  // };

  // async function seprectClickHandler(e) {
  //   if (upCount - 1 < min) return;
  //   setUpCount(upCount - 1);
  // }

  useEffect(() => {
    const contractId = localStorage.getItem("contractIdentity");
    console.log(contractId, "id");
    getAvatar();
    getParameters(contractId);
  }, [token]);

  async function getParameters(data) {
    try {
      const response = await axios.post("/api/getParameters", {
        data: data,
        token: token,
      });
      console.log(response, "parameters");
      setData(JSON.parse(response.data.data.data.data));
    } catch (error) {
      console.log(error);
    }
  }

  async function getAvatar() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    // setEmail(session?.user?.email)
    setToken(session?.access_token);
  }

  let handleChange = (index, e) => {
    const { name, value } = e.target;

    // list[name] = value;
    if (value == '') {
      return;
    }
    
    list.push(value);
    

    // list[index][name] = value;
    // list.forEach(function (element, index) {
    //   element.id = index;
    // });

    setFormValues( list  );
  };

  console.log(formValues, "formValues");

  return (
    <form id="purchase-form">
      <div className="purchase-heading">
        <h3 className="purchase-txt">PURCHASE </h3>
        <p>Set 2 of 3</p>
      </div>
      <div className="progress" id="purchase-progress">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: "100%" }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      <p className="purchase-text">Purchase your NFT with NFTpay</p>
      {/* 
      <h6>Choose quantity</h6>
      <div className="number-section">
      <div className="number-count">
        <h3> {upCount}</h3>
      </div>
      <div className="arrows-section">
        <i
          className="bi bi-caret-up-fill"
          onClick={(e) => addClickHandler(e.target.value)}
        ></i>
        <i
          className="bi bi-caret-down-fill"
          onClick={(e) =>
            seprectClickHandler(e.target.value)
          }
        ></i>
      </div>
    </div>
    <h4>SuperDope</h4>
    <h6 style={{ color: "white" }} className="max-text">
      Maximum {max}
    </h6>
    <h6 style={{ color: "white" }} className="max-text">
      {" "}
      Price {price}{" "}
    </h6>
    <h6 style={{ color: "white" }} className="max-text">
      {" "}
      Total Price {(price * upCount).toFixed(4)}
    </h6> */}
      <h3>Max Mint : {max} </h3>

      {data?.map((item, index) => (
        <div key={index} className="container2">
          <div>
            <h5>
              {item.name} 
            </h5>
          </div>
          <div>
            {item.value == 1 ? (
              <>
                <div className="number-count">
                  {/* <h3> */}
                  {/* <input
                    name={item.name}
                    onChange={(e) => handleChange(index, e)}
                    value={upCount}
                  />{" "} */}
                  {/* {upCount}
                  </h3> */}

                  <input
                    name={item.name}
                    onChange={(e) => handleChange(index, e)}
                    type="number"
                    // defaultValue={upCount}
                  />
                </div>
                {/* <div className="arrows-section">
                  <i
                    className="bi bi-caret-up-fill"
                    onClick={(e) =>
                      addClickHandler([e.target.value, item.name])
                    }
                  ></i>
                  <i
                    className="bi bi-caret-down-fill"
                    onClick={(e) => seprectClickHandler(e.target.value)}
                  ></i>
                </div> */}
              </>
            ) : (
              <input
                name={item.name}
                onChange={(e) => handleChange(index, e)}
                type="text"
              />
            )}
          </div>
        </div>
      ))}

      {/* <div className="form-check mt-3" id="form-checkers">
      <input
        className="form-check-input checker-setting"
        type="checkbox"
        value=""
        required
        id="defaultCheck1"
        onChange={(e) => console.log(e.currentTarget.value)}
      />
      <label
        className="form-check-label"
        htmlFor="defaultCheck1"
        id='agree-text-two'
      >
        I Agreed to all terms and conditions
      </label>
    </div> */}

      {/* <div>
    <ConnectButton/>
  </div> */}

      {/* <Link href="/connectButton"> */}
      <div className="google-btn mt-2">
        <Button
          variant="secondary"
          className="form-group w-100 btn-outline-light"
          id="create-btn"
          style={{ marginTop: "1rem !important" }}
          type="button"
          // disabled={isLoading}
          onClick={createPaymentIntent}
        >
          {/* {isLoading ? "Loading…" : "   Submit"}
           */}
          Submit
        </Button>
      </div>
      {/* </Link> */}
    </form>
  );
};

export default PageTwo