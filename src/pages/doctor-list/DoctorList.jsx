import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import HTTP from "../../../axios-config.js";
import { convertAppointmentTime, convertTimeAndDate } from "../../constant/convert-time.js";
import Header from "../../component/header/Header.jsx";
import { Container, Typography } from "@mui/material";
import StickyHeadTable from "../../component/BaseTable.jsx";
import Footer from "../../component/Footer/Footer.jsx";
import { getValueAPI } from "../../../api-service.js";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";


const columns = [{
    id: 'fullName',
    label: 'Name',
    minWidth: 120
}, {
    id: 'email',
    label: 'Email',
    minWidth: 150
}, {
    id: 'phoneNumber',
    label: 'phoneNumber',
    minWidth: 80
}, {
    id: 'roleNames',
    label: 'Role name',
    minWidth: 130,
}, {
    id: 'age',
    label: 'age',
    minWidth: 50,
}, {
    id: 'gender',
    label: 'gender',
    minWidth: 80,
}, {
    id: 'dateOfBirth',
    label: 'dateOfBirth',
    minWidth: 50,
}, {
    id: 'height',
    label: 'height',
    minWidth: 50,
}, {
    id: 'weight',
    label: 'weight',
    minWidth: 50,
}, {
    id: 'address',
    label: 'address',
    minWidth: 200,
},];
const DoctorList = () => {
    const [pecialization, setSecialization] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([])
    const getData = async () => {
        const specializations = getValueAPI("/api/specialization/getAll")
        const users = getValueAPI("/api/user/getAll")
        const [specializationValues, userValues] = await Promise.all([specializations, users])
        setSecialization( specializationValues)
        setUsers(userValues.filter((item) => item.roleNames.includes("ROLE_DOCTOR")))
    }
    useEffect(() => {
        getData()
        return getData;
    }, []);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleGetId = () => {
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
                    <Typography>Danh sách bác sĩ theo khoa</Typography>
                    <Box sx={{
                        height: "1px",
                        width: "100%",
                        backgroundColor: "#000",
                    }}/>
                    <Paper sx={{
                        width: '100%',
                        overflow: 'hidden'
                    }}>
                        <TableContainer component={Paper} sx={{ height: 440 }}>
                            <Table sx={{
                                minWidth: 200,
                                color: "black"
                            }} stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{
                                            color: "white",
                                            background: "#383838",
                                            fontSize: "18px"
                                        }}>Faculty name</TableCell>
                                        <TableCell sx={{
                                            color: "white",
                                            background: "#383838",
                                            fontSize: "18px"
                                        }} align="right">ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pecialization.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.specName}
                                            </TableCell>
                                            <TableCell align="right">{row.id}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Box sx={{
                        height: "1px",
                        width: "100%",
                        backgroundColor: "#000",
                        margin: "40px 0"
                    }}/>
                </Box>
                <Paper sx={{
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead sx={{ backgroundColor: "#363432" }}>
                                <TableRow>
                                    {columns.map((column, index) => (<TableCell
                                        key={index}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            backgroundColor: "#363432",
                                            color:"#fff"
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (<TableRow hover role="checkbox" tabIndex={-1} key={index}
                                                          onClick={() => handleGetId(row.id, row.roleNames, row.fullName)}>
                                            {columns.map((column, index) => {
                                                const value = row[column.id];
                                                return (<TableCell key={index} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>);
                                            })}
                                        </TableRow>);
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </Box>
        <Footer/>
    </Box>)
}
export default DoctorList
