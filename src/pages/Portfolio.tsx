import { useState } from "react";
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
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import CloseIcon from "@mui/icons-material/Close";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

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
      // Check if we can access the iframe content
      const iframe = event.target as HTMLIFrameElement;
      if (iframe.contentWindow) {
        setIsIframeLoading(false);
        setIframeError(false);
      }
    } catch (error) {
      console.error("Iframe access error:", error);
      setIframeError(true);
    }
  };

  const handleIframeError = () => {
    console.error("Iframe loading error for:", project.title);
    setIframeError(true);
    setIsIframeLoading(false);
  };

  // Ensure URL uses HTTPS
  const secureUrl = project.liveUrl?.replace("http://", "https://");

  return (
    <Box
      sx={{
        position: "relative",
        height: fullScreen ? "80vh" : 200,
        backgroundColor: "grey.100",
        overflow: "hidden",
      }}
    >
      {isIframeLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "grey.100",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {secureUrl && !iframeError ? (
        <iframe
          src={secureUrl}
          style={{
            width: fullScreen ? "100%" : "200%",
            height: fullScreen ? "100%" : "200%",
            border: "none",
            transform: fullScreen ? "none" : "scale(0.5)",
            transformOrigin: "0 0",
            opacity: isIframeLoading ? 0 : 1,
            transition: "opacity 0.3s ease",
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
          height={fullScreen ? "80vh" : "200"}
          image={project.image}
          alt={project.title}
          sx={{ objectFit: "contain" }}
        />
      )}
    </Box>
  );
};

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
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "90vw",
          height: fullScreen ? "100vh" : "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{project.title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        <ProjectPreview project={project} fullScreen />
      </DialogContent>
    </Dialog>
  );
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = [
    {
      title: "JCO ATX",
      description:
        "A professional website showcasing services and portfolio. Built with modern web technologies to provide an engaging user experience.",
      image: "https://via.placeholder.com/400x300",
      technologies: [
        "React",
        "TypeScript",
        "Responsive Design",
        "Modern UI/UX",
      ],
      githubUrl: "https://github.com/youruser/jcoatx-website",
      liveUrl: "http://jcoatx.com",
    },
    {
      title: "Courtney Lester Realty",
      description: "Real estate website for a local realtor.",
      image: "https://via.placeholder.com/400x300",
      technologies: ["React", "TypeScript", "RestFul API", "Cloud Hosting"],
      githubUrl: "#",
      liveUrl: "http://courtneylesterrealty.com",
    },
    {
      title: "Sit and Shake",
      description: "Marketing website for a local coffee truck business.",
      image: "https://via.placeholder.com/400x300",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      githubUrl: "#",
      liveUrl: "http://sitandshake.logankrieger.com",
    },
    {
      title: "Budaful Door Decor",
      description: "E-commerce website for a local door decor business.",
      image: "https://via.placeholder.com/400x300",
      technologies: ["React", "TypeScript", "Responsive Design"],
      githubUrl: "#",
      liveUrl: "https://budafuldoordecor.com",
    },
    {
      title: "Happy Paws Dog Walking",
      description: "Dog walking website for a local dog walking business.",
      image: "https://via.placeholder.com/400x300",
      technologies: ["React", "CSS", "TypeScript", "Responsive Design"],
      githubUrl: "#",
      liveUrl: "https://happypawswalking.site",
    },
    {
      title: "Learning Website",
      description: "A website for a new developer to learn new skills.",
      image: "https://via.placeholder.com/400x300",
      technologies: ["React", "CSS", "TypeScript", "Responsive Design"],
      githubUrl: "#",
      liveUrl: "https://newhiretraining-production.up.railway.app",
    },
  ];

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 6 }}
      >
        My Portfolio
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
              onClick={() => handleCardClick(project)}
            >
              <ProjectPreview project={project} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Technologies:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.technologies.join(" • ")}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
              >
                {project.githubUrl && (
                  <Button
                    size="small"
                    startIcon={<GitHubIcon />}
                    href={project.githubUrl}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()} // Prevent card click when clicking button
                  >
                    GitHub
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    size="small"
                    startIcon={<LaunchIcon />}
                    href={project.liveUrl}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()} // Prevent card click when clicking button
                  >
                    Live Demo
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          open={Boolean(selectedProject)}
          onClose={handleCloseDialog}
        />
      )}
    </Container>
  );
};

export default Portfolio;
