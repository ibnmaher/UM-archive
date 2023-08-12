import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridPagination,
  gridClasses,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import { Button, Chip, TablePaginationProps, TextField } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect } from "react";
import { useGetActivities } from "./api/getActivities";
import Barcode from "react-barcode";
import { Modal } from "./components/modal";
import { DeleteModal } from "./components/deleteModal";
import { UpdateActivityModal } from "./components/updateActivityModal";
import { AUTH, QUERY } from "types";
import { MoonLoader } from "react-spinners";
import MuiPagination from "@mui/material/Pagination";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "utils/protectedRoute";
import { UserActivityTable } from "./userActivityTable";
interface PROPS {
  query: QUERY;
  auth: AUTH;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<
    React.SetStateAction<"success" | "info" | "warning" | "error">
  >;
}
export const ActivitiesTable = ({
  query,
  auth,
  refetch,
  setRefetch,
  setMessage,
  setOpen,
  setSeverity,
}: PROPS) => {
  const [modalActivity, setModalActivity] = useState<any>(false);
  const [updateActivityModal, setUpdateActivityModal] = useState<any>(false);

  const [deleteModal, setDeleteModal] = useState<boolean | string | number>(
    false
  );
  console.log(query);
  const { response, getActivities, loading } = useGetActivities(query, {
    Authorization: `Bearer ${auth.token}`,
  });

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
    setModalActivity({ response: response, id: params.id });
  };
  const currentPage = localStorage.getItem("activityPage");
  const [page, setPage] = useState<number>(parseInt(currentPage || "0"));
  const columns: GridColDef[] = [
    {
      field: "barcode_id",
      headerName: "الرمز الشريطي",
      width: 300,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();

              navigator.clipboard.writeText(params.row.barcode_id);
              setOpen(true);
              setSeverity("info");
              setMessage("تم نسخ الرمز");
            }}
          >
            <Barcode
              height={20}
              background={"transparent"}
              fontSize={11}
              width={1.5}
              value={params.row.barcode_id}
            />
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "العنوان",

      minWidth: 200,
      flex: 1,
    },
    {
      field: "type",
      headerName: "النوع",

      minWidth: 200,
      flex: 1,
    },
    {
      field: "start_date",
      headerName: "التاريخ من",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "end_date",
      headerName: "التاريخ الى",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "department",
      headerName: "القسم",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "participants_count",
      headerName: "المشاركين",
      headerAlign: "center",
      align: "center",
      width: 20,
      groupable: false,
      valueFormatter: ({ value }) => {
        if (!value) {
          return value;
        }
      },
    },

    {
      field: "editButton",

      headerName: "تعديل",
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        return (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              let selectedActivity = response.filter(
                (activity: any) => activity.activity_id === params.id
              );

              setUpdateActivityModal(selectedActivity);
            }}
          >
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
          <Button
            color="warning"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal(params.id);
            }}
          >
            <MdOutlineDeleteOutline className="text-lg" />
          </Button>
        );
      },
    },
  ];

  function Pagination({
    page,
    onPageChange,
    className,
  }: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <MuiPagination
        color="primary"
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event as any, newPage - 1);
        }}
      />
    );
  }

  function CustomPagination(props: any) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

  const rows = response || [];
  useEffect(() => {
    getActivities();
  }, [query, refetch]);

  return (
    <div className="w-full flex gap-4 flex-col justify-center items-center flex-1">
      {!loading ? (
        <>
          <StripedDataGrid
            autoHeight={!updateActivityModal}
            rows={rows}
            columns={columns || []}
            pageSize={10}
            page={page}
            checkboxSelection={false}
            pagination={true}
            components={{
              Pagination: CustomPagination,
            }}
            paginationMode="client"
            onRowClick={handleRowClick}
            rowsPerPageOptions={[10]}
            onPageChange={(page) => {
              setPage(page);
              localStorage.setItem("activityPage", page.toString());
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            sx={{
              backgroundColor: "white",
              width: "100%",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#ECE8DD",
                fontWeight: "heavy ",
                "& .odd": { backgroundColor: "red" },
              },
            }}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  editButton: auth.type === "admin" ? true : false,
                  deleteButton: auth.type === "admin" ? true : false,
                },
              },
            }}
          />
        </>
      ) : (
        <MoonLoader color="blue" size={50} className="my-auto" />
      )}
      {modalActivity && (
        <Modal
          modalActivity={modalActivity}
          setModalActivity={setModalActivity}
        />
      )}
      {deleteModal && (
        <DeleteModal
          refetch={refetch}
          setRefetch={setRefetch}
          auth={auth}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          setMessage={setMessage}
          setOpen={setOpen}
          setSeverity={setSeverity}
          text="هل تريد حذف النشاط؟"
        />
      )}
      {updateActivityModal && (
        <UpdateActivityModal
          setUpdateActivityModal={setUpdateActivityModal}
          activityInfo={updateActivityModal}
          setRefetch={setRefetch}
          setOpen={setOpen}
          refetch={refetch}
          setMessage={setMessage}
          setSeverity={setSeverity}
          auth={auth}
        />
      )}
    </div>
  );
};
