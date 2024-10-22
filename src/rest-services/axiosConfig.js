import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Replace with your backend server URL
//  withCredentials: true, // This will send the cookie with every request
});


// intercepting to capture errors
// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     let message;
//     //const navigate = useNavigate();
//     if (error && error.response && error.response.status === 404) {
//       // window.location.href = '/not-found';
//     } else if (error && error.response && error.response.status === 403) {
//       // window.location.href = process.env.REACT_APP_HOMEPAGE+"/access-denied";
//      // navigate('/access-denied')
//     } else {
//       switch (error.response.status) {
//         case 401:
//            window.location.href = `${process.env.REACT_APP_HOMEPAGE}/authentication/session-expired`;
//           //navigate('/authentication/session-expired')
//           break;
//         case 403:
//           message = "Access Forbidden";
//           break;
//         case 404:
//           message = "Sorry! the data you are looking for could not be found";
//           break;
//         default: {
//           message =
//             error.response && error.response.data
//               ? error.response.data["message"]
//               : error.message || error;
//         }
//       }
//       return Promise.reject(message);
//     }
//   }
// );

// Interceptor to handle responses and errors
instance.interceptors.response.use(
  (response) => {
    return response;  // If the response is successful, just return it
  },
  async (error) => {
    const originalRequest = error.config;  // Capture the original request

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Flag to avoid infinite retry loops

      const refreshToken = sessionStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // Refresh the token
          const tokenResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh-token`, refreshToken);
          const newAccessToken = tokenResponse.data;
          // Store the new access token in localStorage
          localStorage.setItem('encodedCredentials', newAccessToken);

          // Update the original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // Retry the original request with the new access token
          return instance(originalRequest);
        } catch (err) {
          // Token refresh failed, redirect to session expired
          window.location.href = `${process.env.REACT_APP_HOMEPAGE}/authentication/session-expired`;
          return Promise.reject(err);
        }
      } else {
        // No refresh token found, redirect to session expired page
        window.location.href = `${process.env.REACT_APP_HOMEPAGE}/authentication/session-expired`;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);  // Reject other errors
  }
);
export default instance;
