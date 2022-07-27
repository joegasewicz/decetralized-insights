pragma solidity >=0.4.0 <0.9.0;
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

    constructor (
        string memory _organisation,
        string memory _recipient_name,
        string memory _recipient_position,
        string memory _recipient_organisation,
        string memory _item_type,
        uint8 _item_id,
        string memory _item_name,
        string memory _receive_date,
        string memory _release_date
    ) {
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

    function setReleaseDate(string memory new_release_date) public {
        release_date = new_release_date;
    }

}
