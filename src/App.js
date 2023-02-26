import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthContext from './components/store/auth-context';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const authCtx= useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          {authCtx.token ? <UserProfile />:
          <AuthPage/>}
        </Route>
        <Route path='/profile'>
          {authCtx.token ? <UserProfile /> :
          <AuthPage />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
