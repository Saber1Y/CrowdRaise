import React, { useState, useEffect } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import { parseEther } from "viem";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";

const CreateCampaignForm = ({ contractAddress, abi }) => {
  const [goal, setGoal] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDonateInput, setShowDonateInput] = useState(null); // Track which campaign's donate input is shown

  const [titles, setTitles] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [durations, setDurations] = useState([]);
  const [goals, setGoals] = useState([]);
  const [dates, setDates] = useState([]);
  const [donationAmounts, setDonationAmounts] = useState([]);

  const [progress, setProgress] = useState(0);
  // const [campaignIds, setCampaignIds] = useState([]);

  const [campaigns, setCampaigns] = useState([]);

  const { writeContractAsync: createCampaign } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: "createCampaign",
  });

  const { writeContractAsync: cancelCampaign } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: "cancelCampaign",
  });

  const { writeContractAsync: contribute } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: "contribute",
  });

  const { readContractAsync: getProgress } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getProgress",
  });

  const handleShowForm = () => setShowForm(true);

  // const fetchProgress = async (campaignId, index) => {
  //   try {
  //     const result = await getProgress({ args: [campaignIds] });
  //     setProgress((prev) =>
  //       prev.map((val, idx) => (idx === index ? result : val))
  //     );
  //   } catch (error) {
  //     console.error(
  //       `Failed to fetch progress for campaign ${campaignId}:`,
  //       error
  //     );
  //     toast.error(`Failed to fetch progress for campaign ${campaignId}`);
  //   }
  // };

  // useEffect(() => {
  //   if (campaignIds.length > 0) {
  //     campaignIds.forEach((campaignId, index) => {
  //       fetchProgress(campaignId, index);
  //     });
  //   }
  // }, [campaignIds]);

  useEffect(() => {
    // Load campaigns from local storage when the component mounts
    const savedCampaigns = localStorage.getItem("campaigns");
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns));
    }
  }, []);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createCampaign({
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

      setTitles((prev) => [...prev, title]);
      setDescriptions((prev) => [...prev, description]);
      setCategories((prev) => [...prev, category]);
      setDurations((prev) => [...prev, duration]);
      setGoals((prev) => [...prev, goal]);
      setDates((prev) => [...prev, date]);
      setDonationAmounts((prev) => [...prev, ""]);

      setGoal("");
      setTitle("");
      setDescription("");
      setCategory("");
      setDuration("");
      setDate("");
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

    const newCampaign = {
      title,
      goal,
      description,
      category,
      duration,
      date,
      progress: 0,
    };

    // Update the state and localStorage
    const updatedCampaigns = [...campaigns, newCampaign];
    setCampaigns(updatedCampaigns);
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
  };

  const handleDeleteCampaign = async (indexToDelete) => {
    const deletedCampaign = campaigns[indexToDelete]; // Get the campaign to be deleted

    try {
      await cancelCampaign({
        address: contractAddress,
        abi: abi,
        functionName: "cancelCampaign",
        args: [deletedCampaign.address],
      });

      // Update the state to reflect the deleted campaign
      const updatedCampaigns = campaigns.filter(
        (_, index) => index !== indexToDelete
      );
      setCampaigns(updatedCampaigns);

      toast.success("Campaign deleted successfully!");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      setErrorMessage(
        `Failed to delete campaign: ${error.message || "unknown error"}`
      );
      toast.error(
        `Failed to delete campaign: ${error.message || "unknown error"}`
      );
    } finally {
      setIsLoading(false); // Hide the loading indicator
    }
  };

  const handleDonateCampaign = async (index) => {
    const amount = donationAmounts[index];
    if (!amount) {
      toast.error("Please enter a donation amount.");
      return;
    }

    try {
      await contribute({
        address: contractAddress,
        abi: abi,
        functionName: "contribute",
        args: [parseEther(amount)],
      });
      toast.success("Donation successful!", { position: "top-center" });
      setDonationAmounts((prev) =>
        prev.map((amt, i) => (i === index ? "" : amt))
      );
    } catch (error) {
      console.error("Donation failed:", error);
      toast.error("Donation failed.");
    }
  };

  return (
    <div className="bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {!showForm && (
          <button
            onClick={handleShowForm}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded my-4"
          >
            Create a New Campaign
          </button>
        )}
      </h2>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Campaign
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:bg-gray-200 rounded-full p-2"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateCampaign}>
              {/* Campaign creation fields */}
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md mt-3"
              />
              <input
                type="text"
                placeholder="Goal (ETH)"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md mt-3"
              />
              <input
                type="number"
                placeholder="Duration (days)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md mt-3"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md mt-3"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Campaign"}
              </button>
            </form>
          </div>
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 items-center place-items-center space-x-3 space-y-3 my-3 md:space-y-5">
        {campaigns.map((campaign1, index) => (
          <div
            className="w-[330px] bg-white border border-gray-200 rounded-lg shadow"
            key={index}
          >
            <div className="p-5">
              <div className="flex flex-row justify-between">
                <span>{campaign1.date}</span>
                <span>{campaign1.goal} ETH</span>
                <IoMdClose
                  size={24}
                  color="red"
                  onClick={() => handleDeleteCampaign(indexToDelete)}
                />
              </div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 my-2">
                {campaign1.title}
              </h5>
              <p>{campaign1.descriptions}</p>

              <button
                onClick={() => setShowDonateInput(index)}
                className="w-full items-center px-3 py-2 text-sm font-medium border border-[#13ADB7] text-[#13ADB7] rounded-md hover:bg-[#13ADB7] hover:text-white mt-3"
              >
                Donate now
              </button>

              <div
                key={index}
                className="p-5 bg-white shadow-md rounded-md border border-gray-200"
              >
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress[index] || 0}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Progress: {progress[index] || 0}%
                </p>
              </div>

              {showDonateInput === index && (
                <div className="mt-3">
                  <input
                    type="number"
                    placeholder="Donation Amount (ETH)"
                    value={donationAmounts[index] || ""}
                    onChange={(e) =>
                      setDonationAmounts((prev) =>
                        prev.map((amt, i) =>
                          i === index ? e.target.value : amt
                        )
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md text-black"
                  />
                  <button
                    onClick={() => handleDonateCampaign(index)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-2"
                  >
                    Confirm Donation
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      <ToastContainer />
    </div>
  );
};

export default CreateCampaignForm;
