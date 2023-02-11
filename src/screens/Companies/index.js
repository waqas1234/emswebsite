import React from "react";
import PageHeader from "shared/components/PageHeader";
import CompaniesList from "shared/components/companies/CompaniesList";

export default function Companies() {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2">
          <PageHeader title="Companies List" />
          <CompaniesList />
        </div>
      </div>
    </>
  );
}
