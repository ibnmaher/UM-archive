import { Button, Modal } from "@mui/material";
import { useEffect } from "react";
import { useDeleteActivity } from "../api/deleteActivity";
import { useDeleteUser } from "../api/deleteUser";

interface PARAMS {
  text: string;
  auth: any;
  deleteModal: boolean | string | number;
  setDeleteModal: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<
    React.SetStateAction<"success" | "info" | "warning" | "error">
  >;
  user?: boolean;
}
export const DeleteModal = ({
  text,
  auth,
  deleteModal,
  setDeleteModal,
  setOpen,
  setSeverity,
  setMessage,
  refetch,
  setRefetch,
  user,
}: PARAMS) => {
  const { deleteActivity, loading, error, response } = useDeleteActivity(
    {},
    { Authorization: `Bearer ${auth.token}` }
  );
  const {
    deleteUser,
    loading: uLoading,
    error: uError,
    response: uResponse,
  } = useDeleteUser({}, { Authorization: `Bearer ${auth.token}` });
  useEffect(() => {
    if (response || uResponse) {
      if (response?.status === 200 || uResponse?.status === 200) {
        setOpen(true);
        setMessage(user ? "تم حذف المستخدم" : "تم حذف النشاط");
        setSeverity("success");
        setRefetch((state: boolean) => !state);
        setDeleteModal(false);
      } else {
        setOpen(true);
        setMessage(" حدث خطأ ");
        setSeverity("error");
      }
    }
  }, [response, uResponse]);

  return (
    <Modal
      open={deleteModal ? true : false}
      onClose={() => setDeleteModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="w-96 h-64 rounded-lg flex flex-col gap-20 items-center justify-center bg-tertiary">
        <h1>{text}</h1>
        <div className="flex gap-20">
          <Button
            color="info"
            variant="contained"
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            رجوع
          </Button>
          <Button
            color="warning"
            variant="contained"
            onClick={() => {
              if (user) {
                deleteUser({ userId: deleteModal });
              } else {
                deleteActivity({ activityId: deleteModal });
              }
            }}
          >
            حذف
          </Button>
        </div>
      </div>
    </Modal>
  );
};
