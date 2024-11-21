// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

error ThisCampaignIsClosed();
error CannotWithdrawFunds();
error CampaignGoalNotReached();
error CampaignAlreadyWithdrawn();
error CampaignStillActive();
error CampaignGoalReached();
error OnlyOwnerCanCancel();
error CampaignAlreadyCanceled();
error CampaignIsCanceled();
error NotEnoughFundsForCampaign();

contract CrowdFunding {
    event ContributionMade(
        uint256 indexed campaignId,
        address indexed contributor,
        uint256 amount
    );
    event CampaignCanceled(uint256 indexed campaignId);
    event FundsWithdrawn(
        uint256 indexed campaignId,
        address owner,
        uint256 amount
    );

    struct Campaign {
        address payable owner;
        uint256 goal;
        uint256 deadline;
        uint256 amountRaised;
        bool isFunded;
    }

    mapping(uint256 => Campaign) public campaigns; // Mapping campaign ID to campaign details
    mapping(uint256 => bool) public isCanceled; // Track canceled campaigns
    mapping(uint256 => mapping(address => uint256)) public contributions; // Track individual contributions
    mapping(address => uint256[]) public userCampaigns;

    uint256 public campaignCount;

    modifier isCampaignActive(uint256 _id) {
        Campaign storage campaign = campaigns[_id];
        if (
            block.timestamp > campaign.deadline ||
            campaign.amountRaised >= campaign.goal
        ) {
            revert ThisCampaignIsClosed();
        }
        _;
    }

    modifier isNotCanceled(uint256 _id) {
        if (isCanceled[_id]) {
            revert CampaignIsCanceled();
        }
        _;
    }

    // Create a new campaign with a goal and duration
    function createCampaign(uint256 _goal, uint256 _duration) public {
        campaignCount++;
        campaigns[campaignCount] = Campaign({
            owner: payable(msg.sender),
            goal: _goal,
            amountRaised: 0,
            deadline: block.timestamp + _duration,
            isFunded: false
        });

        userCampaigns[msg.sender].push(campaignCount);
    }

    // Cancel a campaign
    function cancelCampaign(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        if (msg.sender != campaign.owner) {
            revert OnlyOwnerCanCancel();
        }
        if (isCanceled[_id]) {
            revert CampaignAlreadyCanceled();
        }
        isCanceled[_id] = true;
        emit CampaignCanceled(_id);
    }

    // Contribute to a campaign by sending ETH
    function contribute(
        uint256 _id
    ) public payable isCampaignActive(_id) isNotCanceled(_id) {
        Campaign storage campaign = campaigns[_id];

        require(msg.value > 0, "Contribution must be greater than zero");

        // Update campaign's raised amount and contributor's contribution
        campaign.amountRaised += msg.value;
        contributions[_id][msg.sender] += msg.value;

        emit ContributionMade(_id, msg.sender, msg.value);
    }

    // Withdraw funds if the campaign goal is reached
    function withdraw(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        if (msg.sender != campaign.owner) {
            revert CannotWithdrawFunds();
        }

        if (campaign.amountRaised < campaign.goal) {
            revert CampaignGoalNotReached();
        }

        if (campaign.isFunded) {
            revert CampaignAlreadyWithdrawn();
        }

        campaign.isFunded = true;
        uint256 amount = campaign.amountRaised;
        campaign.owner.transfer(amount);

        emit FundsWithdrawn(_id, msg.sender, amount);
    }

    // Refund contributors if the campaign fails or is canceled
    function refund(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        if (block.timestamp <= campaign.deadline && !isCanceled[_id]) {
            revert CampaignStillActive();
        }

        if (campaign.amountRaised >= campaign.goal) {
            revert CampaignGoalReached();
        }

        uint256 contributedAmount = contributions[_id][msg.sender];
        require(contributedAmount > 0, "No contributions to refund");

        contributions[_id][msg.sender] = 0; // Prevent re-entrancy
        payable(msg.sender).transfer(contributedAmount);
    }

    // Get the contribution amount for a given campaign ID and contributor
    function getContribution(uint256 _id) public view returns (uint256) {
        return contributions[_id][msg.sender];
    }

    function getProgress(uint256 _id) public view returns (uint256) {
        Campaign storage campaign = campaigns[_id];

        if (campaign.goal == 0) return 0;
        return (campaign.amountRaised * 100) / campaign.goal;
    }

    function getUserCampaigns(
        address user
    ) public view returns (uint256[] memory) {
        return userCampaigns[user];
    }
}
