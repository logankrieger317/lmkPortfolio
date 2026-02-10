import { Container, Typography, Box, Button, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { motion } from 'framer-motion';

/** Scroll-triggered reveal wrapper */
const SectionReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
  >
    {children}
  </motion.div>
);

/**
 * Contact section — minimal CTA with email button and social links.
 * No form — a direct email CTA is cleaner and more professional.
 */
const Contact = () => {
  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 12, md: 20 },
        position: 'relative',
        background: '#0a0a0a',
      }}
    >
      {/* Subtle top divider */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), rgba(20,184,166,0.3), transparent)',
        }}
      />

      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          {/* Overline */}
          <SectionReveal>
            <Typography
              variant="body2"
              sx={{
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#06b6d4',
                fontWeight: 500,
                mb: 3,
                fontSize: '0.85rem',
              }}
            >
              Get in Touch
            </Typography>
          </SectionReveal>

          {/* Heading */}
          <SectionReveal delay={0.1}>
            <Typography
              variant="h2"
              sx={{ color: '#f4f4f5', mb: 3 }}
            >
              Let's Build Something
              <br />
              <Box component="span" className="gradient-text">
                Together.
              </Box>
            </Typography>
          </SectionReveal>

          {/* Subtitle */}
          <SectionReveal delay={0.2}>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 500,
                mx: 'auto',
                mb: 5,
                color: '#a1a1aa',
                lineHeight: 1.8,
              }}
            >
              I'm always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say
              hello, my inbox is open.
            </Typography>
          </SectionReveal>

          {/* Email CTA */}
          <SectionReveal delay={0.3}>
            <Button
              variant="outlined"
              size="large"
              href="mailto:logan@kriegertx.com"
              endIcon={<ArrowOutwardIcon />}
              sx={{
                px: 5,
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 600,
                color: '#f4f4f5',
                borderColor: 'rgba(255,255,255,0.15)',
                borderWidth: 1,
                '&:hover': {
                  borderColor: '#7c3aed',
                  background: 'rgba(124,58,237,0.08)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              logan@kriegertx.com
            </Button>
          </SectionReveal>

          {/* Social links */}
          <SectionReveal delay={0.4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 5,
              }}
            >
              <IconButton
                href="https://github.com/logankrieger317"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#71717a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  '&:hover': {
                    color: '#f4f4f5',
                    borderColor: 'rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com/in/logankrieger"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#71717a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  '&:hover': {
                    color: '#f4f4f5',
                    borderColor: 'rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="mailto:logan@kriegertx.com"
                sx={{
                  color: '#71717a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  '&:hover': {
                    color: '#f4f4f5',
                    borderColor: 'rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <EmailIcon />
              </IconButton>
            </Box>
          </SectionReveal>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
