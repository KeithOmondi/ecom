import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookingsOfAdmin } from "../../redux/actions/booking";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";

const AdminDashboardBookings = () => {
  const dispatch = useDispatch();
  const { adminBookings, adminOrderLoading } = useSelector((state) => state.booking); // Corrected state reference

  useEffect(() => {
    dispatch(getAllBookingsOfAdmin());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Booking ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const rows = [];
  if (adminBookings && adminBookings.length > 0) {
    adminBookings.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " Ksh",
        status: item?.status,
        createdAt: item?.createdAt?.slice(0, 10), // Safe slicing
      });
    });
  }

  // Show loading spinner if data is being fetched
  if (adminOrderLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>
          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardBookings;
