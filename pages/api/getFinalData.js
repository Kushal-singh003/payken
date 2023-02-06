import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const token = req.body.id;
      console.log(token, "to send the id of the user to the api to get nft Data");
      var config = {
        method: "post",
        url: "http://52.9.60.249:4000/api/v1/member/getpg",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
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
