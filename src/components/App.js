import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import Header from "./Header";
import Home from "./Home";
import agent from "../agent"
import { APP_LOAD } from '../constants/actionType';

const App = () => {
    const dispatch = useDispatch();

    const OnLoad = (payload, token) => dispatch({ type: APP_LOAD, payload, token, skipTracking: true });

    useEffect(() => {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token);
        }

        return OnLoad(token ? agent.Auth.current() : null, token);
    })

    const { appLoaded, appName, currentUser, redirectTo } = useSelector(state => {
        return {
            appLoaded: state.common.appLoaded,
            appName: state.common.appName,
            currentUser: state.common.currentUser,
            redirectTo: state.common.redirectTo
        }
    })

    return (
        <div>

            <Header
                appName={appName}
                currentUser={currentUser}>
                <h1>TopPage</h1>
            </Header>

            <Switch>
            <Route exact path="/" component={Home}/>
            </Switch>
        </div>
    )
}

export default App;