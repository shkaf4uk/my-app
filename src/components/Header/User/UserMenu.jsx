import React, {useState} from 'react';
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import AppContextHOC from "../../HOC/AppContextHOC";
import {fetchAPI, API_URL, API_KEY_3} from "../../../api/api";

const UserMenu = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const handleLogOut = () => {
        fetchAPI(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                session_id: props.session_id
            })
        });
        props.onLogOut()
        toggle()
    }


    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
                tag="span"
                data-toggle="dropdown"
                aria-expanded={dropdownOpen}>
                <img className="rounded-circle"
                     src={`https://www.gravatar.com/avatar/${props.user.avatar.gravatar.hash}?s=40`} alt=""/>
            </DropdownToggle>
            <DropdownMenu right>
                <div onClick={handleLogOut}>Log out</div>
            </DropdownMenu>
        </Dropdown>
    );
}

export default AppContextHOC(UserMenu);
