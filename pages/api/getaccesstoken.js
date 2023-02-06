import axios from "axios";
import crypto from "crypto";
export default async function handler(req, res) {

  if (req.method === "POST") {
    try {
        const id = req.body.id;
        var ts = Math.floor(Date.now() / 1000);
        // const signature = crypto.createHmac('sha256',  SUMSUB_SECRET_KEY);
        // signature.update(ts + config.method.toUpperCase() + config.url);
        const signature = crypto.createHmac('sha256', "X9LcZgL6RwtglltLLUKCk3xZzzVJtHji");
  signature.update(ts + "POST"+ `/resources/accessTokens?userId=${id}&levelName=basic-kyc-level&ttlInSecs=600`);
console.log(ts,signature);
        console.log(id, "to send the id of the user to the api to get nft Data")
      var config = {
        method: "post",
        url: `https://api.sumsub.com/resources/accessTokens?userId=${id}&levelName=basic-kyc-level&ttlInSecs=600`
        , headers: { 
          'Accept': 'application/json',
          'X-App-Token': 'sbx:JisfuY1hb1QMUg358FS1eMeK.rYmy6VhFEuOYYKnRbDsCIldoFxwQDM7O',
          "X-App-Access-Sig":signature.digest('hex'),
          "X-App-Access-Ts":ts
        } 
      };
      console.log(config)
      console.log(config);
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}