import React from 'react';

const Pagination = ({pager, onPaginateLink}) => {
  
  const setPageItemClass = (link) => link ? "page-item" : "page-item disabled";
  const setCurrentPageClass = (page) => page === pager.current_page ? "page-item active" : "page-item";
  const totalPage = pager.last_page > 10 ? 10 : pager.last_page;

  return (
    <nav aria-label="..." className="float-right">
      <ul className="pagination">
        <li className={setPageItemClass(pager.prev_page_url)}>
          <a className="page-link" href="#" onClick={e => onPaginateLink(e, pager.prev_page_url)}>Previous</a>
        </li>

        { Array.from({ length: totalPage }, (val, key) => (
          <li className={setCurrentPageClass(key+1)} aria-current="page" key={key+1}>
            <a 
              className="page-link" 
              href="#"
              onClick={e => onPaginateLink(e, `${pager.path}?page=${key+1}`)}
            >
                {key+1} <span className="sr-only">(current)</span>
            </a>
          </li>                    
        ))}

        <li className={setPageItemClass(pager.next_page_url)}>
          <a 
            href="#"
            className="page-link"
            onClick={e => onPaginateLink(e, pager.next_page_url)}>Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
