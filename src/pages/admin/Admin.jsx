import { Box, Container } from "@mui/material";
import NavTabs from "./Navigation/NavigationMenu.jsx";
import { Outlet } from "react-router-dom";

const Admin = () => {
    return (
        <Box sx={{
            width: "120px",
            backgroundColor: "#363432",
            minHeight: "100vh",
            maxWidth: "140px",
            marginLeft:"-24px"
        }}>
            <Container>
                <Box sx={{
                    display: "flex",
                }}>
                    <Box sx={{
                        width: "120px",
                        backgroundColor: "#363432",
                        minHeight: "100vh",
                        maxWidth: "140px",
                        position:"fixed",
                    }}>
                        <NavTabs />
                    </Box>
                    
                    <Box sx={{
                        marginTop: "20px",
                        marginLeft:"120px"
                    }}><Outlet /></Box>
                </Box>
            </Container>
        </Box>
        // </Box >
    )
}

export default Admin
