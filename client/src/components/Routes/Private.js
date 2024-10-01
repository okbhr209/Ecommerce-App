import { useState, useEffect } from "react";
import { useAuth } from "../context/auth"; //../../context/auth
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
      );
      if (res && res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth && auth?.token) authCheck();
  }, [auth?.token]);

  console.log(ok);
  return ok ? <Outlet /> : <Spinner />;
}

// import { useState, useEffect } from "react";
// import { useAuth } from "../context/auth";
// import { Outlet, Navigate } from "react-router-dom";
// import axios from "axios";
// import Spinner from "../Spinner";

// export default function PrivateRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();

//   useEffect(() => {
//     const authCheck = async () => {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
//       );
//       if (res && res.data.ok) {
//         setOk(true);
//       } else {
//         setOk(false);
//       }
//     };
//     if (auth && auth?.token) authCheck();
//   }, [auth?.token]);

//   // Redirect to login if the user is not authenticated
//   return ok ? <Outlet /> : <Navigate to="/login" />;
// }
