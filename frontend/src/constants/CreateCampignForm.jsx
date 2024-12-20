import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatEther, parseEther } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { motion } from "motion/react";

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
  const { address: user } = useAccount();

  const [donationAmount, setDonationAmount] = useState("");

  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getAllCampaigns",
  });

  const { writeContractAsync: createCampaign } = useWriteContract();

  const { writeContractAsync: cancelCampaign } = useWriteContract();

  const {
    writeContractAsync: contribute,
    isPending: contributePending,
    isSuccess: contributeSuccess,
  } = useWriteContract();

  const handleShowForm = () => setShowForm(true);

  useEffect(() => {
    const filtered = campaigns.filter((campaign) => {
      if (filter === "all") return true;
      if (filter === "canceled") return campaign.isCanceled;
      if (filter === "mine") return campaign.creator === user;
    });
    setFilteredCampaigns(filtered);
  }, [filter, campaigns, user]);

  useEffect(() => {
    const fetch = async () => {
      toast.success("Donation successful!", { position: "top-center" });
      setDonationAmount("");
      await refetch();
    };
    if (contributeSuccess) fetch();
  }, [contributeSuccess]);

  // Use effect to watch when campaigns array changes (i.e when a change is made by the user) and then format all necessary field of a campaign
  useEffect(() => {
    setCampaigns(
      (data || []).map(
        ({
          campaignAddress,
          title,
          description,
          startDate,
          endDate,
          goal,
          isCanceled,
          totalEthContributed,
          creator,
        }) => {
          return {
            address: campaignAddress,
            title,
            description,
            startDate: new Date(Number(startDate) * 1000).toDateString(),
            endDate: new Date(Number(endDate) * 1000).toDateString(),
            goal: formatEther(goal),
            isCanceled,
            totalEthContributed: formatEther(totalEthContributed),
            creator,
            progress: (
              (Number(totalEthContributed) / Number(goal)) *
              100
            ).toFixed(2),
          };
        }
      )
    );
  }, [data]);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let startDate = new Date(date);
      await createCampaign({
        address: contractAddress,
        abi: abi,
        functionName: "createCampaign",
        args: [
          title,
          description,
          Math.floor(startDate.getTime() / 1000),
          Math.floor(startDate.setDate(startDate.getDate() + duration) / 1000),
          parseEther(goal),
        ],
      });

      setSuccessMessage("Campaign created successfully!");
      toast.success("Campaign created successfully", {
        position: "top-center",
      });
      await refetch();

      setGoal("");
      setTitle("");
      setDescription("");
      setCategory("");
      setDuration("");
      setDate("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating campaign:", error);
      setErrorMessage(
        `Failed to create campaign: ${error.shortMessage || "unknown error"}`
      );
      toast.error(
        `Failed to create campaign: ${error.shortMessage || "unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCampaign = async (indexToDelete) => {
    try {
      await cancelCampaign({
        address: contractAddress,
        abi: abi,
        functionName: "cancelCampaign",
        args: [indexToDelete],
      });
      await refetch();
      toast.success("Campaign deleted successfully!");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      setErrorMessage(
        `Failed to delete campaign: ${error.shortMessage || "unknown error"}`
      );
      toast.error(
        `Failed to delete campaign: ${error.shortMessage || "unknown error"}`
      );
    } finally {
      setIsLoading(false); // Hide the loading indicator
    }
  };

  const handleDonateCampaign = async (index) => {
    const amount = donationAmount;
    if (!amount) {
      toast.error("Please enter a donation amount.");
      return;
    }

    try {
      await contribute({
        address: contractAddress,
        abi: abi,
        functionName: "contribute",
        args: [index],
        value: parseEther(amount),
      });
    } catch (error) {
      console.error("Donation failed:", error.shortMessage);
      toast.error("Donation failed::  " + error.shortMessage);
    }
  };

  return (
    <div className="bg-white">
      <h1 className="flex items-center justify-center font-bold text-[32px] my-5">
        Open <span className="text-[#13ADB7] ml-2">Donations</span>
      </h1>

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
        <motion.button
          className="bg-[#13ADB7] text-white py-4 px-4 hover:opacity-55 rounded-full p-4 border"
          whileHover={{ scale: 1.1 }}
          whileTap={{ y: [0, -5, 0] }}
          layout
        >
          My Campaigns
        </motion.button>

        <motion.button
          className="bg-[#13ADB7] text-white py-4 px-4 hover:opacity-55 rounded-full p-4 border"
          onClick={() => {
            setFilter("canceled");
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ y: [0, -5, 0] }}
          layout
        >
          Canceled Campaign
        </motion.button>
        <motion.button
          className="bg-[#13ADB7] text-white py-4 px-4 hover:opacity-55 rounded-full p-4 border"
          onClick={() => {
            setFilter("mine");
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ y: [0, -5, 0] }}
          layout
        >
          My Campaigns
        </motion.button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 items-center place-items-center space-x-3 space-y-3 my-3 md:space-y-5">
        {filteredCampaigns.map((campaign1, index) => (
          <div
            className="w-[330px] bg-white border border-gray-200 rounded-lg shadow"
            key={index}
          >
            <div className="p-5">
              <div className="flex flex-row justify-between">
                <span>{campaign1.startDate}</span>
                <span>{campaign1.goal} ETH</span>
                {campaign1.creator == user && (
                  <IoMdClose
                    size={24}
                    color="red"
                    onClick={() =>
                      campaign1.isCanceled
                        ? () => {}
                        : handleDeleteCampaign(index)
                    }
                  />
                )}
              </div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 my-2">
                {campaign1.title}
              </h5>
              <p>{campaign1.description || "Empty Description"}</p>
              <p>STATUS: {campaign1.isCanceled ? "Canceled" : "Active"}</p>

              <button
                onClick={() => setShowDonateInput(index)}
                className="w-full items-center px-3 py-2 text-sm font-medium border border-[#13ADB7] text-[#13ADB7] rounded-md hover:bg-[#13ADB7] hover:text-white mt-3"
                disabled={campaign1.isCanceled}
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
                    style={{ width: `${campaign1.progress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Progress: {campaign1.progress}%
                </p>
              </div>

              {showDonateInput === index && (
                <div className="mt-3">
                  <input
                    type="number"
                    placeholder="Donation Amount (ETH)"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-black"
                  />
                  <button
                    disabled={contributePending}
                    onClick={() => handleDonateCampaign(index)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-2"
                  >
                    {contributePending ? "Wait..." : "Confirm Donation"}
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
