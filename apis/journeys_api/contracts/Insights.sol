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
        string org_name
    )  {
        organisation.id = org_id;
        organisation.name = org_name;
    }

    // function createJourney() public virtual {
    //     require(msg.sender == recipient.addr);

    // }

    function addNewActivityToJourney(
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