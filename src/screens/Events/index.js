import React from "react";
import PageHeader from "shared/components/PageHeader";
import EventsTable from "shared/components/tables/EventsTable";
import { useSelector } from "react-redux";

export default function Events() {
  const { type } = useSelector((state) => state.user);
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2">
          {type === "user" ? (
            <PageHeader title="Events Table" />
          ) : (
            <PageHeader
              title="Events Table"
              text="Add Event"
              path="/add-event"
            />
          )}
          <EventsTable />
        </div>
      </div>
    </>
  );
}
