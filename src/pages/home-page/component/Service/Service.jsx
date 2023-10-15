import {Box, Container} from "@mui/material";
import CardItem from "./CardItem.jsx";
import SERVICE_VALUE from "../../../../constant/SERVICE_VALUE.js";

const Service = () => {
  return (
    <Container>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
      }}>
        {SERVICE_VALUE.map((value, index) => <CardItem key={index} src={value.src} content={value.content} href={value.href}/>)}
      </Box>
    </Container>
  )
}
export default Service
