// import { useEffect } from "react";

function PaginationBand(props) {
  // useEffect(() => {
  //   console.log(
  //     `FirstPage bool is ${props.firstPage}. LastPage bool is ${props.lastPage}.`
  //   );
  // }, [props.firstPage, props.lastPage]);

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
