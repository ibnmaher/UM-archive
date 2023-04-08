import { Chip, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ActivityModal } from "./components/activityModal";
import { SearchBar } from "./searchBar";
import { ActivitiesTable } from "./activitiesTable";
import { UserModal } from "./components/userModal";
import { UsersTable } from "./usersTable";
import { Message } from "common/components/message";
import { TfiEmail } from "react-icons/tfi";
import { FcDataBackup } from "react-icons/fc";
import download from "downloadjs";

import dayjs, { Dayjs } from "dayjs";
import { QUERY } from "types";
import { ContactModal } from "./components/contactModal";
import { useGetBackup } from "./api/getBackup";
import { MoonLoader } from "react-spinners";
export const Admin = ({ auth }: any) => {
  const [activityModal, setActivityModal] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<boolean>(false);
  const [contactModal, setContactModal] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [query, setQuery] = useState<QUERY>({
    string: "",
    department: [],
    dateFrom: null,
    dateTo: null,
  });
  const [action, setAction] = React.useState<"activities" | "users">(
    "activities"
  );
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const { response, loading, error, getBackup } = useGetBackup(
    {},
    { Authorization: `Bearer ${auth.token}` }
  );
  const downloadFile = async () => {
    download(response, "backup.sql", "text/plain");
  };
  useEffect(() => {
    if (response) {
      downloadFile();
    }
  }, [response]);
  return (
    <div
      style={
        activityModal || userModal || contactModal
          ? { overflow: "hidden", height: "100vh" }
          : { height: "auto" }
      }
      className="w-full min-h-screen pt-24 px-4 pb-4 flex flex-col gap-4 items-center relative"
    >
      <SearchBar
        query={query}
        setQuery={setQuery}
        action={action}
        setActivityModal={setActivityModal}
        setUserModal={setUserModal}
        auth={auth}
      />
      <div className="w-full relative h-10">
        {auth.type !== "user" && (
          <div className="flex gap-4 self-start">
            <Chip
              label="الانشطة"
              onClick={() => setAction("activities")}
              color={action === "activities" ? "primary" : "default"}
            />
            <Chip
              label="المستخدمين"
              onClick={() => setAction("users")}
              color={action === "users" ? "primary" : "default"}
            />
          </div>
        )}

        {auth.type !== "admin" && (
          <div className="absolute left-3 top-0">
            <IconButton onClick={() => setContactModal(true)}>
              <TfiEmail />
            </IconButton>
          </div>
        )}

        {auth.type === "admin" && (
          <div className="absolute left-3 top-0">
            {!loading && (
              <IconButton disabled={loading} onClick={() => getBackup()}>
                <FcDataBackup />
              </IconButton>
            )}
            {loading && <MoonLoader color="blue" size={30} />}
          </div>
        )}
      </div>
      {action === "users" && (
        <UsersTable
          query={query}
          auth={auth}
          refetch={refetch}
          setRefetch={setRefetch}
          setOpen={setOpen}
          setMessage={setMessage}
          setSeverity={setSeverity}
        />
      )}
      {action === "activities" && (
        <ActivitiesTable
          query={query}
          auth={auth}
          refetch={refetch}
          setRefetch={setRefetch}
          setOpen={setOpen}
          setMessage={setMessage}
          setSeverity={setSeverity}
        />
      )}

      {activityModal && (
        <ActivityModal
          refetch={refetch}
          setRefetch={setRefetch}
          setActivityModal={setActivityModal}
          setOpen={setOpen}
          setMessage={setMessage}
          setSeverity={setSeverity}
          auth={auth}
        />
      )}
      {userModal && (
        <UserModal
          setRefetch={setRefetch}
          setUserModal={setUserModal}
          auth={auth}
        />
      )}
      {contactModal && (
        <ContactModal
          auth={auth}
          setOpen={setOpen}
          setMessage={setMessage}
          setSeverity={setSeverity}
          setContactModal={setContactModal}
        />
      )}
      <Message
        open={open}
        setOpen={setOpen}
        severity={severity}
        message={message}
      />
    </div>
  );
};
