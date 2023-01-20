import {
  DataGrid,
  GridColDef,
  GridEventListener,
  gridClasses,
} from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import { Button } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

export const UsersTable = () => {
  const [modal, setModal] = useState<boolean>(false);

  const ODD_OPACITY = 0.2;
  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      "&:hover, &.Mui-hovered": {
        cursor: "pointer",
      },
    },
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: theme.palette.grey[200],
      "&:hover, &.Mui-hovered": {
        cursor: "pointer",
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        "&:hover, &.Mui-hovered": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
  }));
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setModal(true);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "الاسم", width: 300 },

    {
      field: "department",
      headerName: "القسم",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "activities",

      headerName: "النشاطات",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "editButton",

      headerName: "تعديل",
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        return (
          <Button onClick={() => console.log(params.id)}>
            <FiEdit className="text-lg" />
          </Button>
        );
      },
    },
    {
      field: "deleteButton",

      headerName: "حذف",
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        return (
          <Button color="warning" onClick={() => console.log(params.id)}>
            <MdOutlineDeleteOutline className="text-lg" />
          </Button>
        );
      },
    },
  ];

  const rows = [
    {
      id: 0,
      name: "hf",
      department: "Jon",
      activities: 35,
    },
    { id: 2, name: "Shfnow", department: "Jon", activities: 35 },
    { id: 5, name: "yhi", department: "Jon", activities: 35 },
    { id: 6, name: "etb", department: "Jon", activities: 35 },
    { id: 7, name: "arr", department: "Jon", activities: 35 },
    { id: 8, name: "uk", department: "Jon", activities: 35 },
    { id: 9, name: ",ol", department: "Jon", activities: 35 },
  ];

  return (
    <div className="w-full flex-1">
      <StripedDataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={20}
        checkboxSelection={false}
        onRowClick={handleRowClick}
        rowsPerPageOptions={[20]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        sx={{
          backgroundColor: "white",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#ECE8DD",
            fontWeight: "heavy ",
            "& .odd": { backgroundColor: "red" },
          },
        }}
      />
    </div>
  );
};
