import {console} from "forge-std/console.sol"; // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";

import {CrowdFunding} from "../src/CrowdFunding.sol";

contract DeployCrowdFunding is Script {
    function run() external returns (CrowdFunding) {
        vm.startBroadcast();

        CrowdFunding crowdfunding = new CrowdFunding();

        console.log("Contract deployed at:", address(crowdfunding));
        vm.stopBroadcast();
    }
}
