import {
  DataGrid,
  GridColDef,
  GridEventListener,
  gridClasses,
} from "@mui/x-data-grid";
import { AiOutlineClose } from "react-icons/ai";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import { Button, Chip } from "@mui/material";
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
import { useGetUserActivites } from "./api/getUserActivities";
import { useParams } from "react-router-dom";
interface PROPS {
  query: QUERY;
  auth: AUTH;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPortal: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<
    React.SetStateAction<"success" | "info" | "warning" | "error">
  >;
  userId?: string;
}
export const UserActivityTable = ({
  query,
  auth,
  refetch,
  setRefetch,
  setMessage,
  setOpen,
  setSeverity,
  setPortal,
  userId,
}: PROPS) => {
  const [modalActivity, setModalActivity] = useState<any>(false);
  const [updateActivityModal, setUpdateActivityModal] = useState<any>(false);

  const [deleteModal, setDeleteModal] = useState<boolean | string | number>(
    false
  );

  const { response, getUserActivities, loading, error } = useGetUserActivites(
    { ...query, userId: userId },
    {
      Authorization: `Bearer ${auth.token}`,
    }
  );

  const handleEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setPortal(false);
    }
  };
  useEffect(() => {
    document.removeEventListener("keydown", handleEscape);
    if (!modalActivity) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modalActivity]);

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
      field: "type",
      headerName: "النوع",

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

  const rows = response || [];
  useEffect(() => {
    getUserActivities();
  }, [query, refetch]);

  return (
    <div className="fixed bg-black bg-opacity-50 flex justify-center items-center top-0 right-0 left-0 bottom-0 z-50 p-4 overflow-hidden">
      <div className="w-full max-h-[90vh] flex gap-4 flex-col justify-center items-center flex-1 ">
        {!loading ? (
          <>
            <StripedDataGrid
              autoHeight
              rows={rows}
              columns={columns || []}
              pageSize={7}
              checkboxSelection={false}
              onRowClick={handleRowClick}
              rowsPerPageOptions={[7]}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
              sx={{
                backgroundColor: "white",
                marginTop: "100px",
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
      <Button
        color="error"
        sx={{
          position: "absolute",
          backgroundColor: "white",
          boxShadow: 1,
          ":hover": { backgroundColor: "whitesmoke" },
        }}
        className="top-24 right-4"
        onClick={() => setPortal(false)}
      >
        <AiOutlineClose />
      </Button>
    </div>
  );
};
