import React from "react";
import PageHeader from "shared/components/PageHeader";
import UserRequestList from "shared/components/event/UserRequestList";
import EventsTable from "shared/components/tables/EventsTable";
import { useSelector } from "react-redux";

export default function Home() {
  const { type } = useSelector((state) => state.user);
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2">
          {type === "user" ? (
            <>
              <PageHeader title="Events List" />
              <EventsTable />
            </>
          ) : (
            <>
              <PageHeader title="Events Request List" />
              <UserRequestList />
            </>
          )}
        </div>
      </div>
    </>
  );
}
