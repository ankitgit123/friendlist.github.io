import { Fragment} from "react";

const Pagination = ({ currentPage,firstPage, lastPage, nextPage, activePageClick, totalPage ,prevPage}) => {
  

  return (
    <Fragment>
      <div className="pagination">
        {currentPage !== 1 && (
          <button
            type="button"
            className={`page_btn radial-out btn btn-primary`}
            onClick={() => firstPage()}
          >
            {"<<"}
          </button>
        )}
        {currentPage !== 1 && (
          <button
            type="button"
            className={`page_btn radial-out btn btn-primary`}
            onClick={() => prevPage()}
          >
            {"<"}
          </button>
        )}
        {totalPage.length > 0 &&
          totalPage.map((item, index) => {
            return (
              <button
                type="button"
                key={index}
                title={item}
                className={`${
                  currentPage === item ? "active" : ""
                } page_btn radial-out btn btn-primary`}
                onClick={() => activePageClick(item)}
              >
                {item}
              </button>
            );
          })}
        {currentPage !== totalPage.length && (
          <button
            type="button"
            className={`page_btn radial-out btn btn-primary`}
            onClick={() => nextPage()}
          >
            {">"}
          </button>
        )}
        {currentPage !== totalPage.length && (
          <button
            type="button"
            className={`page_btn radial-out btn btn-primary`}
            onClick={() => lastPage()}
          >
            {">>"}
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default Pagination;
