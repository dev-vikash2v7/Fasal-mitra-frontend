import React from 'react'
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation, Trans } from 'react-i18next';

const phoneRegex = /^\d{10}$/;
let schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  phone: yup
    .string()
    .required()
    .matches(phoneRegex, "Phone number is not valid"),
  password: yup.string().min(6).max(8).required(),
  type: yup.string().required(),
});

function Signup() {
    const { t, i18n } = useTranslation();
    const submitHandler = (data) => {
        console.log(data)
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
    console.log(errors);


    return (
        <form className="grid grid-rows-6 grid-flow-col gap-4 h-full"
            autoComplete="true"

            onSubmit={handleSubmit(submitHandler)}>
            <div className="row-span-2">
            <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        {t('description.auth.0')}
                    </span>
                    <input type="username" name="username" className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1 ${errors && errors.username ? "border-red-400 focus:border-red-500 focus:ring-red-500" :"focus:border-emerald-500 focus:ring-emerald-500"}`} placeholde="******" {...register('username')} />
                </label>
                {errors && errors.username ? (
                    <p className="text-red-500 text-sm italic ml-6 py-2">
                        {errors.username.message}
                    </p>
                ) : (
                    <></>
                )}
            </div>
            <div className="row-span-2">
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    {t('description.auth.1')}
                    </span>
                    <input type="password" name="password" className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1 ${errors && errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-500" :"focus:border-emerald-500 focus:ring-emerald-500"}`} placeholde="******" {...register('password')} />
                </label>
                {errors && errors.password ? (
                    <p className="text-red-500 text-sm italic ml-6 py-2">
                        {errors.password.message}
                    </p>
                ) : (
                    <></>
                )}
            </div>
            <div className="flex row-span-2">
                <input type="submit" value={t('description.auth.3')} className='mx-auto h-11 w-44 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 cursor-pointer' />
            </div>
        </form>
    )
}

export default Signup