import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // const id = req.body.id;
      // console.log(id, "to send the id of the user to the api to get nft Data")
      const { data } = req.body;
      const { token } = req.body;
      console.log(data,token, "to show the data to api");
      var config = {
        method: "post",
        url: "http://52.9.60.249:4000/api/v1/member/updatetransaction",
        data,
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
