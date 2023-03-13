import axios from "axios";
import { useGetAdminUserListQuery } from "../../Store/api";

function AdminContext(): JSX.Element {

  axios({
    method: 'get',
    url: 'https://hmje.net/api/api/admin/user'
  })
  .then((r)=> {
    console.log(r.data);
    
  })
  // const data = useGetAdminUserListQuery()
  // console.log('RTK query 데이터: ', data);

  return (
    <>
      문맥도감
    </>
  );
}

export default AdminContext;
