// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (req.method === 'POST') {
        res.status(200).json({ user:{name:"abc",gmail:"abc@gmail.com"},accesstoken:"fadsfews",success:true })
      } else {
        // Handle any other HTTP method
        res.status(200).json({ user:{name:"abc",gmail:"abc@gmail.com"},accesstoken:"fadsfews" })
      }
  }
  