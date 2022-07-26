import * as React from "react";
import {StyledOrganization} from "./organization.styles";

interface IProps {}


export const Organization = (props: IProps) => {

    return (
        <StyledOrganization>
            <div className="container">
                <h1 className="text-center">Organization</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Account ID</th>
                            <th scope="col">Journeys Used</th>
                            <th scope="col">Journeys Left</th>
                            <th scope="col">Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>1232sdfsdf467543ds</td>
                            <td>1000</td>
                            <td>2000</td>
                            <td>£3000.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </StyledOrganization>
    )
}