import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import Header from './Header';
import Home from './Home';
import agent from '../agent';
import { APP_LOAD } from '../constants/actionType';
import Login from '../components/Login';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const OnLoad = (payload, token) =>
      dispatch({ type: APP_LOAD, payload, token, skipTracking: true });
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    return OnLoad(token ? agent.Auth.current() : null, token);
  }, [dispatch]);

  const { appName, currentUser } = useSelector((state) => {
    return {
      appName: state.common.appName,
      currentUser: state.common.currentUser,
    };
  });

  return (
    <div>
      <Header appName={appName} currentUser={currentUser}>
        <h1>TopPage</h1>
      </Header>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
