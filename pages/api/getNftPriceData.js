import axios from "axios";

export default async function handler(req, res) {

  if (req.method === "POST") {
    try {
        // const email = req.body.email;
        // console.log(email, "to send the email to the api to get nft Data")
        var config = {
          method: 'get',
          url: 'https://rest.coinapi.io/v1/exchangerate/MATIC/USD',
          headers: { 
            'X-CoinAPI-Key': 'C15A8974-F200-4C1A-B440-CB473FA922DB'
          }
        };
      console.log(config)
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