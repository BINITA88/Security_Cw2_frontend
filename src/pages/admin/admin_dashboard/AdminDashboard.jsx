// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   createProductApi,
//   deleteProductAPi,
//   getAllProductsApi,
// } from "../../../apis/Api";
// import backgroundImage from "../../../assets/images/cliptire.png";
// import ViewOrder from "./viewOrder";
// import UserLog from "../userlog/UserLog";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeTab, setActiveTab] = useState("add-product");
//   const [productName, setProductName] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productQuantity, setProductQuantity] = useState("");
//   const [productCategory, setProductCategory] = useState("");
//   const [productImage, setProductImage] = useState("");
//   const [previewImage, setPreviewImage] = useState("");
//   const [productNameError, setProductNameError] = useState("");
//   const [productDescriptionError, setProductDescriptionError] = useState("");
//   const [productPriceError, setProductPriceError] = useState("");
//   const [productCategoryError, setProductCategoryError] = useState("");
//   const [productImageError, setProductImageError] = useState("");
//   const [productQuantityError, setProductQuantityError] = useState("");

//   const [products, setProducts] = useState([]);
//   const [productIdToDelete, setProductIdToDelete] = useState(null);
//   const [csrfToken, setCsrfToken] = useState(null); // State to store CSRF token

//   // Fetch CSRF token when the component mounts
//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       try {
//         const response = await axios.get(
//           "https://localhost:5000/api/csrf-token",
//           {
//             withCredentials: true, // Include cookies
//           }
//         );
//         setCsrfToken(response.data.csrfToken); // Store the CSRF token
//       } catch (error) {
//         console.error("Error fetching CSRF token:", error);
//       }
//     };

//     fetchCsrfToken();
//   }, []);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const fetchProducts = () => {
//     getAllProductsApi()
//       .then((res) => {
//         if (res.status === 201) {
//           setProducts(res.data.products);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProductImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const validate = () => {
//     let valid = true;
//     if (productName.trim() === "") {
//       setProductNameError("Product Name is required");
//       valid = false;
//     }
//     if (productDescription.trim() === "") {
//       setProductDescriptionError("Product Description is required");
//       valid = false;
//     }
//     if (productPrice.trim() === "" || parseFloat(productPrice) < 0) {
//       setProductPriceError("Product Price must be a non-negative number");
//       valid = false;
//     }
//     if (productCategory.trim() === "") {
//       setProductCategoryError("Product Category is required");
//       valid = false;
//     }
//     if (productImage === "") {
//       setProductImageError("Product Image is required");
//       valid = false;
//     }
//     if (productQuantity.trim() === "" || parseInt(productQuantity) < 0) {
//       setProductQuantityError("Product Quantity must be a non-negative number");
//       valid = false;
//     }
//     return valid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("productName", productName);
//     formData.append("productDescription", productDescription);
//     formData.append("productPrice", productPrice);
//     formData.append("productCategory", productCategory);
//     formData.append("productImage", productImage);
//     formData.append("productQuantity", productQuantity);
//     try {
//       const response = await axios.post(
//         "https://localhost:5000/api/product/create",
//         formData,
//         {
//           headers: {
//             "X-CSRF-Token": csrfToken,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 201) {
//         toast.success(response.data.message);
//         fetchProducts();
//       }
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 400) {
//           toast.warning(error.response.data.message);
//         } else if (error.response.status === 500) {
//           toast.error(error.response.data.message);
//         } else {
//           toast.error("Something went wrong");
//         }
//       } else {
//         toast.error("Something went wrong");
//       }
//     }

//   };

//   const handleDeleteClick = (id) => {
//     setProductIdToDelete(id);
//   };

//   const handleDeleteConfirm = () => {
//     if (productIdToDelete) {
//       deleteProductAPi(productIdToDelete)
//         .then((res) => {
//           if (res.status === 201) {
//             toast.success(res.data.message);
//             setProductIdToDelete(null);
//             setProducts(
//               products.filter((product) => product._id !== productIdToDelete)
//             );
//             setActiveTab("view-product");
//           }
//         })
//         .catch((err) => {
//           if (err.response.status === 500) {
//             toast.error(err.response.data.message);
//           } else {
//             toast.error("Something went wrong");
//           }
//         });
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//     toast.success("Logged out successfully");
//   };



// return (
//   <div className="min-h-screen bg-[#fffaf5] text-[#5a3210]">
//     {/* Navbar */}
//     <nav className="bg-[#fff4e9] shadow-md">
//       <div className="container mx-auto px-4 py-5 flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Welcome, Admin</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-[#cf5c14] hover:bg-[#b74f10] text-white px-5 py-2 rounded-md text-sm shadow"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>

//     {/* Main Content */}
//     <div className="container mx-auto px-4 py-10">
//       {/* Tabs */}
//       <div className="flex space-x-3 mb-8">
//         {["add-product", "view-product", "view-order", "user-log"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-5 py-2 rounded-full text-sm font-semibold border ${
//               activeTab === tab
//                 ? "bg-[#cf5c14] text-white border-[#cf5c14]"
//                 : "bg-white text-[#5a3210] border-[#e8d8c6]"
//             } shadow-sm transition`}
//           >
//             {tab.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//           </button>
//         ))}
//       </div>

//       {/* Add Product */}
//       {activeTab === "add-product" && (
//         <div className="bg-white p-6 rounded-xl shadow-lg border border-[#e8d8c6] max-w-3xl mx-auto">
//           <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block mb-1 font-medium">Product Name</label>
//               <input
//                 type="text"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 className="w-full border border-[#d3b79c] rounded-md p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Description</label>
//               <textarea
//                 value={productDescription}
//                 onChange={(e) => setProductDescription(e.target.value)}
//                 className="w-full border border-[#d3b79c] rounded-md p-2"
//                 rows={3}
//                 required
//               ></textarea>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 font-medium">Price</label>
//                 <input
//                   type="number"
//                   value={productPrice}
//                   onChange={(e) => setProductPrice(e.target.value)}
//                   className="w-full border border-[#d3b79c] rounded-md p-2"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Quantity</label>
//                 <input
//                   type="number"
//                   value={productQuantity}
//                   onChange={(e) => setProductQuantity(e.target.value)}
//                   className="w-full border border-[#d3b79c] rounded-md p-2"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Category</label>
//              <select
//   value={productCategory}
//   onChange={(e) => setProductCategory(e.target.value)}
//   className="w-full border border-[#d3b79c] rounded-md p-2"
//   required
// >
//   <option value="">Select a category</option>
//   <option value="Fiction">Fiction</option>
//   <option value="Non-Fiction">Non-Fiction</option>
//   <option value="Academic">Academic</option>
//   <option value="Comics">Comics</option>
//   <option value="Biography">Biography</option>
//   <option value="Self-Help">Self-Help</option>
//   <option value="Children">Children</option>
//   <option value="Mystery & Thriller">Mystery & Thriller</option>
//   <option value="Romance">Romance</option>
//   <option value="Science & Technology">Science & Technology</option>
// </select>

//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Image</label>
//               <input
//                 type="file"
//                 onChange={handleImageChange}
//                 className="w-full border border-[#d3b79c] rounded-md p-2"
//                 required
//               />
//               {previewImage && (
//                 <img src={previewImage} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded-md" />
//               )}
//             </div>
//             <div className="text-right">
//               <button
//                 type="submit"
//                 className="bg-[#cf5c14] hover:bg-[#b74f10] text-white px-6 py-2 rounded-md text-sm shadow"
//               >
//                 Save Product
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* View Product */}
//       {activeTab === "view-product" && (
//         <div className="overflow-x-auto bg-white p-6 rounded-xl shadow border border-[#e8d8c6]">
//           <table className="table-auto w-full">
//             <thead>
//               <tr className="text-left bg-[#fef1e7]">
//                 <th className="p-2">Image</th>
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Description</th>
//                 <th className="p-2">Price</th>
//                 <th className="p-2">Category</th>
//                 <th className="p-2">Quantity</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id} className="border-t">
//                   <td className="p-2">
//                     <img
//                       src={`https://localhost:5000/products/${product.productImage}`}
//                       alt={product.productName}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                   </td>
//                   <td className="p-2">{product.productName}</td>
//                   <td className="p-2">{product.productDescription}</td>
//                   <td className="p-2">{product.productPrice}</td>
//                   <td className="p-2">{product.productCategory}</td>
//                   <td className="p-2">{product.productQuantity}</td>
//                   <td className="p-2">
//                     <Link
//                       to={`/admin/update/${product._id}`}
//                       className="bg-[#cf5c14] text-white px-3 py-1 rounded text-sm mr-2"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDeleteClick(product._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* View Order */}
//       {activeTab === "view-order" && (
//         <div className="bg-white p-6 rounded-xl shadow border border-[#e8d8c6]">
//           <ViewOrder />
//         </div>
//       )}

//       {/* User Log */}
//       {activeTab === "user-log" && (
//         <div className="bg-white p-6 rounded-xl shadow border border-[#e8d8c6]">
//           <UserLog />
//         </div>
//       )}
//     </div>
//   </div>
// );


// };

// export default AdminDashboard;



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createProductApi,
  deleteProductAPi,
  getAllProductsApi,
} from "../../../apis/Api";
import axios from "axios";
import ViewOrder from "./viewOrder";
import UserLog from "../userlog/UserLog";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("add-product");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [products, setProducts] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCsrfToken();
  }, []);

  const fetchProducts = () => {
    getAllProductsApi()
      .then((res) => {
        if (res.status === 201) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get("https://localhost:5000/api/Bookish-Csrf", {
        withCredentials: true,
      });
      setCsrfToken(response.data.csrfToken);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const validate = () => {
    let valid = true;
    if (productName.trim() === "") valid = false;
    if (productDescription.trim() === "") valid = false;
    if (productPrice.trim() === "" || parseFloat(productPrice) < 0) valid = false;
    if (productCategory.trim() === "") valid = false;
    if (!productImage) valid = false;
    if (productQuantity.trim() === "" || parseInt(productQuantity) < 0) valid = false;
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productImage", productImage);
    formData.append("productQuantity", productQuantity);

    try {
      const response = await axios.post("https://localhost:5000/api/product/create", formData, {
        headers: { "Bookish-Csrf": csrfToken },
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        fetchProducts();
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductQuantity("");
        setProductCategory("");
        setProductImage("");
        setPreviewImage("");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleDeleteClick = (id) => {
    setProductIdToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (productIdToDelete) {
      deleteProductAPi(productIdToDelete)
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            setProductIdToDelete(null);
            setProducts(products.filter((p) => p._id !== productIdToDelete));
            setActiveTab("view-product");
          }
        })
        .catch(() => toast.error("Something went wrong"));
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fffaf5] text-[#5a3210]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#fff4e9] shadow-md border-r border-[#ebd6c2] p-6 space-y-4">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        {["add-Book", "view-Books", "view-Book order", "activity-logs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-4 py-2 rounded-md font-medium transition ${
              activeTab === tab
                ? "bg-[#cf5c14] text-white"
                : "bg-white text-[#5a3210] border border-[#e8d8c6]"
            }`}
          >
            {tab.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-10 border-b pb-4">
          <h1 className="text-3xl font-semibold">Welcome, Admin</h1>
          <button
            onClick={handleLogout}
            className="bg-[#cf5c14] hover:bg-[#b74f10] text-white px-5 py-2 rounded-md shadow"
          >
            Logout
          </button>
        </nav>

        {/* Add Product */}
        {activeTab === "add-Book" && (
          <div className="bg-white p-6 rounded-xl shadow border border-[#e8d8c6] max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
                className="w-full border border-[#d3b79c] rounded-md p-2"
                required
              />
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Description"
                className="w-full border border-[#d3b79c] rounded-md p-2"
                rows={3}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="Price"
                  className="border border-[#d3b79c] rounded-md p-2"
                  required
                />
                <input
                  type="number"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="border border-[#d3b79c] rounded-md p-2"
                  required
                />
              </div>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full border border-[#d3b79c] rounded-md p-2"
                required
              >
                <option value="">Select Category</option>
                <option>Fiction</option>
                <option>Academic</option>
                <option>Comics</option>
                <option>Biography</option>
                <option>Science</option>
              </select>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full border border-[#d3b79c] rounded-md p-2"
                required
              />
              {previewImage && (
                <img src={previewImage} alt="Preview" className="w-32 h-32 mt-2 rounded object-cover" />
              )}
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-[#cf5c14] hover:bg-[#b74f10] text-white px-6 py-2 rounded-md text-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* View Product */}
        {activeTab === "view-Books" && (
          <div className="overflow-x-auto bg-white p-6 rounded-xl shadow border border-[#e8d8c6]">
            <table className="table-auto w-full">
              <thead>
                <tr className="text-left bg-[#fef1e7]">
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="p-2">
                      <img
                        src={`https://localhost:5000/products/${product.productImage}`}
                        alt={product.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2">{product.productDescription}</td>
                    <td className="p-2">{product.productPrice}</td>
                    <td className="p-2">{product.productCategory}</td>
                    <td className="p-2">{product.productQuantity}</td>
                    <td className="p-2">
                      <Link
                        to={`/admin/update/${product._id}`}
                        className="bg-[#cf5c14] text-white px-3 py-1 rounded text-sm mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Order */}
        {activeTab === "view-Book order" && (
          <div className="bg-white p-6 rounded-xl shadow border border-[#e8d8c6]">
            <ViewOrder />
          </div>
        )}

        {/* User Log */}
        {activeTab === "activity-logs" && (
          <div className="bg-white p-6 rounded-xl shadow border border-[#e8d8c6]">
            <UserLog />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
