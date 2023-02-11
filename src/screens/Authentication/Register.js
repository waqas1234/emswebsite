import { LockClosedIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ApiRequest from "shared/utils/axios";
import UsersApi from "shared/apis/NodeApi";
import { toast } from "react-hot-toast";

export default function Register() {
  const [sending, isSending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    isSending(true);
    const response = await ApiRequest.post(UsersApi.RegisterUserApi, data);
    if (response.data.status === "success") {
      reset();
      toast.success(response.data.message);
      isSending(false);
    } else if (response.data.status === "alreadyexist") {
      toast.error(response.data.message);
      isSending(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in to your account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />

            <ul className="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="user"
                  name="type"
                  value="user"
                  className="hidden peer"
                  {...register("type", { required: true })}
                />
                <label
                  htmlFor="user"
                  className="inline-flex items-center w-full p-2 text-gray-500 bg-white border border-gray-300 rounded-md cursor-pointer dark:hover:text-gray-300 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600"
                >
                  <div className="w-full flex items-center justify-center">
                    <div className="text-sm">Register as User</div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="company"
                  name="type"
                  value="company"
                  className="hidden peer"
                  {...register("type", { required: true })}
                />
                <label
                  htmlFor="company"
                  className="inline-flex items-center w-full p-2 text-gray-500 bg-white border border-gray-300 rounded-md cursor-pointer dark:hover:text-gray-300 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600"
                >
                  <div className="w-full flex items-center justify-center">
                    <div className="text-sm">Register as Company</div>
                  </div>
                </label>
              </li>
            </ul>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: true })}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: true })}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            {errors.name || errors.type || errors.email || errors.password ? (
              <div>
                <ul className="border-2 border-red-500 py-3 px-2 bg-red-50 rounded-md">
                  <li>
                    {errors.name && (
                      <span className="text-sm font-medium text-red-600">
                        Name field is required
                      </span>
                    )}
                  </li>
                  <li>
                    {errors.type && (
                      <span className="text-sm font-medium text-red-600">
                        Registration type field is required
                      </span>
                    )}
                  </li>
                  <li>
                    {errors.email && (
                      <span className="text-sm font-medium text-red-600">
                        Email field is required
                      </span>
                    )}
                  </li>
                  <li>
                    {errors.password && (
                      <span className="text-sm font-medium text-red-600">
                        Password field is required
                      </span>
                    )}
                  </li>
                </ul>
              </div>
            ) : null}

            <div>
              <button
                type="submit"
                disabled={sending ? true : false}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {sending ? "registering please wait ..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}