import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { PrimeReactProvider } from "primereact/api";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import HomePage from "./components/HomePage";
import AdminPage from "./components/admin_page";
import Login from "./components/auth";

function App() {
  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "We will trust you",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You're honest, we appreciate that",
      life: 3000,
    });
  };

  const confirm1 = ({onNext, onClose}) => {
    confirmDialog({
      message: "This feature is exclusive for admins. Are you an admin?",
      header: "Admin Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: onNext,
      reject: onClose,
    });
  };

  const confirm2 = ({onConfirm, onClose}) => {
    confirmDialog({
      message:
        'The 9th commandment says "You shall not bear false witness".\n Are you sure you\'re an admin?',
      header: "Admin Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: onConfirm,
      reject: onClose,
    });
  };

  const [platonicAdmin, setPlatonicAdmin] = useState((localStorage.getItem('platonicAdmin') == 'true') || false);

  const [showDialogs, setShowDialogs] = useState([false, false]);

  useEffect(() => {
    localStorage.setItem('platonicAdmin', platonicAdmin);
  }, [platonicAdmin]);

  const [products, setProducts] = useState(
    () => JSON.parse(localStorage.getItem("products")) || []
  );

  useEffect(() => {
    const localStorageProducts = JSON.parse(localStorage.getItem("products"));

    if (localStorageProducts && localStorageProducts.length > 0) {
      setProducts(localStorageProducts);
    } else {
      fetch("./src/assets/products.json")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.products);
        });
    }
  }, []);

  useEffect(() => {
    if (!platonicAdmin) {
      if (showDialogs[0]) {
        console.log("Opening dialog1");
        confirm1({
          onClose: handleDialog1Close,
          onNext: handleDialog1Next,
        });
      } else if (showDialogs[1]) {
        confirm2({
          onClose: handleDialog2Close,
          onConfirm: handleDialog2Confirm,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDialogs, platonicAdmin]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const updateProducts = (products) => {
    setProducts(products);
  };

  const handleOpenDialogs = () => {
    console.log("Opening dialogs");
    setShowDialogs([true, false]);
  };

  const handleDialog1Next = () => {
    console.log("Opening dialog2");
    setShowDialogs([false, true]);
  };

  const handleDialog1Close = () => {
    reject();
    setShowDialogs([false, false]);
  };

  const handleDialog2Confirm = () => {
    accept();
    setPlatonicAdmin(true);
    window.location.href = "/dashboard";
    setShowDialogs([false, false]);
  };

  const handleDialog2Close = () => {
    reject();
    setShowDialogs([false, false]);
  };

  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Toast ref={toast} />
                <ConfirmDialog />
                <HomePage
                  products={products}
                  updateProducts={updateProducts}
                  dialogsCallback={handleOpenDialogs}
                  platonicAdmin={platonicAdmin}
                />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminPage products={products} callback={updateProducts} />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
