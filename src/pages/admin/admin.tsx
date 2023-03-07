import { Chip } from "@mui/material";
import React, { useState } from "react";
import { ActivityModal } from "./components/activityModal";
import { SearchBar } from "./searchBar";
import { ActivitiesTable } from "./activitiesTable";
import { UserModal } from "./components/userModal";
import { UsersTable } from "./usersTable";
import { Message } from "common/components/message";
import dayjs, { Dayjs } from "dayjs";
export const Admin = ({ auth }: any) => {
  const [activityModal, setActivityModal] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [query, setQuery] = useState({
    string: "",
    department: "",
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
  return (
    <div
      style={
        activityModal || userModal
          ? { overflow: "hidden", height: "100vh" }
          : { height: "auto" }
      }
      className="w-full min-h-screen pt-24 px-4 pb-4 flex flex-col gap-4 items-center"
    >
      <SearchBar
        query={query}
        setQuery={setQuery}
        action={action}
        setActivityModal={setActivityModal}
        setUserModal={setUserModal}
        auth={auth}
      />

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
      {action === "users" && <UsersTable />}
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
      {userModal && <UserModal setUserModal={setUserModal} auth={auth} />}
      <Message
        open={open}
        setOpen={setOpen}
        severity={severity}
        message={message}
      />
    </div>
  );
};
