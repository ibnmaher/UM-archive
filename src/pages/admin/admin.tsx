import React from "react";
import { ActivityModal } from "./activityModal";
import { SearchBar } from "./searchBar";
import { UserModal } from "./userModal";

export const Admin = () => {
  const [activityModal, setActivityModal] = React.useState<boolean>(false);
  const [userModal, setUserModal] = React.useState<boolean>(false);
  return (
    <div className="w-full h-screen pt-24 px-4 pb-4 flex flex-col items-center">
      <SearchBar
        setActivityModal={setActivityModal}
        setUserModal={setUserModal}
      />
      {activityModal && <ActivityModal setActivityModal={setActivityModal} />}
      {userModal && <UserModal setUserModal={setUserModal} />}
    </div>
  );
};
