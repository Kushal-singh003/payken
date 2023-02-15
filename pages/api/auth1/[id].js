import axios from "axios";

export default async function handler(req, res) {
  console.log(req.query,'hello');
  let query = req.query.id;

  if (req.method === "POST") {
    try {
      // const { token } = req.body;
        const { data } = req.body;

      var config = {
        method: "post",
        url: "http://52.9.60.249:4000/api/v1/auth/" + query,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        data,
      };
      console.log(config);
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  }
}
