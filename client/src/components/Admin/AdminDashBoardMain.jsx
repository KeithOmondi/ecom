import React, { useEffect } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getAllBookingsOfAdmin } from "../../../redux/actions/booking";
import { getAllAgents } from "../../../redux/actions/agents";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminBookings, adminBookingLoading } = useSelector(
    (state) => state.booking
  );
  const { agents } = useSelector((state) => state.agent);

  useEffect(() => {
    dispatch(getAllBookingsOfAdmin());
    dispatch(getAllAgents());
  }, [dispatch]);

  const adminEarning =
    adminBookings?.reduce((acc, item) => acc + item.totalPrice * 0.1, 0) || 0;
  const adminBalance = adminEarning.toFixed(2);

  const columns = [
    { field: "id", headerName: "Booking ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.value === "Delivered" ? "greenColor" : "redColor",
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
      headerName: "Booking Date",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const rows =
    adminBookings?.map((item) => ({
      id: item._id,
      itemsQty: item?.cart?.reduce((acc, cartItem) => acc + cartItem.qty, 0),
      total: `${item?.totalPrice} Ksh`,
      status: item?.status,
      createdAt: item?.createdAt.slice(0, 10),
    })) || [];

  return (
    <>
      {adminBookingLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-2xl font-semibold pb-2">Overview</h3>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <AiOutlineMoneyCollect
                    size={30}
                    className="mr-2 text-gray-600"
                  />
                ),
                title: "Total Earning",
                value: `Ksh ${adminBalance}`,
              },
              {
                icon: (
                  <MdBorderClear size={30} className="mr-2 text-gray-600" />
                ),
                title: "All Agents",
                value: agents?.length || 0,
                link: "/admin-agents",
                linkText: "View Agents",
              },
              {
                icon: (
                  <AiOutlineMoneyCollect
                    size={30}
                    className="mr-2 text-gray-600"
                  />
                ),
                title: "All Bookings",
                value: adminBookings?.length || 0,
                link: "/admin-booking",
                linkText: "View Bookings",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded p-5 flex flex-col justify-between min-h-[20vh]"
              >
                <div className="flex items-center">
                  {item.icon}
                  <h3 className="text-xl font-semibold text-gray-700">
                    {item.title}
                  </h3>
                </div>
                <h5 className="text-lg font-medium pl-8 pt-2">{item.value}</h5>
                {item.link && (
                  <Link to={item.link} className="text-blue-600 pt-4 pl-2">
                    {item.linkText}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <br />
          <h3 className="text-2xl font-semibold pb-2">Latest Bookings</h3>
          <div className="w-full bg-white shadow-md rounded overflow-hidden">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={4}
              autoHeight
              disableSelectionOnClick
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
