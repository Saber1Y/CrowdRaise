import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import { formatEther, parseEther } from "viem";

import "react-toastify/dist/ReactToastify.css";

const CreateCampignForm = ({ contractAddress, abi }) => {
  const [goal, setGoal] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showForm, setShowForm] = useState(false);

  const {
    writeContractAsync: createCampaign,
    error: createError,
    isLoading: isCreating,
  } = useWriteContract();

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await createCampaign({
        address: contractAddress,
        abi: abi,
        functionName: "createCampaign",
        args: [parseEther(goal), parseInt(duration, 10)],
        overrides: { gasLimit: 1000000 },
      });

      setSuccessMessage(
        `Campaign created successfully! Transaction: ${data.hash}`
      );
      toast.success("Campaign created successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
      setErrorMessage(
        `Failed to create campaign: ${error.message || "unknown error"}`
      );
      toast.error(
        `Failed to create campaign: ${error.message || "unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {!showForm && (
          <button
            onClick={handleShowForm}
            className="create-campaign-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Create a New Campaign
          </button>
        )}

        {showForm && <CreateCampignForm />}
      </h2>

      <form
        // onSubmit={handleCreateCampaign}
        className="space-y-4 max-w-md mx-auto"
      >
        {/* Campaign Title */}
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">
            Campaign Title:
          </label>
          <input
            type="text"
            placeholder="Enter a catchy title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500      text-black"
          />
        </div>

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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500     text-black"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500    text-black"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">
            Campaign Description:
          </label>
          <textarea
            placeholder="Describe the purpose of the campaign"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500   text-black"
          />
        </div>

        {/* Image Upload */}
        {/* <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">
            Campaign Image:
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          >
            <option value="">Select a category</option>
            <option value="Charity">Charity</option>
            <option value="Innovation">Innovation</option>
            <option value="Personal Project">Personal Project</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md transition-colors ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleCreateCampaign}
        >
          {isLoading ? "Creating..." : "Create Campaign"}
        </button>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
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
