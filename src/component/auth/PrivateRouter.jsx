import {Navigate} from "react-router-dom";

const PrivateRouter = (props) => {
  const  username  = localStorage.getItem("username");
  if (username) {
    return props.children;
  }
  return <Navigate to="/auth/login" />;
}
export default PrivateRouter
