import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ApiRequest from "shared/utils/axios";
import UsersApi from "shared/apis/NodeApi";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function LoadRequestList() {
  const [eventRequestStatus, setEventRequestStatus] = useState([]);
  const { userid } = useSelector((state) => state.user);

  const GetEventRequestStatusApi = async () => {
    const response = await ApiRequest.post(UsersApi.GetEventRequestStatusApi, {
      userid: userid,
    });
    if (response.data.status === "success") {
      setEventRequestStatus(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    GetEventRequestStatusApi();
  });

  const handleApproveRequest = async (eventid) => {
    const response = await ApiRequest.post(UsersApi.ApproveEventRequestApi, {
      eventid,
    });

    if (response.data.status === "success") {
      toast.success(response.data.message);
      GetEventRequestStatusApi();
    } else {
      toast.error(response.data.message);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "eventid", headerName: "Event ID", width: 150, hide: true },
    { field: "eventname", headerName: "Event Name", width: 150 },
    { field: "eventdate", headerName: "Event Date", width: 150 },
    { field: "eventtime", headerName: "Event Time", width: 150 },
    { field: "eventlocation", headerName: "Event Location", width: 200 },
    { field: "username", headerName: "User Name", width: 200 },
    {
      field: "eventstatus",
      headerName: "Event Status",
      width: 200,
      hide: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.row.eventstatus === "approved" ? (
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ textTransform: "capitalize" }}
                disabled
              >
                Approved
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ textTransform: "capitalize" }}
                onClick={() => handleApproveRequest(params.row.eventid)}
              >
                Approve Request
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const rows = eventRequestStatus.map((data, index) => {
    return {
      id: index + 1,
      eventid: data.requestModel._id,
      eventname: data.requestModel.event,
      eventdate: data.requestModel.date,
      eventtime: data.requestModel.time,
      eventlocation: data.requestModel.location,
      username: data.requestuser,
      eventstatus: data.status,
    };
  });

  return (
    <>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f4f4f4",
              cursor: "pointer",
            },

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f4f4f4",
            },
          }}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </>
  );
}
