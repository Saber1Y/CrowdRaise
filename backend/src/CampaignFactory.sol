// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Campaign} from "./Campaign.sol";
import {ICampaign} from "./ICampaign.sol";

// Viewable Data
struct CampaignPreview {
    address campaignAddress;
    string title;
    uint startDate;
    uint endDate;
    uint goal;
    bool isCanceled;
    uint totalEthContributed;
    address creator;
}

contract CampaignFactory {
    // Array to keep track of all created campaigns
    CampaignPreview[] public campaigns;

    // Mapping from creator address to their campaigns
    mapping(address => uint[]) public creatorCampaigns;

    // Mapping from campaign address to their ids
    mapping(address => uint) public campaignAddressToId;

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

        CampaignPreview memory newCampaignPreview = CampaignPreview({
            campaignAddress: address(newCampaign),
            title: _title,
            startDate: _startDate,
            endDate: _endDate,
            goal: _goal,
            isCanceled: false,
            totalEthContributed: 0,
            creator: creator_
        });

        uint id_ = campaigns.length;
        campaigns.push(newCampaignPreview);
        creatorCampaigns[creator_].push(id_);
        campaignAddressToId[address(newCampaign)] = id_;

        emit CampaignCreated(address(newCampaign), creator_);

        return address(newCampaign);
    }

    // Cancel a campaign
    function cancelCampaign(uint _id) public {
        address caller_ = msg.sender;
        CampaignPreview storage _campaign = campaigns[_id];
        if (_campaign.creator != caller_) {
            revert AccessDenied();
        }
        ICampaign(_campaign.campaignAddress).cancelCampaign();
        _campaign.isCanceled = true;

        emit CampaignCanceled(_campaign.campaignAddress);
    }

    // Contribute to a campaign by sending ETH
    function contribute(uint _id) public payable {
        uint amount_ = msg.value;
        CampaignPreview storage _campaign = campaigns[_id];
        ICampaign(_campaign.campaignAddress).contribute{value: amount_}(
            msg.sender
        );

        _campaign.totalEthContributed += amount_;

        emit ContributionMade(_campaign.campaignAddress, msg.sender, amount_);
    }

    function withdraw(uint _id) public {
        address caller_ = msg.sender;
        CampaignPreview memory _campaign = campaigns[_id];
        if (_campaign.creator != caller_) {
            revert AccessDenied();
        }

        uint amount_ = address(_campaign.campaignAddress).balance;

        ICampaign(address(_campaign.campaignAddress)).withdraw();

        emit FundsWithdrawn(
            address(_campaign.campaignAddress),
            caller_,
            amount_
        );
    }

    // Refund contributors if the campaign fails or is canceled
    function refund(Campaign _campaign) public {
        _campaign.refund(msg.sender);
    }

    function isActive(Campaign campaign) external view returns (bool) {
        return campaign.isActive();
    }

    // Get all campaigns
    function getAllCampaigns() public view returns (CampaignPreview[] memory) {
        return campaigns;
    }

    // Get campaigns by creator
    function getCampaignsByCreator(
        address _creator
    ) public view returns (CampaignPreview[] memory) {
        uint[] memory ids_ = creatorCampaigns[_creator];
        CampaignPreview[] memory campaigns_ = new CampaignPreview[](
            ids_.length
        );
        for (uint i = 0; i < ids_.length; i++) {
            campaigns_[i] = campaigns[ids_[i]];
        }
        return campaigns_;
    }

    // Get total number of campaigns
    function getCampaignsCount() public view returns (uint) {
        return campaigns.length;
    }
}
