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
import {useNavigate} from "react-router-dom";
import {  message } from 'antd';
import axios from "axios";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post("https://truculent-kick-production.up.railway.app/api/auth/login", data)
      .then((response) => {
        if (response.status === 200) {
          messageApi.open({
            type: 'success',
            content: 'Logged in successfully!',
            duration: 1.5,
            onClose: () => {
              localStorage.setItem('username',response.data.username)
              localStorage.setItem('id',response.data.id)
              localStorage.setItem('fullName',response.data.fullName)
              navigate("/");
            }
          });
        } else {
          messageApi.open({
            type: 'error',
            content: `${response.data}`,
            duration: 1.5
          });
        }
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: "Sai email hoặc mật khẩu!",
          duration: 2
        });
      });
  };
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Please enter a email")
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email without accents")
        .min(6, "Enter more than 6 characters")
        .trim(),
      password: yup
        .string()
        .required("Please enter a password")
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
          width: "100%", height: "auto", display: "flex", flexDirection: "column",
        }}>
          <Typography sx={{
            color: "#000", fontSize: "40px", fontWeight: "600",
          }}>Login</Typography>
          <Typography sx={{
            color: "#000", fontSize: "25px", fontWeight: "400",
          }}>to get started</Typography>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
              display: "flex", flexDirection: "column",
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
                    type="email"
                    {...register("email")}
                    name="email"
                  />
                 <FormHelperText sx={{color: "red", height:"20px"}} id="component-error-text">{errors.email && errors.email.message}</FormHelperText>
                </FormControl>
                <FormControl error={!!errors.password} sx={{position: "relative"}}>
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
                  <FormHelperText sx={{color: "red", height:"20px"}} id="component-error-text">{errors.password && errors.password.message}</FormHelperText>
                  <Box sx={{
                    position: "absolute", top: "40%", right: "15px", transform: "translateY(-50%)",
                  }} onClick={toggleShowPassword}>{showPassword ? <VisibilityIcon/> : < VisibilityOffIcon/>}</Box>
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
              <Button type="submit" sx={{padding: "14px"}} variant="contained" size="large">Login</Button>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Typography sx={{color: "#000", textAlign: "center", marginTop: "20px"}}>Don't have an account? <Link
                href="/auth/register">Sign up</Link></Typography>
            </Box>
          </form>
        </Box>
        {contextHolder}
      </Box>
    </Container>)
}
export default SignIn
