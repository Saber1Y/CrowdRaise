// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Campaign.sol";

contract CampaignFactory {
    // Array to keep track of all created campaigns
    Campaign[] public campaigns;

    // Mapping from creator address to their campaigns
    mapping(address => Campaign[]) public creatorCampaigns;

    error AccessDenied();

    event CampaignCreated(
        address indexed campaignAddress,
        address indexed creator
    );
    event FundsWithdrawn(
        address indexed campaign,
        address owner,
        uint256 amount
    );
    event ContributionMade(
        address indexed campaign,
        address indexed contributor,
        uint256 amount
    );
    event CampaignCanceled(address indexed campaign);

    function createCampaign(
        string memory _title,
        uint _startDate,
        uint _endDate,
        uint _goal
    ) public returns (address) {
        address creator_ = msg.sender;
        Campaign newCampaign = new Campaign(
            _title,
            _startDate,
            _endDate,
            _goal,
            creator_
        );

        campaigns.push(newCampaign);
        creatorCampaigns[creator_].push(newCampaign);

        emit CampaignCreated(address(newCampaign), creator_);

        return address(newCampaign);
    }

    // Cancel a campaign
    function cancelCampaign(Campaign _campaign) public {
        address caller_ = msg.sender;
        if (_campaign.creator() != caller_) {
            revert AccessDenied();
        }
        _campaign.cancelCampaign();
        emit CampaignCanceled(address(_campaign));
    }

    // Contribute to a campaign by sending ETH
    function contribute(Campaign _campaign) public payable {
        uint amount_ = msg.value;

        _campaign.contribute{value: amount_}();

        emit ContributionMade(address(_campaign), msg.sender, amount_);
    }

    function withdraw(Campaign _campaign) public {
        address caller_ = msg.sender;
        if (_campaign.creator() != caller_) {
            revert AccessDenied();
        }

        uint amount_ = address(_campaign).balance;

        _campaign.withdraw();

        emit FundsWithdrawn(address(_campaign), caller_, amount_);
    }

    // Refund contributors if the campaign fails or is canceled
    function refund(Campaign _campaign) public {
        _campaign.refund(msg.sender);
    }

    function isActive(Campaign campaign) external view returns (bool) {
        return campaign.isActive();
    }

    // Get all campaigns
    function getAllCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    // Get campaigns by creator
    function getCampaignsByCreator(
        address _creator
    ) public view returns (Campaign[] memory) {
        return creatorCampaigns[_creator];
    }

    // Get total number of campaigns
    function getCampaignsCount() public view returns (uint) {
        return campaigns.length;
    }
}
