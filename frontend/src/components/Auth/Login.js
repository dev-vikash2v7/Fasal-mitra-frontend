
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios.config";

let schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(6).max(8).required(),
});

function LogIn() {
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log(data);
    axiosInstance.post('/auth/login', data)
      .then((response) => {
        console.log(response)
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  console.log(errors);

  return (
    <div className="container grid grid-rows-6 grid-flow-col content-center gap-4 px-5 my-auto">
      <div className="row-span-1">
        <div className="text-5xl text-emerald-500 text-center">
          Welcome Back!
        </div>
      </div>
      <div className="row-span-1">
        <p className="text-emerald-500 text-2xl text-center">
          Login to get started
        </p>
      </div>
      <div className="row-span-4">
        <form className="container grid grid-rows-6 grid-flow-col content-center gap-2 my-auto" onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <div className="row-span-2 items-center py-2 mx-auto">
            <input
              className={`shadow appearance-none border rounded w-96 ml-6 py-2 px-3 text-gray-700 leading-tight focus:outline-n*one focus:shadow-outline ${errors && errors.email ? 'border-red-500' : ''}`}
              id="username"
              type="text"
              placeholder="Enter your Username"
              {...register("username")}
            />
            {errors && errors.username ? <p class="text-red-500 text-xs italic w-96 ml-6 py-2 px-3">{errors.username.message}</p> : <></>}
          </div>
          <div className="row-span-2 items-center py-2 mx-auto">
            <input
              className={`shadow appearance-none border rounded w-96 ml-6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors && errors.password ? 'border-red-500' : ''}`}
              id="password"
              type="password"
              placeholder="Enter your Password"
              {...register("password")}
            />
            {errors && errors.password ? <p class="text-red-500 text-xs italic w-96 ml-6 py-2 px-3">{errors.password.message}</p> : <></>}
          </div>
          <div className="row-span-2 items-center py-2 mx-auto">
            <input
              className="bg-emerald-500 border-2 border-emerald-500 hover:bg-white hover:text-emerald-500 text-white font-bold py-2 px-10 rounded-full w-25"
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;