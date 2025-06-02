import { Component, JSX } from 'react';
import { Typography, Card, CardMedia, CardContent, Box, Chip, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import CDCNLogo from '/images/CDCN_Logo.png';
import ampdLogo from '/images/logo_original.png';
import MSULogo from '/images/Montana_State_Bobcats_logo.svg.png';
import GapFillersLogo from '/images/gap-fillers-flathead-logo.png';
import FamilyTree from '/images/treeFavicon.ico';
import NewLogo from '/images/LogoNewGold.png';
import { motion } from 'framer-motion';
interface Props { }

interface State { }

class Experience extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    renderExperienceItem(logo: string, heading: string, description: JSX.Element) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Card sx={{ backgroundColor: 'transparent', backgroundImage: 'none', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                image={logo}
                                alt={`Logo for ${heading}`}
                                sx={{ width: '100%', maxHeight: 150, objectFit: 'contain', padding: 2 }}
                            />
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 8 }}>
                        <CardContent sx={{ backgroundColor: 'transparent', backgroundImage: 'none' }}>
                            <Typography variant="h5" component="div">
                                {heading}
                            </Typography>
                            {description}
                        </CardContent>
                    </Grid>
                </Grid>
            </motion.div>
        );
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Typography variant="h4" gutterBottom component="div">
                    What I'm doing
                </Typography>

                {this.renderExperienceItem(FamilyTree, 'ChilcoteFamily.com', (
                    <>
                        <Stack direction="row" spacing={1}>
                            <Chip label=".NET" color="primary" />
                            <Chip label="Angular" color="secondary" />
                            <Chip label="AWS" />
                            <Chip label="Entity Framework" />
                            <Chip label="CI/CD" />
                        </Stack>
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
                            <li>Collaborated with family members to gather requirements and feedback, ensuring the site meets the needs of its users.</li>
                            {/* Add more list items as needed */}
                        </ul>

                    </>
                ))}
                {this.renderExperienceItem(NewLogo, 'Resume Site', (
                    <>
                        <Stack direction="row" spacing={1}>
                            <Chip label="React" color="primary" />
                            <Chip label=".NET" color="secondary" />
                            <Chip label="Azure" />
                            <Chip label="Serverless" />
                            <Chip label="APIs" />
                        </Stack>
                        <ul>
                            <li>Developed a modern, responsive resume site using React for the frontend and .NET for the backend.</li>
                            <li>Deployed the application using Azure App Service, leveraging Microsoft’s cloud platform for reliable, scalable hosting.</li>
                            <li>Implemented a serverless Azure database to efficiently store and retrieve site analytics data at no cost.</li>
                            <li>Integrated three third-party APIs:
                                <ul>
                                    <li>IP Geolocation API for visitor analytics and region tracking.</li>
                                    <li>Weather API to retrieve real-time weather information. (more analytics)</li>
                                    <li>NASA Astronomy Picture of the Day API for daily space imagery and facts.</li>
                                </ul>
                            </li>
                            <li>Utilized caching strategies for images and data to improve site performance and reduce redundant API calls.</li>
                            <li>All infrastructure and services are hosted for free using Azure’s free tier offerings.</li>
                            <li>Designed and built a custom analytics dashboard to visualize visitor data and site usage trends.</li>
                            <li>Focused on cost-effective, scalable, and maintainable architecture using modern web technologies.</li>
                        </ul>
                    </>
                ))}
                {this.renderExperienceItem(CDCNLogo, 'Consumer Direct Care Network', (
                    <>
                        <Stack direction="row" spacing={1}>
                            <Chip label="Security" color="primary" />
                            <Chip label="Databases" color="secondary" />
                            <Chip label="Agile" />
                        </Stack>
                        <ul>
                            <li>Incorporated cybersecurity priorities into development projects to reduce potential liability and increase customer security.</li>
                            <li>Created long-term development plans to optimize performance within multi-project and multi-team environments.</li>
                            <li>Worked with multiple teams to create a secure and efficient database for the company.</li>

                            {/* Add more list items as needed */}
                        </ul>
                    </>

                ))}

                {this.renderExperienceItem(ampdLogo, 'AMPD Engagement', (
                    <>
                        <Stack direction="row" spacing={1}>
                            <Chip label="React" color="primary" />
                            <Chip label="JavaScript" color="secondary" />
                            <Chip label="MySQL" />
                            <Chip label="Sequelize" />
                            <Chip label="Express" />
                        </Stack>
                        <p>Web App designed for teachers and researchers to collect and visualize data from students in their classes.</p>
                        <ul>
                            <li>Worked with team members to deliver a web application written using React, JavaScript, MySQL, Sequelize (ORM), Express (Server), and other APIs and packages.</li>
                            <li>Created multiple views for different that render without refreshing.</li>
                            <li>Worked with team members to create a secure and efficient database for the client.</li>
                            <li>Created a secure and efficient server using Express.</li>

                            {/* Add more list items as needed */}
                        </ul>
                    </>
                ))}

                {this.renderExperienceItem(MSULogo, 'Montana State University', (
                    <>
                        <Stack direction="row" spacing={1}>
                            <Chip label="Computer Science" color="primary" />
                            <Chip label="Statistics" color="secondary" />
                            <Chip label="GPA: 3.8" />
                        </Stack>
                        <p>Graduated with a Bachelor's in Computer Science and a Minor in Statistics.</p>
                        <ul>
                            <li>Montana State University - Bozeman, MT</li>
                            <li>August 2017 to May 2020</li>
                            <li>GPA: 3.8</li>
                            <li>Graduated with Honors</li>
                            <li>Relevant Coursework: Data Structures, Algorithms, Database Management, Web Development, Software Engineering, and Statistics.</li>

                        </ul>
                        College was a lot of work and a lot of fun!
                    </>
                ))}
                {this.renderExperienceItem(GapFillersLogo, 'Gap FIllers Flathead', (
                    <>
                        <Stack direction="row" spacing={1}>
                            <Chip label="HTML5" color="primary" />
                            <Chip label="CSS" color="secondary" />
                            <Chip label="JavaScript" />
                        </Stack>
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