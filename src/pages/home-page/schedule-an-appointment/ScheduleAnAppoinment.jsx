import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Header from "../../../component/header/Header.jsx";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/index.js";
import { useEffect, useState } from "react";
import { message, Radio } from "antd";
import axios from "axios";
import Footer from "../../../component/footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { getValueAPI } from "../../../../api-service.js";

const ScheduleAnAppoinment = () => {
    const [ messageApi, contextHolder ] = message.useMessage();
    const navigate = useNavigate();
    const checkLogin = localStorage.getItem('id')
    const currentEmail = localStorage.getItem('username')
    if ( !checkLogin) {
        window.location.href = "/auth/login"
    }
    const [ value, setValue ] = useState("Male");
    const [ specialization, setSpecialization ] = useState([]);
    const [ examinationTime, setExaminationTime ] = useState('');
    const [ departments, setDepartments ] = useState([]);
    const patientId = localStorage.getItem('id')


    const datetimeFormat = 'YYYY-MM-DDTHH:mm:00';

    const getData = async () => {
        const data = await getValueAPI(`/api/specialization/getAll`)
        setDepartments(data);
    }

    useEffect(() => {
        getData()
        return getData
    }, []);

    const onSubmit = (data) => {
        axios.post("https://truculent-kick-production.up.railway.app/api/appointment/create", {
            "doctorId": data.doctorId,
            "patientId": patientId,
            "phoneNumber": data.phoneNumber,
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
    const schema = yup
        .object({
            firstName: yup
                .string()
                .required("Please enter a first name")
                .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/, "user name without accents")
                .min(2, "Enter more than 6 characters")
                .trim(),
            LastName: yup
                .string()
                .required("Please enter a last name")
                .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/, "user name without accents")
                .min(2, "Enter more than 6 characters")
                .trim(),
            phoneNumber: yup
                .string()
                .required("Please enter a phone number")
                .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Password without accents")
                .min(6, "Enter more than 6 characters")
                .trim(),
        })
        .required();
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({
        mode: "all",
        resolver: yupResolver(schema)
    });

    return (<Box>
        <Header/>
        <Box sx={ {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
        } }>
            <Typography sx={ {
                color: "#26577C",
                fontSize: "40px",
                fontWeight: "600",
            } }>
                ĐĂNG KÝ LỊCH KHÁM
            </Typography>
            <Typography sx={ {
                color: "#26577C",
                fontSize: "25px",
                fontWeight: "400",
            } }>
                REGISTER FOR EXAMINATION SCHEDULE
            </Typography>
        </Box>
        <Container>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Box sx={ {
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 5px",
                    border: "1px solid #B4B4B3",
                    width: "100%",
                    position: "relative",
                } }>
                    <Typography sx={ {
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
                    } }>Hồ sơ cá nhân</Typography>
                    <Box>
                        <Box sx={ {
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                        } }>
                            <FormControl error={ !!errors.firstName } sx={ {
                                position: "relative",
                                width: "45%"
                            } }>
                                <InputLabel htmlFor="input-firstName">firstName</InputLabel>
                                <OutlinedInput
                                    sx={ {
                                        paddingRight: "32px",
                                    } }
                                    id="input-firstName"
                                    label="Required"
                                    type="text"
                                    { ...register("firstName") }
                                    name="firstName"
                                />
                                <FormHelperText sx={ {
                                    color: "red",
                                    height: "20px"
                                } }
                                                id="component-error-text">{ errors.firstName && errors.firstName.message }</FormHelperText>
                            </FormControl>
                            <FormControl error={ !!errors.LastName } sx={ {
                                position: "relative",
                                width: "45%"
                            } }>
                                <InputLabel htmlFor="input-phoneNumber">LastName</InputLabel>
                                <OutlinedInput
                                    sx={ {
                                        paddingRight: "32px",
                                    } }
                                    id="input-LastName"
                                    label="LastName"
                                    type="text"
                                    { ...register("LastName") }
                                    name="LastName"
                                />
                                <FormHelperText sx={ {
                                    color: "red",
                                    height: "20px"
                                } }
                                                id="component-error-text">{ errors.LastName && errors.LastName.message }</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box sx={ {
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                        } }>
                            <FormControl disabled sx={ {
                                position: "relative",
                                width: "45%"
                            } }>
                                <InputLabel htmlFor="input-email">email</InputLabel>
                                <OutlinedInput
                                    sx={ {
                                        paddingRight: "32px",
                                    } }
                                    id="input-email"
                                    label="Required"
                                    value={currentEmail}
                                    type="email"
                                    { ...register("email") }
                                    name="email"
                                />
                            </FormControl>
                            <FormControl error={ !!errors.phoneNumber } sx={ {
                                position: "relative",
                                width: "45%"
                            } }>
                                <InputLabel htmlFor="input-phoneNumber">phoneNumber</InputLabel>
                                <OutlinedInput
                                    sx={ {
                                        paddingRight: "32px",
                                    } }
                                    id="input-phoneNumber"
                                    label="phoneNumber"
                                    type="text"
                                    { ...register("phoneNumber") }
                                    name="phoneNumber"
                                />
                                <FormHelperText sx={ {
                                    color: "red",
                                    height: "20px"
                                } }
                                                id="component-error-text">{ errors.phoneNumber && errors.phoneNumber.message }</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box sx={ {
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between"
                        } }>
                            <TextField
                                label="Weight"
                                id="outlined-start-adornment"
                                type="number"
                                sx={ { width: '45%' } }
                                InputProps={ {
                                    startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                } }
                            />
                            <TextField
                                label="Height"
                                id="outlined-start-adornment"
                                type="number"
                                sx={ { width: '45%' } }
                                InputProps={ {
                                    startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                } }
                            />
                        </Box>
                        <Box sx={ {
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between"
                        } }>
                            <Box sx={ {
                                display: "flex",
                                columnGap: "20px",
                                alignItems: "center",
                            } }>
                                <Box>Gender :</Box>
                                <Radio.Group onChange={ handleChangeGender } value={ value } name="gender">
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </Radio.Group>
                            </Box>
                            <Box sx={ { width: "45%" } }>
                                <LocalizationProvider dateAdapter={ AdapterDayjs }>
                                    <DemoContainer components={ [ 'DateTimePicker' ] }>
                                        <DateTimePicker label="Choose your examination time" onChange={ onChange }/>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={ {
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "space-between"
                        } }>
                            <FormControl sx={ { width: "45%" } }>
                                <InputLabel id="demo-simple-select-label">Faculty list</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Danh Sách Khoa"
                                    defaultValue=""
                                    name="departmentId"
                                    onChange={ handleChangeDepartment }
                                >
                                    { departments.map((value) => <MenuItem key={ value.id }
                                                                           value={ value.id }>{ value.specName }</MenuItem>) }
                                </Select>
                            </FormControl>
                            <FormControl sx={ { width: "45%" } }>
                                <InputLabel id="demo-simple-select-label">Specialized doctor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="specialized doctor"
                                    { ...register("doctorId") }
                                    name="doctorId"
                                    defaultValue=""
                                    onChange={ handleChange }
                                >
                                    { specialization.map((value) => <MenuItem key={ value.id }
                                                                              value={ value.id }>{ value.fullName }</MenuItem>) }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={ {
                            width: "100%",
                            padding: "10px 20px",
                        } }>
                        </Box>
                        <Box sx={ {
                            width: "100%",
                            padding: "10px 20px",
                        } }>
                            <FormControl sx={ {
                                position: "relative",
                                width: "100%"
                            } }>
                                <InputLabel htmlFor="input-purpose">purpose</InputLabel>
                                <OutlinedInput
                                    sx={ {
                                        paddingRight: "32px",
                                    } }
                                    id="input-purpose"
                                    label="purpose"
                                    type="text"
                                    multiline
                                    rows={ 4 }
                                    { ...register("purpose") }
                                    name="purpose"
                                />
                            </FormControl>
                        </Box>
                        <Box sx={ {
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                        } }>
                            <Button type="submit" sx={ {
                                padding: "14px",
                                margin: "10px 20px 20px 20px",
                                width: "300px",
                                backgroundColor: "#f8792e",
                            } } variant="contained" size="large">Đăng ký</Button>
                        </Box>
                    </Box>
                </Box>
            </form>
            { contextHolder }
        </Container>
        <Box sx={ {
            height: "40px",
        } }></Box>
        <Footer/>
    </Box>)
}
export default ScheduleAnAppoinment
