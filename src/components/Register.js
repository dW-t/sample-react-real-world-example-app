import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import agent from '../agent';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
} from '../constants/actionType';

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { auth } = useSelector((state) => {
    return {
      ...state.auth,
    };
  });

  const onChangeEmail = (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value });
  const onChangePassword = (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value });
  const onChangeUsername = (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value });
  const onSubmit = (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  };
  const onUnload = () => dispatch({ type: REGISTER_PAGE_UNLOADED });

  const changeEmail = (ev) => {
    setEmail(ev.target.value);
    onChangeEmail(ev.target.value);
  };

  const changePassword = (ev) => {
    setPassword(ev.target.value);
    onChangePassword(ev.target.value);
  };

  const changeUsername = (ev) => {
    setUsername(ev.target.value);
    onChangeUsername(ev.target.value);
  };

  const submitForm = (email, password) => (ev) => {
    ev.preventDefault();
    onSubmit(email, password);
  };

  useEffect(() => {
    return () => onUnload();
  }, []);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ListErrors errors={auth?.errors} />

            <form onSubmit={submitForm(username, email, password)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={changeUsername}
                  />
                </fieldset>

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
                  Sign up
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
