import React, { useContext } from 'react';
import { AuthContext } from './auth-context';
import Auth from './components/Auth';
import Ingredients from './components/Ingredients/Ingredients';

const App = props => {
  const authContext = useContext(AuthContext);
  console.log('render App');

  let content = <Auth />;

  if (authContext.isAuth) {
    content = <Ingredients />;
  }

  return (
    <React.Fragment>
      {/* login: {authContext.isAuth ? 'true' : 'false'} */}
      {content}
      {/* <Ingredients />; */}
    </React.Fragment>
  );
};

export default App;
