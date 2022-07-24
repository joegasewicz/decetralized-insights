pragma solidity ^0.4.17;
//SPDX-License-Identifier: UNLICENSED

contract Insights {
    string public organisation;
    string public recipient_name;
    string public recipient_position;
    string public recipient_organisation;
    string public item_type;
    uint public item_id;
    string public item_name;
    string public receive_date;
    string public release_date;

    function Insights (
        string _organisation,
        string _recipient_name,
        string _recipient_position,
        string _recipient_organisation,
        string _item_type,
        uint _item_id,
        string _item_name,
        string _receive_date,
        string _release_date
    ) public {
        organisation = _organisation;
        recipient_name = _recipient_name;
        recipient_position = _recipient_position;
        recipient_organisation = _recipient_organisation;
        item_type = _item_type;
        item_id = _item_id;
        item_name = _item_name;
        receive_date = _receive_date;
        release_date = _release_date;
    }

    function setReleaseDate(string new_release_date) public {
        release_date = new_release_date;
    }

}
