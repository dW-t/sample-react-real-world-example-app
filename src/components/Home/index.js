import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  HOME_PAGE_LOADED,
  APPLY_TAG_FILTER,
  HOME_PAGE_UNLOADED,
} from '../../constants/actionType';
import agent from '../../agent';
import Tags from './Tags';
import MainView from './MainView';

const Promise = global.Promise;

const Home = () => {
  const dispatch = useDispatch();
  const OnClickTag = (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });

  const { tags, appName, token } = useSelector((state) => {
    return {
      ...state.home,
      appName: state.common.appName,
      token: state.common.token,
    };
  });

  const tab = token ? 'feed' : 'all';
  useEffect(() => {
    const OnLoad = (tab, pager, payload) =>
      dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload });
    const articlesPromise = token ? agent.Articles.feed : agent.Articles.all;

    OnLoad(
      tab,
      articlesPromise,
      Promise.all([agent.Tags.getAll(), articlesPromise()])
    );
  }, [dispatch, token, tab]);

  useEffect(() => {
    const onUnload = () => dispatch({ type: HOME_PAGE_UNLOADED });

    return () => onUnload();
  }, [dispatch]);

  return (
    <div className="home-page">
      <Banner appName={appName} token={token}></Banner>

      <div className="container page">
        <div className="row">
          <MainView tab={tab} />

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Tags tags={tags} onClickTag={OnClickTag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
