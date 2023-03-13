import { Outlet } from "react-router-dom";
import AdminCuteImg from "./AdminCuteImg";

function AdminPage():JSX.Element {
  return (
    <>
      <Outlet/>
      <AdminCuteImg/>
    </>
  )
}
export default AdminPage