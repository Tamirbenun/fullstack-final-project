import imgPlaceHolder from "../../assets/images/destinations-images/img-placeholder.svg";

const DestinationsPlaceHolder = ({ screen }: { screen: string }) => {
  return (
    <div>
      {screen === "small" ? (
        <div className="lg:hidden">
          <div className="flex-1 rounded-3xl border overflow-hidden">
            <div className="flex justify-center items-center bg-gray-100 w-full h-80">
              <img
                src={imgPlaceHolder}
                className=" h-full rounded-t-3xl object-cover mx-auto opacity-40"
              />
            </div>

            <div className="buttom p-6">
              <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse"></div>
              <div className="w-[200px] h-[20px] bg-gray-200 mt-3 animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="flex-1 rounded-3xl border overflow-hidden">
            <div className="flex justify-center items-center bg-gray-100 w-full h-80">
              <img
                src={imgPlaceHolder}
                className=" h-full rounded-t-3xl object-cover mx-auto opacity-40"
              />
            </div>

            <div className="buttom p-6">
              <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse"></div>
              <div className="w-[200px] h-[20px] bg-gray-200 mt-3 animate-pulse"></div>
            </div>
          </div>

          <div className="flex-1 rounded-3xl border overflow-hidden">
            <div className="flex justify-center items-center bg-gray-100 w-full h-80">
              <img
                src={imgPlaceHolder}
                className=" h-full rounded-t-3xl object-cover mx-auto opacity-40"
              />
            </div>

            <div className="buttom p-6">
              <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse"></div>
              <div className="w-[200px] h-[20px] bg-gray-200 mt-3 animate-pulse"></div>
            </div>
          </div>

          <div className="flex-1 rounded-3xl border overflow-hidden">
            <div className="flex justify-center items-center bg-gray-100 w-full h-80">
              <img
                src={imgPlaceHolder}
                className=" h-full rounded-t-3xl object-cover mx-auto opacity-40"
              />
            </div>

            <div className="buttom p-6">
              <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse"></div>
              <div className="w-[200px] h-[20px] bg-gray-200 mt-3 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationsPlaceHolder;
