import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import HTTP from "../../../axios-config.js";
import { convertAppointmentTime, convertTimeAndDate } from "../../constant/convert-time.js";
import Header from "../../component/header/Header.jsx";
import { Container, Typography } from "@mui/material";
import StickyHeadTable from "../../component/BaseTable.jsx";
import Footer from "../../component/Footer/Footer.jsx";
import { getValueAPI } from "../../../api-service.js";

const DoctorList = () => {
    const [appointments, setAppointments] = useState([]);
    const [values, setValues] = useState([])
    const [appointmentDetail, setAppointmentDetail] = useState(null)
    const userId = localStorage.getItem('id')
    const getData = async () => {
        const speciallization = getValueAPI("")
        const data = await HTTP.get(`/api/appointment/getByUserId/${userId}`)
        const value = data.map((item, index) => {
            return {
                id: item.id,
                index: index + 1,
                doctor: item.doctorName,
                name: item.patientName,
                registrationDate: convertAppointmentTime(item.appointmentTime),
                appointmentDate: convertTimeAndDate(item.appointmentTime),
            }
        })
        setValues(data)
        setAppointments(value)
    }
    useEffect(() => {
        getData()
        return getData;
    }, []);
    const onClickHideDetail = (data) => {
        const handleDetailValue = values.find((item) => item.id === data)
        setAppointmentDetail(handleDetailValue)
    }
    return (<Box sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    }}>
        <Header/>
        <Box sx={{
            flex: "1 1 0"
        }}>
            <Container>
                <Box sx={{
                    marginTop: "20px",
                }}>
                    <Typography>danh sách lịch hẹn</Typography>
                    <Box sx={{
                        height: "1px",
                        width: "100%",
                        backgroundColor: "#000",
                    }}/>
                    <StickyHeadTable rows={appointments} onClickHideDetail={onClickHideDetail}/>
                    <Box sx={{
                        height: "1px",
                        width: "100%",
                        backgroundColor: "#000",
                        margin: "40px 0"
                    }}/>
                </Box>
                {appointmentDetail && (<Box>
                    <Typography>Chi tiết lịch hẹn</Typography>
                    <Box sx={{
                        width: "100%",
                        minHeight: "500px",
                        border: "1px solid #000",
                        borderRadius: "10px",
                        display: "flex",
                    }}>
                        <Box sx={{
                            padding: "20px",
                            display: "flex",
                            minWidth: "31%",
                            flexDirection: "column",
                            rowGap: "12px",
                            borderRight: "1px solid #000",
                        }}>
                            <Box sx={{
                                width: "100%",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Typography>Doctor name : </Typography>
                                <Typography>{appointmentDetail?.doctor}</Typography>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Typography>Registration Date: </Typography>
                                <Typography>{convertAppointmentTime(appointmentDetail?.appointmentTime)}</Typography>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Typography>Appointment time: </Typography>
                                <Typography>{convertTimeAndDate(appointmentDetail?.createdAt)}</Typography>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Typography>Registration phone: </Typography>
                                <Typography>{appointmentDetail?.phoneNumber}</Typography>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                maxWidth: "350px",
                                minHeight: "40px",
                                display: "flex",
                                alignItems: "flex-start",
                            }}>
                                <Typography>Purpose: </Typography>
                                <Typography>{appointmentDetail?.purpose}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                            padding: "20px",
                            width: "100%",
                        }}>
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                height: "40px",
                            }}>
                                <Box sx={{
                                    width: "50%",
                                    display: "flex",
                                }}>
                                    <Typography>Full name: </Typography>
                                    <Typography>{appointmentDetail?.patient?.fullName}</Typography>
                                </Box>
                                <Box sx={{
                                    width: "50%",
                                    display: "flex",
                                }}>
                                    <Typography>Date of Birth: </Typography>
                                    <Typography>{appointmentDetail?.patient?.dateOfBirth}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                height: "40px",
                            }}>
                                <Box sx={{
                                    width: "50%",
                                    display: "flex",
                                }}>
                                    <Typography>email: </Typography>
                                    <Typography>{appointmentDetail?.patient?.email}</Typography>
                                </Box>
                                <Box sx={{
                                    width: "50%",
                                    display: "flex",
                                }}>
                                    <Typography>phoneNumber: </Typography>
                                    <Typography>{appointmentDetail?.patient?.phoneNumber}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                height: "40px",
                            }}>
                                <Box sx={{
                                    width: "50%",
                                    display: "flex",
                                }}>
                                    <Typography>age: </Typography>
                                    <Typography>{appointmentDetail?.patient?.age}</Typography>
                                </Box>
                                <Box sx={{
                                    width: "50%",
                                    display: "flex",
                                }}>
                                    <Typography>gender: </Typography>
                                    <Typography>{appointmentDetail?.patient?.gender}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                height: "40px",
                            }}>
                                <Box sx={{
                                    width: "50%",
                                    display: "flex",
                                }}>
                                    <Typography>height: </Typography>
                                    <Typography>{appointmentDetail?.patient?.height}</Typography>
                                </Box>
                                <Box sx={{
                                    width: "50%",
                                    display: "flex",
                                }}>
                                    <Typography>weight: </Typography>
                                    <Typography>{appointmentDetail?.patient?.weight}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                height: "40px",
                            }}>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                }}>
                                    <Typography>address: </Typography>
                                    <Typography>{appointmentDetail?.patient?.address}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>)}
            </Container>
        </Box>
        <Footer/>
    </Box>)
}
export default DoctorList
