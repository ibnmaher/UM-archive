import {
  DataGrid,
  GridColDef,
  GridEventListener,
  gridClasses,
} from "@mui/x-data-grid";
import { AiOutlineClose } from "react-icons/ai";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import { Button, Chip, TextField } from "@mui/material";
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
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers";
interface PROPS {
  query: QUERY;
  auth: AUTH;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setQuery: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPortal: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<
    React.SetStateAction<"success" | "info" | "warning" | "error">
  >;
  userId?: string;
  name?: string;
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
  name,
  setQuery,
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

  let currentPage;
  useEffect(() => {
    currentPage = localStorage.getItem("userActivityPage");
    return localStorage.removeItem("userActivityPage");
  }, []);
  const [page, setPage] = useState(parseInt(currentPage || "0"));
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

  const rows = response || [];
  useEffect(() => {
    getUserActivities();
  }, [query, refetch]);

  return (
    <div className="fixed bg-black bg-opacity-50 flex justify-center items-center top-0 right-0 left-0 bottom-0 z-50 p-4 overflow-hidden">
      <div className="w-full max-h-[90vh] flex gap-4 flex-col justify-center items-center flex-1 ">
        {!loading ? (
          <div className="flex flex-col w-full ">
            <div className="flex w-full items-center justify-between bg-stone-100 rounded-t-md h-20 px-6">
              <Button
                color="error"
                sx={{
                  backgroundColor: "white",
                  boxShadow: 1,
                  ":hover": { backgroundColor: "whitesmoke" },
                }}
                onClick={() => setPortal(false)}
              >
                <AiOutlineClose />
              </Button>
              <div className="flex items-center justify-center gap-4">
                <DatePicker
                  label="التاريخ من"
                  inputFormat="DD/MM/YYYY"
                  value={query.dateFrom}
                  componentsProps={{
                    actionBar: {
                      actions: ["clear", "accept"],
                    },
                  }}
                  onAccept={(newDate) => {
                    setQuery((state: any) => {
                      return {
                        ...state,
                        dateFrom: newDate
                          ? dayjs(newDate).format("YYYY/MM/DD")
                          : null,
                      };
                    });
                  }}
                  onChange={(value: string | null) =>
                    setQuery((state: any) => {
                      return {
                        ...state,
                        dateFrom: dayjs(value).format("YYYY/MM/DD"),
                      };
                    })
                  }
                  renderInput={(params) => <></>}
                />
                <DatePicker
                  label="التاريخ الى"
                  inputFormat="DD/MM/YYYY"
                  componentsProps={{
                    actionBar: {
                      actions: ["clear", "accept"],
                    },
                  }}
                  onAccept={(newDate) => {
                    setQuery((state: any) => {
                      return {
                        ...state,
                        dateTo: newDate
                          ? dayjs(newDate).format("YYYY/MM/DD")
                          : null,
                      };
                    });
                  }}
                  value={query.dateTo}
                  minDate={query.dateFrom ? query.dateFrom : dayjs()}
                  onChange={(value: string | null | number) =>
                    setQuery((state: any) => {
                      return {
                        ...state,
                        dateTo: dayjs(value).format("YYYY/MM/DD"),
                      };
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={{ backgroundColor: "#F8F4EA", width: "120px" }}
                      size="small"
                      {...params}
                    />
                  )}
                />
              </div>
              <h1 className="text-2xl font-bold">{name}</h1>
            </div>
            <StripedDataGrid
              autoHeight
              rows={rows}
              columns={columns || []}
              pageSize={7}
              checkboxSelection={false}
              onRowClick={handleRowClick}
              rowsPerPageOptions={[7]}
              page={page}
              onPageChange={(page) => {
                localStorage.setItem("userActivityPage", page.toString());
                setPage(page);
              }}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
              sx={{
                backgroundColor: "white",
                // marginTop: "100px",
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
          </div>
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
    </div>
  );
};
