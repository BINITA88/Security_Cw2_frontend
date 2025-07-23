// import React, { useState, useEffect } from "react";
// import { getAllOrdersApi, updateOrderStatusApi } from "../../../apis/Api";
// import { toast } from "react-hot-toast";

// const ViewOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     setIsLoading(true);
//     getAllOrdersApi()
//       .then((res) => {
//         if (res.data.success && res.data.orders) {
//           setOrders(res.data.orders);
//         } else {
//           console.error("Error Fetching Orders");
//         }
//       })
//       .catch((error) => {
//         console.error("Error Fetching Orders:", error);
//         setError("Error fetching orders. Please try again later.");
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4"
//         role="alert"
//       >
//         <p className="font-bold">Error</p>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   // const formatAddress = (address) => {
//   //     return `${address.firstName}, ${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
//   // };

//   const formatAddress = (order) => {
//     return `${order.name}, ${order.street}, ${order.city}, ${order.state} ${order.zipCode}, ${order.country},${order.phone}`;
//   };

//   const toggleOrderExpansion = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const statusHandler = async (e, orderId) => {
//     e.preventDefault();
//     const selectedStatus = e.target.value;

//     const newStatus = { status: selectedStatus };

//     try {
//       const response = await updateOrderStatusApi(orderId, newStatus);
//       if (response.status === 200) {
//         if (response.data.success) {
//           toast.success(response.data.message);

//           // Update orders state to reflect the change in the UI
//           const updatedOrders = orders.map((order) => {
//             if (order._id === orderId) {
//               return { ...order, status: selectedStatus };
//             }
//             return order;
//           });
//           setOrders(updatedOrders);
//         } else {
//           toast.error("Failed to update status: " + response.data.message);
//         }
//       } else {
//         // Handle non-200 responses
//         toast.error(
//           `Failed to update status: ${response.data.message || "Unknown error"}`
//         );
//       }
//     } catch (error) {
//       if (error.response) {
//         // Handle errors from backend
//         toast.error(`Error updating status: ${error.response.data.message}`);
//       } else {
//         // Handle other errors like network errors
//         toast.error("Error updating status: " + error.message);
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
//         Order Management
//       </h1>
//       {orders.length > 0 ? (
//         <div className="space-y-4 md:space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
//             >
//               <div
//                 className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 cursor-pointer hover:bg-gray-50"
//                 onClick={() => toggleOrderExpansion(order._id)}
//               >
//                 <div className="mb-2 sm:mb-0">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//                     Order #{order._id.slice(-6)}
//                   </h2>
//                   <p className="text-sm text-gray-600">
//                     Placed by: {order.userId}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <span className="font-bold text-lg text-green-600">
//                     ${order.totalPrice.toFixed(2)}
//                   </span>
//                   <svg
//                     className={`w-6 h-6 text-gray-600 transform transition-transform ${
//                       expandedOrder === order._id ? "rotate-180" : ""
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </div>
//               </div>
//               {expandedOrder === order._id && (
//                 <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3 text-gray-700">
//                         Order Details
//                       </h3>
//                       <div className="space-y-3">
//                         {order.carts.map((product) => (
//                           <div
//                             key={product.productId._id}
//                             className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm"
//                           >
//                             <img
//                               src={`https://localhost:5000/products/${product.productId.productImage}`}
//                               alt={product.productId.productName}
//                               className="w-16 h-16 object-cover rounded-md"
//                             />
//                             <div className="flex-grow">
//                               <p className="font-semibold text-gray-800">
//                                 {product.productId.productName}
//                               </p>
//                               <p className="text-sm text-gray-600">
//                                 Quantity: {product.quantity}
//                               </p>
//                             </div>
//                             <div className="text-right">
//                               <p className="font-semibold text-gray-800">
//                                 $
//                                 {(
//                                   product.productId.productPrice *
//                                   product.quantity
//                                 ).toFixed(2)}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3 text-gray-700">
//                         Shipping Information
//                       </h3>
//                       <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
//                         <p className="text-gray-700 mb-2">
//                           <span className="font-semibold">Address:</span>
//                           {formatAddress(order)}
//                         </p>
//                         <p className="text-gray-700">
//                           <span className="font-semibold">Phone:</span>{" "}
//                           {order.phone}
//                         </p>
//                       </div>
//                       <h3 className="text-lg font-semibold mb-3 text-gray-700">
//                         Order Status
//                       </h3>
//                       <select
//                         onChange={(e) => statusHandler(e, order._id)}
//                         value={order.status}
//                         className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="Delivered">Delivered</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-600 mt-10">No orders found</div>
//       )}
//     </div>
//   );
// };

// export default ViewOrder;



import React, { useState, useEffect } from "react";
import { getAllOrdersApi, updateOrderStatusApi } from "../../../apis/Api";
import { toast } from "react-hot-toast";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrdersApi();
      if (res.data.success && res.data.orders) {
        setOrders(res.data.orders);
      } else {
        setError("Error fetching orders");
      }
    } catch (error) {
      setError("Error fetching orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (order) => {
    return `${order.name}, ${order.street}, ${order.city}, ${order.state} ${order.zipCode}, ${order.country}, ${order.phone}`;
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const statusHandler = async (e, orderId) => {
    const selectedStatus = e.target.value;
    try {
      const response = await updateOrderStatusApi(orderId, { status: selectedStatus });
      if (response.data.success) {
        toast.success(response.data.message);
        const updated = orders.map((o) =>
          o._id === orderId ? { ...o, status: selectedStatus } : o
        );
        setOrders(updated);
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
        <strong className="font-bold">Error: </strong>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[#5a3210] mb-8 text-center">Manage Orders</h2>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl border border-[#e7d8c8] bg-[#fffaf5] shadow-md overflow-hidden"
            >
              <div
                onClick={() => toggleOrderExpansion(order._id)}
                className="flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-[#fef3e9]"
              >
                <div>
                  <p className="text-lg font-semibold text-[#5a3210]">
                    Order ID: <span className="text-gray-600">{order._id.slice(-6)}</span>
                  </p>
                  <p className="text-sm text-gray-500">User: {order.userId}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[#cf5c14] font-bold">${order.totalPrice.toFixed(2)}</span>
                  <svg
                    className={`w-6 h-6 text-[#5a3210] transition-transform ${
                      expandedOrder === order._id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {expandedOrder === order._id && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 border-t border-[#e0cbb5] mt-2">
                    {/* Products */}
                    <div>
                      <h4 className="text-lg font-semibold text-[#5a3210] mb-3">Products</h4>
                      <ul className="space-y-3">
                        {order.carts.map((item) => (
                          <li
                            key={item.productId._id}
                            className="flex items-center gap-4 bg-white border border-[#e5d4c2] p-3 rounded-lg"
                          >
                            <img
                              src={`https://localhost:5000/products/${item.productId.productImage}`}
                              alt={item.productId.productName}
                              className="w-14 h-14 rounded-md object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.productId.productName}</p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="font-semibold text-[#cf5c14]">
                              ${(item.productId.productPrice * item.quantity).toFixed(2)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Shipping & Status */}
                    <div>
                      <h4 className="text-lg font-semibold text-[#5a3210] mb-3">
                        Shipping Info
                      </h4>
                      <div className="bg-white border border-[#e5d4c2] p-4 rounded-lg mb-5">
                        <p className="text-gray-700 mb-1">
                          <span className="font-semibold">Address:</span> {formatAddress(order)}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Phone:</span> {order.phone}
                        </p>
                      </div>

                      <h4 className="text-lg font-semibold text-[#5a3210] mb-3">
                        Status
                      </h4>
                      <select
                        value={order.status}
                        onChange={(e) => statusHandler(e, order._id)}
                        className="w-full px-3 py-2 border border-[#d8c5b1] rounded-md bg-white text-[#5a3210] focus:ring-[#cf5c14] focus:border-[#cf5c14]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">No orders found.</p>
      )}
    </div>
  );
};

export default ViewOrder;
