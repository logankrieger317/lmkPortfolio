import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import TransformIcon from '@mui/icons-material/Transform';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

/** Styled toggle group — pill-shaped with gradient selection */
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 50,
  padding: 4,
  '& .MuiToggleButton-root': {
    borderRadius: 50,
    border: 'none',
    textTransform: 'none',
    color: '#71717a',
    fontWeight: 500,
    fontSize: '0.9rem',
    padding: '8px 24px',
    '&.Mui-selected': {
      background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
      color: '#fff',
      '&:hover': {
        background: 'linear-gradient(135deg, #6d28d9, #2563eb)',
      },
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
}));

/** Scroll-triggered section reveal wrapper */
const SectionReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
  >
    {children}
  </motion.div>
);

/**
 * About section — professional/personal toggle with glassmorphism
 * journey cards and a skills grid.
 */
const About = () => {
  const [view, setView] = useState<'professional' | 'personal'>('professional');

  const handleViewChange = (
    _: React.MouseEvent<HTMLElement>,
    newView: 'professional' | 'personal' | null,
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const professionalJourney = [
    {
      icon: <MilitaryTechIcon fontSize="large" />,
      title: 'Service & Leadership',
      description:
        'Former Army Ranger and First Responder, bringing tactical precision and crisis management skills to software development.',
      details: ['Army Ranger', 'Firefighter', 'EMT'],
    },
    {
      icon: <TransformIcon fontSize="large" />,
      title: 'Professional Evolution',
      description:
        'Diverse career path demonstrating adaptability and quick learning across multiple industries.',
      details: ['Licensed Insurance Agent', 'Plumber', 'Business Analyst'],
    },
    {
      icon: <AnalyticsIcon fontSize="large" />,
      title: 'Problem Solving',
      description:
        'Combining analytical thinking from business analysis with technical expertise in software engineering.',
      details: ['Business Analysis', 'Data Analytics', 'Full Stack Development'],
    },
  ];

  const personalJourney = [
    {
      icon: <SportsKabaddiIcon fontSize="large" />,
      title: 'Martial Arts',
      description:
        'Dedicated Jiu Jitsu practitioner, applying discipline and continuous learning from the mat to technology.',
      details: ['Problem Solving', 'Discipline', 'Continuous Learning'],
    },
    {
      icon: <FamilyRestroomIcon fontSize="large" />,
      title: 'Family First',
      description:
        'Dedicated family man who believes in maintaining a healthy work-life balance.',
      details: ['Work-Life Balance', 'Values', 'Stability'],
    },
    {
      icon: <RestaurantIcon fontSize="large" />,
      title: 'Creative Pursuits',
      description:
        'Amateur chef and motorcycle enthusiast, bringing creativity and attention to detail to every project.',
      details: ['Creativity', 'Precision', 'Adventure'],
    },
  ];

  const currentJourney = view === 'professional' ? professionalJourney : personalJourney;

  const skills = [
    {
      icon: <WebIcon fontSize="large" />,
      title: 'Frontend Development',
      description:
        'Creating responsive and intuitive user interfaces using modern frameworks and libraries.',
      technologies: ['React', 'TypeScript', 'Material UI', 'Tailwind CSS'],
    },
    {
      icon: <CodeIcon fontSize="large" />,
      title: 'Backend Development',
      description: 'Building robust and scalable server-side applications and APIs.',
      technologies: ['Node.js', 'Python', 'RESTful APIs', 'GraphQL'],
    },
    {
      icon: <StorageIcon fontSize="large" />,
      title: 'Database & DevOps',
      description: 'Managing databases and implementing efficient deployment strategies.',
      technologies: ['PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
    },
  ];

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: '#0a0a0a',
      }}
    >
      <Container maxWidth="lg">
        {/* Section heading */}
        <SectionReveal>
          <Typography
            variant="h2"
            align="center"
            sx={{ color: '#f4f4f5', mb: 2 }}
          >
            Who I Am
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ maxWidth: 600, mx: 'auto', mb: 5 }}
          >
            A unique blend of military discipline, multi-industry experience,
            and modern technical expertise.
          </Typography>
        </SectionReveal>

        {/* Professional / Personal toggle */}
        <SectionReveal delay={0.1}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <StyledToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              aria-label="view selector"
            >
              <ToggleButton value="professional" aria-label="professional view">
                Professional
              </ToggleButton>
              <ToggleButton value="personal" aria-label="personal view">
                Personal
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Box>
        </SectionReveal>

        {/* Journey cards */}
        <Grid container spacing={3} sx={{ mb: 12 }}>
          {currentJourney.map((item, index) => (
            <Grid item xs={12} md={4} key={`${view}-${index}`}>
              <SectionReveal delay={index * 0.15}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'rgba(124, 58, 237, 0.3)',
                      boxShadow: '0 8px 40px rgba(124, 58, 237, 0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      p: 1.5,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.15))',
                    }}
                  >
                    <Box sx={{ color: '#8b5cf6' }}>{item.icon}</Box>
                  </Box>
                  <Typography variant="h6" sx={{ color: '#f4f4f5', mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#a1a1aa', mb: 2, flexGrow: 1 }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {item.details.map((detail) => (
                      <Chip
                        key={detail}
                        label={detail}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          color: '#a1a1aa',
                          border: '1px solid rgba(255,255,255,0.08)',
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </SectionReveal>
            </Grid>
          ))}
        </Grid>

        {/* Skills heading */}
        <SectionReveal>
          <Typography
            variant="h3"
            align="center"
            sx={{ color: '#f4f4f5', mb: 2 }}
          >
            Technical Expertise
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ maxWidth: 500, mx: 'auto', mb: 6 }}
          >
            The tools and technologies I use to bring ideas to life.
          </Typography>
        </SectionReveal>

        {/* Skills cards */}
        <Grid container spacing={3}>
          {skills.map((skill, index) => (
            <Grid item xs={12} md={4} key={index}>
              <SectionReveal delay={index * 0.15}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'rgba(6, 182, 212, 0.3)',
                      boxShadow: '0 8px 40px rgba(6, 182, 212, 0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      p: 1.5,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(20,184,166,0.15))',
                    }}
                  >
                    <Box sx={{ color: '#06b6d4' }}>{skill.icon}</Box>
                  </Box>
                  <Typography variant="h6" sx={{ color: '#f4f4f5', mb: 1 }}>
                    {skill.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#a1a1aa', mb: 2, flexGrow: 1 }}>
                    {skill.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {skill.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(6,182,212,0.1)',
                          color: '#06b6d4',
                          border: '1px solid rgba(6,182,212,0.2)',
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </SectionReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
