import agent from '../../agent';
import ArticleList from '../ArticleList';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionType';

const YourFeedTab = ({ token, onTabClick, tab }) => {
  if (token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        <a
          href="/"
          className={tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = ({ tab, onTabClick }) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    onTabClick('all', agent.Articles.all, agent.Articles.all());
  };

  return (
    <li className="nav-item">
      <a
        href="/"
        className={tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = ({ tag }) => {
  if (!tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="/" className="nav-link active">
        <i className="ion-pound"></i>
        {tag}
      </a>
    </li>
  );
};

const MainView = ({ tab, tag }) => {
  const dispatch = useDispatch();
  const OnTabClick = (tab, pager, payload) =>
    dispatch({ type: CHANGE_TAB, tab, pager, payload });

  const { articles, token } = useSelector((state) => {
    return {
      ...state.articleList,
      token: state.common.token,
    };
  });

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab token={token} onTabClick={OnTabClick} tab={tab} />

          <GlobalFeedTab tab={tab} onTabClick={OnTabClick} />

          <TagFilterTab tag={tag} />
        </ul>
      </div>
      <ArticleList articles={articles} />
    </div>
  );
};

export default MainView;
