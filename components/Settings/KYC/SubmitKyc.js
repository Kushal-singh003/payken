import React from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import axios from "axios";
import { Axios } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import supabase from "@/components/Utils/SupabaseClient";

const SubmitKyc = () => {

  let config = {
    lang: "en", //language of WebSDK texts and comments (ISO 639-1 format)
    email: "bpsr.rana@gmail.com",
    phone: "",
    i18n: {
      document: {
        subTitles: {
          IDENTITY: "Upload a document that proves your identity"
        }
      }
    }, //JSON of custom SDK Translations
    // uiConf: {
    //   customCss: "https://url.com/styles.css",
    //   // URL to css file in case you need change it dynamically from the code
    //   // the similar setting at Customizations tab will rewrite customCss
    //   // you may also use to pass string with plain styles `customCssStr:`
    // },
  };

  
  let options = ({ addViewportTag: false, adaptIframeHeight: true })
  let errorHandler = ((error) => console.log(error))
  let messageHandler = ((msg) => console.log(msg))
  let [accessToken, setAccessToken] = useState('')


  async function accessTokenExpirationHandler() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session?.user?.id, 'access id');
    let data = await axios.post("/api/getaccesstoken", { id: session?.user?.id })
    // return Promise.resolve(newAccessToken)// get a new token from your backend
    setAccessToken(data.data.data.token)
    return data.data.data.token;
  }
  // accessTokenExpirationHandler()
  useEffect(() => {
    accessTokenExpirationHandler()
  }, [])


  return (
    <>
      <div className="submitkyc">

        {accessToken && <SumsubWebSdk
          accessToken={accessToken}
          expirationHandler={() => Promise.resolve(accessTokenExpirationHandler)}
          config={config}
          options={options}
          onMessage={messageHandler}
          onError={errorHandler}
        />}
      </div>
    </>
  );
};

export default SubmitKyc;
