import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  CardMedia,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

/* ------------------------------------------------------------------ */
/*  Scroll reveal helper                                               */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  ProjectPreview — iframe with fallback                              */
/* ------------------------------------------------------------------ */

const ProjectPreview = ({
  project,
  fullScreen = false,
}: {
  project: Project;
  fullScreen?: boolean;
}) => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const handleIframeLoad = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const iframe = event.target as HTMLIFrameElement;
      if (iframe.contentWindow) {
        setIsIframeLoading(false);
        setIframeError(false);
      }
    } catch {
      setIframeError(true);
    }
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIsIframeLoading(false);
  };

  const secureUrl = project.liveUrl?.replace('http://', 'https://');

  return (
    <Box
      sx={{
        position: 'relative',
        height: fullScreen ? '80vh' : 220,
        backgroundColor: 'rgba(255,255,255,0.03)',
        overflow: 'hidden',
        borderRadius: fullScreen ? 0 : '12px 12px 0 0',
      }}
    >
      {isIframeLoading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.03)',
          }}
        >
          <CircularProgress size={28} sx={{ color: '#7c3aed' }} />
        </Box>
      )}

      {secureUrl && !iframeError ? (
        <iframe
          src={secureUrl}
          style={{
            width: fullScreen ? '100%' : '200%',
            height: fullScreen ? '100%' : '200%',
            border: 'none',
            transform: fullScreen ? 'none' : 'scale(0.5)',
            transformOrigin: '0 0',
            opacity: isIframeLoading ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title={project.title}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          loading="lazy"
          referrerPolicy="no-referrer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <CardMedia
          component="img"
          height={fullScreen ? '80vh' : '220'}
          image={project.image}
          alt={project.title}
          sx={{ objectFit: 'contain' }}
        />
      )}
    </Box>
  );
};

/* ------------------------------------------------------------------ */
/*  ProjectDialog — expanded preview modal                             */
/* ------------------------------------------------------------------ */

const ProjectDialog = ({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '90vw',
          height: fullScreen ? '100vh' : '90vh',
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Typography variant="h6" sx={{ color: '#f4f4f5' }}>
          {project.title}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ color: '#71717a' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0, borderColor: 'rgba(255,255,255,0.06)' }}>
        <ProjectPreview project={project} fullScreen />
      </DialogContent>
    </Dialog>
  );
};

/* ------------------------------------------------------------------ */
/*  Spotlight Card — large featured project card                       */
/* ------------------------------------------------------------------ */

const SpotlightCard = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) => {
  const isEven = index % 2 === 0;

  return (
    <SectionReveal delay={0.1}>
      <Card
        onClick={onClick}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' },
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.4s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(124, 58, 237, 0.3)',
            boxShadow: '0 16px 60px rgba(124, 58, 237, 0.12)',
          },
        }}
      >
        {/* Preview side */}
        <Box
          sx={{
            flex: { xs: 'none', md: '0 0 55%' },
            minHeight: { xs: 220, md: 320 },
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.03)',
          }}
        >
          <ProjectPreview project={project} />
        </Box>

        {/* Content side */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: 3, md: 5 },
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: '#f4f4f5', mb: 1.5, fontWeight: 700 }}
          >
            {project.title}
          </Typography>
          <Typography variant="body1" sx={{ color: '#a1a1aa', mb: 3, lineHeight: 1.7 }}>
            {project.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {project.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.12))',
                  color: '#8b5cf6',
                  border: '1px solid rgba(124,58,237,0.2)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {project.githubUrl && project.githubUrl !== '#' && (
              <Button
                size="small"
                startIcon={<GitHubIcon />}
                href={project.githubUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  color: '#a1a1aa',
                  '&:hover': { color: '#f4f4f5' },
                }}
              >
                Source
              </Button>
            )}
            {project.liveUrl && (
              <Button
                size="small"
                startIcon={<LaunchIcon />}
                href={project.liveUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  color: '#a1a1aa',
                  '&:hover': { color: '#f4f4f5' },
                }}
              >
                Live Site
              </Button>
            )}
          </Box>
        </Box>
      </Card>
    </SectionReveal>
  );
};

/* ------------------------------------------------------------------ */
/*  GridCard — smaller project card for the grid                       */
/* ------------------------------------------------------------------ */

const GridCard = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) => (
  <SectionReveal delay={index * 0.1}>
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          boxShadow: '0 12px 40px rgba(59, 130, 246, 0.1)',
        },
      }}
    >
      <ProjectPreview project={project} />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" sx={{ color: '#f4f4f5', mb: 1 }}>
          {project.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#a1a1aa', mb: 2, lineHeight: 1.6 }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
          {project.technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                color: '#a1a1aa',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '0.7rem',
              }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-start', px: 3, pb: 2.5, pt: 0, gap: 1 }}>
        {project.githubUrl && project.githubUrl !== '#' && (
          <Button
            size="small"
            startIcon={<GitHubIcon sx={{ fontSize: 18 }} />}
            href={project.githubUrl}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            sx={{ color: '#71717a', fontSize: '0.8rem', '&:hover': { color: '#f4f4f5' } }}
          >
            Source
          </Button>
        )}
        {project.liveUrl && (
          <Button
            size="small"
            startIcon={<LaunchIcon sx={{ fontSize: 18 }} />}
            href={project.liveUrl}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            sx={{ color: '#71717a', fontSize: '0.8rem', '&:hover': { color: '#f4f4f5' } }}
          >
            Live Site
          </Button>
        )}
      </CardActions>
    </Card>
  </SectionReveal>
);

/* ------------------------------------------------------------------ */
/*  Portfolio section                                                   */
/* ------------------------------------------------------------------ */

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: 'Binly',
      description:
        'A QR-based storage organization app for tracking household bins and items. Scan a QR code to instantly see what\'s inside any storage container.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'AWS S3', 'Turborepo'],
      githubUrl: 'https://github.com/logankrieger317/Binly',
      liveUrl: 'https://binlyfrontend-production.up.railway.app',
    },
    {
      title: 'Contract PDF Redactor',
      description:
        'A client-side PDF redaction tool with automatic PII detection, OCR support via Tesseract.js, and legally defensible redaction capabilities.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Tesseract.js', 'pdf-lib'],
      githubUrl: 'https://github.com/logankrieger317/contract-pdf-redactor',
      liveUrl: 'https://contract-pdf-redactor-production.up.railway.app',
    },
    {
      title: "Rabbit's Recipes",
      description:
        'A full-stack recipe website — a private fine-home-dining menu written as a love letter. Features categorized recipes with cook times, servings, and a clean browsing experience.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'PostgreSQL'],
      githubUrl: 'https://github.com/logankrieger317/RabbitsRecipes',
      liveUrl: 'https://rabbitsrecipes.com',
    },
    {
      title: 'All American Builders',
      description:
        'A general contractor landing page for a Western NC construction company. Features service showcases, project galleries, testimonials, and a lead-capture estimate form.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Turborepo'],
      githubUrl: 'https://github.com/logankrieger317/AllAmericanBuilders',
      liveUrl: 'https://aablanding-production.up.railway.app',
    },
    {
      title: 'JCO ATX',
      description:
        'A professional website showcasing services and portfolio. Built with modern web technologies to provide an engaging user experience.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'TypeScript', 'Responsive Design', 'Modern UI/UX'],
      githubUrl: 'https://github.com/youruser/jcoatx-website',
      liveUrl: 'http://jcoatx.com',
    },
    {
      title: 'Courtney Lester Realty',
      description: 'Real estate website for a local realtor.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'TypeScript', 'RESTful API', 'Cloud Hosting'],
      githubUrl: '#',
      liveUrl: 'http://courtneylesterrealty.com',
    },
    {
      title: 'Budaful Door Decor',
      description: 'E-commerce website for a local door decor business.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'TypeScript', 'Responsive Design'],
      githubUrl: '#',
      liveUrl: 'https://budafuldoordecor.com',
    },
    {
      title: 'Happy Paws Dog Walking',
      description: 'Dog walking website for a local dog walking business.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'CSS', 'TypeScript', 'Responsive Design'],
      githubUrl: '#',
      liveUrl: 'https://happypawswalking.site',
    },
    {
      title: 'Learning Website',
      description: 'A website for a new developer to learn new skills.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'CSS', 'TypeScript', 'Responsive Design'],
      githubUrl: '#',
      liveUrl: 'https://newhiretraining-production.up.railway.app',
    },
  ];

  /** First 3 projects are spotlighted, rest go in the grid */
  const spotlightProjects = projects.slice(0, 3);
  const gridProjects = projects.slice(3);

  return (
    <Box
      id="portfolio"
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: '#0a0a0a',
      }}
    >
      {/* Subtle section divider gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(59,130,246,0.3), transparent)',
        }}
      />

      <Container maxWidth="lg">
        {/* Section heading */}
        <SectionReveal>
          <Typography variant="h2" align="center" sx={{ color: '#f4f4f5', mb: 2 }}>
            Selected Work
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ maxWidth: 550, mx: 'auto', mb: 8 }}
          >
            A collection of projects spanning full-stack applications,
            client sites, and developer tools.
          </Typography>
        </SectionReveal>

        {/* Spotlight projects — large alternating cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 8 }}>
          {spotlightProjects.map((project, index) => (
            <SpotlightCard
              key={project.title}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </Box>

        {/* Divider between spotlight and grid */}
        <SectionReveal>
          <Typography
            variant="h4"
            sx={{ color: '#f4f4f5', mb: 1, mt: 4 }}
          >
            More Projects
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Client websites and additional work.
          </Typography>
        </SectionReveal>

        {/* Grid projects */}
        <Grid container spacing={3}>
          {gridProjects.map((project, index) => (
            <Grid item xs={12} sm={6} lg={4} key={project.title}>
              <GridCard
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Expanded preview dialog */}
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          open={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Box>
  );
};

export default Portfolio;
