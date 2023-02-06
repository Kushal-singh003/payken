import React from 'react'
import EmailModify from '../../Component/Settings/EmailModify'





const changePassword = () => {
  return (
    <div>
      <EmailModify/>
    </div>
  )
}

export default changePassword

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props:{
//       session
//     }
//   }
// }