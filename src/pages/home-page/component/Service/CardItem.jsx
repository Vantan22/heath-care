import {Box, Link} from "@mui/material";

const CardItem = ({src, content, href}) => {
  return (
    <Box sx={{
      height: "250px",
      width: "200px",
      display: "flex",
      alignContent: "justifyContent",
      flexDirection: "column",
    }}>
      <Link sx={{
        textDecoration: "none",
        height: "200px",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "2px solid #E55604",
        padding: "30px",
        "&:hover": {
          animationDuration: "0.25s",
          boxShadow: "0 14px 28px rgba(0,0,0,0.05), 0 10px 10px rgba(0,0,0,0.02)",
          transform: "scale(1.005)",
          transition: "all 0.3s linear",
        }
      }} href={href}>
        <img style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }} src={src} alt={content}/>
      </Link>
      <Box sx={{
        height: "50px",
        width: "100%",
        textAlign: "center",
        color: "#252525",
        fontWeight: "500",
        fontSize: "18px",
        marginTop: "10px",
      }}>{content}</Box>
    </Box>
  )
}
export default CardItem
