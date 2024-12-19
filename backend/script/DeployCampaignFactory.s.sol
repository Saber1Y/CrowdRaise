import {console} from "forge-std/console.sol"; // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";

import {CampaignFactory} from "../src/CampaignFactory.sol";

contract DeployCampaignFactory is Script {
    function run() external {
        vm.startBroadcast();

        CampaignFactory campaignFactory = new CampaignFactory();

        console.log("Contract deployed at:", address(campaignFactory));
        vm.stopBroadcast();
    }
}
