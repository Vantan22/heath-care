import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Header from "../../component/header/Header.jsx";
import {Container, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import Footer from "../../component/Footer/Footer.jsx";
import {getValueAPI} from "../../../api-service.js";


const columns = [
    {
        id: 'fullName',
        label: 'Name',
        minWidth: 120
    },
    {
        id: 'phoneNumber',
        label: 'Phone number',
        minWidth: 80
    },
    {
        id: 'age',
        label: 'Age',
        minWidth: 50,
    },
    {
        id: 'gender',
        label: 'Gender',
        minWidth: 80,
    },
    {
        id: 'specName',
        label: 'Spec name',
        minWidth: 200,
    }];
const DoctorList = () => {
    const [pecialization, setSecialization] = useState([])
    const [percializationChoose, setPercializationChoose] = useState("")
    const [listDoctors, setListDoctors] = useState([])
    const [currentDoctor, setCurrentDoctor] = useState(null)
    const getData = async () => {
        const specializations = await getValueAPI("/api/specialization/getAll")
        setSecialization(specializations)
    }
    useEffect(() => {
        getData()
        return getData;
    }, []);
    const handleChangePecialization = async (event) => {
        const data = await getValueAPI(`/api/doctor/getBySpecId/${event.target.value}`)
        setListDoctors(data)
        console.log('data', data)
        setPercializationChoose(event.target.value)
    };


    const handleChooseDoctor = async (e) => {
        const findDoctor = listDoctors.find(doctor => doctor.id === e.target.value)
        setCurrentDoctor(findDoctor)
    }
    return (<Box sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    }}>
        <Box sx={{
            height: "80px",
        }}><Header/></Box>
        <Box sx={{
            flex: "1 1 0",
        }}>
            <Container>
                <Box sx={{
                    width: "100%",
                    padding: "10px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <FormControl sx={{width: "45%"}}>
                        <InputLabel id="demo-simple-select-label">Faculty list</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Danh Sách Khoa"
                            defaultValue=""
                            name="departmentId"
                            onChange={handleChangePecialization}
                        >
                            {pecialization.map((value) => <MenuItem key={value.id}
                                                                    value={value.id}>{value.specName}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl sx={{width: "45%"}}>
                        <InputLabel id="demo-simple-select-label">Specialized doctor</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="specialized doctor"
                            name="id"
                            defaultValue=""
                            onChange={handleChooseDoctor}
                        >
                            {listDoctors.map((value) => <MenuItem key={value.id}
                                                                  value={value.id}>{value.fullName}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                <hr/>
                {currentDoctor && (
                    <Box sx={{
                        height: "500px",
                        width: "100%",
                        display: "flex",
                        columnGap: "10px",
                        borderRadius: "10px",
                        border: "1px solid #000",
                        marginTop: "20px",
                    }}>
                        <Box sx={{
                            height: "calc(100% - 40px)",
                            width: "400px",
                            backgroundColor: "#e8e8e8",
                            margin: "20px 10px 20px 20px",
                            borderRadius: "10px",
                        }}>
                            <img style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "none"
                            }}
                                 src={currentDoctor.image?currentDoctor.image : "https://img.freepik.com/free-vector/hand-drawn-doctor-answer-questions-clipart-gesture-character_40876-3115.jpg?w=1060&t=st=1698716461~exp=1698717061~hmac=92991017ec73bb3dab924043df24e9c930947a55cb9fc48ffa6a677ec5f0d116"}
                                 alt="avatar-doctor"></img>
                        </Box>
                        <Box sx={{
                            height: "calc(100% - 40px)",
                            width: "calc(100% - 400px)",
                            // backgroundColor: "#fff9f4",
                            margin: "20px 20px 20px 10px",
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                        }}>
                            <Box sx={{
                                display: "flex",
                                columnGap: "10px",
                                margin: "10px 20px",
                                height: "40px",
                            }}>
                                <Typography sx={{
                                    width: "48%",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}>Full name: {currentDoctor.fullName}</Typography>
                                <Typography sx={{
                                    width: "48%",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}>Phone: {currentDoctor.phoneNumber}</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                columnGap: "10px",
                                margin: "10px 20px",
                                height: "40px",
                            }}>
                                <Typography sx={{
                                    width: "48%",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}>Gender:</Typography>
                                <Typography sx={{
                                    width: "48%",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}>Age: {currentDoctor.age}</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                columnGap: "10px",
                                margin: "10px 20px",
                                height: "40px",
                            }}>
                                <Typography sx={{
                                    width: "100%",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}>Spec name: {currentDoctor.specName}</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                columnGap: "10px",
                                margin: "10px 20px",
                                height: "40px",
                            }}>
                                <Typography sx={{
                                    width: "100%",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}>Work experience: {currentDoctor.workExperience}</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                columnGap: "10px",
                                margin: "10px 20px",
                                height: "40px",
                            }}>
                                <Typography sx={{
                                    width: "100%",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}>Graduate at: {currentDoctor.graduateAt}</Typography>
                            </Box>
                        </Box>
                    </Box>)}
            </Container>
        </Box>
        <Footer/>
    </Box>)
}
export default DoctorList
