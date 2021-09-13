import React from 'react';
import agent from '../agent';
import { SET_PAGE } from '../constants/actionType';
import { useDispatch } from 'react-redux';

const ListPagination = ({ articlesCount, pager, currentPage }) => {
  const dispatch = useDispatch();
  if (articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); ++i) {
    range.push(i);
  }

  const onSetPage = (page, payload) =>
    dispatch({
      type: SET_PAGE,
      page,
      payload,
    });

  const setPage = (page) => {
    if (pager) {
      onSetPage(page, pager(page));
    } else {
      onSetPage(page, agent.Articles.all(page));
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {range.map((v) => {
          const isCurrent = v === currentPage;
          const onClick = (ev) => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            <li
              className={isCurrent ? 'page-item active' : 'page-item'}
              onClick={onClick}
              key={v.toString()}
            >
              <a className="page-link" href="">
                {v + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ListPagination;
