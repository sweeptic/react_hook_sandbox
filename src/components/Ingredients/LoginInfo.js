import React, { useContext } from 'react';
import { AuthContext } from '../../auth-context';

const LoginInfo = React.memo(() => {
  const authContext = useContext(AuthContext);

  console.log('Render LoginInfo');
  return <div>Status:{authContext.isAuth ? 'True' : 'False'}</div>;
});

export default LoginInfo;
