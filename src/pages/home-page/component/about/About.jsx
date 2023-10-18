import {Box, Container, Typography} from "@mui/material";
import CO_SO from "/src/assets/images/about/co-so.png"
import TRANG_THIET_BI from "/src/assets/images/about/trang-thiet-bi.png"
const About = () => {
  return (
    <Box sx={{
      width: "100%",
      height: "480px",
      backgroundColor: "#dcebf8",
    }}>
      <Container>
        <Box sx={{
          display: "flex",
          padding: "70px 0",

        }}>
          <Box sx={{
            width: "565px",
          }}>
            <Typography sx={{
              width: "565px",
              color: "#4054b2",
              fontSize: "34px",
              fontWeight: "700",
              lineHeight: "34px",
              paddingBottom: "30px",
            }}>HEALTH CARE HÀ NỘI</Typography>
            <Typography sx={{
              color: "#333333",
              fontSize: "18px",
              lineHeight: "28px",
            }}>Nằm giữa trung tâm Thủ đô Hà Nội, HEALTH CARE HÀ NỘI chính thức đi vào hoạt động từ tháng 11/2010. Sau
              hơn 1 thập kỷ hình thành và phát triển, Bệnh viện được đánh giá là một trong những địa chỉ khám, chữa bệnh
              uy tín, có chất lượng dịch vụ cao. <br/>
              Mỗi ngày Bệnh viện tiếp nhận hàng trăm lượt bệnh nhân trên cả nước đến thăm khám và điều trị. 100% khách
              hàng đều tin tưởng và hài lòng.</Typography>
          </Box>
          <Box sx={{
            display: "flex",
          }}>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "30px",
              width: "272px",
              height: "272px",
            }}>
              <Typography sx={{
                color: "#4054b2",
                fontSize: "18px",
                fontWeight: "700",
                lineHeight: "18px",
                textTransform: "uppercase",
              }}>Hệ thống cơ sở vật chất hiện đại</Typography>
              <img src={CO_SO} alt="#"/>
            </Box>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "30px",
              width: "272px",
              height: "272px",
            }}>
              <img src={TRANG_THIET_BI} alt="#"/>
              <Typography sx={{
                color: "#4054b2",
                fontSize: "18px",
                fontWeight: "700",
                lineHeight: "18px",
                textTransform: "uppercase",
              }}>Trang thiết bị tối tân hàng đầu</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
export default About
