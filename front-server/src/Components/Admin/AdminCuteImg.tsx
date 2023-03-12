import styles from "./Admin.module.css";

function AdminCuteImg():JSX.Element {
  return (
    <div className={`flex justify-end absolute w-full bottom-0 ${styles.cuteImg} `}>
      <img className={`w-24 rotate-6 ${styles.rotate}`} src={require('./cuteAdmin.gif')} alt="" />
    </div>
  )
}
export default AdminCuteImg