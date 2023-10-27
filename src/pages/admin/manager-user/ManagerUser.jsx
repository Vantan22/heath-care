import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import HTTP from "../../../../axios-config.js";
import { Button, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


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
const ManagerUser = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([])
    const [faculties, setFacultys] = useState([])
    const [departmentId, setDepartmentId] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [isDisibled, setIsDisabled] = useState(false);
    const [isRole, setIsRole] = useState(false)
    const getUsers = async () => {
        const data = await HTTP.get('https://truculent-kick-production.up.railway.app/api/user/getAll')
        console.log("data", data)
        setUsers(data)
    }
    const getAllFaculty = async () => {
        const data = await HTTP.get('https://truculent-kick-production.up.railway.app/api/specialization/getAll')
        setFacultys(data)
    }
    useEffect(() => {
        getAllFaculty()
        getUsers()
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleGetId = (id, roleNames, fullName) => {
        const find = roleNames.find((role) => role === "ROLE_DOCTOR")
        setIsRole(find)
        const roleResult = roleNames.join(",")
        console.log("id", id)
        setCurrentUser({
            id: id,
            roleNames: roleResult,
            fullName: fullName
        })
    }
    const handleChangeDepartment = (event) => {
        if (event.target.value !== 0 && !isRole) {
            setIsDisabled(true)
            setDepartmentId(event.target.value);
        }
    }
    const handleChangeRole = async () => {
        await HTTP.post('https://truculent-kick-production.up.railway.app/admin/updateUserToDoctor', {
            "userId": currentUser.id,
            "specld": departmentId
        })
    }
    return (
        <Container>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
                width: "calc(100vw - 200px)",
            }}>
                <Box>
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
                </Box>
                <hr />
                <Box sx={{
                    border: "1px solid #c9c9c9",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}>
                    <Box sx={{
                        fontSize: "20px",
                        height: "40px",
                        width: "100%",
                        background: "#363432",
                        borderRadius: "10px 10px 0px 0px",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "20px",
                        color: "white",
                    }}>Change Role Doctor</Box>
                    <Box sx={{
                        display: "flex",
                        width: "100%",
                        columnGap: "30px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 20px",
                    }}>
                        <Box sx={{
                            width: "25%",
                        }}>User Name : {currentUser?.fullName}</Box>
                        <Box sx={{ width: "25%" }}>
                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel id="demo-simple-select-label">Faculty list</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Danh Sách Khoa"
                                    defaultValue=""
                                    name="departmentId"
                                    onChange={handleChangeDepartment}
                                >
                                    {faculties.map((value) => <MenuItem key={value.id}
                                        value={value.id}>{value.specName}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{
                            width: "25%",
                        }}>Role : {currentUser?.roleNames}</Box>
                        <Button sx={{
                            minWidth: "200px",
                            height: "50px",
                            alignItems: "left",
                            backgroundColor: "#363432",
                        }} variant="contained" size="medium" onClick={handleChangeRole} disabled={!isDisibled}
                        >Add new Faculty</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
export default ManagerUser
