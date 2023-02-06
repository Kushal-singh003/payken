import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // const {email} = req.body;
      const data = req.body.data;
      console.log(data, "to send the token to the api");
      var config = {
        method: "post",
        url: "http://52.9.60.249:4000/api/v1/auth/token",
        data,
      };
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
