import { adminRequest } from './configs';

const getProductsOnPage = (page = 1) => adminRequest.get(`/products?page=${page}`);
const getProductsAllObj = () => adminRequest.get('/products/all');
const postProduct = (data) => adminRequest.post('/product', data);
const putProduct = (id, data) => adminRequest.put(`/product/${id}`, data);
const deleteProduct = (id) => adminRequest.delete(`/product/${id}`);

const getOrdersOnPage = (page = 1) => adminRequest.get(`/orders?page=${page}`);
const putOrder = (id, data) => adminRequest.put(`/order/${id}`, data);
const deleteOrder = (id) => adminRequest.delete(`/order/${id}`);
const deleteAllOrders = () => adminRequest.delete('/orders/all');

const postCoupon = (data) => adminRequest.post('/coupon', data);
const getCouponsOnPage = (page = 1) => adminRequest.get(`/coupons?page=${page}`);
const putCoupon = (id, data) => adminRequest.put(`/coupon/${id}`, data);
const deleteCoupon = (id) => adminRequest.delete(`/coupon/${id}`);

const postUpload = (data) => adminRequest.post('/upload', data);

export {
  getProductsOnPage,
  getProductsAllObj,
  postProduct,
  putProduct,
  deleteProduct,
  getOrdersOnPage,
  putOrder,
  deleteOrder,
  deleteAllOrders,
  postCoupon,
  getCouponsOnPage,
  putCoupon,
  deleteCoupon,
  postUpload,
};
