import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

const MyCampaigns = ({ contractAddress, abi }) => {
  const { address } = useAccount();
  const [campaigns, setCampaigns] = useState([]);

  const { readContractAsync: getUserCampaigns } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getUserCampaigns",
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const userCampaigns = await getUserCampaigns({ args: [address] });
        setCampaigns(userCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    if (address) fetchCampaigns();
  }, [address]);

  return (
    <div className="flex flex-col text-center min-h-screen items-center justify-center">
      <h1 className="text-4xl">My Campaigns</h1>
      {campaigns.length > 0 ? (
        campaigns.map((campaignId) => (
          <div key={campaignId} className="campaign-card">
            <h3>Campaign #{campaignId}</h3>
            {/* Add campaign details and actions */}
            <a href={`/campaign/${campaignId}`} className="text-blue-500">
              View Details
            </a>
          </div>
        ))
      ) : (
        <p>No campaigns found.</p>
      )}
    </div>
  );
};

export default MyCampaigns;
