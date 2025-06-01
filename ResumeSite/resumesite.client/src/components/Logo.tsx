import logo from '../../public/images/LogoNewGold.png';
import { Box } from '@mui/material';

const MyLogo = (props: any) => (
  <Box
    sx={{
      height: props.height || 40,
      width: props.width || 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      ...props.sx,
    }}
    {...props}
  >
    <img
      src={logo}
      alt="Site Logo"
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  </Box>
);

export default MyLogo;