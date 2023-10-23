import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import Header from "../../../component/header/Header.jsx";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Footer from "../../../component/Footer/Footer.jsx";

const CreateMedicalRecords = () => {
  const checkLogin = localStorage.getItem('id')
  if (!checkLogin) {
    window.location.href = "/auth/login"
  }
  const [openFindEmail, setOpenFindEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [valueParent, setValueParent] = useState({});


  useEffect(() => {
    // Gọi API khi component được mount lần đầu
    axios
      .get("https://truculent-kick-production.up.railway.app/api/doctor/getDoctorByUserId/userId/10")
      .then((response) => {
        console.log('getDoctorByUserId:', response)
      })
      .catch((error) => console.error(error));
  }, []);

  const convertDate = (value) => {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (`${day}/${month}/${year}`);

  }
  const doctorId = localStorage.getItem('id')
  const onSubmit = (value) => {
    axios.post("https://truculent-kick-production.up.railway.app/api/medicalRecord/create", {
      "patientId": valueParent.id,
      "doctorId": doctorId,
      "phoneNumber": valueParent.phoneNumber,
      medicalHistory: "",
      testResult: {
        data: [value],
      },
      medicationDetails: [rows], ...value
    })
  };

  const {
    handleSubmit, register,
  } = useForm({mode: "all"});


  function EditToolbar(props) {
    // eslint-disable-next-line react/prop-types
    const {setRows, setRowModesModel} = props;

    const handleClick = () => {
      const id = Math.random().toString(36).substring(2);
      setRows((oldRows) => [...oldRows, {id: id, isNew: true}]);
      setRowModesModel((oldModel) => ({
        ...oldModel, [id]: {mode: GridRowModes.Edit, fieldToFocus: 'tenThuoc'},
      }));
    };

    return (<GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>);
  }

  const handleClickOpenFindEmail = () => {
    setOpenFindEmail(true);
  }
  const handleCloseFindEmail = () => {
    setOpenFindEmail(false);
  }
  const handleGetEmail = (value) => {
    axios
      .get(`https://truculent-kick-production.up.railway.app/api/patients/email?email=${email}`)
      .then((response) => {
        setValueParent(response.data);
      })
      .catch((error) => console.error(error));
    console.log(email)
    setOpenFindEmail(false);
  }
  const initialRows = [{
    id: 1, tenThuoc: "thuốc A", tanSuat: '2 ngày', thoiGian: '1 Năm'
  }];
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel, [id]: {mode: GridRowModes.View, ignoreModifications: true},
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    console.log('newRow', newRow)
    const updatedRow = {...newRow, isNew: false};
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [{field: 'tenThuoc', headerName: 'Tên Thuốc', width: 300, editable: true}, {
    field: 'tanSuat', headerName: 'Tần xuất sử dụng', width: 300, align: 'left', headerAlign: 'left', editable: true,
  }, {
    field: 'thoiGian', headerName: 'Thời gian sử dụng', width: 300, editable: true,
  }, {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({id}) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [<GridActionsCellItem
          icon={<SaveIcon/>}
          label="Save"
          sx={{
            color: 'primary.main',
          }}
          onClick={handleSaveClick(id)}
        />, <GridActionsCellItem
          icon={<CancelIcon/>}
          label="Cancel"
          className="textPrimary"
          onClick={handleCancelClick(id)}
          color="inherit"
        />,];
      }

      return [<GridActionsCellItem
        icon={<EditIcon/>}
        label="Edit"
        className="textPrimary"
        onClick={handleEditClick(id)}
        color="inherit"
      />, <GridActionsCellItem
        icon={<DeleteIcon/>}
        label="Delete"
        onClick={handleDeleteClick(id)}
        color="inherit"
      />,];
    },
  },];
  return (<Box>
    <Header/>
    <Box sx={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px",
    }}>
      <Typography sx={{
        color: "#26577C", fontSize: "40px", fontWeight: "600", textTransform: "uppercase",
      }}>
        tạo hồ sơ bệnh án cho bệnh nhân
      </Typography>
      <Typography sx={{
        textTransform: "uppercase", color: "#26577C", fontSize: "25px", fontWeight: "400",
      }}>
        Create medical records for patients
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
            marginBottom: "20px",
          }}>Tạo hồ sơ bệnh án cho bệnh nhân</Typography>
          <Box>
            <Typography sx={{
              padding: "0 0 10px 30px",
              fontSize: "18px",
              width: "100%",
              height: "30px",
              backgroundColor: "#ffa06c",
              color: "#fff",
              borderTopRightRadius: "5px",
              borderTopLeftRadius: "5px",
            }}>1 .Thông tin bệnh nhân</Typography>
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", justifyContent: "space-between",
            }}>
              <Button variant="outlined" onClick={handleClickOpenFindEmail}>
                Search for patients
              </Button>
              <Dialog open={openFindEmail} onClose={handleCloseFindEmail}>
                <DialogTitle>Enter patient email</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To search for patient information, please enter the patient's email here.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseFindEmail}>Cancel</Button>
                  <Button onClick={handleGetEmail}>Confirm</Button>
                </DialogActions>
              </Dialog>
            </Box>
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", justifyContent: "space-between",
            }}>
              <Box sx={{
                width: "45%"
              }}>
                <Typography>Full name
                  : {valueParent.fullName ? valueParent.fullName : ""}</Typography>
              </Box>
              <Box sx={{
                width: "45%"
              }}>
                <Typography>Date of birth
                  : {valueParent.dateOfBirth ? convertDate(valueParent.dateOfBirth) : ""}</Typography>
              </Box>
            </Box>
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", justifyContent: "space-between",
            }}>
              <Box sx={{
                width: "45%"
              }}>
                <Typography>Gender : {valueParent.geder ? valueParent.geder : ""}</Typography>
              </Box>
              <Box sx={{
                width: "45%"
              }}>
                <Typography>image : {valueParent.image ? valueParent.image : ""}</Typography>
              </Box>
            </Box>
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", justifyContent: "space-between",
            }}>
              <Box sx={{
                width: "45%"
              }}>
                <Typography>Height : {valueParent.height ? `${valueParent.height} cm` : ""}</Typography>
              </Box>
              <Box sx={{
                width: "45%"
              }}>
                <Typography>Weight : {valueParent.weight ? `${valueParent.weight} kg` : ""}</Typography>
              </Box>
            </Box>
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", justifyContent: "space-between",
            }}>
              <Box sx={{
                width: "45%"
              }}>
                <Typography>Email : {valueParent.email ? valueParent.email : ""}</Typography>
              </Box>
              <Box sx={{
                width: "45%"
              }}>
                <Typography>Phone number
                  : {valueParent.phoneNumber ? valueParent.phoneNumber : ""}</Typography>
              </Box>
            </Box>
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", justifyContent: "space-between",
            }}>
              <Box sx={{
                width: "45%"
              }}>
                <Typography>Address : {valueParent.address ? valueParent.address : ""}</Typography>
              </Box>
              <Box sx={{
                width: "45%"
              }}>
                <Typography>Seclect Files</Typography>
                <input type="file" multiple {...register("files")}/>
              </Box>
            </Box>
            <Typography sx={{
              padding: "0 0 10px 30px",
              fontSize: "18px",
              width: "100%",
              height: "30px",
              backgroundColor: "#ffa06c",
              color: "#fff",
              borderTopRightRadius: "5px",
              borderTopLeftRadius: "5px",
            }}>2. Test result</Typography>

            {/**/}
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", flexDirection: "column", rowGap: "10px",
            }}>
              <Typography> Xét nghiệm hoá sinh :</Typography>
              <OutlinedInput name="biochemicalTests" {...register("biochemicalTests")} multiline
                             rows={4}/>
            </Box>
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", flexDirection: "column", rowGap: "10px",
            }}>
              <Typography> Chuẩn đoán hình ảnh :</Typography>
              <OutlinedInput name="imageAnalysation" {...register("imageAnalysation")} multiline
                             rows={4}/>
            </Box>
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", flexDirection: "column", rowGap: "10px",
            }}>
              <Typography> Current condition :</Typography>
              <OutlinedInput name="currentCondition" {...register("currentCondition")} multiline
                             rows={4}/>
            </Box>
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", flexDirection: "column", rowGap: "10px",
            }}>
              <Typography> Disease progression :</Typography>
              <OutlinedInput name="diseaseProgression" {...register("diseaseProgression")} multiline
                             rows={4}/>
            </Box>
            <Box sx={{
              width: "100%", padding: "10px 20px", display: "flex", flexDirection: "column", rowGap: "10px",
            }}>
              <Typography> Notes from doctor :</Typography>
              <OutlinedInput name="notesFromDoctor" {...register("notesFromDoctor")} multiline
                             rows={4}/>
            </Box>
            <Box sx={{}}>
              <Box
                sx={{
                  height: 500, width: '100%', '& .actions': {
                    color: 'text.secondary',
                  }, '& .textPrimary': {
                    color: 'text.primary',
                  },
                }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  editMode="row"
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  slots={{
                    toolbar: EditToolbar,
                  }}
                  slotProps={{
                    toolbar: {setRows, setRowModesModel},
                  }}
                />
              </Box>
            </Box>
            <Box sx={{
              width: "100%", display: "flex", justifyContent: "flex-end",
            }}>
              <Button type="submit" sx={{
                padding: "14px", margin: "10px 20px 20px 20px", width: "300px", backgroundColor: "#f8792e",
              }} variant="contained" size="large">Đăng ký</Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Container>
    <Box sx={{
      height: "40px",
    }}></Box>
    <Footer/>
  </Box>)
}
export default CreateMedicalRecords
