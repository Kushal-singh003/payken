import axios from "axios";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
export default async function handler(req, res) {
  
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.method === "POST" && session) {
    try {
      let data = req.body;
      let url =" http://52.9.60.249:5000/api/v1/member/"
      let query = req.query.auth;
      console.log(data,url+query , "-----------")
      var config = {
        method: "post",
        url:url+query,
        headers: {
          Authorization: `Bearer ${session.access_token} `,
        },data
      };
      let datafirst = await axios(config);
      console.log(datafirst.data,"auth api hit--------------------------------");
      res.status(200).json({ data: datafirst.data.data });
    } catch (err) {
      console.log(err?.response?.data,"auth api hit");
      res.status(400).json({data:  err?.response?.data} );
    }
  } else {
    console.log(req.body,"fuckk")
    return res.status(401).json({ error: "Unauthorized by mdl" });
  }
}