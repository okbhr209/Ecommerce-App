import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../../components/context/auth";
import { useCart } from "../../components/context/cart";
import Layout from "../../components/Layout/Layout";
import "../../styles/CartStyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { slugify } from "slugify";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const [qty, setQty] = useState(0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Add this function to handle quantity changes
  const handleQuantityChange = (productId, newQuantity) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.productId._id === productId);
      if (index !== -1) {
        myCart[index].quantity = newQuantity;
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        // total = total + item.productId.price * item.quantity;
        const quantity = isNaN(item.quantity) ? 0 : item.quantity;
        total = total + item.productId.price * quantity;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.productId._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //handle payments
  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          cart,
          auth,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      setOk(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>

        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div
                  className="row card flex-row"
                  key={p.productId._id}
                  style={{ display: "flex" }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.productId?._id}`}
                    className="card-img-top"
                    alt={p.productId?.name}
                  />

                  <div className="col-md-4">
                    <Link
                      to={`/product/${p.productId?.slug}`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#333",
                        textTransform: "capitalize",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#0d6efd")}
                      onMouseLeave={(e) => (e.target.style.color = "black")}
                    >
                      {p.productId?.name}
                    </Link>

                    <p>Price : {formatCurrency(p.productId?.price)}</p>
                    <p>Quantity : {isNaN(p.quantity) ? 0 : p.quantity}</p>

                    {/* Quantity input field */}
                    <div className="input-group mb-3">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() =>
                          handleQuantityChange(p.productId?._id, p.quantity - 1)
                        }
                        disabled={p.quantity === 1}
                      >
                        -
                      </button>

                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() =>
                          handleQuantityChange(p.productId?._id, p.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p>
                      Subtotal :{" "}
                      {formatCurrency(
                        (isNaN(p.quantity) ? 0 : p.quantity) *
                          p.productId?.price
                      )}{" "}
                    </p>

                    <div className="col-md-4 cart-remove-btn">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p.productId?._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? "" : <></>}

                {loading ? (
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={!auth?.user?.address || cart.length === 0}
                  >
                    Make Payment
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
