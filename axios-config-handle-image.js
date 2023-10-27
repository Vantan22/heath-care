import axios from "axios";

const handleImage = axios.create({
    baseURL: 'https://api.imgbb.com', // Thay thế bằng URL của API của bạn
    headers: {
        'Authorization': 'Bearer your-access-token', // Tiêu đề Authorization
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',// Tiêu đề Content-Type
        // Thêm tiêu đề khác nếu cần
    },
});
handleImage.interceptors.request.use(
    (config) => {
        config.headers['Access-Control-Request-Headers'] = 'Content-Type';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Thêm một interceptor để xử lý sau khi nhận phản hồi
handleImage.interceptors.response.use(
    (response) => {
        // Xử lý phản hồi thành công ở đây và chỉ trả về dữ liệu
        return response.data;
    },
    (error) => {
        // Xử lý mọi trường hợp lỗi ở đây và trả về một promise với thông tin lỗi
        return Promise.reject(error);
    }
);
export default handleImage
