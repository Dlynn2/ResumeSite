import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from '@mui/material';

const actions = [
  { icon: <FacebookIcon />, name: 'Facebook', url: 'https://www.facebook.com/dylan.lynn.56' },
  { icon: <GitHubIcon />, name: 'GitHub', url: 'https://github.com/Dlynn2' },
  {
    icon: <LinkedInIcon />,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dylan-lynn-47b76965/',
  },
];

const IconBar = () => {
  const theme = useTheme();

  return (
    <SpeedDial
      ariaLabel="Social Links"
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 2000,
        opacity: 0.5,
        transition: 'opacity 0.3s',
        '&:hover, &:focus-within': {
          opacity: 1,
        },
      }}
      icon={<SpeedDialIcon />}
      direction="up"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{ tooltip: { title: action.name } }}
          onClick={() => window.open(action.url, '_blank')}
          sx={{ color: theme.palette.secondary.main }}
        />
      ))}
    </SpeedDial>
  );
};

export default IconBar;
