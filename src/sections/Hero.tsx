import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * Hero section — full viewport with animated gradient mesh background,
 * oversized gradient heading, staggered subtitle reveal, and CTA.
 */
const Hero = () => {
  /** Stagger container for child animations */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  /** Fade-up animation for each child element */
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const handleScrollToWork = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* Animated gradient mesh blobs */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {/* Purple blob — top left */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60vw',
            height: '60vw',
            maxWidth: 800,
            maxHeight: 800,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
            animation: 'meshFloat 12s ease-in-out infinite',
            filter: 'blur(60px)',
          }}
        />
        {/* Blue blob — center right */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '-15%',
            width: '50vw',
            height: '50vw',
            maxWidth: 700,
            maxHeight: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
            animation: 'meshFloat2 15s ease-in-out infinite',
            filter: 'blur(60px)',
          }}
        />
        {/* Teal blob — bottom center */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10%',
            left: '30%',
            width: '45vw',
            height: '45vw',
            maxWidth: 600,
            maxHeight: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
            animation: 'meshFloat3 18s ease-in-out infinite',
            filter: 'blur(60px)',
          }}
        />
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ textAlign: 'center' }}>
            {/* Overline label */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="body2"
                sx={{
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#8b5cf6',
                  fontWeight: 500,
                  mb: 3,
                  fontSize: '0.85rem',
                }}
              >
                Full Stack Developer
              </Typography>
            </motion.div>

            {/* Name — gradient text */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                className="gradient-text"
                sx={{ mb: 3 }}
              >
                Logan Krieger
              </Typography>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                sx={{
                  color: '#a1a1aa',
                  fontWeight: 400,
                  maxWidth: 650,
                  mx: 'auto',
                  mb: 5,
                  lineHeight: 1.5,
                }}
              >
                Crafting innovative digital solutions
                <br />
                for businesses that demand quality.
              </Typography>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <Button
                variant="contained"
                size="large"
                onClick={handleScrollToWork}
                sx={{
                  px: 5,
                  py: 1.8,
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                  border: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #6d28d9, #2563eb)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 30px rgba(124,58,237,0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View My Work
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={handleScrollDown}
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 32, color: '#71717a' }} />
        </motion.div>
      </Box>
    </Box>
  );
};

export default Hero;
