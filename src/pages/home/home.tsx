import { Table } from "./table";
import { SearchBar } from "./searchBar";
export const Home = () => {
  return (
    <div className="w-full h-screen pb-4 flex pt-24 items-start justify-start flex-col gap-5 px-4">
      <SearchBar />
      <Table />
    </div>
  );
};
