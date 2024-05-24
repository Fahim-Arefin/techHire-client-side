const HowItWorks = () => {
  return (
    <div className="px-4 py-8 bg-white">
      <h2 className="text-center text-2xl font-semibold mb-8">HOW IT WORKS</h2>
      <h3 className="text-center text-xl font-semibold mb-8">
        Easiest way to get a service
      </h3>

      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <div className="mb-8 lg:mb-0 lg:mr-8 flex justify-center w-full lg:w-1/2">
          <img
            src="https://cdn-marketplacedev.s3.ap-south-1.amazonaws.com/process.jpg"
            alt="Service App"
            className="w-full max-w-md"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <div className="flex items-start mb-8">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-4">
              1
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Select the Service</h4>
              <p>
                Pick the service you are looking for - from the website or the
                app.
              </p>
            </div>
          </div>

          <div className="flex items-start mb-8">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-4">
              2
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Pick your schedule</h4>
              <p>
                Pick your convenient date and time to avail the service. Pick
                the service provider based on their rating.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-4">
              3
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Place Your Order & Relax
              </h4>
              <p>
                Review and place the order. Now just sit back and relax. We will
                assign the expert service provider’s schedule for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
