pragma solidity ^0.8;
//SPDX-License-Identifier: UNLICENSED

// All ids must be of type string

    struct Item {
        string id;
        string name;
        string it_type;
        string description;
    }

    struct Recipient {
        uint id;
        string name;
        address addr;
    }

// Remix - [1, "activity type.", "description. ", [1, "name", "type.", "descrp..."], [1, "one..", 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2]]
    struct Activity {
        uint id;
        string act_type;
        string description;
        Item item;
        Recipient recipient;
    }

    struct Insight {
        string id;
        Activity[] activities;
        Item item;
    }

library MappingUtils {

    function keyExists(string memory key, mapping(string => Insight) storage map) private view returns (bool) {
        if (bytes(map[key].id).length > 0) {
            return false;
        }
        return true;
    }
}

contract Organisation {
    using MappingUtils for *;
    uint public id;
    string public name;

    Recipient[] public recipients;
    mapping(string => Insight) public insights;
    address admin_addr;
    address[] user_addrs;

    constructor(
        uint org_id,
        string memory org_name
    )  {
        id = org_id;
        name = org_name;
    }

    // function removeActivity(uint activity_id) public virtual {
    //     require(msg.sender == recipient.addr);
    //     for (uint i; i < activities.length; i++) {
    //         if (activities[i].id == activity_id) {
    //             delete activities[i];
    //             return;
    //         }
    //     }
    // }

    // function updateActivity(uint activity_id, Activity memory activity) public virtual {
    //     require(msg.sender == recipient.addr);
    //     for (uint i; i < activities.length; i++) {
    //         if (activities[i].id == activity_id) {
    //             activities[i] = activity;
    //             return;
    //         }
    //     }
    // }

    // function createInsightID(uint item_id) private view returns (string memory) {
    //     return string(abi.encodePacked(id, item_id));
    // }

    function addNewInsight(
        string memory item_id,
        string memory item_name,
        string memory it_type,
        string memory item_description
    ) private {
        // require(msg.sender == recipients[0].addr);

        Insight memory insight;
        Activity[] memory activities;
        Item memory item;

        item.id = item_id;
        item.name = item_name;
        item.it_type = it_type;
        item.description = item_description;
        // Check for duplicate values
        insights[item.id] = insight;
        insight.activities = activities;
        insight.item = item;
    }

    // function getInsight(uint insight_id) public view return (Insight memory) {

    // }


    function addNewActivity (
        string memory  _item_id,
        string memory _item_name,
        string memory _item_type,
        string memory _item_description,
        uint _recipient_id,
        string memory _recipient_name,
        uint _activity_id,
        string memory _activity_type,
        string memory _activity_description
    ) public virtual {
        Item memory newItem;
        Activity memory new_activity;
        Recipient memory recipient;

        newItem.id = _item_id;
        newItem.name = _item_name;
        newItem.it_type = _item_type;
        newItem.description = _item_description;

        recipient.id = _recipient_id;
        recipient.name = _recipient_name;
        recipient.addr = msg.sender;

        new_activity.id = _activity_id;
        new_activity.item = newItem;
        new_activity.act_type = _activity_type;
        new_activity.description = _activity_description;
        new_activity.recipient = recipient;
        // Check insight exists

        // Add new insight to contract
        insights[_item_id].activities.push(new_activity);
    }

}