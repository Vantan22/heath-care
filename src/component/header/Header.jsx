import {Box, Container, Link, MenuItem, Typography} from "@mui/material";
import logo from "../../assets/images/logo.png";
import {MENU_NAVIGATE} from "../../constant/MENU_NAVIGATE.js";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('id')
    localStorage.removeItem('fullName')
    navigate('/auth/login')
  }
  return (<header style={{
      width: "100%", backgroundColor: "#E55604",
    }}>
      <Container>
        <Box sx={{
          display: "flex", justifyContent: "space-between", alignItems: "center", height: "80px", fixed: "top",
        }}>
          <Box sx={{
            display: "flex", columnGap: "5px", alignItems: "center",
          }}>
            <img style={{
              width: "50px", height: "50px",
            }} src={logo} alt="logo"/>
            <Typography sx={{
              color: "#EBE4D1", fontSize: "25px", fontWeight: "600",
            }}>Health Care</Typography>
          </Box>
          <Box>{MENU_NAVIGATE.map((menu, index) => {
            return <Link sx={{
              color: "#EBE4D1",
              textDecoration: "none",
              fontSize: "18px",
              padding: "0 10px",
              height: "100%",
              width: "100%",
              fontWeight: "500",
              "&:hover": {
                color: "#ffba00",
              }
            }} href={menu.path} key={index}>{menu.name}</Link>
          })}</Box>
          <Box>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (<>
                  <Typography sx={{
                    color: "#EBE4D1",
                  }} variant="contained" {...bindTrigger(popupState)}>
                    USER NAME
                  </Typography>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>)}
            </PopupState>
          </Box>
        </Box>
      </Container>
    </header>)
}
export default Header
