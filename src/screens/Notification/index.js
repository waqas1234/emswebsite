import React, { useEffect, useState } from "react";
import PageHeader from "shared/components/PageHeader";
import ApiRequest from "shared/utils/axios";
import UsersApi from "shared/apis/NodeApi";
import { useSelector } from "react-redux";

export default function Notification() {
  const [logs, setLogs] = useState([]);
  const { userid } = useSelector((state) => state.user);

  const getLogs = async () => {
    const response = await ApiRequest.get(UsersApi.GetLogsApi, {
      params: {
        userid: userid,
      },
    });
    if (response.data.status === "success") {
      console.log(response);
      setLogs(response.data.data);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2">
          <PageHeader title="Notificatins" />
        </div>

        <div className="w-full flex justify-center">
          <div className="w-3/5 rounded-md">
            {logs.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex justify-start  p-4 border-2 border-gray-200 rounded-md mb-2"
                >
                  <div className="flex items-center min-w-[50px]">
                    <span
                      className="w-5 h-5 rounded-full bg-red-600 text-white
                   flex justify-center items-center"
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-sm">
                      <span className="font-bold">Event:&nbsp;</span>
                      {item.log}
                    </p>
                    <p className="font-sm">
                      <span className="font-bold">Managed by:&nbsp;</span>
                      {item.company}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
