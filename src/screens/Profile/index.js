import React, { useState } from "react";
import PageHeader from "shared/components/PageHeader";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ApiRequest from "shared/utils/axios";
import AddEventApi from "shared/apis/NodeApi";

export default function Profile() {
  const [sending, isSending] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { type } = useSelector((state) => state.user);
  const { name } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
      email: user.user,
    },
  });

  const onSubmit = async (data) => {
    isSending(true);
    try {
      const response = await ApiRequest.post(AddEventApi.UpdateProfileApi, {
        ...data,
        type,
        user,
      });
      if (response.data.status === "success") {
        isSending(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2">
          <PageHeader title="My Profile" />
          <div className="flex justify-center w-full">
            <div className="md:w-2/5 flex justify-center border-2 border-gray-200 rounded-md p-3">
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center h-10">
                  <h3 className="text-md font-medium">Update your profile</h3>
                </div>
                <div className="mt-3">
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    {...register("name", { required: true })}
                    className="relative block w-full appearance-none rounded-t-md rounded-b-0 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Name"
                  />
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", { required: true })}
                    className="relative block w-full appearance-none rounded-t-0 rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  {errors.email || errors.name ? (
                    <div>
                      <ul className="border-2 border-red-500 py-3 px-2 mt-3 bg-red-50 rounded-md">
                        <li>
                          {errors.name && (
                            <span className="text-sm font-medium text-red-600">
                              Name field is required
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
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={sending ? true : false}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {sending ? "updating please wait ..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
