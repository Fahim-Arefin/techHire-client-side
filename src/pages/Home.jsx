import HowItWorks from "../components/HowItWorks";
import SearchBar from "../components/SearchBar";
import SwipperSlider from "../components/SwipperSlider";
import WhyChooseUs from "../components/WhyChooseUs";

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
      <div className="mt-12 max-w-7xl mx-auto">
        <HowItWorks />
      </div>
      <div className="mt-12 max-w-7xl mx-auto">
        <WhyChooseUs />
      </div>
    </div>
  );
}

export default Home;
