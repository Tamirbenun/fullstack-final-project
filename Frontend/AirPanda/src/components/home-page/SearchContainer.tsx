import SearchRoundTrip from "./SearchRoundTrip";

function SearchContainer() {
  localStorage.setItem("SearchSwitch", "Round Trip");

  return (
    <div className="w-full max-w-[1300px]">
      <div className="flex items-center w-full md:w-[254px] bg-gray-200 rounded-t-2xl -mb-[1px]"></div>
      <SearchRoundTrip />
    </div>
  );
}

export default SearchContainer;
