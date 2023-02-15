import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { contractAddress, chain } = req.body;
      let request;
      if (chain == 4 || chain == 3) {
        request = await axios.get(
          `https://api-testnet.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_etherscan}`
        );
      } else if (chain == 1) {
        request = await axios.get(
          `https://api-testnet.bscscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_bscscan}`
        );
      } else {
        request = await axios.get(
          `https://api-testnet.polygonscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_polygonscan}`
        );
      }

      const data = request.data;
      console.log(data);
      res.status(200).json({ data: data });
    } catch (err) {
      console.log(err);
      res.status(403).json({ error: err });
    }
  }
}
