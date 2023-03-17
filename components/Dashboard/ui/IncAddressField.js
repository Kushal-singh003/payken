import React, { useEffect, useState } from "react";

import CreatableSelect from "react-select/creatable";
import axios from "axios";

const IncrementalAddressFields = ({
  setInputFields,
  inputFields,
  show,
  setShow,
}) => {
  const [fieldsCount, setFieldsCount] = useState(2);
  const [allUsers, setAllUsers] = useState([]);

  function handleAddFields() {
    if (fieldsCount == 4) {
      return;
    }
    console.log(Number(inputFields?.length) + 1, "input length");
    setInputFields([...inputFields, { address: "", percentage: "" }]);
    setFieldsCount(fieldsCount + 1);
  }

  function handleRemoveFields(index, event) {
    if (index < 2) {
      return;
    }

    console.log(Number(inputFields?.length) - 1, "input length");

    const value = [...inputFields];
    console.log(value);
    console.log(index);
    value.splice(index, 1);
    console.log(value);
    setInputFields(value);
    setFieldsCount(fieldsCount - 1);
  }

  function handleChange(index, { event }) {
    console.log(event);
    console.log(index, event.target.value);
    console.log(inputFields);
    const value = [...inputFields];
    value[index][event.target.name] = event.target.value;
    setInputFields(value);
  }

  async function getAllUsers() {
    let request = await axios.post("/api/auth3/getallusername");
    let response = request.data.data;
    console.log(response);

    let arr = [];
    response.map((item) => {
      let obj = {
        label: item.display,
        value: item.id,
      };
      arr.push(obj);
    });
    console.log(arr);
    setAllUsers(arr);
  }

  async function showFn(e) {
    console.log(e.target.checked, "checked");
    setShow(e.target.checked);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="left-setting">
      <div className="head">
        Split Commission
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
            onChange={(e) => showFn(e)}
          />
          {/* <label className="form-check-label" for="flexSwitchCheckChecked">
            Checked switch checkbox input
          </label> */}
        </div>
      </div>

      {show ? (
        <>
          <p>
            To invite new users for Commission enter user email and click
            create.
          </p>
          {inputFields.map((item, index) => (
            <div className="input-form d-flex commission-div">
              <div className="wallet-address-sec">
                <h5>Payken User</h5>
                <CreatableSelect
                  options={allUsers}
                  className="form-control text-dark"
                  placeholder="Select user"
                  onChange={(e) => {
                    handleChange(index, {
                      event: { target: { value: e.value, name: "address" } },
                    });
                    console.log(e);
                  }}
                  value={inputFields.name}
                  name="address"
                />

                {/* <SelectSearch   key={"address" + index} search='true'   options={allUsers}   /> */}
                {/* <input
              type="text"
        
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              key={"address" + index}
              name="address"
              //  className="properties-textarea"
              value={inputFields.name}
              onChange={(event) => handleChange(index, event)}
            /> */}
              </div>

              <div className="percentage-div">
                <div className=" m-3 commission-per">
                  <h5>Percentage:</h5>
                  <input
                    //   onChange={(e) =>
                    //     setSplitData({ ...splitData, : e.target.value })
                    //   }
                    //   defaultValue={user?.user_metadata?.name}
                    type="number"
                    className="form-control"
                    placeholder="%"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    key={"percentage" + index}
                    name="percentage"
                    //  className="properties-textarea"
                    value={inputFields.name}
                    onChange={(event) => handleChange(index, { event })}
                  />
                </div>

                <div style={{ width: "20%" }} id="add-btn-sec">
                  <img
                    onClick={() => handleRemoveFields(index)}
                    alt="sub"
                    src="/img/sub.png"
                    width="24"
                  />
                  <img
                    onClick={handleAddFields}
                    alt="add"
                    src="/img/add.png"
                    width="26"
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default IncrementalAddressFields;
