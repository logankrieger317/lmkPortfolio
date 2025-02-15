import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
        color: 'white',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Logan Krieger
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              mb: 4,
            }}
          >
            Web Developer & Software Engineer
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.8rem' },
              mb: 6,
              fontWeight: 'normal',
            }}
          >
            Crafting innovative digital solutions for businesses
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/portfolio')}
              sx={{ px: 4, py: 1.5 }}
            >
              View My Work
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{ px: 4, py: 1.5 }}
            >
              Get in Touch
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
