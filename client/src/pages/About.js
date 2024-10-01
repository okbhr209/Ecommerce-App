import React from "react";
import Layout from "./../components/Layout/Layout";
import ab from "./../images/about-us-page.jpg";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={ab} alt="about" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to Velora Mart, your . We’re dedicated to giving you the
            very best of available products , with a focus on dependability,
            customer service, and uniqueness.
          </p>
          <p>
            We now serve customers all over the world, and are thrilled that
            we’re able to turn our passion into our own website.
          </p>
          <p>
            We hope you enjoy our products as much as we enjoy offering them to
            you. If you have any questions or comments, please don’t hesitate to
            contact us.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
