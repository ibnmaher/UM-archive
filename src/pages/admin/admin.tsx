import { Chip } from "@mui/material";
import React, { useState } from "react";
import { ActivityModal } from "./activityModal";
import { SearchBar } from "./searchBar";
import { ActivitiesTable } from "./activitiesTable";
import { UserModal } from "./userModal";
import { UsersTable } from "./usersTable";
import { Message } from "common/components/message";
import dayjs, { Dayjs } from "dayjs";
export const Admin = () => {
  const [activityModal, setActivityModal] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState({
    string: "",
    department: "",
    dateFrom: null,
    dateTo: null,
  });
  const [action, setAction] = React.useState<"activities" | "users">(
    "activities"
  );
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
      />
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
      {action === "users" && <UsersTable />}
      {action === "activities" && <ActivitiesTable query={query} />}

      {activityModal && (
        <ActivityModal setActivityModal={setActivityModal} setOpen={setOpen} />
      )}
      {userModal && <UserModal setUserModal={setUserModal} />}
      <Message
        open={open}
        setOpen={setOpen}
        severity={"success"}
        message={"تمت اضافة كورس"}
      />
    </div>
  );
};
