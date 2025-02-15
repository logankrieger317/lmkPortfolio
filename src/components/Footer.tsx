import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Logan Krieger. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              component={Link}
              href="https://github.com/logankrieger317"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              size="small"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component={Link}
              href="https://linkedin.com/in/logankrieger"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              size="small"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component={Link}
              href="mailto:logan@kriegertx.com"
              color="inherit"
              size="small"
            >
              <EmailIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Support: logan@kriegertx.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
