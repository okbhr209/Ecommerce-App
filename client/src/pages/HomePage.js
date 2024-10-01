// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../components/Prices";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Layout from "./../components/Layout/Layout";
// import { AiOutlineReload } from "react-icons/ai";
// import "../styles/HomePage.css";
// import { useCart } from "../components/context/cart";
// import banner from "./../images/banner.png";

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
//   const [selectedValue, setSelectedValue] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const handleInputChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   const handleOptionClick = (value) => {
//     setSelectedValue(value);
//     setIsDropdownOpen(false);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prevState) => !prevState);
//   };

// const addToCart = async (productId, quantity) => {
//   // Check if the product is already present in the cart
//   const existingProductIndex = cart.findIndex(
//     (item) => item.productId === productId
//   );

//   let updatedCart;
//   // If the product is already present, update its quantity
//   if (existingProductIndex !== -1) {
//     updatedCart = [...cart];
//     updatedCart[existingProductIndex].quantity += quantity;
//     setCart(updatedCart);
//   } else {
//     // If the product is not present, add it to the cart
//     updatedCart = [...cart, { productId, quantity }];
//     setCart(updatedCart);
//   }
//   localStorage.setItem("cart", JSON.stringify(updatedCart));
//   toast.success("Item Added to cart");
//   console.log(cart);
// };

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   //get all cat
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/category/get-category`
//       );
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
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
//       );
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   //getTotalCount
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-count`
//       );
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
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
//       );
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
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
//         {
//           checked,
//           radio,
//         }
//       );
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout title={"ALl Products - Best offers "}>
//       {/* banner image */}
//       {/* <img
//         src={banner}
//         className="banner-img"
//         alt="bannerimage"
//         width={"100%"}
//       /> */}

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
//           <h1 className="text-center">Best Deals</h1>
//           <div className="d-flex flex-wrap">
//             {products?.map((p) => (
//               <div className="card m-2" key={p._id}>
//                 <img
//                   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body d-flex flex-column justify-content-between">
//                   <div>
//                     <div
//                       className="card-name-price"
//                       style={{ alignItems: "baseline" }}
//                     >
//                       <h5 className="card-title">{p.name}</h5>
//                       <h5 className="card-title card-price">
//                         {p.price.toLocaleString("en-IN", {
//                           style: "currency",
//                           currency: "INR",
//                         })}
//                       </h5>
//                     </div>
//                     <p className="card-text">
//                       {p.description.substring(0, 60)}...
//                     </p>
//                   </div>
//                   <div className="card-name-price mt-auto">
//                     {" "}
//                     {/* Align items at the bottom */}
//                     <button
//                       className="btn btn-info ms-1"
//                       onClick={() => navigate(`/product/${p.slug}`)}
//                     >
//                       More Details
//                     </button>
//                     <button
//                       className="btn btn-dark ms-1"
//                       onClick={() => {
//                         addToCart(p, 1);
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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../components/Prices";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Layout from "./../components/Layout/Layout";
// import { AiOutlineReload } from "react-icons/ai";
// import "../styles/HomePage.css";
// import { useCart } from "../components/context/cart";

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

//   // Get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/category/get-category`
//       );
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const addToCart = async (productId, quantity) => {
//     // Check if the product is already present in the cart
//     const existingProductIndex = cart.findIndex(
//       (item) => item.productId === productId
//     );

//     let updatedCart;
//     // If the product is already present, update its quantity
//     if (existingProductIndex !== -1) {
//       updatedCart = [...cart];
//       updatedCart[existingProductIndex].quantity += quantity;
//       setCart(updatedCart);
//     } else {
//       // If the product is not present, add it to the cart
//       updatedCart = [...cart, { productId, quantity }];
//       setCart(updatedCart);
//     }
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     toast.success("Item Added to cart");
//     console.log(cart);
//   };

//   useEffect(() => {
//     getAllCategory();
//     getTotal();
//   }, []);

//   // Get total number of products
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-count`
//       );
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Get products (for initial load and when filters are cleared)
//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
//       );
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   // Load more products (with or without filters)
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       let data;

//       if (checked.length || radio.length) {
//         // Fetch products with filters if any filter is applied
//         const response = await axios.post(
//           `${process.env.REACT_APP_API}/api/v1/product/product-filters/${page}`,
//           {
//             checked,
//             radio,
//           }
//         );
//         data = response.data;
//       } else {
//         // Fetch unfiltered products if no filters are applied
//         const response = await axios.get(
//           `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
//         );
//         data = response.data;
//       }

//       setLoading(false);
//       setProducts([...products, ...data?.products]);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);

//   // Filter products by selected category and price
//   const filterProduct = async () => {
//     try {
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
//         {
//           checked,
//           radio,
//         }
//       );
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (!checked.length && !radio.length) getAllProducts();
//   }, [checked.length, radio.length]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//   }, [checked, radio]);

//   // Filter by category
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   };

//   return (
//     <Layout title={"All Products - Best Offers"}>
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

//           {/* Price Filter */}
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

//         <div className="col-md-9">
//           <h1 className="text-center">Best Deals</h1>
//           <div className="d-flex flex-wrap">
//             {products?.map((p) => (
//               <div className="card m-2" key={p._id}>
//                 <img
//                   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body d-flex flex-column justify-content-between">
//                   <div>
//                     <div
//                       className="card-name-price"
//                       style={{ alignItems: "baseline" }}
//                     >
//                       <h5 className="card-title">{p.name}</h5>
//                       <h5 className="card-title card-price">
//                         {p.price.toLocaleString("en-IN", {
//                           style: "currency",
//                           currency: "INR",
//                         })}
//                       </h5>
//                     </div>
//                     <p className="card-text">
//                       {p.description.substring(0, 60)}...
//                     </p>
//                   </div>
//                   <div className="card-name-price mt-auto">
//                     <button
//                       className="btn btn-info ms-1"
//                       onClick={() => navigate(`/product/${p.slug}`)}
//                     >
//                       More Details
//                     </button>
//                     <button
//                       className="btn btn-dark ms-1"
//                       onClick={() => {
//                         addToCart(p, 1);
//                       }}
//                     >
//                       ADD TO CART
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {products.empty ? (
//               <>
//                 <h1 className="t  ext-center">No products found..</h1>
//               </>
//             ) : (
//               <>
//                 <h1 className="text-center"> yes products found..</h1>
//               </>
//             )}
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
//                     Load More <AiOutlineReload />
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMatch, setNoMatch] = useState(false); // New state for no match

  const addToCart = async (productId, quantity) => {
    // Check if the product is already present in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    let updatedCart;
    // If the product is already present, update its quantity
    if (existingProductIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // If the product is not present, add it to the cart
      updatedCart = [...cart, { productId, quantity }];
      setCart(updatedCart);
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
    console.log(cart);
  };

  // Get all categories
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

  // Get total count of products
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

  // Get all products (initial load)
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
      setNoMatch(data.products.length === 0); // Set noMatch based on the product array length
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Load more products (with or without filters)
  const loadMore = async () => {
    try {
      setLoading(true);
      let data;

      if (checked.length || radio.length) {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/product/product-filters/${page}`,
          {
            checked,
            radio,
          }
        );
        data = response.data;
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
        );
        data = response.data;
      }

      setLoading(false);
      setProducts([...products, ...data?.products]);
      setNoMatch([...products, ...data?.products].length === 0); // Check if no products are found
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter products
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
      setNoMatch(data.products.length === 0); // Show no match if no products are found
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
    else filterProduct();
  }, [checked, radio]);

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  return (
    <Layout title={"All Products - Best offers "}>
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
            {/* <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button> */}
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
              style={{ padding: "10px 20px", margin: "10px" }}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">Best Deals</h1>

          {/* Show "No Match Found" message if no products */}
          {noMatch ? (
            <div className="text-center">
              <h4>No Match Found</h4>
            </div>
          ) : (
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <div
                        className="card-name-price"
                        style={{ alignItems: "baseline" }}
                      >
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </h5>
                      </div>
                      <p className="card-text">
                        {p.description.substring(0, 60)}...
                      </p>
                    </div>
                    <div className="card-name-price mt-auto">
                      {" "}
                      {/* Align items at the bottom */}
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
          )}

          {/* Load more button */}
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
                    Load More <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
