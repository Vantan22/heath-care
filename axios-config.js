import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'https://truculent-kick-production.up.railway.app', // Thay thế bằng URL của API thực tế của bạn
  timeout: 10000, // Thời gian tối đa cho mỗi yêu cầu (10 giây trong trường hợp này)
  headers: {
    'Authorization': 'Bearer your-access-token', // Tiêu đề Authorization
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',// Tiêu đề Content-Type
    // Thêm tiêu đề khác nếu cần
  },
});

// Thêm các header mặc định (ví dụ: Authorization header)
HTTP.defaults.headers.common['Authorization'] = 'Bearer your-access-token';

// Thêm một interceptor để xử lý sau khi nhận phản hồi
HTTP.interceptors.response.use(
  (response) => {
    // Xử lý phản hồi thành công ở đây và chỉ trả về dữ liệu
    return response.data;
  },
  (error) => {
    // Xử lý mọi trường hợp lỗi ở đây và trả về một promise với thông tin lỗi
    return Promise.reject(error);
  }
);

export default HTTP;
