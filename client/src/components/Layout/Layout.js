import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
// import { ToasterC } from "react-hot-toast";
// import { ToastContainer } from "react-toastify";
// import  "react-toastify/dist/ReactToastify.css" ;

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ToastContainer

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        {/* <Toaster /> */}
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Velora Mart - shop now",
  description: "An Ecommerce Website",
  keywords: "",
  author: "okbhr209",
};

export default Layout;
