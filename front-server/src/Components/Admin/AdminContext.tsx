import { useLazyGetAdminUserListQuery, usePutUserdataMutation } from "../../Store/api";
import { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";





function AdminContext(): JSX.Element {
  const [username, setUsername] = useState<string>('test13');
  const userId = 39
  const nickname = '빅팜'
  const data:any = [39,'빅팜','000-0000-0000','test13']

  const [userList, setUserList] = useState([{'username':0},{'username':1}])
  // const [getRefreshToken, { data:accessToken, isLoading:tokenLoading , error }] = useLazyGetRefreshTokenQuery()
  const [getAdminUser] = useLazyGetAdminUserListQuery();

  const mutation = usePutUserdataMutation()

  const setUserData = mutation[0]
  const click = () => {
    getAdminUser('').unwrap().then((r)=> {          
      setUserList(r.data)
    })
  }


  // const click = async() => {
  //   const getUserlist = getAdminUser('')
  //   getUserlist.unwrap().then((r)=> {      
  //     if (r.status === '401') {
  //       const data = getRefreshToken(username)
  //       data.unwrap().then((r)=> {
  //         localStorage.setItem("accessToken", r.accessToken)
  //       }).then(()=> {
  //         getAdminUser('').unwrap().then((r)=> {
  //           setUserList(r.data)
  //         })
  //       })
  //     } else {
  //       getAdminUser('').unwrap().then((r)=> {          
  //         setUserList(r.data)
  //       })
  //     }
  //   })
  // }


  const update = async() => {
    setUserData(data)
  }




  return (
    <>
      <button onClick={click}>Click</button>
      {
        userList?(userList.map((e)=> {
          return <div>{e.username}</div>
        })):<>없어요</>
      }
      <button onClick={update}>수정</button>
      <button>내 정보는?</button>
    </>
  );
}

export default AdminContext;
