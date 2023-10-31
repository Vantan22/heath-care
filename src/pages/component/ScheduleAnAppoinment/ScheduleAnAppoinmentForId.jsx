import {
    Box,
    Button,
    Container,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Header from "../../../component/header/Header.jsx";
import {useForm} from "react-hook-form";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo/index.js";
import {useEffect, useState} from "react";
import {message, Radio} from "antd";
import axios from "axios";
import Footer from "../../../component/footer/Footer.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {getValueAPI} from "../../../../api-service.js";

const ScheduleAnAppoinment = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const patientId = localStorage.getItem('id')
    const {id} = useParams()
    if (!patientId) {
        window.location.href = "/auth/login"
    }
    const [value, setValue] = useState("Male");
    const [specialization, setSpecialization] = useState([]);
    const [examinationTime, setExaminationTime] = useState('');
    const [departments, setDepartments] = useState([]);
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")


    const datetimeFormat = 'YYYY-MM-DDTHH:mm:00';

    const getData = async () => {
        const data = await getValueAPI(`/api/specialization/getAll`)
        const getUser = await getValueAPI(`/api/appointment/getByAppointmentId/${id}`)
        console.log(getUser,"getUser")
        setFullName(getUser.patientName)
        setEmail(getUser.email)
        setPhoneNumber(getUser.appointment.patient.phoneNumber)
        setWeight(getUser.appointment.patient.weight)
        setHeight(getUser.appointment.patient.height)
        setDepartments(data);
    }

    useEffect(() => {
        getData()
        return getData
    }, []);

    const onSubmit = (data) => {
        axios.post(`https://truculent-kick-production.up.railway.app/api/appointment/update/${id}`, {
            "doctorId": data.doctorId,
            "patientId": patientId,
            "phoneNumber": phoneNumber,
            "appointmentTime": examinationTime,
            "purpose": data.purpose
        }).then((response) => {
            if (response.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Resister in successfully!',
                    duration: 1.5,
                    onClose: () => {
                        navigate("/");
                    }
                });
            } else {
                console.log("Error posting data!")
            }
        })
    };

    const onChange = (value) => {
        const convertTime = value.format(datetimeFormat)
        setExaminationTime(convertTime)
    };
    const handleChange = () => {
    };
    const handleChangeDepartment = (event) => {
        // setDepartmentId(event.target.value);
        axios.post("https://truculent-kick-production.up.railway.app/api/doctor/getDoctorsByCategory", {
            categoryId: event.target.value,
            appointmentTime: examinationTime
        })
            .then((response) => {
                setSpecialization(response.data.freeDoctors)
            })
            .catch((error) => {
                console.log(error)
            });
    }
    const handleChangeGender = (event) => {
        setValue(event.target.value);
    }
    const {
        handleSubmit,
        formState: {errors},
        register,
    } = useForm({
        mode: "all",
    });

    return (<Box>
        <Header/>
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
        }}>
            <Typography sx={{
                color: "#26577C",
                fontSize: "40px",
                fontWeight: "600",
            }}>
                ĐĂNG KÝ LỊCH KHÁM
            </Typography>
            <Typography sx={{
                color: "#26577C",
                fontSize: "25px",
                fontWeight: "400",
            }}>
                REGISTER FOR EXAMINATION SCHEDULE
            </Typography>
        </Box>
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 5px",
                    border: "1px solid #B4B4B3",
                    width: "100%",
                    position: "relative",
                }}>
                    <Typography sx={{
                        display: "flex",
                        height: "60px",
                        backgroundColor: "#f88848",
                        borderTopRightRadius: "10px",
                        borderTopLeftRadius: "10px",
                        padding: "20px",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "20px",
                        textTransform: "uppercase",
                        marginBottom: "40px",
                    }}>Hồ sơ cá nhân</Typography>
                    <Box>
                        <Box sx={{
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                            <FormControl error={!!errors.fullName} sx={{
                                position: "relative",
                                width: "100%"
                            }}>
                                <InputLabel htmlFor="input-fullName">fullName</InputLabel>
                                <OutlinedInput
                                    sx={{
                                        paddingRight: "32px",
                                    }}
                                    id="input-fullName"
                                    label="Required"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    {...register("fullName")}
                                    name="fullName"
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                            <FormControl disabled sx={{
                                position: "relative",
                                width: "45%"
                            }}>
                                <InputLabel htmlFor="input-email">email</InputLabel>
                                <OutlinedInput
                                    sx={{
                                        paddingRight: "32px",
                                    }}
                                    id="input-email"
                                    label="Required"
                                    value={email}
                                    type="email"
                                    {...register("email")}
                                    name="email"
                                />
                            </FormControl>
                            <FormControl error={!!errors.phoneNumber} sx={{
                                position: "relative",
                                width: "45%"
                            }}>
                                <InputLabel htmlFor="input-phoneNumber">phoneNumber</InputLabel>
                                <OutlinedInput
                                    sx={{
                                        paddingRight: "32px",
                                    }}
                                    id="input-phoneNumber"
                                    label="phoneNumber"
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    {...register("phoneNumber")}
                                    name="phoneNumber"
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <TextField
                                label="Weight"
                                id="outlined-start-adornment"
                                type="number"
                                sx={{width: '45%'}}
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Height"
                                id="outlined-start-adornment"
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                sx={{width: '45%'}}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                }}
                            />
                        </Box>
                        <Box sx={{
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <Box sx={{
                                display: "flex",
                                columnGap: "20px",
                                alignItems: "center",
                            }}>
                                <Box>Gender :</Box>
                                <Radio.Group onChange={handleChangeGender} value={value} name="gender">
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </Radio.Group>
                            </Box>
                            <Box sx={{width: "45%"}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker label="Choose your examination time" onChange={onChange}/>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <FormControl sx={{width: "45%"}}>
                                <InputLabel id="demo-simple-select-label">Faculty list</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Danh Sách Khoa"
                                    defaultValue=""
                                    name="departmentId"
                                    onChange={handleChangeDepartment}
                                >
                                    {departments.map((value) => <MenuItem key={value.id}
                                                                          value={value.id}>{value.specName}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl sx={{width: "45%"}}>
                                <InputLabel id="demo-simple-select-label">Specialized doctor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="specialized doctor"
                                    {...register("doctorId")}
                                    name="doctorId"
                                    defaultValue=""
                                    onChange={handleChange}
                                >
                                    {specialization.map((value) => <MenuItem key={value.id}
                                                                             value={value.id}>{value.fullName}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{
                            width: "100%",
                            padding: "10px 20px",
                        }}>
                        </Box>
                        <Box sx={{
                            width: "100%",
                            padding: "10px 20px",
                        }}>
                            <FormControl sx={{
                                position: "relative",
                                width: "100%"
                            }}>
                                <InputLabel htmlFor="input-purpose">purpose</InputLabel>
                                <OutlinedInput
                                    sx={{
                                        paddingRight: "32px",
                                    }}
                                    id="input-purpose"
                                    label="purpose"
                                    type="text"
                                    multiline
                                    rows={4}
                                    {...register("purpose")}
                                    name="purpose"
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}>
                            <Button type="submit" sx={{
                                padding: "14px",
                                margin: "10px 20px 20px 20px",
                                width: "300px",
                                backgroundColor: "#f8792e",
                            }} variant="contained" size="large">Đăng ký</Button>
                        </Box>
                    </Box>
                </Box>
            </form>
            {contextHolder}
        </Container>
        <Box sx={{
            height: "40px",
        }}></Box>
        <Footer/>
    </Box>)
}
export default ScheduleAnAppoinment
