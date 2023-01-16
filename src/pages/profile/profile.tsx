import React from "react";
import { Modal } from "./modal";
import { SearchBar } from "./searchBar";

export const Profile = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  return (
    <div className="w-full h-screen pt-24 px-4 pb-4 flex flex-col items-center">
      <SearchBar setModal={setModal} />
      {modal && <Modal setModal={setModal} />}
    </div>
  );
};
