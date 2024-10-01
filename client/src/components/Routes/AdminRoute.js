// // import { useState, useEffect } from "react";
// // import { useAuth } from "../context/auth"; //../../context/auth
// // import { Outlet } from "react-router-dom";
// // import axios from "axios";
// // import Spinner from "../Spinner";

// // export default function AdminRoute() {
// //   const [ok, setOk] = useState(false);
// //   const [auth, setAuth] = useAuth();

// //   useEffect(() => {
// //     const authCheck = async () => {

// //       const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
// //       if ( res && res.data.ok) {
// //         setOk(true);
// //       } else {
// //         setOk(false);
// //       }
// //     };
// //     if (auth &&  auth?.token) authCheck();
// //   }, [auth?.token]);

// //   console.log(ok) ;
// //   return ok ? <Outlet /> : <Spinner/>;
// // }

// import { useState, useEffect } from "react";
// import { useAuth } from "../context/auth";
// import { Outlet } from "react-router-dom";
// import axios from "axios";
// import Spinner from "../Spinner";

// export default function AdminRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();

//   useEffect(() => {
//     const authCheck = async () => {
//       const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
//     // const res = await axios.get("/api/v1/auth/admin-auth");

//       if (res.data.ok) {
//         setOk(true);
//       } else {
//         setOk(false);
//       }
//     };
//     if (auth?.token) authCheck();
//   }, [auth?.token]);

//   return ok ? <Outlet /> : <Spinner path="" />;
// }

import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
// import AdminRoute from './AdminRoute';

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      //   const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
      //   if (res.data.ok) {
      //     setOk(true);
      //   } else {
      //     setOk(false);
      //   }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          handleUnauthorized();
        }
      } catch (error) {
        handleUnauthorized();
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  const handleUnauthorized = () => {
    // Redirect user to the login page
    navigate("/pagenotfound");
  };

  return ok ? <Outlet /> : <Spinner />;
}

// import { useState, useEffect } from "react";
// import { useAuth } from "../context/auth";
// import { Outlet, Navigate } from "react-router-dom";
// import axios from "axios";
// import Spinner from "../Spinner";

// export default function AdminRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
//         );
//         if (res.data.ok) {
//           setOk(true);
//         } else {
//           setOk(false);
//         }
//       } catch (error) {
//         setOk(false);
//       }
//     };
//     if (auth?.token) authCheck();
//   }, [auth?.token]);

//   // Redirect unauthorized users to PageNotFound
//   return ok ? <Outlet /> : <Navigate to="/pagenotfound" />;
// }
