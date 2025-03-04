import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";

const AllProperty = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/property/admin-all-property`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Property Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/property/${params.id}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  data?.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      price: "Ksh" + item.discountPrice,
      Stock: item.stock,
      sold: item?.sold_out,
    });
  });

  return (
    <div className="w-full px-4 md:px-8 pt-1 mt-10 bg-white overflow-x-auto">
      <div className="max-w-full">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AllProperty;