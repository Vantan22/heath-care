import {Box, Container, Grid, List, ListItem, ListItemText, Paper, Typography} from '@mui/material';
import Header from '../../component/header/Header';
import Footer from '../../component/footer/Footer';

const About = () => {
    return (
        <Box sx={
            {
                display: "flex",
                flexDirection: "column",
                height: "100vh",
            }
        }>
            <Header/>
            <Container maxWidth="md" sx={{
                flex: "1 1 0"
            }}>
                <Paper elevation={3} style={{padding: '20px', marginTop: '20px'}}>
                    <Typography variant="h4" gutterBottom>
                        About Our Hospital
                    </Typography>
                    <Typography variant="body1">
                        Welcome to our hospital's website. We are dedicated to providing top-quality medical care
                        and services to our patients. Our team of experienced doctors and healthcare professionals
                        is committed to your well-being and recovery.
                    </Typography>
                    <Typography variant="body1">
                        If you have any questions or need to schedule an appointment, please don't hesitate to
                        contact us.
                    </Typography>

                    <Grid container spacing={2} style={{marginTop: '20px'}}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                                Our Mission
                            </Typography>
                            <Typography variant="body1">
                                Our mission is to improve the health and well-being of our community by delivering
                                compassionate, high-quality care. We focus on treating the whole patient, not just the
                                condition.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                                Our Services
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Emergency Care"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Surgery and Procedures"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Primary Care"/>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer/>
        </Box>
    );
};

export default About;
