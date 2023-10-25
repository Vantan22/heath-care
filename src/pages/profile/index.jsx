import {
    Box,
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    InputAdornment,
    Select,
    Button,
    Avatar,
    Input,
} from "@mui/material";
import { message, Radio } from "antd";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import axios from "axios";
export default function Profile() {
    const [messageApi, contextHolder] = message.useMessage();
    const [selectAvatar, setSelectAvatar] = useState(null);
    const [settings, setSettings] = useState(false);
    const [dataUser, setDataUser] = useState("");
    const patientId = localStorage.getItem("id");

    useEffect(() => {
        // Gọi API khi component được mount lần đầu
        axios
            .get(`https://truculent-kick-production.up.railway.app/api/patients/getPatient/${patientId}`)
            .then((response) => {
                setDataUser(response.data);
                console.log("usser:", response);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleChangeAvatar = (e) => {
        const avatar = e.target.files[0];
        setSelectAvatar(avatar);
    };

    const handleCancelBtn = (e) => {
        setSettings(!settings);
        setSelectAvatar(null);
        reset();
    };
    const onSubmit = (data) => {
        console.log("nahuy2", {
            image: selectAvatar,
            id: patientId,
            fullName: data.fullName,
            email: data.email,
            age: data.age,
            phoneNumber: data.phoneNumber,
            weight: data.weight,
            height: data.height,
            gender: data.gender,
            address: data.address,
        });
        axios
            .post(
                `https://truculent-kick-production.up.railway.api/patients/updatePatient/${patientId}`,
                {
                    image: selectAvatar,
                    id: patientId,
                    fullName: data.fullName,
                    email: data.email,
                    age: data.age,
                    phoneNumber: data.phoneNumber,
                    weight: data.weight,
                    height: data.height,
                    gender: data.gender,
                    address: data.address,
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    messageApi.open({
                        type: "success",
                        content: "Resister in successfully!",
                        duration: 1.5,
                        onClose: () => {
                            navigate("/");
                            setSettings(false);
                        },
                    });
                } else {
                    console.log("Error posting data!");
                }
            });
    };
    const schema = yup
        .object({
            fullName: yup
                .string()
                .required("Please enter a user name")
                .matches(
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                    "user name without accents"
                )
                .min(2, "Enter than 2 characters")
                .trim(),
            age: yup
                .string()
                .required("Please enter a age")
                .max(3, "Enter than 3 characters").trim(),
            email: yup
                .string()
                .required("Please enter a email")
                .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "email without accents")
                .min(6, "Enter more than 6 characters")
                .trim(),
            phoneNumber: yup
                .string()
                .required("Please enter a phone number")
                .matches(
                    /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    "Phone number without accents"
                )
                .trim(),
            address: yup.string(),
            // .required("Please enter a adress")
            // .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/, "Address without accents")
            // .min(3, "Enter than 2 characters")
            // .trim(),
        })
        .required();
    const {
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        register,
    } = useForm({ mode: "all", resolver: yupResolver(schema) });
    return (
        <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
            <Header />
            <Box sx={{ flex: "1 1 0" }}>
                <Container>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: "40px",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#26577C",
                                fontSize: "40px",
                                fontWeight: "600",
                            }}
                        >
                            THÔNG TIN CÁ NHÂN
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "20px",
                                borderRadius: "10px",
                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 5px",
                                border: "1px solid #B4B4B3",
                                width: "100%",
                                position: "relative",
                            }}
                        >
                            <Typography
                                sx={{
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
                                    marginBottom: "20px",
                                }}
                            >
                                Hồ sơ cá nhân
                            </Typography>
                            <Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        marginBottom: "20px",
                                        display: "flex",
                                    }}
                                >
                                    <FormControl sx={{ position: "relative" }}>
                                        <label
                                            htmlFor="input-avatar"
                                            style={{
                                                width: "120px",
                                                height: "120px",
                                                borderRadius: "50%",
                                                marginLeft: "20px",
                                            }}
                                        >
                                            {settings ? (
                                                <Avatar
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        width: 120,
                                                        height: 120,
                                                        cursor: "pointer",
                                                    }}
                                                    alt="Remy Sharp"
                                                    src={
                                                        selectAvatar
                                                            ? URL.createObjectURL(selectAvatar)
                                                            : dataUser.image
                                                    }
                                                    htmlFor="input-avatar"
                                                />
                                            ) : (
                                                <Avatar
                                                    sx={{
                                                        display: "flex", alignItems: "center",
                                                        width: 120,
                                                        height: 120,
                                                    }}
                                                    alt="Remy Sharp"
                                                    src={dataUser.image}
                                                    htmlFor="input-avatar"
                                                />
                                            )}
                                        </label>
                                        {settings ? (
                                            <Input
                                                onChange={handleChangeAvatar}
                                                sx={{ display: "none" }}
                                                id="input-avatar"
                                                type="file"
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </FormControl>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        padding: "10px 20px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <FormControl
                                        error={!!errors.fullName}
                                        sx={{ position: "relative", width: "45%" }}
                                    >
                                        {settings ? (
                                            <>
                                                <InputLabel htmlFor="input-fullName">
                                                    FullName
                                                </InputLabel>
                                                <OutlinedInput
                                                    sx={{
                                                        paddingRight: "32px",
                                                    }}
                                                    id="input-fullName"
                                                    label="Required"
                                                    type="text"
                                                    defaultValue={dataUser.fullName}
                                                    {...register("fullName")}
                                                    name="fullName"
                                                />
                                                <FormHelperText
                                                    sx={{ color: "red", height: "20px" }}
                                                    id="component-error-text"
                                                >
                                                    {errors.fullName && errors.fullName.message}
                                                </FormHelperText>
                                            </>
                                        ) : (
                                            <>
                                                <Typography>Full Name</Typography>
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        height: "46px",
                                                        padding: "14px",
                                                        color: "#00000",
                                                        fontWeight: "400",
                                                        fontSize: "20px",
                                                        marginBottom: "0px",
                                                        borderBottom: "1px solid #cccc",
                                                    }}
                                                >
                                                    {dataUser.fullName}
                                                </Typography>
                                            </>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        error={!!errors.age}
                                        sx={{ position: "relative", width: "45%" }}
                                    >
                                        {settings ? (
                                            <>
                                                <InputLabel htmlFor="input-age">Age</InputLabel>
                                                <OutlinedInput
                                                    sx={{
                                                        paddingRight: "32px",
                                                    }}
                                                    id="input-age"
                                                    label="age"
                                                    type="text"
                                                    {...register("age")}
                                                    name="age"
                                                    defaultValue={dataUser.age}
                                                />
                                                <FormHelperText
                                                    sx={{ color: "red", height: "20px" }}
                                                    id="component-error-text"
                                                >
                                                    {errors.age && errors.age.message}
                                                </FormHelperText>
                                            </>
                                        ) : (
                                            <>
                                                <Typography>Age</Typography>
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        height: "46px",
                                                        padding: "14px",
                                                        color: "#00000",
                                                        fontWeight: "400",
                                                        fontSize: "20px",
                                                        borderBottom: "1px solid #cccc",
                                                        marginBottom: "0px",
                                                    }}
                                                >
                                                    {dataUser.age}
                                                </Typography>
                                            </>
                                        )}
                                    </FormControl>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        padding: "10px 20px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <FormControl
                                        error={!!errors.email}
                                        sx={{ position: "relative", width: "45%" }}
                                    >
                                        {settings ? (
                                            <>
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
                                                    defaultValue={dataUser.email}
                                                //   onChange={handleChangeEmail}
                                                />
                                                <FormHelperText
                                                    sx={{ color: "red", height: "20px" }}
                                                    id="component-error-text"
                                                >
                                                    {errors.email && errors.email.message}
                                                </FormHelperText>
                                            </>
                                        ) : (
                                            <>
                                                <Typography>Email</Typography>
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        height: "46px",
                                                        padding: "14px",
                                                        color: "#00000",
                                                        fontWeight: "400",
                                                        fontSize: "20px",
                                                        borderBottom: "1px solid #cccc",
                                                        marginBottom: "0px",
                                                    }}
                                                >
                                                    {dataUser.email}
                                                </Typography>
                                            </>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        error={!!errors.phoneNumber}
                                        sx={{ position: "relative", width: "45%" }}
                                    >
                                        {settings ? (
                                            <>
                                                <InputLabel htmlFor="input-phoneNumber">
                                                    Phone Number
                                                </InputLabel>
                                                <OutlinedInput
                                                    sx={{
                                                        paddingRight: "32px",
                                                    }}
                                                    id="input-phoneNumber"
                                                    label="phoneNumber"
                                                    type="text"
                                                    {...register("phoneNumber")}
                                                    name="phoneNumber"
                                                    defaultValue={dataUser.phoneNumber}
                                                //   onChange={handleChangePhoneNumber}
                                                />
                                                <FormHelperText
                                                    sx={{ color: "red", height: "20px" }}
                                                    id="component-error-text"
                                                >
                                                    {errors.phoneNumber && errors.phoneNumber.message}
                                                </FormHelperText>
                                            </>
                                        ) : (
                                            <>
                                                <Typography>Phone Number</Typography>
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        height: "46px",
                                                        padding: "14px",
                                                        color: "#00000",
                                                        fontWeight: "400",
                                                        fontSize: "20px",
                                                        borderBottom: "1px solid #cccc",
                                                        marginBottom: "0px",
                                                    }}
                                                >
                                                    {dataUser.phoneNumber
                                                        ? dataUser.phoneNumber
                                                        : "Chua cap nhat sdt"}
                                                </Typography>
                                            </>
                                        )}
                                    </FormControl>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        padding: "10px 20px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    {settings ? (
                                        <TextField
                                            label="Weight"
                                            id="outlined-start-adornment"
                                            type="number"
                                            sx={{ width: "45%" }}
                                            defaultValue={dataUser.weight}
                                            {...register("weight")}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">kg</InputAdornment>
                                                ),
                                            }}
                                        />
                                    ) : (
                                        <Box sx={{ width: "45%" }}>
                                            <Typography>Weight</Typography>
                                            <Typography
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    height: "46px",
                                                    padding: "14px",
                                                    color: "#00000",
                                                    fontWeight: "400",
                                                    fontSize: "20px",
                                                    borderBottom: "1px solid #cccc",
                                                    marginBottom: "0px",
                                                }}
                                            >
                                                {dataUser.weight
                                                    ? dataUser.weight
                                                    : "Chua cap nhat can nang"}
                                            </Typography>
                                        </Box>
                                    )}
                                    {settings ? (
                                        <TextField
                                            label="Height"
                                            id="outlined-start-adornment"
                                            type="number"
                                            sx={{ width: "45%" }}
                                            defaultValue={dataUser.height}
                                            {...register("height")}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">cm</InputAdornment>
                                                ),
                                            }}
                                        />
                                    ) : (
                                        <Box sx={{ width: "45%" }}>
                                            <Typography>Height</Typography>
                                            <Typography
                                                sx={{
                                                    display: "flex",
                                                    height: "46px",
                                                    padding: "14px",
                                                    color: "#00000",
                                                    fontWeight: "400",
                                                    fontSize: "20px",
                                                    borderBottom: "1px solid #cccc",
                                                    marginBottom: "0px",
                                                }}
                                            >
                                                {dataUser.height
                                                    ? dataUser.height
                                                    : "Chua cap nhat chieu cao"}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        padding: "10px 20px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            columnGap: "20px",
                                            alignItems: "center",
                                            width: "45%",
                                        }}
                                    >
                                        {settings ? (
                                            <>
                                                <Box>Gender :</Box>
                                                <Radio.Group
                                                //   defaultValue={dataUser.gender}
                                                //   name="gender"
                                                >
                                                    <Radio
                                                        // checked={dataUser.gender === "male"}
                                                        value="male"
                                                        name="gender"
                                                        {...register("gender")}
                                                    >
                                                        Male
                                                    </Radio>
                                                    <Radio
                                                        // checked={dataUser.gender === "female"}
                                                        value="female"
                                                        name="gender"
                                                        {...register("gender")}
                                                    >
                                                        Female
                                                    </Radio>
                                                </Radio.Group>
                                            </>
                                        ) : (
                                            <Box sx={{ width: "100%" }}>
                                                <Typography>Gender</Typography>
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        height: "46px",
                                                        padding: "14px",
                                                        color: "#00000",
                                                        fontWeight: "400",
                                                        fontSize: "20px",
                                                        borderBottom: "1px solid #cccc",
                                                        marginBottom: "0px",
                                                    }}
                                                >
                                                    {dataUser.gender
                                                        ? dataUser.gender
                                                        : "Chua cap nhat gioi tinh"}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <FormControl
                                        error={!!errors.addess}
                                        sx={{ position: "relative", width: "45%" }}
                                    >
                                        {settings ? (
                                            <>
                                                <InputLabel htmlFor="input-address">Address</InputLabel>
                                                <OutlinedInput
                                                    sx={{
                                                        paddingRight: "32px",
                                                    }}
                                                    id="input-address"
                                                    label="Required"
                                                    type="text"
                                                    {...register("address")}
                                                    name="address"
                                                    defaultValue={dataUser.address}
                                                />
                                                <FormHelperText
                                                    sx={{ color: "red", height: "20px" }}
                                                    id="component-error-text"
                                                >
                                                    {errors.address && errors.address.message}
                                                </FormHelperText>
                                            </>
                                        ) : (
                                            <Box sx={{ marginBottom: "14px" }}>
                                                <Typography>Address</Typography>
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        height: "46px",
                                                        padding: "14px",
                                                        color: "#00000",
                                                        fontWeight: "400",
                                                        fontSize: "20px",
                                                        borderBottom: "1px solid #cccc",
                                                        marginBottom: "0px",
                                                    }}
                                                >
                                                    {dataUser.weight
                                                        ? dataUser.weight
                                                        : "Chua cap nhat dia chi"}
                                                </Typography>
                                            </Box>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    {settings ? (
                                        <Button
                                            onClick={handleCancelBtn}
                                            sx={{
                                                padding: "14px",
                                                margin: "10px 20px 20px 20px",
                                                width: "300px",
                                                backgroundColor: "#f8792e",
                                            }}
                                            variant="contained"
                                            size="large"
                                        >
                                            Hủy{" "}
                                        </Button>
                                    ) : <Button
                                            onClick={()=>setSettings(!settings)}
                                        sx={{
                                            padding: "14px",
                                            margin: "10px 20px 20px 20px",
                                            width: "300px",
                                            backgroundColor: "#f8792e",
                                        }}
                                        variant="contained"
                                        size="large"
                                    >
                                        Chỉnh sửa{" "}
                                    </Button>}
                                    {settings ? (
                                        <Button
                                            type="submit"
                                            sx={{
                                                padding: "14px",
                                                margin: "10px 20px 20px 20px",
                                                width: "300px",
                                                backgroundColor: "#f8792e",
                                            }}
                                            variant="contained"
                                            size="large"
                                            disabled={!isDirty}
                                        >
                                            Cập nhật{" "}
                                        </Button>
                                    ) : ""}
                                </Box>
                            </Box>
                        </Box>
                    </form>
                    {contextHolder}
                </Container>
                <Box
                    sx={{
                        height: "40px",
                    }}
                ></Box>
            </Box>
            <Footer />
        </Box>
    );
}
