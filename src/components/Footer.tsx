import { Box, Container, Typography } from '@mui/material';

/**
 * Ultra-minimal dark footer — copyright line only.
 * Social links are already in the Contact section above.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        background: '#0a0a0a',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: '#52525b', fontSize: '0.8rem' }}>
            &copy; {currentYear} Logan Krieger. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: '#3f3f46', fontSize: '0.8rem' }}>
            Built with React & TypeScript
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
