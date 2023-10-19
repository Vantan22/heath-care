import {Outlet} from "react-router-dom";
import {Box, Container} from "@mui/material";

const Auth = () => {
    return (
        <Container style={
            {
                width: "100%",
                height: "100vh",
                position: "relative",
            }
        }>
            <Box style={
                {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "540px",
                    minHeight: "600px",
                    padding: "60px 40px 40px 40px",
                    border: "1px solid #D6D6D6",
                    borderRadius: "26px",
                    background: "#FFF",
                }
            }>
                <Outlet/>
            </Box>
        </Container>
    )
}
export default Auth

