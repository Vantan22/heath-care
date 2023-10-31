import { Avatar, Box, Container, Menu, MenuItem, Stack, Typography } from "@mui/material";
import NavTabs from "./Navigation/NavigationMenu.jsx";
import { Outlet } from "react-router-dom";
import Header from "../../component/header/Header.jsx";
import { useEffect, useState } from "react";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import axios from "axios";

const Admin = () => {
    const [dataUser, setDataUser] = useState({});
    const currentName = localStorage.getItem('fullName')
    const patientId = localStorage.getItem("id");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDoctor, setIsDoctor] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        localStorage.removeItem('fullName')
        navigate('/auth/login')
    }
    useEffect(() => {
        // Gọi API khi component được mount lần đầu
        axios
            .get(
                `https://truculent-kick-production.up.railway.app/api/user/getByUserId/${patientId}`
            )
            .then((response) => {
                setDataUser(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <Box sx={{
            width: "200px",
            backgroundColor: "#363432",
            minHeight: "100vh",
            maxWidth: "200px",
        }}>
            <Box sx={{
                height: '80px',
                width: "calc(100% - 200px)",

            }}>
                <header style={{
                    width: "calc(100% - 200px)",
                    backgroundColor: "#666666",
                    position: "fixed",
                    marginLeft: "200px",
                    zIndex: "10"
                }}>
                    <Container>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "80px",
                            fixed: "top",
                        }}>
                            {currentName ? <Box sx={{
                                minWidth: "70px",
                                position: "absolute",
                                right: "5%"
                            }}>
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (<>
                                        <Typography sx={{
                                            color: "#EBE4D1",
                                            cursor: "pointer",
                                        }} variant="contained" {...bindTrigger(popupState)}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Avatar alt="Remy Sharp" sizes="20"
                                                    src={dataUser.image ? dataUser.image : "/static/images/avatar/1.jpg"} />
                                                <Typography sx={{
                                                    fontSize: "18px",
                                                    fontWeight: "500",
                                                }}>{dataUser.fullName}</Typography>
                                            </Stack>
                                        </Typography>
                                        <Menu {...bindMenu(popupState)} >
                                            <MenuItem onClick={handleLogout} sx={{
                                                width: "200px",
                                            }}>Logout</MenuItem>
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
                </header>
            </Box>
            <Box sx={{
                display: "flex",
                width: "100vw",
            }}>
                <Box sx={{
                    top: "0",
                    width: "200px",
                    backgroundColor: "#363432",
                    maxWidth: "200px",
                    minHeight: "100vh",
                    position: "fixed",
                }}>
                    <NavTabs />
                </Box>
                <Box sx={{
                    marginTop: "20px",
                    marginLeft: "200px",
                }}>
                    <Outlet /></Box>
            </Box>
        </Box>
        // </Box >
    )
}

export default Admin
