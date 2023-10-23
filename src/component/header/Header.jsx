import { Avatar, Box, Container, Link, MenuItem, Stack, Typography } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { MENU_NAVIGATE } from "../../constant/MENU_NAVIGATE.js";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  const currentName = localStorage.getItem('fullName')

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
          }} src={logo} alt="logo" />
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
        {currentName ? <Box sx={{
          minWidth: "70px",
        }}>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (<>
              <Typography sx={{
                color: "#EBE4D1",
                cursor: "pointer",
              }} variant="contained" {...bindTrigger(popupState)}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar alt="Remy Sharp" sizes="20" src="/static/images/avatar/1.jpg" />
                  <Typography sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                  }}>{currentName}</Typography>
                </Stack>
              </Typography>
              <Menu {...bindMenu(popupState)} >
                <MenuItem sx={{
                  width: "100px",
                }}><Link href={"/profile"}>Profile</Link></MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>)}
          </PopupState>
        </Box> : <Link href="/auth/login" sx={{
          fontSize: "18px",
          fontWeight: "500",
          color: "#fff",
          cursor: "pointer",
        }}>Login</Link>}
      </Box>
    </Container>
  </header>)
}
export default Header
