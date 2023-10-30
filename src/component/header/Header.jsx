import { Avatar, Box, Container, Link, MenuItem, Stack, Typography } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { MENU_NAVIGATE } from "../../constant/MENU_NAVIGATE.js";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
    const navigate = useNavigate()
    const currentName = localStorage.getItem('fullName')
    const [ dataUser, setDataUser ] = useState({});
    const patientId = localStorage.getItem("id");
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ isDoctor, setIsDoctor ] = useState(false);
    const getRole = localStorage.getItem('role');
    const handleChangeRole = () => {
        if (getRole === 'ROLE_DOCTOR') {
            setIsDoctor(true)
        }
        if (getRole === 'ROLE_ADMIN') {
            setIsAdmin(true)
        }
    }
    useEffect(() => {
        // Gọi API khi component được mount lần đầu
        handleChangeRole()
        axios
            .get(
                `https://truculent-kick-production.up.railway.app/api/user/getByUserId/${ patientId }`
            )
            .then((response) => {
                setDataUser(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        localStorage.removeItem('fullName')
        navigate('/auth/login')
    }
    const handleNavigateProfile = () => {
        navigate('/profile')
    }
    const handleNavigateAdmin = () => {
        navigate('/admin/faculty-management')
    }
    const handleNavigateDoctor = () => {
        navigate('/doctor/create-medical-records')
    }
    return (
        <Box sx={ {
            height: '80px',
        } }>

            <header style={ {
                width: "100%",
                backgroundColor: "#E55604",
                position: "fixed",
                zIndex: "10"
            } }>
                <Container>
                    <Box sx={ {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "80px",
                        fixed: "top",
                    } }>
                        <Box sx={ {
                            display: "flex",
                            columnGap: "5px",
                            alignItems: "center",
                        } }>
                            <img style={ {
                                width: "50px",
                                height: "50px",
                            } } src={ logo } alt="logo"/>
                            <Typography sx={ {
                                color: "#EBE4D1",
                                fontSize: "25px",
                                fontWeight: "600",
                            } }>Health Care</Typography>
                        </Box>
                        <Box>{ MENU_NAVIGATE.map((menu, index) => {
                            return <Link sx={ {
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
                            } } href={ menu.path } key={ index }>{ menu.name }</Link>
                        }) }</Box>
                        { currentName ? <Box sx={ {
                            minWidth: "70px",
                        } }>
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                { (popupState) => (<>
                                    <Typography sx={ {
                                        color: "#EBE4D1",
                                        cursor: "pointer",
                                    } } variant="contained" { ...bindTrigger(popupState) }>
                                        <Stack direction="row" spacing={ 2 } alignItems="center">
                                            <Avatar alt="Remy Sharp" sizes="20"
                                                    src={ dataUser.image ? dataUser.image : "/static/images/avatar/1.jpg" }/>
                                            <Typography sx={ {
                                                fontSize: "18px",
                                                fontWeight: "500",
                                            } }>{ dataUser.fullName }</Typography>
                                        </Stack>
                                    </Typography>
                                    <Menu { ...bindMenu(popupState) } >
                                        <MenuItem sx={ {
                                            width: "150px",
                                        } } onClick={ handleNavigateProfile }>Profile</MenuItem>
                                        { isAdmin && <MenuItem onClick={ handleNavigateAdmin }>Admin</MenuItem> }
                                        { isDoctor && <MenuItem onClick={ handleNavigateDoctor }>Doctor</MenuItem> }
                                        <MenuItem onClick={ handleLogout }>Logout</MenuItem>
                                    </Menu>
                                </>) }
                            </PopupState>
                        </Box> : <Link href="/auth/login" sx={ {
                            fontSize: "18px",
                            fontWeight: "500",
                            color: "#fff",
                            cursor: "pointer",
                        } }>Login</Link> }
                    </Box>
                </Container>
            </header>
        </Box>)
}
export default Header
