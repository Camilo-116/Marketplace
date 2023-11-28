import { useEffect, useState } from "react";
import TopBackground from "./home_sub_components/top_background";
import SearchBar from "./home_sub_components/search_bar";
import PaginationBand from "./home_sub_components/pagination_band";
import Products from "./home_sub_components/products";

function HomePage(props) {

  const platonicAdmin = props.platonicAdmin;

  const [allProducts, setAllProducts] = useState(props.products);

  const [currentProducts, setCurrentProducts] = useState([]);

  const [pageProducts, setPageProducts] = useState(currentProducts.slice(0, 8));

  const [page, setPage] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(1);

  const [category, setCategory] = useState("none");

  useEffect(() => {
    console.log(`Updating products: ${props.products}`);
    setAllProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    const localStorageProducts = JSON.parse(localStorage.getItem("products"));
    if (localStorageProducts) {
      setAllProducts(localStorageProducts);
    }
  }, []);

  useEffect(() => {
    if (category === "none") {
      setCurrentProducts(allProducts);
    } else {
      setCurrentProducts(
        allProducts.filter((product) => product.category === category)
      );
    }
  }, [category, allProducts]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(currentProducts.length / 8));
  }, [currentProducts]);

  useEffect(() => {
    setPageProducts(currentProducts.slice(page * 8, page * 8 + 8));
  }, [page, currentProducts]);

  const changePage = (e) => {
    if (
      e.target.className === "prev-page" ||
      e.target.className === "fa-solid fa-chevron-left"
    ) {
      if (page > 0) {
        setPage(page - 1);
      }
    } else if (
      e.target.className === "next-page" ||
      e.target.className === "fa-solid fa-chevron-right"
    ) {
      if (page < numberOfPages - 1) {
        setPage(page + 1);
      }
    }
  };

  const onSelectedCategory = (e) => {
    setCategory(e.target.value);
  };

  const onSearchSubmitted = (e) => {
    e.preventDefault();
    const searchInput = document.querySelector(".search-input");
    const searchValue = searchInput.value;
    if (searchValue.trim() == "") {
      setCategory("none");
      setCurrentProducts(allProducts);
    } else {
      setCurrentProducts(
        allProducts.filter((product) => {
          if (category === "none") {
            return product.name
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          } else {
            return (
              product.name.toLowerCase().includes(searchValue.toLowerCase()) &&
              product.category === category
            );
          }
        })
      );
    }
  };

  const handleToDashboard = () => {
    if (!platonicAdmin) {
      props.dialogsCallback()
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <>
      <TopBackground />
      <div className="to-dashboard" onClick={handleToDashboard}>
        <i className="fa-solid fa-table-columns"></i>
        <p>Go to admin page</p>
      </div>
      <SearchBar
        categoryCallback={onSelectedCategory}
        searchCallback={onSearchSubmitted}
      />
      <div style={{ height: "12vh" }}></div>
      <PaginationBand
        callback={changePage}
        firstPage={page == 0}
        lastPage={page == Math.ceil(currentProducts.length / 8) - 1}
      />
      <Products products={pageProducts} />
    </>
  );
}

export default HomePage;
