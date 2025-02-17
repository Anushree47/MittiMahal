'use client'
import React, { useState } from "react";
import { CartProvider } from "@/context/CartContext";

const CartPage = () => {
    const [Items, setItems] = useState('')
    const fetchItemData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
            setItems(res.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };
    const cartItems = [
        {
            id: 1,
            name: "Handmade Terracotta Water Pot",
            price: 999,
            quantity: 2,
            image: "/path-to-clay-product.jpg",
        },
    ];
    return (
        <section className="bg-[#D7A86E] py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                {/* Cart Header */}
                <h2 className="text-2xl font-bold text-[#5A3E2B] sm:text-3xl">
                    Your Clay Cart 🏺
                </h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    {/* Product List Section */}
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-6">
                        {/* Single Product Card */}
                        <div className="rounded-lg border border-[#8B5E3B] bg-[#C68958] p-4 shadow-lg md:p-6">
                            <div className="md:flex md:items-center md:justify-between">
                                {/* Product Image */}
                                <img
                                    className="h-20 w-20 rounded-lg shadow-lg"
                                    src="/path-to-clay-product.jpg"
                                    alt="Clay Pot"
                                />

                                {/* Product Details */}
                                <div className="w-full flex-1 space-y-2 md:max-w-md">
                                    <h3 className="text-lg font-medium text-[#5A3E2B]">
                                        Handmade Terracotta Water Pot
                                    </h3>
                                    <p className="text-sm text-[#6E4C3A]">Eco-friendly & hand-painted</p>

                                    {/* Quantity Selector */}
                                    <div className="flex items-center">
                                        <button className="bg-[#A45C40] text-white px-2 py-1 rounded-l-md">
                                            −
                                        </button>
                                        <input
                                            type="text"
                                            className="w-10 text-center bg-transparent font-semibold"
                                            defaultValue={2}
                                        />
                                        <button className="bg-[#A45C40] text-white px-2 py-1 rounded-r-md">
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Price & Actions */}
                                <div className="text-end">
                                    <p className="text-lg font-bold text-[#5A3E2B]">₹999</p>
                                    <button className="text-sm text-red-600 hover:underline">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Total Price & Checkout */}
                        <div className="flex justify-between items-center p-6 bg-[#A45C40] text-white rounded-lg shadow-lg">
                            <p className="text-lg font-semibold">Total: ₹1998</p>
                            <button className="bg-[#5A3E2B] px-6 py-2 rounded-md font-medium hover:bg-[#8B5E3B]">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPage;



// 'use client'
// import React, { useState } from "react";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "PC system All in One APPLE iMac (2023)",
//       price: 1499,
//       quantity: 2,
//       imageLight: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
//       imageDark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
//     },
//     {
//       id: 2,
//       name: "Restored Apple Watch Series 8",
//       price: 598,
//       quantity: 1,
//       imageLight: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg",
//       imageDark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg",
//     },
//   ]);

//   const updateQuantity = (id, type) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
//             }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//       <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
//         <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
//           <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-6">
//             {cartItems.map((item) => (
//               <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
//                 <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
//                   <img className="h-20 w-20 dark:hidden" src={item.imageLight} alt={item.name} />
//                   <img className="hidden h-20 w-20 dark:block" src={item.imageDark} alt={item.name} />
//                   <div className="w-full min-w-0 flex-1 space-y-4 md:max-w-md">
//                     <p className="text-base font-medium text-gray-900 dark:text-white">{item.name}</p>
//                   </div>
//                   <div className="flex items-center">
//                     <button
//                       type="button"
//                       onClick={() => updateQuantity(item.id, "decrease")}
//                       className="h-5 w-5 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
//                     >
//                       -
//                     </button>
//                     <input
//                       type="text"
//                       value={item.quantity}
//                       readOnly
//                       className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 dark:text-white"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => updateQuantity(item.id, "increase")}
//                       className="h-5 w-5 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div className="text-end md:w-32">
//                     <p className="text-base font-bold text-gray-900 dark:text-white">${item.price * item.quantity}</p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeItem(item.id)}
//                     className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CartPage;

