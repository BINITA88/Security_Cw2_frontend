// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { getProductCount, pagination, searchProductsApi } from "../../apis/Api";
// import bestpriceImage from "../../assets/images/bestprice.png";
// import toptierImage from "../../assets/images/toptier.png";
// import logImage from "../../assets/images/lambofgod.png";
// import ProductCard from "../../components/ProductCard";
// import Cart from "./Cart";
// import TyreAgeCalculator from "./TyreAgeCalculator";
// import EditProfile from "./EditProfile";

// import { UserCircle } from 'lucide-react';
// import {
//   FaShoppingCart,
//   FaDollarSign,
//   FaCalculator,
//   FaUser,
// } from "react-icons/fa";

// const Profile = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [activeTab, setActiveTab] = useState("shopNow");
//   const [searchQuery, setSearchQuery] = useState(
//     new URLSearchParams(location.search).get("search") || ""
//   );

//   useEffect(() => {
//     if (activeTab === "shopNow") {
//       if (searchQuery) {
//         searchProductsApi(searchQuery)
//           .then((res) => {
//             setProducts(res.data.products);
//             setTotalPages(1);
//           })
//           .catch((err) => {
//             setError(err.response.data.message);
//           });
//       } else {
//         getProductCount()
//           .then((res) => {
//             const count = res.data.productCount;
//             setTotalPages(Math.ceil(count / 8));
//           })
//           .catch((err) => {
//             setError(err.response.data.message);
//           });

//         pagination(page, 8)
//           .then((res) => {
//             setProducts(res.data.products);
//           })
//           .catch((err) => {
//             setError(err.response.data.message);
//           });
//       }
//     }
//   }, [page, activeTab, searchQuery]);
//   const handleSearch = () => {
//     // Sanitize the search query
//     const sanitizedQuery = searchQuery.replace(/[^\w\s]/gi, "");

//     // Validate the input
//     if (!sanitizedQuery) {
//       alert(
//         "Invalid search input. Only alphanumeric characters and spaces are allowed."
//       );
//       return;
//     }

//     // Send the sanitized query to the backend
//     searchProductsApi(sanitizedQuery)
//       .then((res) => {
//         setProducts(res.data.products);
//         setTotalPages(1); // Reset pagination for search results
//       })
//       .catch((err) => {
//         setError(err.response?.data?.message || "Failed to fetch products.");
//       });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login", { replace: true });
//   };

//   const handlePagination = (id) => {
//     setPage(id);
//     pagination(id, 8)
//       .then((res) => {
//         setProducts(res.data.products);
//       })
//       .catch((err) => {
//         setError(err.response.data.message);
//       });
//   };

//   return (
//     <>
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-4 text-white">Bookist</h1>

//         {/* Tabs */}
//         <div className="mb-4">
//           <ul className="flex space-x-4">
//             <li>
//               <button
//                 className={`flex items-center py-2 px-4 font-semibold shadow-md ${activeTab === "shopNow"
//                     ? "bg-black text-white"
//                     : "bg-red-500 text-white hover:bg-green-500 hover:text-white"
//                   }`}
//                 onClick={() => setActiveTab("shopNow")}
//               >
//                 <FaShoppingCart className="mr-2" /> Shop Now
//               </button>
//             </li>
//             <li>
//               <button
//                 className={`flex items-center py-2 px-4 font-semibold shadow-md ${activeTab === "cart"
//                     ? "bg-black text-white"
//                     : "bg-red-500 text-white hover:bg-green-500 hover:text-white"
//                   }`}
//                 onClick={() => setActiveTab("cart")}
//               >
//                 <FaShoppingCart className="mr-2" /> Cart
//               </button>
//             </li>
//             <li>
//               {/* <button
//                 className={`flex items-center py-2 px-4 font-semibold shadow-md ${
//                   activeTab === "billing" ? "bg-black text-white" : "bg-red-500 text-white hover:bg-green-500 hover:text-white"
//                 }`}
//                 onClick={() => setActiveTab("billing")}
//               >
//                 <FaDollarSign className="mr-2" /> Billing Info
//               </button> */}
//             </li>
//             <li>

//             </li>
//             <li>
//               <button
//                 className={`flex items-center py-2 px-4 font-semibold shadow-md ${activeTab === "profile"
//                     ? "bg-black text-white"
//                     : "bg-red-500 text-white hover:bg-green-500 hover:text-white"
//                   }`}
//                 onClick={() => setActiveTab("profile")}
//               >
//                 <UserCircle className="mr-2 h-5 w-5" /> Profile
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Tab Content */}
//         <div className="mb-4">
//           {activeTab === "shopNow" && (
//             <>
//               {/* Shop Now Section */}
//               <div className="relative mb-4">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Search for products..."
//                   onKeyPress={(e) => {
//                     if (e.key === "Enter") {
//                       handleSearch();
//                     }
//                   }}
//                 />
//                 <button
//                   onClick={handleSearch}
//                   className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.65 10.65a7.5 7.5 0 015.9 5.9z"
//                     ></path>
//                   </svg>
//                 </button>
//               </div>

//               <div
//                 id="carouselExampleCaptions"
//                 className="carousel slide"
//                 data-bs-ride="carousel"
//                 data-bs-interval="2000"
//               >
//                 <div className="carousel-indicators">
//                   <button
//                     type="button"
//                     data-bs-target="#carouselExampleCaptions"
//                     data-bs-slide-to="0"
//                     className="active"
//                     aria-current="true"
//                     aria-label="Slide 1"
//                   ></button>
//                   <button
//                     type="button"
//                     data-bs-target="#carouselExampleCaptions"
//                     data-bs-slide-to="1"
//                     aria-label="Slide 2"
//                   ></button>
//                   <button
//                     type="button"
//                     data-bs-target="#carouselExampleCaptions"
//                     data-bs-slide-to="2"
//                     aria-label="Slide 3"
//                   ></button>
//                 </div>
//                 <div className="carousel-inner">
//                   <div className="carousel-item active">
//                     <img
//                       src={bestpriceImage}
//                       className="d-block w-100 mx-auto rounded-lg"
//                       alt="Best Price"
//                     />
//                     <div className="carousel-caption d-none d-md-block">
//                       {/* <h5>First slide label</h5>
//                       <p>Some representative placeholder content for the first slide.</p> */}
//                     </div>
//                   </div>
//                   <div className="carousel-item">
//                     <img
//                       src={toptierImage}
//                       className="d-block w-100 mx-auto rounded-lg"
//                       alt="Top Tier"
//                     />
//                     <div className="carousel-caption d-none d-md-block">
//                       {/* <h5>Second slide label</h5>
//                       <p>Some representative placeholder content for the second slide.</p> */}
//                     </div>
//                   </div>
//                   <div className="carousel-item">
//                     <img
//                       src={logImage}
//                       className="d-block w-100 mx-auto rounded-lg"
//                       alt="log"
//                     />
//                     <div className="carousel-caption d-none d-md-block">
//                       {/* <h5>Third slide label</h5>
//                       <p>Some representative placeholder content for the third slide.</p> */}
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   className="carousel-control-prev"
//                   type="button"
//                   data-bs-target="#carouselExampleCaptions"
//                   data-bs-slide="prev"
//                 >
//                   <span
//                     className="carousel-control-prev-icon"
//                     aria-hidden="true"
//                   ></span>
//                   <span className="visually-hidden">Previous</span>
//                 </button>
//                 <button
//                   className="carousel-control-next"
//                   type="button"
//                   data-bs-target="#carouselExampleCaptions"
//                   data-bs-slide="next"
//                 >
//                   <span
//                     className="carousel-control-next-icon"
//                     aria-hidden="true"
//                   ></span>
//                   <span className="visually-hidden">Next</span>
//                 </button>
//               </div>

//               {/* Available Products */}
//               <h2 className="mt-5 text-white">Available Products</h2>
//               <div className="mb-5 pb-5">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   {error ? (
//                     <h1 className="text-red-500">{error}</h1>
//                   ) : (
//                     products.map((product) => (
//                       <div key={product._id}>
//                         <ProductCard product={product} />
//                       </div>
//                     ))
//                   )}
//                 </div>
//                 <nav aria-label="Page navigation example" className="mt-4">
//                   <ul className="pagination justify-content-center space-x-2">
//                     <li className="page-item">
//                       <button
//                         className={`page-link ${page === 1
//                             ? "bg-black text-white cursor-not-allowed"
//                             : "bg-black text-white hover:bg-green-500 hover:text-white"
//                           }`}
//                         onClick={() => {
//                           handlePagination(1);
//                         }}
//                         disabled={page === 1}
//                       >
//                         First
//                       </button>
//                     </li>
//                     <li className="page-item">
//                       <button
//                         className={`page-link ${page === 1
//                             ? "bg-black text-white cursor-not-allowed"
//                             : "bg-black text-white hover:bg-green-500 hover:text-white"
//                           }`}
//                         onClick={() => {
//                           handlePagination(page - 1);
//                         }}
//                         disabled={page === 1}
//                       >
//                         Previous
//                       </button>
//                     </li>
//                     {Array.from({ length: totalPages }, (_, i) => (
//                       <li className="page-item" key={i}>
//                         <button
//                           className={`page-link ${page === i + 1
//                               ? "bg-red-500 text-white"
//                               : "bg-black text-white hover:bg-green-500 hover:text-white"
//                             }`}
//                           onClick={() => {
//                             handlePagination(i + 1);
//                           }}
//                         >
//                           {i + 1}
//                         </button>
//                       </li>
//                     ))}
//                     <li className="page-item">
//                       <button
//                         className={`page-link ${page === totalPages
//                             ? "bg-black text-white cursor-not-allowed"
//                             : "bg-black text-white hover:bg-green-500 hover:text-white"
//                           }`}
//                         onClick={() => {
//                           handlePagination(page + 1);
//                         }}
//                         disabled={page === totalPages}
//                       >
//                         Next
//                       </button>
//                     </li>
//                     <li className="page-item">
//                       <button
//                         className={`page-link ${page === totalPages
//                             ? "bg-black text-white cursor-not-allowed"
//                             : "bg-black text-white hover:bg-green-500 hover:text-white"
//                           }`}
//                         onClick={() => {
//                           handlePagination(totalPages);
//                         }}
//                         disabled={page === totalPages}
//                       >
//                         Last
//                       </button>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </>
//           )}
//           {activeTab === "cart" && <Cart />}
//           {activeTab === "billing" && (
//             <div className="text-white">No purchase history.</div>
//           )}
//           {activeTab === "calculator" && <TyreAgeCalculator />}
//           {activeTab === "profile" && <EditProfile />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;




import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProductCount, pagination, searchProductsApi } from "../../apis/Api";
import bestpriceImage from "../../asset/imgg/ca2.png";
import toptierImage from "../../asset/imgg/ca1.png";
import logImage from "../../asset/imgg/canada.png";
import ProductCard from "../../components/ProductCard";
import Cart from "./Cart";
import EditProfile from "./EditProfile";

import { 
  UserCircle, 
  BookOpen, 
  ShoppingCart, 
  User, 
  Search,
  Coffee,
  Bookmark,
  Heart,
  Star,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activeTab, setActiveTab] = useState("shopNow");
  const [searchQuery, setSearchQuery] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );

  useEffect(() => {
    if (activeTab === "shopNow") {
      if (searchQuery) {
        searchProductsApi(searchQuery)
          .then((res) => {
            setProducts(res.data.products);
            setTotalPages(1);
          })
          .catch((err) => {
            setError(err.response.data.message);
          });
      } else {
        getProductCount()
          .then((res) => {
            const count = res.data.productCount;
            setTotalPages(Math.ceil(count / 8));
          })
          .catch((err) => {
            setError(err.response.data.message);
          });

        pagination(page, 8)
          .then((res) => {
            setProducts(res.data.products);
          })
          .catch((err) => {
            setError(err.response.data.message);
          });
      }
    }
  }, [page, activeTab, searchQuery]);

  const handleSearch = () => {
    const sanitizedQuery = searchQuery.replace(/[^\w\s]/gi, "");

    if (!sanitizedQuery) {
      alert(
        "Invalid search input. Only alphanumeric characters and spaces are allowed."
      );
      return;
    }

    searchProductsApi(sanitizedQuery)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(1);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch products.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handlePagination = (id) => {
    setPage(id);
    pagination(id, 8)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 text-white shadow-2xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-amber-200" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                  The Bookist
                </h1>
                <p className="text-amber-200 text-xs font-medium">Your Literary Haven</p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-300 h-5 w-5 z-10" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-24 py-3 border-2 border-amber-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-amber-300 text-lg"
                  placeholder="Search for your next great read..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold"
                >
                  Search
                </button>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex items-center space-x-2">
              <button
                className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === "shopNow"
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                    : "text-amber-200 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setActiveTab("shopNow")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Books
              </button>
              <button
                className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === "cart"
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                    : "text-amber-200 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setActiveTab("cart")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                My Cart
              </button>
              <button
                className={`flex items-center mr-0 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === "profile"
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                    : "text-amber-200 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                My Profile
              </button>
            </div>
            

           
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">

        {/* Content Area */}
        <div className="mb-8">
          {activeTab === "shopNow" && (
            <div className="space-y-8">
{/* aaaa */}
              {/* Featured Books Carousel */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200">
                <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
                  <Star className="mr-2 h-6 w-6 text-amber-600" />
                  Featured Collections
                </h2>
                <div
                  id="carouselExampleCaptions"
                  className="carousel slide rounded-xl overflow-hidden"
                  data-bs-ride="carousel"
                  data-bs-interval="4000"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="0"
                      className="active bg-amber-600"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="1"
                      className="bg-amber-600"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="2"
                      className="bg-amber-600"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={bestpriceImage}
                        className="d-block w-100 h-80 object-cover"
                        alt="Best Sellers"
                      />
                      <div className="carousel-caption d-none d-md-block bg-black/50 backdrop-blur-sm rounded-lg p-4">
                        <h5 className="text-xl font-bold text-white">Bestsellers Collection</h5>
                        <p className="text-amber-200">Discover the most loved books of the year</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img
                        src={toptierImage}
                        className="d-block w-100 h-80 object-cover"
                        alt="New Arrivals"
                      />
                      <div className="carousel-caption d-none d-md-block bg-black/50 backdrop-blur-sm rounded-lg p-4">
                        <h5 className="text-xl font-bold text-white">New Arrivals</h5>
                        <p className="text-amber-200">Fresh stories waiting to be explored</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img
                        src={logImage}
                        className="d-block w-100 h-80 object-cover"
                        alt="Classic Literature"
                      />
                      <div className="carousel-caption d-none d-md-block bg-black/50 backdrop-blur-sm rounded-lg p-4">
                        <h5 className="text-xl font-bold text-white">Classic Literature</h5>
                        <p className="text-amber-200">Timeless tales that never go out of style</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                  >
                    <div className="bg-amber-600/80 backdrop-blur-sm rounded-full p-2">
                      <ArrowLeft className="h-6 w-6 text-white" />
                    </div>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                  >
                    <div className="bg-amber-600/80 backdrop-blur-sm rounded-full p-2">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

              {/* Books Grid */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200">
                <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
                  <Bookmark className="mr-2 h-6 w-6 text-amber-600" />
                  Available Books
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {error ? (
                    <div className="col-span-full text-center py-12">
                      <div className="text-red-600 text-lg font-semibold bg-red-50 border border-red-200 rounded-xl p-4">
                        {error}
                      </div>
                    </div>
                  ) : (
                    products.map((product) => (
                      <div key={product._id} className="transform hover:scale-105 transition-transform duration-300">
                        <ProductCard product={product} />
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination
                <nav className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        page === 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-md"
                      }`}
                      onClick={() => handlePagination(1)}
                      disabled={page === 1}
                    >
                      First
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        page === 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-md"
                      }`}
                      onClick={() => handlePagination(page - 1)}
                      disabled={page === 1}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(page - 2 + i, totalPages - 4 + i));
                      return (
                        <button
                          key={pageNum}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                            page === pageNum
                              ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg transform scale-110"
                              : "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-md"
                          }`}
                          onClick={() => handlePagination(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        page === totalPages
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-md"
                      }`}
                      onClick={() => handlePagination(page + 1)}
                      disabled={page === totalPages}
                    >
                      Next
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        page === totalPages
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-md"
                      }`}
                      onClick={() => handlePagination(totalPages)}
                      disabled={page === totalPages}
                    >
                      Last
                    </button>
                  </div>
                </nav> */}
              </div>
            </div>
          )}
          
          {activeTab === "cart" && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200">
              <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
                <ShoppingCart className="mr-2 h-6 w-6 text-amber-600" />
                Your Reading Cart
              </h2>
              <Cart />
            </div>
          )}
          
          {activeTab === "billing" && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Purchase History</h2>
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-amber-400 mx-auto mb-4" />
                <p className="text-amber-700 text-lg">No purchase history yet.</p>
                <p className="text-amber-600">Start building your library today!</p>
              </div>
            </div>
          )}
          
   
          
          {activeTab === "profile" && (
            <div className=" p-6 ">
            
              <EditProfile />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-amber-200" />
            <span className="text-xl font-bold">The Bookist</span>
          </div>
          <p className="text-amber-200 mb-4">Where stories come alive and knowledge finds its home</p>
          <div className="flex justify-center space-x-6 text-amber-200">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Curated with love</span>
            </div>
            <div className="flex items-center space-x-2">
              <Coffee className="h-4 w-4" />
              <span className="text-sm">Perfect reading atmosphere</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;