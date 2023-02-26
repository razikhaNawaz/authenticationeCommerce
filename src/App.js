import { useContext, useEffect, useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthContext from './components/store/auth-context';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const [render, setRender]=useState(true);
  const authCtx= useContext(AuthContext);

  setTimeout(()=>{
    console.log('setTimeout');
    authCtx.logout();
    setRender(false);
  }, 5000);

  useEffect(()=>{
    console.log('useEffect called')
  }, [render])
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (<Route path='/auth'>
          <AuthPage/>
        </Route>)}
        <Route path='/profile'>
        {authCtx.isLoggedIn && <UserProfile />}
        {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        
        <Route path='*'>
          <Redirect to ='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
