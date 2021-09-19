import agent from '../agent';
import ListErrors from './ListErrors';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from '../constants/actionType';

const Login = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => {
    return {
      ...state.auth,
    };
  });

  const onChangeEmail = (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value });
  const onChangePassword = (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value });
  const onSubmit = (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) });
  const onUnload = () => dispatch({ type: LOGIN_PAGE_UNLOADED });

  const changeEmail = (ev) => onChangeEmail(ev.target.value);
  const changePassword = (ev) => onChangePassword(ev.target.value);
  const submitForm = (email, password) => (ev) => {
    ev.preventDefault();
    onSubmit(email, password);
  };

  useEffect(() => {
    return () => onUnload();
  }, []);

  const email = '';
  const password = '';

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <ListErrors errors={auth?.errors} />

            <form onSubmit={submitForm(email, password)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={changeEmail}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={changePassword}
                  />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={auth?.inProgress}
                >
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
