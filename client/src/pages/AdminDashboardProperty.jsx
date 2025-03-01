import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AllProperty from "../components/Admin/AllProperty";
import CreateProperty from "../components/Admin/CreateProperty";

const AdminDashboardProperty = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <AdminHeader />

      {/* Main Content */}
      <div className="flex w-full">
        {/* Sidebar */}
        <div className="w-[80px] md:w-[250px] lg:w-[300px] bg-white shadow-md h-screen">
          <AdminSideBar active={5} />
        </div>

        {/* Content Section */}
        <div className="flex flex-col w-full p-4 space-y-6">
          <AllProperty />
          <CreateProperty />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProperty;
