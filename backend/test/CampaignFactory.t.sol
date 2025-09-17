// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {CampaignFactory, CampaignPreview} from "../src/CampaignFactory.sol";
import {Campaign} from "../src/Campaign.sol";
import {ICampaign} from "../src/ICampaign.sol";

contract CampaignFactoryTest is Test {
    CampaignFactory public factory;
    address public owner;
    address public creator;
    address public contributor;

    // Test campaign parameters
    string constant TITLE = "Test Campaign";
    string constant DESCRIPTION = "Test Campaign";  
    uint256 constant START_DATE = 1700000000; // Some time in the future
    uint256 constant END_DATE = 1800000000; // Later than START_DATE
    uint256 constant GOAL = 1 ether;

    function setUp() public {
        factory = new CampaignFactory();
        owner = makeAddr("owner");
        creator = makeAddr("creator");
        contributor = makeAddr("contributor");
        vm.deal(contributor, 10 ether);
        vm.deal(creator, 10 ether);
    }

    function test_CreateCampaign() public {
        vm.startPrank(creator);

        address campaignAddr = factory.createCampaign(
            TITLE,
            DESCRIPTION,
            START_DATE,
            END_DATE,
            GOAL
        );

        Campaign campaign = Campaign(campaignAddr);

        assertEq(campaign.title(), TITLE);
        assertEq(campaign.description(), DESCRIPTION);
        assertEq(campaign.startDate(), START_DATE);
        assertEq(campaign.endDate(), END_DATE);
        assertEq(campaign.goal(), GOAL);
        assertEq(campaign.creator(), creator);

        assertEq(factory.getCampaignsCount(), 1);

        CampaignPreview[] memory creatorCampaigns = factory
            .getCampaignsByCreator(creator);
        assertEq(creatorCampaigns.length, 1);
        assertEq(address(creatorCampaigns[0].campaignAddress), campaignAddr);

        vm.stopPrank();
    }

    function test_Contribute() public {
        // Create campaign
        vm.prank(owner);
        address campaignAddr = factory.createCampaign(
            TITLE,
            DESCRIPTION,
            block.timestamp,
            END_DATE,
            GOAL
        );

        // Contribute
        vm.prank(contributor);
        factory.contribute{value: 0.5 ether}(
            factory.campaignAddressToId(campaignAddr)
        );

        assertEq(address(campaignAddr).balance, 0.5 ether);
    }

    function test_CancelCampaign() public {
        // Create campaign
        vm.startPrank(owner);
        address campaignAddr = factory.createCampaign(
            TITLE,
            DESCRIPTION,
            START_DATE,
            END_DATE,
            GOAL
        );

        // Cancel campaign
        factory.cancelCampaign(factory.campaignAddressToId(campaignAddr));

        assertFalse(factory.isActive(Campaign(campaignAddr)));
        vm.stopPrank();
    }

    function testFail_CancelCampaignNonOwner() public {
        // Create campaign
        vm.prank(owner);
        address campaignAddr = factory.createCampaign(
            TITLE,
            DESCRIPTION,
            START_DATE,
            END_DATE,
            GOAL
        );

        // Try to cancel campaign as non-owner (should fail)
        vm.prank(contributor);
        factory.cancelCampaign(factory.campaignAddressToId(campaignAddr));
    }

    function test_WithdrawFunds() public {
        // Create campaign
        vm.startPrank(owner);
        address campaignAddr = factory.createCampaign(
            TITLE,
            DESCRIPTION,
            block.timestamp,
            END_DATE,
            GOAL
        );
        vm.stopPrank();

        // Contribute
        vm.startPrank(contributor);
        factory.contribute{value: 1 ether}(
            factory.campaignAddressToId(campaignAddr)
        );

        // Move time past end date
        vm.warp(END_DATE + 1);
        vm.stopPrank();

        // Withdraw
        uint256 initialBalance = owner.balance;
        vm.startPrank(owner);
        factory.withdraw(factory.campaignAddressToId(campaignAddr));
        vm.stopPrank();

        assertEq(owner.balance - initialBalance, 1 ether);
        assertEq(address(campaignAddr).balance, 0);
    }

    function test_Refund() public {
        // Create campaign
        vm.startPrank(owner);
        address campaignAddr = factory.createCampaign(
            TITLE,
            DESCRIPTION,
            block.timestamp,
            END_DATE,
            2 ether // Set goal higher than contribution
        );

        vm.stopPrank();
        vm.startPrank(contributor);
        // Contribute
        factory.contribute{value: 1 ether}(
            factory.campaignAddressToId(campaignAddr)
        );

        // Move time past end date
        vm.warp(END_DATE + 1);

        // Refund
        uint256 initialBalance = contributor.balance;
        factory.refund(Campaign(campaignAddr));
        vm.stopPrank();

        assertEq(contributor.balance - initialBalance, 1 ether);
    }

    function test_GetAllCampaigns() public {
        vm.startPrank(owner);

        // Create multiple campaigns
        factory.createCampaign(TITLE, DESCRIPTION, START_DATE, END_DATE, GOAL);
        factory.createCampaign("Campaign 2", "Description 2", START_DATE, END_DATE, GOAL);
        factory.createCampaign("Campaign 3", "Description 3", START_DATE, END_DATE, GOAL);

        CampaignPreview[] memory allCampaigns = factory.getAllCampaigns();
        assertEq(allCampaigns.length, 3);

        vm.stopPrank();
    }
}
