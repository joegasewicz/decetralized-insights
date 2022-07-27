import * as React from "react";
import {ThemeProvider} from "styled-components";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

import {Organization} from "./routes/organization";
import {theme} from "./theme";
import {Navbar} from "./components/navbar";
import {StyledApp} from "./app.styles";
import {StyledContainer} from "./container.styles";

export const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <StyledApp>
                    <Navbar />
                    <StyledContainer>
                        <Routes>
                            <Route path="/" element={<Organization />} />
                        </Routes>
                    </StyledContainer>
                </StyledApp>
            </ThemeProvider>
        </BrowserRouter>
    );
}