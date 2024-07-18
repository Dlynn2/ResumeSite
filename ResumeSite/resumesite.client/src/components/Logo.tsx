import logo from '../../public/images/MyLogo.svg';
import { Box } from '@mui/material';

const MyLogo = (props: any) => (
    <Box {...props}>
    <img src={logo} alt="Site Logo" />
  </Box>
);

export default MyLogo;