import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/HomePage.css";
import { useCart } from "../components/context/cart";
import banner from "./../images/banner.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  // const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // const [selectedValue, setSelectedValue] = useState("");

  const [selectedValue, setSelectedValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const addToCart = async (productId, quantity) => {
    // Check if the product is already present in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    // If the product is already present, update its quantity
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // If the product is not present, add it to the cart
      const updatedCart = [...cart, { productId, quantity }];
      setCart(updatedCart);
    }

    await localStorage.setItem("cart", JSON.stringify([...cart]));
    toast.success("Item Added to cart");

    console.log(cart);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* banner image */}
      <img
        src={banner}
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />

      {/* <img src = { './../images/Contact-Us-page-banner.jpg' } ></img> */}
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        addToCart(p, 1);
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <div className="dropdown-container">
        <label htmlFor="editableDropdown">Select a number:</label>
        <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
          <div className="dropdown-selected-value" onClick={toggleDropdown}>
            {selectedValue ? `Selected value: ${selectedValue}` : "Select"}
          </div>
          <div className="dropdown-content">
            {[1, 2, 3, 4, 5].map((value) => (
              <div
                key={value}
                className="dropdown-option"
                onClick={() => handleOptionClick(value)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* <div>
        <label htmlFor="dropdown">Select a number:</label>
        <select id="dropdown" value={selectedValue} onChange={handleChange}>
          <option value="">Select</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {selectedValue && <p>Selected value: {selectedValue}</p>}
      </div> */}
    </Layout>
  );
};

export default HomePage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../components/Prices";
// import { useCart } from "../components/context/cart.js";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Layout from "./../components/Layout/Layout";
// import { AiOutlineReload } from "react-icons/ai";
// import "../styles/HomePage.css";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useCart();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [sel,setSel] = useState(false) ;

//   //get all cat
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//     getTotal();
//   }, []);
//   //get products
//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   //getTOtal COunt
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);

//   //load more
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
//       console.log(data) ;
//       setLoading(false);
//       setProducts([...products, ...data?.products]);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   // filter by cat
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   };
//   useEffect(() => {
//     if (!checked.length || !radio.length) getAllProducts();
//   }, [checked.length, radio.length]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//   }, [checked, radio]);

//   //get filterd product
//   const filterProduct = async () => {
//     try {
//       const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
//         checked,
//         radio,
//       });
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout title={"ALl Products - Best offers "}>
//       {/* banner image */}
//       <img
//         src="/images/banner.png"
//         className="banner-img"
//         alt="bannerimage"
//         width={"100%"}
//       />
//       {/* banner image */}
//       <div className="container-fluid row mt-3 home-page">
//         <div className="col-md-3 filters">
//           <h4 className="text-center">Filter By Category</h4>
//           <div className="d-flex flex-column">
//             {categories?.map((c) => (
//               <Checkbox
//                 key={c._id}
//                 onChange={(e) => handleFilter(e.target.checked, c._id)}
//               >
//                 {c.name}
//               </Checkbox>
//             ))}
//           </div>
//           {/* price filter */}
//           <h4 className="text-center mt-4">Filter By Price</h4>
//           <div className="d-flex flex-column">
//             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//               {Prices?.map((p) => (
//                 <div key={p._id}>
//                   <Radio value={p.array}>{p.name}</Radio>
//                 </div>
//               ))}
//             </Radio.Group>
//           </div>
//           <div className="d-flex flex-column">
//             <button
//               className="btn btn-danger"
//               onClick={() => window.location.reload()}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </div>
//         <div className="col-md-9 ">
//           <h1 className="text-center">All Products</h1>
//           <div className="d-flex flex-wrap">
//             {products?.map((p) => (

//               <div className="card m-2" key={p._id}>
//                 <img
//                   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}

//                   width="100" height="200"
//                 />
//                 <div className="card-body">
//                   <div className="card-name-price">
//                     <h5 className="card-title">{p.name}</h5>
//                     <h5 className="card-title card-price">
//                       {p.price.toLocaleString("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                       })}
//                     </h5>
//                   </div>
//                   <p className="card-text ">
//                     {p.description.substring(0, 60)}...
//                   </p>
//                   <div className="card-name-price">
//                     <button
//                       className="btn btn-info ms-1"
//                       onClick={() => navigate(`/product/${p.slug}`)}
//                     >
//                       More Details
//                     </button>

//                     { sel ? <>
//                       <button>
//                       ADDED TO CART
//                     </button>

//                     </> : <>
//                       <button
//                         className="btn btn-dark ms-1"
//                         onClick={() => {
//                           setCart([...cart, p]);

//                           setSel(true) ;

//                           localStorage.setItem(
//                             "cart",
//                             JSON.stringify([...cart, p])
//                           );
//                           toast.success("Item Added to cart");
//                         }}
//                       >
//                         ADD TO CART
//                       </button>

//                     </> }

//                     <button
//                       className="btn btn-dark ms-1"
//                       onClick={() => {
//                         setCart([...cart, p]);

//                         setSel(true) ;

//                         localStorage.setItem(
//                           "cart",
//                           JSON.stringify([...cart, p])
//                         );
//                         toast.success("Item Added to cart");
//                       }}
//                     >
//                       ADD TO CART
//                     </button>

//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="m-2 p-3">
//             {products && products.length < total && (
//               <button
//                 className="btn loadmore"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? (
//                   "Loading ..."
//                 ) : (
//                   <>
//                     {" "}
//                     Loadmore <AiOutlineReload />
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;
