import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Header from "../../component/header/Header.jsx";
import { Container, Typography } from "@mui/material";
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
    } ];
const DoctorList = () => {
    const [ pecialization, setSecialization ] = useState([])
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ users, setUsers ] = useState([])
    const getData = async () => {
        const specializations = await getValueAPI("/api/specialization/getAll")
        setSecialization(specializations)
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
    const handleGetId = async (id) => {
        const data = await getValueAPI(`/api/doctor/getBySpecId/${ id }`)
        setUsers(data)
    }
    return (<Box sx={ {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    } }>
        <Box sx={{
            height: "80px",
        }}><Header/></Box>
        <Box sx={ {
            flex: "1 1 0",
        } }>
            <Container>
                <Box sx={ {
                    marginTop: "20px",
                } }>
                    <Box sx={ {
                        height: "1px",
                        width: "100%",
                        backgroundColor: "#000",
                    } }/>
                    <Paper sx={ {
                        width: '100%',
                        overflow: 'hidden'
                    } }>
                        <TableContainer component={ Paper } sx={ { height: 440 } }>
                            <Table sx={ {
                                minWidth: 200,
                                color: "black"
                            } } stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={ {
                                            color: "white",
                                            background: "#383838",
                                            fontSize: "18px"
                                        } }>Faculty name</TableCell>
                                        <TableCell sx={ {
                                            color: "white",
                                            background: "#383838",
                                            fontSize: "18px"
                                        } } align="right">ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { pecialization.map((row) => (
                                        <TableRow
                                            key={ row.id }
                                            sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
                                            onClick={ () => handleGetId(row.id) }
                                        >
                                            <TableCell component="th" scope="row">
                                                { row.specName }
                                            </TableCell>
                                            <TableCell align="right">{ row.id }</TableCell>
                                        </TableRow>
                                    )) }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Box sx={ {
                        height: "1px",
                        width: "100%",
                        backgroundColor: "#000",
                        margin: "40px 0"
                    } }/>
                </Box>
                <Paper sx={ {
                    width: '100%',
                    overflow: 'hidden'
                } }>
                    <TableContainer sx={ { maxHeight: 440 } }>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead sx={ { backgroundColor: "#363432" } }>
                                <TableRow>
                                    { columns.map((column, index) => (<TableCell
                                        key={ index }
                                        align={ column.align }
                                        style={ {
                                            minWidth: column.minWidth,
                                            backgroundColor: "#363432",
                                            color: "#fff"
                                        } }
                                    >
                                        { column.label }
                                    </TableCell>)) }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { users
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (<TableRow hover role="checkbox" tabIndex={ -1 } key={ index }>
                                            { columns.map((column, index) => {
                                                const value = row[column.id];
                                                return (<TableCell key={ index } align={ column.align }>
                                                    { column.format && typeof value === 'number' ? column.format(value) : value }
                                                </TableCell>);
                                            }) }
                                        </TableRow>);
                                    }) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={ [ 10, 25, 100 ] }
                        component="div"
                        count={ users.length }
                        rowsPerPage={ rowsPerPage }
                        page={ page }
                        onPageChange={ handleChangePage }
                        onRowsPerPageChange={ handleChangeRowsPerPage }
                    />
                </Paper>
            </Container>
        </Box>
        <Footer/>
    </Box>)
}
export default DoctorList
