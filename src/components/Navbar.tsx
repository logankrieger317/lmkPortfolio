import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

/** Navigation items with anchor IDs */
const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'portfolio' },
  { label: 'Contact', id: 'contact' },
];

/**
 * Floating glass navbar that is transparent at top
 * and blurs to a glass panel on scroll. Uses smooth
 * scroll to anchor sections.
 */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  /** Track scroll position for glass effect and active section */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple scroll-spy: find which section is most visible
      const sections = ['hero', 'about', 'portfolio', 'contact'];
      const scrollPos = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Smooth scroll to a section by ID */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? 'rgba(10, 10, 10, 0.8)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.06)'
            : '1px solid transparent',
          transition: 'all 0.4s ease',
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 3 },
          }}
        >
          {/* Logo / Name */}
          <Typography
            variant="h6"
            onClick={() => scrollTo('hero')}
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: '#f4f4f5',
              fontSize: '1.15rem',
              '&:hover': { opacity: 0.8 },
              transition: 'opacity 0.2s',
            }}
          >
            LK
          </Typography>

          {/* Desktop nav links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  sx={{
                    color: activeSection === item.id ? '#f4f4f5' : '#71717a',
                    fontWeight: activeSection === item.id ? 600 : 400,
                    fontSize: '0.9rem',
                    px: 2,
                    position: 'relative',
                    '&:hover': {
                      color: '#f4f4f5',
                      background: 'transparent',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: activeSection === item.id ? 20 : 0,
                      height: 2,
                      borderRadius: 1,
                      background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
                      transition: 'width 0.3s ease',
                    },
                    transition: 'color 0.2s ease',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ color: '#f4f4f5' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <Drawer
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: 320,
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              },
            }}
          >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#f4f4f5' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List sx={{ px: 2 }}>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      onClick={() => scrollTo(item.id)}
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        '&:hover': {
                          background: 'rgba(255,255,255,0.05)',
                        },
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: '1.2rem',
                          fontWeight: activeSection === item.id ? 600 : 400,
                          color: activeSection === item.id ? '#f4f4f5' : '#71717a',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
