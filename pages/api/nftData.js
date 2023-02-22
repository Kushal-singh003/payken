import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { data } = req.body;
      console.log(data?.uri, data?.id, data, "data is here");

      var config = {
        method: "get",
        url: `${data?.uri + data?.id}`,
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  }
}
