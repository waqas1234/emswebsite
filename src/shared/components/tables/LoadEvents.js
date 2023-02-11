import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ApiRequest from "shared/utils/axios";
import UsersApi from "shared/apis/NodeApi";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoadEvents() {
  const [events, setEvents] = useState([]);
  const { userid } = useSelector((state) => state.user);
  const { type } = useSelector((state) => state.user);

  const handleEventRequest = (eventid, companyid) => {
    const EventRequest = async () => {
      try {
        const response = await ApiRequest.post(UsersApi.GetEventRequstApi, {
          userid: userid,
          eventid: eventid,
          companyid: companyid,
        });

        if (response.data.status === "success") {
          toast.success(response.data.message);
          getEvents();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    EventRequest();
  };

  const getEvents = async () => {
    try {
      const response = await ApiRequest.get(UsersApi.GetEventsApi, {
        params: {
          userid: userid,
          type: type,
        },
      });
      if (response.data.status === "success") {
        setEvents(response.data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "eventid", headerName: "Event ID", width: 150, hide: true },
    {
      field: "requestedevents",
      headerName: "Requested Events",
      width: 150,
      hide: true,
    },
    { field: "eventname", headerName: "Event name", width: 150 },
    { field: "eventdate", headerName: "Event Date", width: 150 },
    {
      field: "eventtime",
      headerName: "Event Time",
      width: 120,
    },
    {
      field: "eventlocation",
      headerName: "Event Location",
      width: 200,
    },
    {
      field: "eventdescription",
      headerName: "Event Description",
      width: 150,
    },
    {
      field: "companyid",
      headerName: "Company ID",
      width: 150,
    },
    {
      field: "isapproved",
      headerName: "Is Approved",
      width: 150,
      hide: true,
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 150,
      hide: type === "company" ? false : true,

      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="success"
              size="small"
              component={Link}
              sx={{ textTransform: "capitalize" }}
              to={`${"/edit-event/"}${params.row.eventid}`}
            >
              Edit
            </Button>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      hide: type === "company" ? true : false,

      renderCell: (params) => {
        return (
          <>
            <div>
              {params.row.requestedevents === true ? (
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  disabled
                >
                  {params.row.isapproved === true ? "Approved" : "Pending"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() =>
                    handleEventRequest({
                      eventid: params.row.eventid,
                      companyid: params.row.companyid,
                    })
                  }
                >
                  Request for Event
                </Button>
              )}
            </div>
          </>
        );
      },
    },
  ];

  const rows = events.map((event, index) => {
    return {
      id: index + 1,
      eventid: event._id,
      requestedevents: event.requestedevents,
      eventname: event.event,
      eventdate: event.date,
      eventtime: event.time,
      eventlocation: event.location,
      eventdescription: event.detail,
      isapproved: event.isapproved,
      companyid: event.companyid,
    };
  });

  return (
    <>
      <div className="h-[600px]">
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
