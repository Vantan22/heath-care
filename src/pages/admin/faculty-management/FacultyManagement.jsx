import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import HTTP from "../../../../axios-config.js";
import {Button, TextField} from "@mui/material";

const FacultyManagement = () => {
  const [facultys, setFacultys] = useState([])
  const [isAddFaculty, setIsAddFaculty] = useState(false)
  const [newValue, setNewValue] = useState("")
  const getData = async () => {
    const data = await HTTP.get('https://truculent-kick-production.up.railway.app/api/specialization/getAll')
    setFacultys(data)
  }
  useEffect(() => {
    getData()
  }, [isAddFaculty]);
  const handleChangeValue = (e) => {
    setNewValue(e.target.value)
  }
  const toggleButton = () => {
    setIsAddFaculty(!isAddFaculty)
  }
  const handleSubmit = async () => {
    const checkValue = facultys.find((value) => value.specName === newValue.trim())
    if (newValue.trim() && !checkValue) {
      await HTTP.post("https://truculent-kick-production.up.railway.app/api/specialization/create", {
        "specName": newValue.trim()
      }).then(() => {
        setIsAddFaculty(!isAddFaculty)
      })
    }
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      rowGap: "10px"
    }}>
      <Paper sx={{
        width: '100%',
        overflow: 'hidden'
      }}>
        <TableContainer component={Paper} sx={{height: 440}}>
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
              {facultys.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
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
      <hr/>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          columnGap: "100px"
        }}
      >
        <Box sx={{
          width: "100%"
        }}>
          {isAddFaculty && (<TextField sx={{
            height: "50px"
          }} id="outlined-basic" label="Faculty name" variant="outlined" fullWidth
                                       onChange={handleChangeValue}/>)}
        </Box>
        {isAddFaculty ? (<Button sx={{
          minWidth: "200px",
          height: "50px",
          alignItems: "left"
        }} variant="contained" size="medium"  onClick={handleSubmit}>Confirm</Button>) : (
          <Button sx={{
            minWidth: "200px",
            height: "50px",
            alignItems: "left"
          }} variant="contained" size="medium"
                  onClick={toggleButton}>Add new Faculty</Button>)}

      </Box>
    </Box>
  )
}
export default FacultyManagement
