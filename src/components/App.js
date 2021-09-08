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

    const commonState = useSelector(state => state.common)
    return (
        <div>

            <Header
                appName={commonState.appName}
                currentUser={commonState.currentUser}>
                <h1>TopPage</h1>
            </Header>

            <Switch>
            <Route exact path="/" component={Home}/>
            </Switch>
        </div>
    )
}

export default App;