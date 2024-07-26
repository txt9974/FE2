import { Infor } from "../interfaces/infor";
import instance from "../axios/axios";
import { loginSchema, registerSchema } from "../utils/validAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useNavigate } from "react-router-dom";

type Props = {
  isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Infor>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const nav = useNavigate();

  const onSubmitAuth = async (data: Infor) => {
    try {
      if (isLogin) {
        const res = await instance.post(`/user/login`, data);
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data.userExist));
        if (confirm(`${res.data.message}`)) {
          nav("/");
        }
      } else {
        await instance.post(`/user/register`, data);
        if (confirm("DONE!")) {
          nav("/admin/login");
        }
      }
    } catch (error: any) {
      console.log(error);
      alert(error?.response?.data || "Error!");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitAuth)}>
      <h1 className="font-bold text-3xl">{isLogin ? "Login" : "Register"}</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="email"
          className="form-control"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          password
        </label>
        <input
          type="password"
          className="form-control"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
      </div>

      {!isLogin && (
        <div className="mb-3">
          <label htmlFor="confirmPass" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPass", { required: true })}
          />
          {errors.confirmPass && (
            <span className="text-danger">{errors.confirmPass.message}</span>
          )}
        </div>
      )}

      <div className="mb-3">
        <button className="btn btn-primary w-100">
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
