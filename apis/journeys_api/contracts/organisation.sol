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

// Remix - [1, "activity type.", "description. ", ["1", "name", "type.", "descrp..."], [1, "one..", 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2]]
    struct Activity {
        uint id;
        string act_type;
        string description;
        Item item;
        Recipient recipient;
    }

// Important: An insight's uniqueness is determined by it's item id
    struct Insight {
        string id;
        Activity[] activities;
        Item item;
    }

//library MappingUtils {
//
//    function keyExists(string memory key, mapping(string => Insight) storage map) public view returns (bool) {
//        if (bytes(map[key].id).length > 0) {
//            return true;
//        }
//        return false;
//    }
//}

contract Organisation {
    //    using MappingUtils for *;
    uint public id;
    string public name;
    mapping(string => Insight) public insights;
    address private admin_addr;
    address private recipient_addr;

    constructor(
        uint org_id,
        string memory org_name,
        address _recipient_addr
    )  {
        id = org_id;
        name = org_name;
        // only recipients with this account can add an activity
        recipient_addr = _recipient_addr;
        admin_addr = msg.sender;
    }

    function keyExists(string memory key) public view returns (bool) {
        if (bytes(insights[key].id).length > 0) {
            return true;
        }
        return false;
    }

    function updateActivity(uint activity_id, string memory item_id, Activity memory activity) public virtual {
        require(msg.sender == recipient_addr);
        if (keyExists(item_id)) {
            for (uint i; i < insights[item_id].activities.length; i++) {
                if (insights[item_id].activities[i].id == activity_id) {
                    insights[item_id].activities[i] = activity;
                    return;
                }
            }
            revert("Couldn't update entree");
        }
        revert("Insight Not found");
    }

    function getInsight(string memory item_id) view public returns (Insight memory) {
        if (keyExists(item_id)) {
            return insights[item_id];
        }
        revert("Not found");
    }

    function addNewInsight(
        string memory item_id,
        string memory item_name,
        string memory it_type,
        string memory item_description
    ) public virtual {
        require(msg.sender == admin_addr);
        Item memory item;
        item.id = item_id;
        item.name = item_name;
        item.it_type = it_type;
        item.description = item_description;
        // Check for duplicate values
        if (keyExists(item_id)) {
            revert("Item already exists");
        } else {
            insights[item_id].id = item_id;
            insights[item_id].item = item;
        }
    }

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
        require(msg.sender == recipient_addr || msg.sender == admin_addr);
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
        if (!keyExists(_item_id)) {
            // Add new insight to contract
            insights[_item_id].activities.push(new_activity);
        } else {
            revert("Non found");
        }
    }

}