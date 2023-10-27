import { Box, Container } from "@mui/material";
import Header from "../../component/header/Header.jsx";
import Footer from "../../component/Footer/Footer.jsx";
import NavTabs from "./Navigation/NavigationMenu.jsx";
import { Outlet } from "react-router-dom";


const Admin = () => {

    return (
        //     <Box sx={{
        //     // display: "flex",
        //     // flexDirection: "column",
        //     // // height: "100vh",
        //     // width: "100vw",
        // }}>
        <Box sx={{
            // flex: "1 1 0",
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
                        maxWidth: "140px"
                    }}>
                        <NavTabs />
                    </Box>
                    
                    <Box sx={{
                        marginTop:"20px",
                        // margin: "0 auto",
                        // width: "calc(100vw - 200px)",
                    }}><Outlet /></Box>
                </Box>
            </Container>
        </Box>
        // </Box >
    )
}

export default Admin
