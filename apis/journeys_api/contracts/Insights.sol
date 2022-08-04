pragma solidity >=0.4.0 <0.9.0;
//SPDX-License-Identifier: UNLICENSED

    struct Item {
        uint id;
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

    struct Organisation {
        uint id;
        string name;
    }


contract Journey {
    uint id; // should be a uuid
    Activity[] public activities;
    Organisation public organisation;
    Item public newItem;
    Recipient public recipient;
    Activity public new_activity;

    constructor(
        uint org_id,
        string memory org_name
    )  {
        organisation.id = org_id;
        organisation.name = org_name;
    }

    function removeActivity(uint activity_id) public virtual {
        require(msg.sender == recipient.addr);
        for (uint i; i < activities.length; i++) {
            if (activities[i].id == activity_id) {
                delete activities[i];
                return;
            }
        }
    }

    function updateActivity(uint activity_id, Activity memory activity) public virtual {
        require(msg.sender == recipient.addr);
        for (uint i; i < activities.length; i++) {
            if (activities[i].id == activity_id) {
                activities[i] = activity;
                return;
            }
        }
    }


    function addNewActivity (
        uint  _item_id,
        string memory _item_name,
        string memory _item_type,
        string memory _item_description,
        uint _recipient_id,
        string memory _recipient_name,
        uint _activity_id,
        string memory _activity_type,
        string memory _activity_description
    ) public virtual {
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
        activities.push(new_activity);
    }

}