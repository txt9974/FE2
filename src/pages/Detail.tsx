import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../axios/axios";
import { Products } from "../interfaces/Products";

const Detail = () => {
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState<Products | null>(null);
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data.data);
    };
    getProduct();
  }, []);

  return (
    <div>
      <h2>{product?.title}</h2>
      <img src={product?.thumbnail} alt={product?.title} />
      <div>{product?.price}</div>
      <div>{product?.description}</div>
      <button>Add to cart</button>
    </div>
  );
};

export default Detail;
