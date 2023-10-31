import { Avatar, Box, Container, Menu, MenuItem, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavTabsForDoctor from "./component/NavigationMenuFormDoctor.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { Typography } from "antd";

const Doctor = () => {
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
            width: "140px",
            backgroundColor: "#363432",
            minHeight: "100vh",
            maxWidth: "150px",
        }}>
            <Box sx={{
                height: '80px',
            }}>
                <header style={{
                    width: "calc(100% - 140px)",
                    backgroundColor: "#666666",
                    position: "fixed",
                    marginLeft: "140px",
                    zIndex: "10"
                }}>
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
                                            <MenuItem sx={{
                                                width: "150px",
                                            }} onClick={() =>
                                                navigate('/profile')
                                            }>Profile</MenuItem>
                                            {isAdmin && <MenuItem
                                                onClick={() => navigate('/admin/faculty-management')}>Admin</MenuItem>}
                                            {isDoctor && <MenuItem
                                                onClick={() => navigate('/doctor/create-medical-records')}>Doctor</MenuItem>}
                                            <MenuItem onClick={() => navigate('/appointment-list')}>Lịch Hẹn</MenuItem>
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
                </header>
            </Box>
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
