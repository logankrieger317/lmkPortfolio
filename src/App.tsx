import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import './App.css';

/**
 * Single-page scrolling layout.
 * All sections render sequentially — no router needed.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: '#0a0a0a',
        }}
      >
        <Navbar />
        <Box component="main">
          <Hero />
          <About />
          <Portfolio />
          <Contact />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
