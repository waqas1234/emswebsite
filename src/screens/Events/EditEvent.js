import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "shared/components/PageHeader";
import { useForm } from "react-hook-form";
import ApiRequest from "shared/utils/axios";
import UsersApi from "shared/apis/NodeApi";
import toast from "react-hot-toast";

export default function EditEvent() {
  const [sending, setSending] = useState(false);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      event: "",
      time: "",
      date: "",
      location: "",
      detail: "",
    },
  });

  const onSubmit = async (data) => {
    setSending(true);
    try {
      const response = await ApiRequest.post(UsersApi.GetEditEventApi, {
        ...data,
        id,
      });
      if (response.data.status === "success") {
        setSending(false);
        toast.success("Event Updated Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await ApiRequest.get(UsersApi.GetSigleEventApi, {
          params: {
            id,
          },
        });

        console.log(response.data.data);
        if (response.data.status === "success") {
          reset({
            event: response.data.data.event,
            time: response.data.data.time,
            date: response.data.data.date,
            location: response.data.data.location,
            detail: response.data.data.detail,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getEvent();
  }, [id, reset]);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2">
          <PageHeader title="Edit Event" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center w-full">
              <div className="w-2/5">
                <div>
                  <label htmlFor="Event Name" className="sr-only">
                    Event Name
                  </label>
                  <input
                    id="event"
                    name="event"
                    type="text"
                    {...register("event", { required: true })}
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Event Name"
                  />
                </div>
                <div>
                  <label htmlFor="Event Time" className="sr-only">
                    Event Time
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    {...register("time", { required: true })}
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Event Time"
                  />
                </div>
                <div>
                  <label htmlFor="Event Date" className="sr-only">
                    Event Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    {...register("date", { required: true })}
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Event Date"
                  />
                </div>
                <div>
                  <label htmlFor="Event Date" className="sr-only">
                    Event Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    {...register("location", { required: true })}
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Event Location"
                  />
                </div>
                <div>
                  <label htmlFor="Event Detail" className="sr-only">
                    Event Detail
                  </label>
                  <textarea
                    id="detail"
                    name="detail"
                    type="text"
                    {...register("detail", { required: true })}
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Event Date"
                  />
                </div>

                <div>
                  {errors.event ||
                  errors.time ||
                  errors.date ||
                  errors.location ||
                  errors.detail ? (
                    <div>
                      <ul className="border-2 border-red-500 py-3 px-2 mt-3 bg-red-50 rounded-md">
                        <li>
                          {errors.event && (
                            <span className="text-sm font-medium text-red-600">
                              Event field is required
                            </span>
                          )}
                        </li>
                        <li>
                          {errors.time && (
                            <span className="text-sm font-medium text-red-600">
                              Time field is required
                            </span>
                          )}
                        </li>
                        <li>
                          {errors.date && (
                            <span className="text-sm font-medium text-red-600">
                              Date field is required
                            </span>
                          )}
                        </li>
                        <li>
                          {errors.location && (
                            <span className="text-sm font-medium text-red-600">
                              Location field is required
                            </span>
                          )}
                        </li>
                        <li>
                          {errors.detail && (
                            <span className="text-sm font-medium text-red-600">
                              Detail field is required
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
                    {sending ? "updating please wait ..." : "Edit Event"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
