import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MyLogo from './Logo';
import { ColorModeContext } from '../App';
import { useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const sections = [
  { id: 'home', label: 'Home', path: '#home' },
  { id: 'skills', label: 'Skills', path: '#skills' },
  { id: 'experience', label: 'Experience', path: '#experience' },
  { id: 'inspiration', label: 'Inspiration', path: '#inspiration' },
  { id: 'analytics', label: 'Analytics', path: '#analytics' },
  { id: 'contact', label: 'Contact', path: '#contact' },
];

const NavMenu: React.FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (sectionId: string) => {
    handleCloseNavMenu();
    // Remove # if it exists to get the element ID
    const elementId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
    const element = document.getElementById(elementId);
    
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleToggleTheme = () => {
    colorMode.toggleColorMode();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor:
          theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 64, px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <MyLogo sx={{ height: 65, width: 65, mr: 1 }} />
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: theme.palette.text.primary,
                textDecoration: 'none',
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              NorthCode
            </Typography>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleOpenNavMenu}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  mt: 1,
                },
              }}
            >
              {sections.map((section) => (
                <MenuItem 
                  key={section.id} 
                  component="a"
                  href={section.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center" color={theme.palette.text.primary}>
                    {section.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Nav Links (desktop only) */}
          <Box
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 3, flexGrow: 1 }}
          >
            {sections.map((section) => (
              <Button
                key={section.id}
                href={section.path}
                sx={{
                  mx: 1,
                  px: 2,
                  py: 1,
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {section.label}
              </Button>
            ))}
          </Box>

          {/* Theme Toggle (right) */}
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton
                onClick={handleToggleTheme}
                sx={{
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavMenu;
