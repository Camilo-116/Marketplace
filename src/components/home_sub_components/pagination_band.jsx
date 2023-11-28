import React from "react";

function PaginationBand(props) {

  return (
    <>
      <div className="pag-band">
        Latest Online Products
        <div className="nav-buttons">
          <button
            className="prev-page"
            onClick={props.callback}
            disabled={props.firstPage}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            className="next-page"
            onClick={props.callback}
            disabled={props.lastPage}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default PaginationBand;
