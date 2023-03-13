import axios from "axios";
import { useGetAdminUserListQuery, useGetRefreshTokenQuery } from "../../Store/api";

function AdminContext(): JSX.Element {

  const username:any = 'test13'
  const {data} = useGetRefreshTokenQuery('test13')
  const refreshToken:any = localStorage.getItem("refreshToken")
  // const {data} = useGetAdminUserListQuery('Api') 
  console.log(data);
  
    // console.log(data.data[0]?.nickname);
    // console.log(data);
    
    // axios({
    //   url: `https://hmje.net/api/user/auth/refresh/${username}`,
    //   method: 'get',
    //   headers: {
    //     refreshToken: refreshToken,
    //   },
    //   params: {
    //     'username': username
    //   }
    // }).then((r)=> {
    //   console.log(r);
      
    // })
    
    
  
  
  return (
    <>
      {/* {
        isLoading? <div>로딩중</div>: <div>끝</div>
      } */}
      {/* {data? data.data[0].nickname: null} */}
    </>
  );
}

export default AdminContext;
