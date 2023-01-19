import { Chip } from "@mui/material";
import React from "react";
import { ActivityModal } from "./activityModal";
import { SearchBar } from "./searchBar";
import { Table } from "./table";
import { UserModal } from "./userModal";

export const Admin = () => {
  const [activityModal, setActivityModal] = React.useState<boolean>(false);
  const [userModal, setUserModal] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<"activities" | "users">(
    "activities"
  );
  return (
    <div className="w-full h-screen pt-24 px-4 pb-4 flex flex-col gap-4 items-center">
      <SearchBar
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
      <Table />
      {activityModal && <ActivityModal setActivityModal={setActivityModal} />}
      {userModal && <UserModal setUserModal={setUserModal} />}
    </div>
  );
};
