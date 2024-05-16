import SearchBar from "../components/SearchBar";
import SwipperSlider from "../components/SwipperSlider";

function Home() {
  const handleSearch = (data) => {
    // Perform search based on criteria
    console.log("Searching with criteria:", data);
  };
  return (
    <div className="grow">
      <SwipperSlider />
      <SearchBar
        className="absolute bg-white"
        hidePanel={false}
        onSubmitData={handleSearch}
      />
      <div className="h-72 bg-black"></div>
    </div>
  );
}

export default Home;
