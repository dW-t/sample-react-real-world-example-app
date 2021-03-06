import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import agent from '../agent';
import { ARTICLE_FAVORITE, ARTICLE_UNFAVORITE } from '../constants/actionType';

const FAVORITE_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITE_CLASS = 'btn btn-sm btn-outline-primary';

const ArticlePreview = ({ article }) => {
  const dispatch = useDispatch();
  const favorite = (slug) =>
    dispatch({
      type: ARTICLE_FAVORITE,
      payload: agent.Articles.favorite(slug),
    });

  const unfavorite = (slug) =>
    dispatch({
      type: ARTICLE_UNFAVORITE,
      payload: agent.Articles.unfavorite(slug),
    });

  const favoriteButtonClass = article.favorite
    ? FAVORITE_CLASS
    : NOT_FAVORITE_CLASS;

  const handleClick = (ev) => {
    ev.preventDefault();
    if (article.favorite) {
      unfavorite(article.slug);
    } else {
      favorite(article.slug);
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;
