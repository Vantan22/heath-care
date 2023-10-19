import {useState} from "react";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    Link,
    OutlinedInput,
    Typography
} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    const onSubmit = (data) => {

        if (data.password === data.ConfirmPassword) {
            setCheckPassword(false);
            axios.post("https://truculent-kick-production.up.railway.app/api/auth/register", {
                "email": data.email, "password": data.password, "fullName": data.fullName
            })
                .then((response) => {
                    if (response.status === 200) {
                        messageApi.open({
                            type: 'success', content: 'Resister in successfully!', duration: 1.5, onClose: () => {
                                navigate("/auth/login");
                            }
                        });
                    } else {
                        console.log("Error posting data!")
                    }
                })
                .catch((error) => {
                    messageApi.open({
                        type: 'error', content: `Resister error, please try again! ${error}`, duration: 2
                    });
                });
        } else {
            setCheckPassword(true);
        }
    };
    const schema = yup
        .object({
            email: yup
                .string()
                .required("Please enter a email")
                .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email without accents")
                .min(6, "Enter more than 6 characters")
                .trim(), fullName: yup
                .string()
                .required("Please enter a full name")
                .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/, "full name without accents")
                .min(3, "Enter more than 3 characters")
                .trim(), password: yup
                .string()
                .required("Please enter a password")
                .matches(/^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/, "Password without accents")
                .min(6, "Enter more than 6 characters")
                .trim(), ConfirmPassword: yup
                .string()
                .required("Please enter a confirm password")
                .matches(/^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/, "Password without accents")
                .min(6, "Enter more than 6 characters")
                .trim(),
        })
        .required();
    const {
        handleSubmit, formState: {errors}, register,
    } = useForm({mode: "all", resolver: yupResolver(schema)});

    return (<Container>
        <Box sx={{
            width: "100%", height: "100%", display: "flex", flexDirection: "column", rowGap: "46px",
        }}>
            <Box sx={{
                width: "100%", height: "100%", display: "flex", flexDirection: "column",
            }}>
                <Typography sx={{
                    color: "#000", fontSize: "40px", fontWeight: "600",
                }}>Sign Up</Typography>
                <Typography sx={{
                    color: "#000", fontSize: "25px", fontWeight: "400",
                }}>to get started</Typography>
            </Box>
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{
                        display: "flex", flexDirection: "column", height: "100%",
                    }}>
                        <Box sx={{
                            display: "flex", flexDirection: "column", rowGap: "12px",
                        }}>
                            <FormControl error={!!errors.email} sx={{position: "relative"}}>
                                <InputLabel htmlFor="input-email">Email</InputLabel>
                                <OutlinedInput
                                    sx={{
                                        paddingRight: "32px",
                                    }}
                                    id="input-email"
                                    label="email"
                                    type="text"
                                    {...register("email")}
                                    name="email"
                                />
                                <FormHelperText sx={{color: "red", height: "20px"}}
                                                id="component-error-text">{errors.email && errors.email.message}</FormHelperText>
                            </FormControl>
                            <FormControl error={!!errors.fullName} sx={{position: "relative"}}>
                                <InputLabel htmlFor="input-fullName">Full name</InputLabel>
                                <OutlinedInput
                                    sx={{
                                        paddingRight: "32px",
                                    }}
                                    id="input-fullName"
                                    label="fullName"
                                    type="text"
                                    {...register("fullName")}
                                    name="fullName"
                                />
                                <FormHelperText sx={{color: "red", height: "20px"}}
                                                id="component-error-text">{errors.fullName && errors.fullName.message}</FormHelperText>
                            </FormControl>
                            <FormControl error={!!errors.password || checkPassword} sx={{position: "relative"}}>
                                <InputLabel htmlFor="input-password">Password</InputLabel>
                                <OutlinedInput
                                    sx={{
                                        paddingRight: "32px",
                                    }}
                                    type={showPassword ? 'text' : "password"}
                                    id="input-password"
                                    label="password"
                                    {...register("password")}
                                    name="password"
                                />
                                <FormHelperText sx={{color: "red", height: "20px"}}
                                                id="component-error-text">{errors.password && errors.password.message}</FormHelperText>
                                <Box sx={{
                                    position: "absolute", top: "40%", right: "15px", transform: "translateY(-50%)",
                                }} onClick={toggleShowPassword}>{showPassword ? <VisibilityIcon/> :
                                    < VisibilityOffIcon/>}</Box>
                            </FormControl>
                            <FormControl error={!!errors.ConfirmPassword || checkPassword} sx={{position: "relative"}}>
                                <InputLabel htmlFor="input-confirm-password">ConfirmPassword</InputLabel>
                                <OutlinedInput
                                    sx={{
                                        paddingRight: "32px",
                                    }}
                                    type={showConfirmPassword ? 'text' : "password"}
                                    id="input-confirm-password"
                                    label="ConfirmPassword"
                                    {...register("ConfirmPassword")}
                                    name="ConfirmPassword"
                                />
                                <FormHelperText sx={{color: "red", height: "20px"}}
                                                id="component-error-text">{errors.ConfirmPassword ? errors.ConfirmPassword.message : checkPassword && 'Do not match password'}</FormHelperText>
                                <Box sx={{
                                    position: "absolute", top: "40%", right: "15px", transform: "translateY(-50%)",
                                }} onClick={toggleShowConfirmPassword}>{showConfirmPassword ? <VisibilityIcon/> :
                                    < VisibilityOffIcon/>}</Box>
                            </FormControl>
                        </Box>
                        <Link
                            component="button"
                            variant="body2"
                            href="/forgot-password"
                            sx={{
                                textDecoration: "none", color: "#000", textAlign: "left", marginBottom: "40px",
                            }}
                        >
                            Forgot password?
                        </Link>
                        <Button type="submit" sx={{padding: "14px"}} variant="contained" size="large">Resister</Button>
                        <Typography sx={{color: "#000", textAlign: "center", marginTop: "20px"}}> Already
                            registered? <Link
                                href="/auth/login">Sign in</Link></Typography>
                    </Box>
                </form>
            </Box>
            {contextHolder}
        </Box>
    </Container>)
}
export default SignUp
