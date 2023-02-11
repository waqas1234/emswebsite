import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ApiRequest from "shared/utils/axios";
import UsersApi from "shared/apis/NodeApi";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const { userid } = useSelector((state) => state.user);

  const handleFollow = (companyid) => {
    const followCompany = async () => {
      try {
        const respnse = await ApiRequest.post(UsersApi.GetFollowCompanyApi, {
          userid: userid,
          companyid: companyid,
        });
        if (respnse.data.status === "success") {
          toast.success("Company Followed Successfully");
          getCompanies();
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };

    followCompany();
  };

  const handleunFollow = (companyid) => {
    const unfollowCompany = async () => {
      try {
        const respnse = await ApiRequest.post(UsersApi.GetUnFollowCompanyApi, {
          userid: userid,
          companyid: companyid,
        });
        if (respnse.data.status === "success") {
          toast.success("Company Unfollowed Successfully");
          getCompanies();
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };

    unfollowCompany();
  };

  const getCompanies = async () => {
    try {
      const response = await ApiRequest.get(UsersApi.GetCompaniesApi, {
        params: { userid: userid },
      });
      if (response.data.status === "success") {
        setCompanies(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanies();
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "companyid", headerName: "Company ID", width: 250, hide: true },
    { field: "companyname", headerName: "Company Name", width: 250 },
    { field: "companyemail", headerName: "Company Email", width: 250 },
    { field: "isfollowed", headerName: "Is Followed", width: 250, hide: true },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            {params.row.isfollowed === true ? (
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ textTransform: "capitalize" }}
                onClick={() => handleunFollow(params.row.companyid)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ textTransform: "capitalize" }}
                onClick={() => handleFollow(params.row.companyid)}
              >
                Follow Company
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const rows = companies.map((company, index) => {
    return {
      id: index + 1,
      companyid: company._id,
      isfollowed: company.followedcompanies,
      companyname: company.name,
      companyemail: company.email,
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
