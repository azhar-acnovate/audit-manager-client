import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleBackdrop from '../SimpleBackDrop';
const ToastContext = createContext();
export function useToast() {
    return useContext(ToastContext);
}
export function ToastProvider({ children }) {
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  return (
      <ToastContext.Provider
          value={{
              toast: (type, message) => toast[type](message),
              toastWithCommonResponse: (response) =>
                  toast[response.status === 200 ? 'success' : 'error'](response.message),
              toastPromise: (newToastPromise) =>
                  toast.promise(newToastPromise, {
                      pending: {
                          render() {
                              return <SimpleBackdrop loading={true}></SimpleBackdrop>;
                          },
                          icon: false,
                      },
                      success: {
                          render({ data }) {
                              return `${data.message}`;
                          },
                          icon: '🟢',
                      },
                      error: {
                          render({ data }) {
                              return `${data}`;
                          },
                      },
                  }),
              showSuccessToast,
              showErrorToast,
          }}
      >
          {children}
          <ToastContainer autoClose={1000} position="bottom-right" />
      </ToastContext.Provider>
  );
}

// Function to get the toast style based on data
// const getSuccessToastStyle = ({ data }) => {
//   const dynamicStyle = {};
//   // Customize the toast style based on the data attributes
//   if (data.status === 200) {
//     dynamicStyle.background = 'red';
//     dynamicStyle.color = 'white';
//   } else {
//     // Default style if no specific condition is met
//     dynamicStyle.background = 'gray';
//     dynamicStyle.color = 'black';
//   }

//   return dynamicStyle;
// };
ToastProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
// const Toast = props => {
//     const { toastMeasge,isError=false} = props;
//     // const isError=props.isError!=null?props.isError:false;
//     // //const [toastMeasge,setToastMeasge] = React.useState(props.toastMeasge);

 
//     if(isError){
//     toast.error(toastMeasge, {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }else{
//         toast.info(toastMeasge, {
//             position: toast.POSITION.TOP_CENTER,
//             autoClose: 3000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//     }
//     return (
//         <>
//         {toastMeasge!=null? <ToastContainer />:<div></div>}
          
//         </>
//     );
// }
// export default Toast;