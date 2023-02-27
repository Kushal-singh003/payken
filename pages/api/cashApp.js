import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { data } = req.body;
      const {token} = req.body;
      console.log(data,token,'toeknand data')

      var config = {
        method: "post",
        url: 'https://cash.app/api/payment-links',
        data,
        headers: {
            Authorization: `Bearer ${token}`,
          },
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  }
}
