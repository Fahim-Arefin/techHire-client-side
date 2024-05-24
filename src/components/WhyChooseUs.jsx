const WhyChooseUs = () => {
  return (
    <div className="px-4 py-8 bg-white ">
      <h2 className="text-center text-2xl font-semibold mb-8">WHY CHOOSE US</h2>
      <h3 className="text-center text-xl font-semibold mb-8">
        Because we care about your safety..
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 p-12">
        <div className="col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="col-span-2 flex items-center bg-gray-100 justify-center rounded-md space-x-2">
            <img
              src="https://cdn-marketplacexyz.s3.ap-south-1.amazonaws.com/sheba_xyz/images/png/usp_mask.png"
              alt="Ensuring Masks"
              className="w-12 h-12"
            />
            <p className="text-center">Ensuring Masks</p>
          </div>
          <div className="col-span-2 flex items-center bg-gray-100 justify-center rounded-md space-x-2">
            <img
              src="https://cdn-marketplacexyz.s3.ap-south-1.amazonaws.com/sheba_xyz/images/png/usp_24_7.png"
              alt="24/7 Support"
              className="w-12 h-12"
            />
            <p className="text-center">24/7 Support</p>
          </div>
          <div className="col-span-2 flex items-center bg-gray-100 justify-center rounded-md space-x-2">
            <img
              src="https://cdn-marketplacexyz.s3.ap-south-1.amazonaws.com/sheba_xyz/images/png/usp_sanitized.png"
              alt="Sanitising Hands & Equipment"
              className="w-12 h-12"
            />
            <p className="text-center">Sanitising Hands </p>
          </div>
          <div className="col-span-2 flex items-center bg-gray-100 justify-center rounded-md space-x-2">
            <img
              src="https://cdn-marketplacexyz.s3.ap-south-1.amazonaws.com/sheba_xyz/images/png/usp_gloves.png"
              alt="Ensuring Gloves"
              className="w-12 h-12"
            />
            <p className="text-center">Ensuring Gloves</p>
          </div>
        </div>

        <div className="col-span-1 flex justify-center mb-8">
          <img
            src="https://s3.ap-south-1.amazonaws.com/cdn-marketplacexyz/sheba_xyz/images/webp/why-choose-us.webp"
            alt="Safety Ensured"
            className="w-full max-w-md h-[250px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div>
          <h4 className="text-2xl font-semibold">15,000 +</h4>
          <p>Service Providers</p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold">2,00,000 +</h4>
          <p>Order Served</p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold">1,00,000 +</h4>
          <p>5 Star Received</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
