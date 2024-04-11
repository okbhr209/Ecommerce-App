import { slugify } from "slugify";
import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../components/context/auth";
import Layout from "../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [totalQty, setTotalQty] = useState(0);

  const slugifyProductName = (productName) => {
    return slugify(productName);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>

            {orders?.map((o, i) => {
              let totalQuantity = 0,
                totalPrice = 0;
              o.products.forEach((p) => {
                totalQuantity += p.quantity;
                totalPrice += p.quantity * p.product.productPrice;
              });

              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{"Success"}</td>
                        <td>{totalQuantity}</td>
                        <td>{formatCurrency(totalPrice)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div
                        className="row mb-2 p-3 card flex-row"
                        key={p.product}
                      >
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.product.productId}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <Link
                            to={`/product/${p.product?.productSlug}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              fontSize: "18px",
                              fontWeight: "bold",
                              color: "#333",
                              textTransform: "capitalize",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "#0d6efd")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.color = "black")
                            }
                          >
                            {p.product?.productName}
                          </Link>

                          <p>{p.product.productDesc.substring(0, 30)}</p>
                          <p>
                            Price : {formatCurrency(p.product?.productPrice)}
                          </p>

                          <p>Quantity: {p.quantity}</p>
                          <td>
                            SubTotal :{" "}
                            {formatCurrency(
                              p.quantity * p.product.productPrice
                            )}
                          </td>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
