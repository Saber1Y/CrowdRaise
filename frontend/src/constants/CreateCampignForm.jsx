import React, { useState } from "react";
import { useWriteContract } from "wagmi";

const CreateCampignForm = ({ contractAddress, abi }) => {
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { write: createCampaign } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: "createCampaign",
    onSuccess: (data) => {
      setIsLoading(false);
      setSuccessMessage(
        `Campaign created successfully! Transaction: ${data.hash}`
      );
    },
    onError: (error) => {
      setIsLoading(false);
      setErrorMessage(`Error: ${error.message}`);
    },
  });

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Call the createCampaign function with parsed goal and duration inputs
    createCampaign({
      args: [ethers.utils.parseEther(goal), duration],
    });
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create a New Campaign
      </h2>

      <form onSubmit={handleCreateCampaign} className="space-y-4">
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">
            Campaign Goal (ETH):
          </label>
          <input
            type="number"
            placeholder="Enter goal amount in ETH"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">
            Duration (seconds):
          </label>
          <input
            type="number"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md transition-colors ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Creating..." : "Create Campaign"}
        </button>
      </form>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
      )}

      {successMessage && (
        <p className="text-green-500 text-sm mt-4">{successMessage}</p>
      )}
    </div>
  );
};

export default CreateCampignForm;
