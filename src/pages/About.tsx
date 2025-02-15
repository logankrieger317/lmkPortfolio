import { useState } from 'react';
import { Container, Typography, Grid, Paper, Divider, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import TransformIcon from '@mui/icons-material/Transform';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 50,
  '& .MuiToggleButton-root': {
    margin: 4,
    borderRadius: 50,
    border: 'none',
    textTransform: 'none',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)({
  minWidth: 120,
});

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
      description: 'Former Army Ranger and First Responder, bringing tactical precision and crisis management skills to software development.',
      details: ['Army Ranger', 'Firefighter', 'EMT'],
    },
    {
      icon: <TransformIcon fontSize="large" />,
      title: 'Professional Evolution',
      description: 'Diverse career path demonstrating adaptability and quick learning across multiple industries.',
      details: ['Licensed Insurance Agent', 'Plumber', 'Business Analyst'],
    },
    {
      icon: <AnalyticsIcon fontSize="large" />,
      title: 'Problem Solving',
      description: 'Combining analytical thinking from business analysis with technical expertise in software engineering.',
      details: ['Business Analysis', 'Data Analytics', 'Full Stack Development'],
    },
  ];

  const personalJourney = [
    {
      icon: <SportsKabaddiIcon fontSize="large" />,
      title: 'Martial Arts',
      description: 'Dedicated Jiu Jitsu practitioner, applying discipline and continuous learning from the mat to technology.',
      details: ['Problem Solving', 'Discipline', 'Continuous Learning'],
    },
    {
      icon: <FamilyRestroomIcon fontSize="large" />,
      title: 'Family First',
      description: 'Dedicated family man who believes in maintaining a healthy work-life balance.',
      details: ['Work-Life Balance', 'Values', 'Stability'],
    },
    {
      icon: <RestaurantIcon fontSize="large" />,
      title: 'Creative Pursuits',
      description: 'Amateur chef and motorcycle enthusiast, bringing creativity and attention to detail to every project.',
      details: ['Creativity', 'Precision', 'Adventure'],
    },
  ];

  const currentJourney = view === 'professional' ? professionalJourney : personalJourney;

  const skills = [
    {
      icon: <WebIcon fontSize="large" />,
      title: 'Frontend Development',
      description: 'Creating responsive and intuitive user interfaces using modern frameworks and libraries.',
      technologies: ['React', 'TypeScript', 'Material UI', 'HTML/CSS'],
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
      technologies: ['SQL', 'MongoDB', 'Docker', 'AWS'],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Who I Am
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <StyledToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view selector"
        >
          <StyledToggleButton value="professional" aria-label="professional view">
            Professional
          </StyledToggleButton>
          <StyledToggleButton value="personal" aria-label="personal view">
            Personal
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {currentJourney.map((item, index) => (
          <Grid item xs={12} md={4} key={`${view}-${index}`}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease-in-out',
                transform: 'translateY(0)',
                opacity: 1,
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {item.icon}
              </Box>
              <Typography variant="h6" component="h3" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {item.description}
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  {item.details.join(' • ')}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 8 }} />

      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
        Technical Expertise
      </Typography>

      <Grid container spacing={4}>
        {skills.map((skill, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {skill.icon}
              </Box>
              <Typography variant="h6" component="h3" gutterBottom>
                {skill.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {skill.description}
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Technologies:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {skill.technologies.join(' • ')}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
