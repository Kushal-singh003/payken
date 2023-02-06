import React from 'react'
import { useRouter } from 'next/router'
import SuccessPage from '../../Component/NFT/SuccessPage'
import Router from 'next/router'

const successPage = () => {
  return (
    <div>
        <SuccessPage/>
    </div>
  )
}

export default successPage

// export async function getServerSideProps(){
//   // const router = useRouter();
//   console.log(Router,"to see the query")
//   // const {params} = await context
//   // console.log(params,"to see the params")
//   return{
//     props:{
//       data:"helloo"
//     }
//   }

// }