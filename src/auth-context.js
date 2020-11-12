import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuth: false,
  login: () => {},
});

const AuthContextProvider = props => {
  const [isAuth, setIsAuth] = useState(false);

  const loginHandler = () => {
    setIsAuth(true);
  };

  return (
    <AuthContext.Provider value={{ isAuth: isAuth, login: loginHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
