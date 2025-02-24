import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions/user";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@material-ui/core";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/user/delete-user/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      dispatch(getAllUsers()); // Refresh the list after deletion
    } catch (error) {
      toast.error("Failed to delete user.");
      console.error("Delete Error:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 130, flex: 0.7 },
    { field: "email", headerName: "Email", type: "text", minWidth: 130, flex: 0.7 },
    { field: "role", headerName: "User Role", type: "text", minWidth: 130, flex: 0.7 },
    { field: "joinedAt", headerName: "Joined At", type: "text", minWidth: 130, flex: 0.8 },
    {
      field: "actions",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setUserId(params.id);
            setOpen(true);
          }}
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows = users?.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    joinedAt: user.createdAt.slice(0, 10),
  })) || [];

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>

        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end">
                <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you want to delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <button
                  className="w-[150px] bg-gray-500 h-[50px] my-3 flex items-center justify-center rounded-xl text-white text-[18px] mr-4"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="w-[150px] bg-red-600 h-[50px] my-3 flex items-center justify-center rounded-xl text-white text-[18px] ml-4"
                  onClick={() => {
                    handleDelete(userId);
                    setOpen(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
