import * as React from "react";
import {StyledNavbar} from "./navbar.styles";



export const Navbar = () => {
    return (
        <StyledNavbar>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <svg className="bi pe-none me-2" width="40" height="32">

                </svg>
                <span className="fs-4">D-Insights</span>
            </a>
            <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <a href="#" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16">

                            </svg>
                            Organization
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16">

                            </svg>
                            Products
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16">

                            </svg>
                            Journeys
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16">

                            </svg>
                            Users
                        </a>
                    </li>
                </ul>

        </div>
        </StyledNavbar>
    );
}
