import React from 'react';
import { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuth: false,
  login: () => {},
});

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    console.log('call');

    setIsAuthenticated(prevValue => !prevValue);
  };

  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
