import {Box, Container} from "@mui/material";
import Header from "../../component/header/Header.jsx";
import Footer from "../../component/Footer/Footer.jsx";
import NavTabs from "./Navigation/NavigationMenu.jsx";
import {Outlet} from "react-router-dom";


const Admin = () => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      height: "100vh"
    }}>
      <Header/>
      <Box sx={{
        flex: "1 1 0",
      }}>
        <Container>
          <Box sx={{
            width: "100%",
            height: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "60px",
            fontWeight: "600",
          }}>Admin Page</Box>
          <hr/>
          <Box sx={{
            display: "flex",
          }}>
            <Box sx={{
             Width:"120px",
            }}>
              <NavTabs/>
            </Box>
            <Box sx={{
              flex:"1",
              padding:"10px"
            }}><Outlet/></Box>
          </Box>
        </Container>
      </Box>
      <Footer/>
    </Box>
  )

}

export default Admin
