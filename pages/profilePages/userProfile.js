import React from 'react'
import UserProfile from '../../Component/Profile/UserProfile'

const userprofile = () => {
  return (
    <div>
        <UserProfile/>
  
    </div>
  )
}

export default userprofile;

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