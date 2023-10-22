import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#fa965c",
                marginTop: '30px',
                height:"fit-height",
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{
                            color :"white",
                            fontSize :"25px",
                            textTransform :"uppercase"
                        }} gutterBottom>
                           Health Care
                        </Typography>
                        <Typography variant="body2" sx={{
                            color :"#383838",
                            fontSize :"18px",
                        }}>
                            Bệnh viện được đánh giá là một trong những địa chỉ khám, chữa bệnh uy tín, có chất lượng dịch vụ cao.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{
                            color :"white",
                            fontSize :"24px",
                        }} gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" sx={{
                            color :"#383838",
                            fontSize :"16px",
                        }}>
                            Cau Giay, Ha Noi, Viet Nam
                        </Typography>
                        <Typography variant="body2" sx={{
                            color :"#383838",
                            fontSize :"16px",
                        }}>
                            Email: linhdqth2108046@fpt.edu.vn
                        </Typography>
                        <Typography variant="body2"sx={{
                            color :"#383838",
                            fontSize :"16px",
                        }}>
                            Phone: 099.999.9999
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{
                            color :"white",
                            fontSize :"24px",
                        }} gutterBottom>
                            Follow Us
                        </Typography>
                        <Link href="https://www.facebook.com/" color="inherit">
                            <Facebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            color="inherit"
                            sx={{ pl: 1, pr: 1 }}
                        >
                            <Instagram />
                        </Link>
                        <Link href="https://www.twitter.com/" color="inherit">
                            <Twitter />
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="https://your-website.com/">
                            Heath Care
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
