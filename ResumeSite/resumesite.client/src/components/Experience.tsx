import React, { Component } from 'react';
import { Grid, Typography, Card, CardMedia, CardContent, Box } from '@mui/material';
import CDCNLogo from '/images/CDCN_Logo.png';
import ampdLogo from '/images/logo_original.png';
import MSULogo from '/images/Montana_State_Bobcats_logo.svg.png';
import GapFillersLogo from '/images/gap-fillers-flathead-logo.png';
import FamilyTree from '/images/treeFavicon.ico';
interface Props { }

interface State { }

class Experience extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    renderExperienceItem(logo: string, heading: string, description: JSX.Element) {
        return (
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={logo}
                            alt={`Logo for ${heading}`}
                            sx={{ width: '100%', maxHeight: 150, objectFit: 'contain', padding: 2 }}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} sm={8}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {heading}
                        </Typography>
                        {description}
                    </CardContent>
                </Grid>
            </Grid>
        );
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Typography variant="h4" gutterBottom component="div">
                    What I'm doing
                </Typography>

                {this.renderExperienceItem(FamilyTree, 'ChilcoteFamily.com', (
                    <ul>
                        <li>Deployed and hosted the site on a DigitalOcean droplet, ensuring high availability and performance.</li>
                        <li>Implemented responsive design principles to provide an optimal viewing experience across a wide range of devices.</li>
                        <li>Enhanced site security through the use of best practices in web security, including data encryption and secure authentication methods.</li>
                        <li>Developed a user-friendly content management system to allow family members to easily update and manage content without technical expertise.</li>
                        <li>Optimized site performance through efficient database queries and the use of caching mechanisms.</li>
                        <li>Ensured data privacy by implementing strict access controls and data protection measures, in compliance with relevant regulations.</li>
                        <li>Added interactive features such as a dynamic family tree visualization to enhance user engagement.</li>
                        <li>Established a feedback loop with users to collect suggestions and improve the site based on user input.</li>
                        <li>Leveraged .NET Core for the backend development, providing a robust and scalable framework for server-side logic.</li>
                        <li>Utilized Angular for the frontend to create a dynamic and responsive user interface, enhancing the overall user experience.</li>
                        <li>Integrated Entity Framework (EF) for data access, leveraging its ORM capabilities for efficient and secure data manipulation and retrieval.</li>
                        <li>Implemented CI/CD pipelines using GitHub Actions, automating the build, test, and deployment processes for increased development efficiency and reliability.</li>
                        {/* Add more list items as needed */}
                    </ul>
                ))}
                {this.renderExperienceItem(CDCNLogo, 'Consumer Direct Care Network', (
                    <ul>
                        <li>Incorporated cybersecurity priorities into development projects to reduce potential liability and increase customer security.</li>
                        <li>Created long-term development plans to optimize performance within multi-project and multi-team environments.</li>
                        {/* Add more list items as needed */}
                    </ul>
                ))}

                {this.renderExperienceItem(ampdLogo, 'AMPD Engagement', (
                    <>
                        <p>Web App designed for teachers and researchers to collect and visualize data from students in their classes.</p>
                        <ul>
                            <li>Worked with team members to deliver a web application written using React, JavaScript, MySQL, Sequelize (ORM), Express (Server), and other APIs and packages.</li>
                            <li>Created multiple views for different that render without refreshing.</li>
                            {/* Add more list items as needed */}
                        </ul>
                    </>
                ))}

                {this.renderExperienceItem(MSULogo, 'Montana State University', (
                    <>
                        <p>Bachelor's in Computer Science and a Minor in statistics.</p>
                        <ul>
                            <li>Montana State University - Bozeman, MT</li>
                            <li>August 2017 to May 2020</li>
                            <li>GPA: 3.8</li>
                        </ul>
                        College was a lot of work and a lot of fun!
                    </>
                ))}
                {this.renderExperienceItem(GapFillersLogo, 'Gap FIllers Flathead', (
                    <>
                        <p>Non-profit that focuses on helping students in need particularly girls in middle school or high school.</p>
                        <ul>
                            <li>Created Website using HTML5, CSS, and JavaScript.</li>
                            <li>Worked CSS so it is Mobile friendly.</li>
                            <li>Maintain server and SEO.</li>
                        </ul>
                    </>
                ))}

            </Box>
        );
    }
}

export default Experience;