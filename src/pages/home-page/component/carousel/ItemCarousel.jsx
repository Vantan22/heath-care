import {Box} from "@mui/material";

function Item(props) {
  return (
    <Box sx={{
      width: "100%",
      height: "450px",
      maxHeight:"550px"
    }}>
      <img style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }} src={props.item.src} alt={props.item.alt}/>
    </Box>
  )
}

export default Item
