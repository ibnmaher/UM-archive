import { Chip } from "@mui/material";
import React from "react";
import { ActivityModal } from "./activityModal";
import { SearchBar } from "./searchBar";
import { ActivitiesTable } from "./activitiesTable";
import { UserModal } from "./userModal";
import { UsersTable } from "./usersTable";

export const Admin = () => {
  const [activityModal, setActivityModal] = React.useState<boolean>(false);
  const [userModal, setUserModal] = React.useState<boolean>(false);
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
      {action === "activities" && <ActivitiesTable />}

      {activityModal && <ActivityModal setActivityModal={setActivityModal} />}
      {userModal && <UserModal setUserModal={setUserModal} />}
    </div>
  );
};
