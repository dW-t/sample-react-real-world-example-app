import Banner from './Banner';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { APP_LOAD } from '../../constants/actionType';
import agent from "../../agent"

const Promise = global.Promise;

const Home = () => {
    const dispatch = useDispatch();

    const OnLoad = (tab, pager, payload) => dispatch({ type: APP_LOAD, tab, pager, payload });

    useEffect(() => {
        const tab = token ? 'feed' : 'all';
        const articlesPromise = token ? agent.Articles.feed : agent.Articles.all;

        OnLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
    })

    const { appName, token } = useSelector(state => {
        return {
            ...state.home,
            appName: state.common.appName,
            token: state.common.token
        }
    })

    return (
        <div className="home-page">
            <Banner appName={appName} token={token}></Banner>
        </div>
    );
}

export default Home;