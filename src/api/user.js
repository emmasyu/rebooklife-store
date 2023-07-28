import { userRequest } from './configs';

const postUserLogin = (data) => userRequest.post('admin/signin', data);
const postUserLogout = () => userRequest.post('logout');
const postUserCheck = () => userRequest.post('api/user/check');

export { postUserLogin, postUserLogout, postUserCheck };
