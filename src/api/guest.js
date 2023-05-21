import { guestRequest } from "./configs.js";

const getProductsOnPage = (page = 1) =>
  guestRequest.get(`/products?page=${page}`);
const getProductsAll = () => guestRequest.get(`/products/all`);
const getProduct = (id) => guestRequest.get(`/product/${id}`);

const getCarts = () => guestRequest.get(`/cart`);
const postCart = (data) => guestRequest.post(`/cart`, data);
const putCart = (id, data) => guestRequest.put(`/cart/${id}`, data);
const deleteCart = (id) => guestRequest.delete(`/cart/${id}`);
const deleteAllCarts = () => guestRequest.delete(`/carts/`);

const postCoupon = (data) => guestRequest.post(`/coupon`, data);

const getOrders = (page = 1) => guestRequest.get(`/orders?page=${page}`);
const getOrder = (id) => guestRequest.get(`/order/${id}`);
const postOrder = (data) => guestRequest.post(`/order`, data);
const postPay = (id) => guestRequest.post(`/pay/${id}`);

export {
  getProductsOnPage,
  getProductsAll,
  getProduct,
  getCarts,
  postCart,
  putCart,
  deleteCart,
  deleteAllCarts,
  postCoupon,
  getOrders,
  getOrder,
  postOrder,
  postPay,
};
