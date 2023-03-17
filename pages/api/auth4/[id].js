import axios from "axios";

export default async function handler(req, res) {
  console.log(req.query, "hello");
  let query = req.query.id;
  console.log(query, "query");

  if (req.method === "POST") {
    try {
      const { token } = req.body;
      const { data } = req.body;
      console.log(token, data, "data is here");

      var config = {
        method: "post",
        url: "http://52.9.60.249:5000/api/v1/marchent/" + query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      };
      console.log(config);
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err.response.data,'error')
      res.status(400).json({ Error: err.response.data });
    }
  }
}
