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
import { useEffect } from "react";
import { useGetActivities } from "./api/getActivities";
import Barcode from "react-barcode";
import { Modal } from "./components/modal";
import { DeleteModal } from "./components/deleteModal";
import { UpdateActivityModal } from "./components/updateActivityModal";
import { AUTH, QUERY } from "types";
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

  const { response, getActivities, error, loading } = useGetActivities(query, {
    Authorization: `Bearer ${auth.token}`,
  });
  console.log("res", response);
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
    let selectedActivity = response.filter(
      (activity: any) => activity.activity_id == params.id
    );

    setModalActivity(selectedActivity);
  };

  const columns: GridColDef[] = [
    {
      field: "barcode_id",
      headerName: "الرمز الشريطي",
      width: 300,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        return (
          <Barcode
            height={20}
            background={"transparent"}
            fontSize={11}
            width={1.5}
            value={params.row.barcode_id}
          />
        );
      },
    },
    {
      field: "title",
      headerName: "العنوان",

      minWidth: 200,
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
      width: 200,
    },
    {
      field: "participants_count",
      headerName: "المشاركين",
      headerAlign: "center",
      align: "center",
      width: 200,
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
                (activity: any) => activity.activity_id == params.id
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

  const rows = response || [];
  useEffect(() => {
    getActivities();
  }, [query, refetch]);

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
        initialState={{
          columns: {
            columnVisibilityModel: {
              editButton: auth.type === "admin" ? true : false,
              deleteButton: auth.type === "admin" ? true : false,
            },
          },
        }}
      />
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
          text="هل تريد مسح النشاط؟"
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
