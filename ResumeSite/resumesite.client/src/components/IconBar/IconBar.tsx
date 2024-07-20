import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailModal from '../EmailModal/EmailModal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';

const IconBar = () => {
    const theme = useTheme();
    const [isEmailPopOpen, setIsEmailPopOpen] = useState(false);
    // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');
    // const iconColor = prefersLightMode ? 'primary' : 'secondary'; // Assuming 'primary' is a suitable color for light mode

    const displaySuccessMessage = () => {
        toast.success('Email sent!');
    };
    const displayErrorMessage = () => {
        toast.error('Email sent!');
    };

    const email = async (emailSubject: any, emailBody: any) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailSubject, emailBody }),
            };

            const response = await fetch('email', requestOptions);
            const { error } = await response.json();

            if (!error) {
                displaySuccessMessage();
            } else {
                displayErrorMessage(); // Consider showing an error message here instead
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const toggleEmailModal = () => {
        setIsEmailPopOpen(!isEmailPopOpen);
    };

    return (
        <div>
            <ul className="icon-bar">
                <li>
                    <Tooltip title="Facebook" placement="right">
                        <IconButton component="a" href="https://www.facebook.com/dylan.lynn.56" sx={{ color: theme.palette.secondary.main }}>
                            <FacebookIcon />
                        </IconButton>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title="Github" placement="right">
                        <IconButton component="a" href="https://github.com/Dlynn2" sx={{ color: theme.palette.secondary.main }}>
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                </li>
                {/* <li>
                    <Tooltip title="Email me!" placement="right">
                        <IconButton component="a" onClick={toggleEmailModal} sx={{ color: theme.palette.secondary.main }}>
                            <EmailIcon />
                        </IconButton>
                    </Tooltip>
                </li> */}
                <li>
                    <Tooltip title="LinkedIn" placement="right">
                        <IconButton component="a" href="https://www.linkedin.com/in/dylan-lynn-47b76965/" sx={{ color: theme.palette.secondary.main }}>
                            <LinkedInIcon />
                        </IconButton>
                    </Tooltip>
                </li>
                {/* <li>
                    <Tooltip title="Download my resume." placement="right">
                        <IconButton component="a" href="https://www.linkedin.com/in/dylan-lynn-47b76965/" sx={{ color: theme.palette.secondary.main }}>
                            <PictureAsPdfIcon />
                        </IconButton>
                    </Tooltip>
                </li> */}
            </ul>
            {isEmailPopOpen && (
                <EmailModal isOpen={isEmailPopOpen} openClose={toggleEmailModal} email={email} />
            )}
        </div>
    );
};

export default IconBar;