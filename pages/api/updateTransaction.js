import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { data } = req.body;

      var config = {
        method: "post",
        url: "http://52.9.60.249:5000/api/v1/auth/updatetransaction",
        data
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      res.status(400).json({ Error: err });
    }
  }
}
