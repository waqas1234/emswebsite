import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ title, text, path }) {
  return (
    <>
      <div className="flex justify-between items-center h-20">
        <h3 className="text-lg font-medium">{title}</h3>
        {text && (
          <Link
            to={path}
            className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {text}
          </Link>
        )}
      </div>
    </>
  );
}
