import React from "react";
import Layout from "./../components/Layout/Layout";
import pp from "./../images/Privacy-Policy.png";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={pp} alt="contactus" style={{ width: "95%" }} />
        </div>
        <div className="col-md-4">
          <p>
            At Velora Mart, we are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website , as well as your rights
            in relation to that information.
          </p>
          {/* <p>
            Personal Data: Personally identifiable information, such as your
            name, shipping address, email address, and telephone number, and
            demographic information, such as your age, gender, hometown, and
            interests, that you voluntarily give to us when you register with
            the Site or when you choose to participate in various activities
            related to the Site, such as online chat and message boards.
          </p> */}

          {/* <p>
            Derivative Data: Information our servers automatically collect when
            you access the Site, such as your IP address, your browser type,
            your operating system, your access times, and the pages you have
            viewed directly before and after accessing the Site.
          </p> */}

          {/* <p>
            Financial Data: Financial information, such as data related to your
            payment method (e.g., valid credit card number, card brand,
            expiration date) that we may collect when you purchase, order,
            return, exchange, or request information about our services from the
            Site.
          </p> */}
          {/* 
          <p>
            Financial Data: Financial information, such as data related to your
            payment method (e.g., valid credit card number, card brand,
            expiration date) that we may collect when you purchase, order,
            return, exchange, or request information about our services from the
            Site.
          </p> */}

          {/* <p>
            By Law or to Protect Rights: If we believe the release of
            information about you is necessary to respond to legal process, to
            investigate or remedy potential violations of our policies, or to
            protect the rights, property, and safety of others, we may share
            your information as permitted or required by any applicable law,
            rule, or regulation.
          </p>

          <p>add privacy policy</p>
          <p>add privacy policy</p> */}
        </div>
      </div>
    </Layout>
  );
};

export default Policy;

// import React from "react";
// import Layout from "./../components/Layout/Layout";
// import pp from "./../images/Privacy-Policy.png";

// const Policy = () => {
//   return (
//     <Layout title={"Privacy Policy"}>
//       <div className="row contactus ">
//         <div className="col-md-6 ">
//           {/* <img src={pp} alt="contactus" style={{ width: "50%" }} /> */}
//         </div>
//         <div className="col-md-4">
//           <p>
//             Personal Data: Personally identifiable information, such as your
//             name, shipping address, email address, and telephone number, and
//             demographic information, such as your age, gender, hometown, and
//             interests, that you voluntarily give to us when you register with
//             the Site or when you choose to participate in various activities
//             related to the Site, such as online chat and message boards.
//           </p>

//           <p>
//             Derivative Data: Information our servers automatically collect when
//             you access the Site, such as your IP address, your browser type,
//             your operating system, your access times, and the pages you have
//             viewed directly before and after accessing the Site.
//           </p>

//           <p>
//             Financial Data: Financial information, such as data related to your
//             payment method (e.g., valid credit card number, card brand,
//             expiration date) that we may collect when you purchase, order,
//             return, exchange, or request information about our services from the
//             Site.
//           </p>

//           <p>
//             Financial Data: Financial information, such as data related to your
//             payment method (e.g., valid credit card number, card brand,
//             expiration date) that we may collect when you purchase, order,
//             return, exchange, or request information about our services from the
//             Site.
//           </p>

//           <p>
//             By Law or to Protect Rights: If we believe the release of
//             information about you is necessary to respond to legal process, to
//             investigate or remedy potential violations of our policies, or to
//             protect the rights, property, and safety of others, we may share
//             your information as permitted or required by any applicable law,
//             rule, or regulation.
//           </p>

//           <p>add privacy policy</p>
//           <p>add privacy policy</p>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Policy;
