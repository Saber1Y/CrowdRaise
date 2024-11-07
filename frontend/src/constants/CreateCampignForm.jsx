import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import { formatEther, parseEther } from "viem";
import "react-toastify/dist/ReactToastify.css";

const CreateCampaignForm = ({ contractAddress, abi }) => {
  const [goal, setGoal] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [donation, setDonation] = useState("");

  const [titles, setTitles] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [durations, setDurations] = useState([]);
  const [goals, setGoals] = useState([]);
  const [dates, setDates] = useState([]);
  const [donations, setDonations] = useState([]);

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

      setSuccessMessage("Campaign created successfully!");
      toast.success("Campaign created successfully", {
        position: "top-center",
      });

      // Update state arrays with new data
      setTitles((prevTitles) => [...prevTitles, title]);
      setDescriptions((prevDescriptions) => [...prevDescriptions, description]);
      setCategories((prevCategories) => [...prevCategories, category]);
      setDurations((prevDurations) => [...prevDurations, duration]);
      setGoals((prevGoals) => [...prevGoals, goal]);
      setDates((prevDates) => [...prevDates, date]);
      setDonations((prevDonations) => [...prevDonations, donation]);

      // Clear form fields
      setGoal("");
      setTitle("");
      setDescription("");
      setCategory("");
      setDuration("");
      setDate("");
      setDonation("");
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
      </h2>

      {showForm && (
        <form
          onSubmit={handleCreateCampaign}
          className="space-y-4 max-w-md mx-auto"
        >
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-semibold mb-1">
              Campaign Date:
            </label>
            <textarea
              placeholder="Enter Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-semibold mb-1">
              Campaign Donation:
            </label>
            <textarea
              placeholder="Describe the donation"
              value={donation}
              onChange={(e) => setDonation(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
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
          >
            {isLoading ? "Creating..." : "Create Campaign"}
          </button>

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </form>
      )}

      {/* Display list of created campaigns with details */}
      {titles.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 items-center place-items-center space-x-3 space-y-3 my-3 md:space-y-5">
          {titles.map((campaignTitle, index) => (
            <div
              className="w-[330px] bg-white border border-gray-200 rounded-lg shadow"
              key={index}
            >
              <div className="p-5">
                <div className="flex flex-row justify-between">
                  <span>{dates[index]}</span>
                  <span>{donations[index]}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 my-2">
                    Title: {campaignTitle}
                  </h5>
                  <p>Description:</p> {descriptions[index]} <br />
                  <strong>Category:</strong> {categories[index]} <br />
                  <strong>Goal (ETH):</strong> {goals[index]} <br />
                  <strong>Duration (seconds):</strong> {durations[index]}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      <ToastContainer />
    </div>
  );
};

export default CreateCampaignForm;
