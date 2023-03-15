import { useLazyGetAdminUserListQuery, usePutUserdataMutation } from "../../Store/api";
import { useState } from "react";

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

  const update = async() => {
    setUserData(data)
  }

  return (
    <>
      문맥
    </>
  );
}

export default AdminContext;
