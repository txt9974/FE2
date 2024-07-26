import { createContext, useEffect, useReducer } from "react";
import { Products } from "../interfaces/Products";
import instance from "../axios/axios";
import productsReducer from "../reducers/ProductsReducer";

export type ProdContextType = {
  state: { products: Products[] };
  onDel: (_id: string) => void;
  onSubmitProduct: (data: Products) => void;
  dispatch: React.Dispatch<any>;
};

export const ProdContext = createContext({} as ProdContextType);

export const ProdProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(productsReducer, { products: [] });
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      dispatch({ type: "LIST_PRODUCTS", payload: data.data });
    })();
  }, []);
  const onDel = (_id: string) => {
    (async () => {
      if (confirm("SURE?")) {
        await instance.delete(`/products/${_id}`);
        dispatch({ type: "DELETE_PRODUCT", payload: _id });
      }
    })();
  };

  const onSubmitProduct = async (product: Products) => {
    try {
      if (product._id) {
        // logic edit

        const { data } = await instance.patch(
          `/products/${product._id}`,
          product
        );
        dispatch({ type: "EDIT_PRODUCT", payload: data.data });
      } else {
        // logic add
        const { data } = await instance.post(`/products`, product);
        dispatch({ type: "ADD_PRODUCT", payload: data.data });
      }
      window.location.href = "/admin";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ProdContext.Provider value={{ state, dispatch, onDel, onSubmitProduct }}>
      {children}
    </ProdContext.Provider>
  );
};
