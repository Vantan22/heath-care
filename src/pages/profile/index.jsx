import { Box, Container, FormControl, FormHelperText, InputLabel, OutlinedInput, TextField, Typography, InputAdornment, Select, Button, Avatar } from "@mui/material";
import { message, Radio } from "antd";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { useNavigate } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
export default function Profile() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [specialization, setSpecialization] = useState([]);
    const [examinationTime, setExaminationTime] = useState('');
    const [departments, setDepartments] = useState([]);
    const patientId = localStorage.getItem('id')
    const user = {
        id: "1",
        age: "20",
        fullName: "Benh Van Nhan",
        gender: "female",
        email: "d3N3b@example.com",
        height: "180",
        weight: "70",
        addess: "Ha Noi",
        phoneNumber: "0123456789",
    }
    const [dataUser, setDataUser] = useState(user);
    useEffect(() => {
        // Gọi API khi component được mount lần đầu
        axios
            .get("https://truculent-kick-production.up.railway.app/api/specialization/getAll")
            .then((response) => {
                setDepartments(response.data);
                console.log('response.data', response.data)
            })
            .catch((error) => console.error(error));
    }, []);

    const handleChangeAvatar = (e) => {

    }

    const handleChangeFullName = (e) => {
        // dataUser.fullName= e.target.value,
        setDataUser({
            ...dataUser,
            fullName: e.target.value,
        })
    }
    const handleChangeAge = (e) => {
        setDataUser({
            ...dataUser,
            age: e.target.value,
        })
    }

    const handleChangeEmail = (e) => {
        setDataUser({
            ...dataUser,
            email: e.target.value,
        })
    }

    const handleChangePhoneNumber = (e) => {
        setDataUser({
            ...dataUser,
            phoneNumber: e.target.value,
        })
    }

    const handleChangeWeight = (e) => {
        setDataUser({
            ...dataUser,
            weight: e.target.value,
        })
    }
    const handleChangeHeight = (e) => {
        setDataUser({
            ...dataUser,
            height: e.target.value,
        })
    }
    const handleChangeGender = (e) => {
        setDataUser({
            ...dataUser,
            gender: e.target.value,
        })
    }


    const onSubmit = (data) => {
        console.log("nqhuy20", dataUser);
        // axios.post("https://truculent-kick-production.up.railway.app/api/appointment/create", {
        //     "doctorId": data.doctorId,
        //     "patientId": patientId,
        //     "phoneNumber": data.phoneNumber,
        //     "appointmentTime": examinationTime,
        //     "purpose": data.purpose

        // }).then((response) => {
        //     if (response.status === 200) {
        //         messageApi.open({
        //             type: 'success', content: 'Resister in successfully!', duration: 1.5, onClose: () => {
        //                 navigate("/");
        //             }
        //         });
        //     } else {
        //         console.log("Error posting data!")
        //     }
        // })
    };

    const schema = yup
        .object({
            fullName: yup
                .string()
                .required("Please enter a user name")
                .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/, "user name without accents")
                .min(2, "Enter more than 6 characters")
                .trim(), age: yup
                    .string()
                    .required("Please enter a age")
                    .max(3, "Enter than 3 characters")
                    .trim(), email: yup
                        .string()
                        .required("Please enter a email")
                        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Password without email")
                        .min(6, "Enter more than 6 characters")
                .trim(), phoneNumber: yup
                    .string()
                    .required("Please enter a phone number")
                    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone number without accents")
                            .trim(),
        })
        .required();
    const {
        handleSubmit, formState: { errors }, register,
    } = useForm({ mode: "all", resolver: yupResolver(schema) });

    return (
        <Box>
            <Header />
            <Box sx={{
                width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center",
                marginTop: "40px",
            }} >
                <Typography sx={{
                    color: "#26577C", fontSize: "40px", fontWeight: "600",
                }}>
                    THÔNG TIN CÁ NHÂN
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
                                marginBottom: "20px",
                            }}>
                                <FormControl sx={{ position: "relative", width: "100%" }}>
                                    <Avatar sx={{ margin: "0 auto", display: "flex", alignItems: "center", width: 100, height: 100 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    <InputLabel htmlFor="input-fullName"></InputLabel>

                                </FormControl>
                            </Box>
                            <Box sx={{
                                width: "100%", padding: "10px 20px", display: "flex", justifyContent: "space-between",
                            }}>
                                <FormControl error={!!errors.fullName} sx={{ position: "relative", width: "45%" }}>
                                    <InputLabel htmlFor="input-fullName">FullName</InputLabel>
                                    <OutlinedInput
                                        sx={{
                                            paddingRight: "32px",
                                        }}
                                        id="input-fullName"
                                        label="Required"
                                        type="text"
                                        {...register("fullName")}
                                        name="fullName"
                                        onChange={handleChangeFullName}
                                        value={dataUser.fullName}
                                    />
                                    <FormHelperText sx={{ color: "red", height: "20px" }}
                                        id="component-error-text">{errors.fullName && errors.fullName.message}</FormHelperText>
                                </FormControl>
                                <FormControl error={!!errors.age} sx={{ position: "relative", width: "45%" }}>
                                    <InputLabel htmlFor="input-phoneNumber">Age</InputLabel>
                                    <OutlinedInput
                                        sx={{
                                            paddingRight: "32px",
                                        }}
                                        id="input-age"
                                        label="age"
                                        type="text"
                                        {...register("age")}
                                        name="age"
                                        value={dataUser.age}
                                        onChange={handleChangeAge }
                                    />
                                    <FormHelperText sx={{ color: "red", height: "20px" }}
                                        id="component-error-text">{errors.age && errors.age.message}</FormHelperText>
                                </FormControl>
                            </Box>
                            <Box sx={{
                                width: "100%", padding: "10px 20px", display: "flex", justifyContent: "space-between",
                            }}>
                                <FormControl error={!!errors.email} sx={{ position: "relative", width: "45%" }}>
                                    <InputLabel htmlFor="input-email">Email</InputLabel>
                                    <OutlinedInput
                                        sx={{
                                            paddingRight: "32px",
                                        }}
                                        id="input-email"
                                        label="Required"
                                        type="email"
                                        {...register("email")}
                                        name="email"
                                        value={dataUser.email}
                                        onChange={handleChangeEmail}
                                    />
                                    <FormHelperText sx={{ color: "red", height: "20px" }}
                                        id="component-error-text">{errors.email && errors.email.message}</FormHelperText>
                                </FormControl>
                                <FormControl error={!!errors.phoneNumber} sx={{ position: "relative", width: "45%" }}>
                                    <InputLabel htmlFor="input-phoneNumber">phoneNumber</InputLabel>
                                    <OutlinedInput
                                        sx={{
                                            paddingRight: "32px",
                                        }}
                                        id="input-phoneNumber"
                                        label="phoneNumber"
                                        type="text"
                                        {...register("phoneNumber")}
                                        name="phoneNumber"
                                        value={dataUser.phoneNumber}
                                        onChange={handleChangePhoneNumber}
                                    />
                                    <FormHelperText sx={{ color: "red", height: "20px" }}
                                        id="component-error-text">{errors.phoneNumber && errors.phoneNumber.message}</FormHelperText>
                                </FormControl>
                            </Box>
                            <Box sx={{
                                width: "100%", padding: "10px 20px", display: "flex", justifyContent: "space-between"
                            }}>
                                <TextField
                                    label="Weight"
                                    id="outlined-start-adornment"
                                    type="number"
                                    sx={{ width: '45%' }}
                                    value={dataUser.weight}
                                    onChange={handleChangeWeight}
                                    {...register("weight")}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                    }}
                                />
                                <TextField
                                    label="Height"
                                    id="outlined-start-adornment"
                                    type="number"
                                    sx={{ width: '45%' }}
                                    value={dataUser.height}
                                    onChange={handleChangeHeight}
                                    {...register("height")}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                    }}
                                />
                            </Box>
                            <Box sx={{
                                width: "100%", padding: "10px 20px", display: "flex", justifyContent: "space-between"
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    columnGap: "20px",
                                    alignItems: "center",
                                }}>
                                    <Box>Gender :</Box>
                                    <Radio.Group
                                        // onChange={handleChangeGender}
                                        value={dataUser.gender}
                                        onChange={handleChangeGender}
                                        name="gender">
                                        <Radio checked={dataUser.gender === "male"} value="male">Male</Radio>
                                        <Radio checked={dataUser.gender === "female"} value="female">Female</Radio>
                                    </Radio.Group>
                                </Box>
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
                                }} variant="contained" size="large">Cập nhật </Button>
                            </Box>
                        </Box>

                    </Box>
                </form>
                {contextHolder}
            </Container>
            <Box sx={{
                height: "40px",
            }}></Box>
            <Footer />
        </Box>
    );
}
