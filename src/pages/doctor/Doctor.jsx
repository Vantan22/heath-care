import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavTabsForDoctor from "./component/NavigationMenuFormDoctor.jsx";

const Doctor = () => {
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
                        <NavTabsForDoctor />
                    </Box>

                    <Box sx={{
                        marginTop: "20px",
                        marginLeft:"120px"
                    }}><Outlet /></Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Doctor
