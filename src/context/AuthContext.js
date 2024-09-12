import React from 'react';
import { useSetState } from 'react-use';
import UserService from '../rest-services/UserService';
import { useUser } from './UserContext';
export const AuthContext = React.createContext("Default");
const initialState = {
  isLoggedIn: localStorage.getItem('encodedCredentials')!=null,
  isLoginPending: false,
  loginError: null
}

export const ContextProvider = props => {
  const {setUser } = useUser();
  // const navigate = useNavigate();
  const [state, setState] = useSetState(initialState);
  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
  const setLoginError = (loginError) => setState({ loginError });

  const login = async (username, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);
    let loginError = null;
    // Handle the response from backend here
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);

    try {
      let res = await UserService.login(encodedCredentials);
      setLoginPending(false);
      setLoginSuccess(true);
      localStorage.setItem('userDetail', JSON.stringify(res));
      localStorage.setItem('encodedCredentials', res['accessToken']);
      setUser(res)
      window.location.href = "/dashboard";
      // Check authorization code with backend API
    } catch (error) {

      console.log(error)
      console.log(`herer............`,error)
      loginError=error;
      setLoginPending(false);
      setLoginError(error);
    }

    return loginError;
  }

  const logout = () => {

    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
    // Remove the access token from the browser's local storage
    localStorage.removeItem('encodedCredentials');
    localStorage.removeItem('userDetail');
    window.location.href = "/authentication/sign-in";

  }


  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

