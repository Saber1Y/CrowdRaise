import React from "react";

const Donations = () => {
  const handleSearch = () => {
    e.preventDefault();
  };
  return (
    <section className="flex flex-col items-center justify-center my-10">
      <h1 className="font-bold text-[32px]">
        Open <span className="text-[#13ADB7]">donation</span>
      </h1>
      <form onClick={handleSearch} className="">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-[600px] p-4 pl-10 text-md text-gray-900 border rounded-full bg-gray-50 shadow-md mt-4"
            placeholder="find donations..."
            required
          />
        </div>
      </form>
    </section>
  );
};

export default Donations;
