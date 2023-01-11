import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  gridClasses,
} from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
export const Table = () => {
  const ODD_OPACITY = 0.2;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: theme.palette.grey[200],
      "&:hover, &.Mui-hovered": {
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

  const columns: GridColDef[] = [
    { field: "name", headerName: "الاسم", width: 300 },
    {
      field: "department",
      headerName: "القسم",

      width: 200,
    },
    {
      field: "activities",
      width: 200,
      headerName: "النشاطات",
    },
  ];

  const rows = [
    { id: 0, name: "hf", department: "Jon", activities: 35, r3r: "rer3" },
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
        rows={rows}
        columns={columns}
        pageSize={6}
        checkboxSelection={false}
        rowsPerPageOptions={[6]}
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
