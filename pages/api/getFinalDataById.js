import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {id} = req.body;
      const { token } = req.body;
      // const userId = req.body;
      // const userId = req.body

      console.log(id,token, "to send the token to the api");
      var config = {
        method: "post",
        url: "http://52.9.60.249:4000/api/v1/member/getpgbyid",
        data:{id:id} ,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        res.status(200).json({ data: response.data.data });
      });
    } catch (err) {
      // console.log(err.response.data);
      res.status(500).json({ Error: err });
    }
  }
}
