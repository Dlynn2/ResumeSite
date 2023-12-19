import React from 'react';
import { Row, Col, Media } from 'reactstrap';
import '../css/Experience.css';
import CDCNLogo from '../CDCN_Logo.png';
import ampdLogo from '../logo_original.png';
import MSULogo from '../Montana_State_Bobcats_logo.svg.png';
import GapFillersLogo from '../gap-fillers-flathead-logo.png';

class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderExperienceItem(logo, heading, description) {
        return (
            <Row xs="1" sm="2" md="2">
                <Col className="col-md-4 mt-auto mb-auto">
                    <Media>
                        <Media left middle href="#">
                            <Media src={logo} alt={`Logo for ${heading}`} className="col-md-12 mw-100" />
                        </Media>
                    </Media>
                </Col>

                <Col className="col-md-8">
                    <Media body>
                        <Media heading>{heading}</Media>
                        {description}
                    </Media>
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <div className="Experience">
                <h1 className="top-header">What I'm doing</h1>

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

            </div>
        );
    }
}

export default Experience;
