import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import instance from "../axios/axios";
import { Products } from "../interfaces/Products";
import { ProdContext } from "../contexts/Products";

const productSchema = z.object({
  title: z.string().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
});

const Form = () => {
  const { onSubmitProduct } = useContext(ProdContext);
  const { id } = useParams();
  console.log(id);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Products>({
    resolver: zodResolver(productSchema),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data.data);
      })();
    }, [id]);
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => onSubmitProduct({ ...data, _id: id }))}
      >
        <h1 className="font-bold text-3xl">
          {id ? "Update product" : "Add product"}
        </h1>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control focus: border border-black rounded-[5px]"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control focus: border border-black rounded-[5px]"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            rows={4}
            className="form-control focus: border border-black rounded-[5px]"
            {...register("description")}
          />
        </div>

        <div className="mb-3">
          <button className="btn btn-primary w-100">
            {id ? "Update product" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
