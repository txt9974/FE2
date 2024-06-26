import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import instance from "./axios/axios";
import Home from "./pages/Home";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      setProducts(data);
    })();
  }, []);
  const onDel = (id: number) => {
    (async () => {
      if (confirm("SURE?")) {
        await instance.delete(`/products/${id}`);
        window.location.href = "/";
      }
    })();
  };
  function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/admin">You are admin?</Link>
          </li>
        </ul>
      </header>
      <button className="codepen-button" onClick={myFunction}>
        <span>Change theme</span>
      </button>

      <div className="element">
        <Routes>
          <Route
            path="/"
            element={<Home products={products} onDel={onDel} />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
