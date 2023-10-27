import {Box, Container, Typography} from "@mui/material";
import Footer from "../../component/Footer/Footer.jsx";
import Header from "../../component/header/Header.jsx";
import HTTP from "../../../axios-config.js";
import {useEffect, useState} from "react";
import StickyHeadTable from "../../component/BaseTable.jsx";
import {convertAppointmentTime, convertTimeAndDate} from "../../constant/convert-time.js";


const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [values, setValues] = useState([])
  const [appointmentDetail, setAppointmentDetail] = useState(null)
  const userId = localStorage.getItem('id')
  const getData = async () => {
    const data = await HTTP.get(`/api/appointment/getByUserId/${userId}`)
    const value = data.map((item, index) => {
      return {
        id: item.appointment.id,
        index: index + 1,
        doctor: item.doctorName,
        name: item.patientName,
        registrationDate: convertAppointmentTime(item.appointment.appointmentTime),
        appointmentDate: convertTimeAndDate(item.appointment.appointmentTime),
      }
    })
    console.log('data',data)
    setValues(data)
    setAppointments(value)
  }
  useEffect(() => {
    getData()
    return getData;
  }, []);
  const onClickHideDetail = (data) => {
    console.log(data)
    const handleDetailValue = values.find((item) => item.appointment.id === data)
    console.log(handleDetailValue)
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
                <Typography>{appointmentDetail?.doctorName}</Typography>
              </Box>
              <Box sx={{
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}>
                <Typography>Registration Date: </Typography>
                <Typography>{convertAppointmentTime(appointmentDetail?.appointment
                    .appointmentTime)}</Typography>
              </Box>
              <Box sx={{
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}>
                <Typography>Appointment time: </Typography>
                <Typography>{convertTimeAndDate(appointmentDetail?.appointment
                    .createdAt)}</Typography>
              </Box>
              <Box sx={{
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}>
                <Typography>Registration phone: </Typography>
                <Typography>{appointmentDetail?.appointment
                    .phoneNumber}</Typography>
              </Box>
              <Box sx={{
                width: "100%",
                maxWidth: "350px",
                minHeight: "40px",
                display: "flex",
                alignItems: "flex-start",
              }}>
                <Typography>Purpose: </Typography>
                <Typography>{appointmentDetail?.appointment
                    .purpose}</Typography>
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
                  <Typography>{appointmentDetail?.patientName}</Typography>
                </Box>
                <Box sx={{
                  width: "50%",
                  display: "flex",
                }}>
                  <Typography>Date of Birth: </Typography>
                  <Typography>{appointmentDetail?.appointment
                    .patient?.dateOfBirth}</Typography>
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
                  <Typography>{appointmentDetail?.appointment.patient?.email}</Typography>
                </Box>
                <Box sx={{
                  width: "50%",
                  display: "flex",
                }}>
                  <Typography>phoneNumber: </Typography>
                  <Typography>{appointmentDetail?.appointment.patient?.phoneNumber}</Typography>
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
                  <Typography>{appointmentDetail?.appointment.patient?.age}</Typography>
                </Box>
                <Box sx={{
                  width: "50%",
                  display: "flex",
                }}>
                  <Typography>gender: </Typography>
                  <Typography>{appointmentDetail?.appointment.patient?.gender}</Typography>
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
                  <Typography>{appointmentDetail?.appointment.patient?.height}</Typography>
                </Box>
                <Box sx={{
                  width: "50%",
                  display: "flex",
                }}>
                  <Typography>weight: </Typography>
                  <Typography>{appointmentDetail?.appointment.patient?.weight}</Typography>
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
                  <Typography>{appointmentDetail?.appointment.patient?.address}</Typography>
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
export default AppointmentList
