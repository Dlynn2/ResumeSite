import React from 'react';
import { Row, Col, Media } from 'reactstrap'
import '../css/Experience.css'
import CDCNLogo from '../CDCN_Logo.png'
import ampdLogo from '../logo_original.png'
import MSULogo from '../Montana_State_Bobcats_logo.svg.png'
import GapFillersLogo from '../gap-fillers-flathead-logo.png'
export class Experience extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }
    render() {
        return (
            <div className="Experience">
                <h1 className="top-header">What I'm doing</h1>
                <Row xs="1" sm="2" md="2">
                    <Col className="col-md-4 mt-auto mb-auto">
                        <Media>
                            <Media left middle href="#" >
                                <Media src={CDCNLogo} alt="Generic placeholder image" className="col-md-12 mw-100" />
                            </Media>
                        </Media>
                    </Col>

                    <Col className="col-md-8">
                        <Media body>
                            <Media heading>
                                Consumer Direct Care Network
                            </Media>
                            Incorporated cybersecurity priorities into development projects to reduce
                            potential liability and increase customer security.
                            ● Created long-term development plans to optimize performance within
                            multi-project and multi-team environments.
                            ● Recruited technical subject matter experts to plan and monitor software
                            development teams through phases of project completion.
                            ● Estimated work hours and tracked progress using Scrum methodology.
                            ● Coordinated deployments of new software, feature updates and fixes.
                            ● Built databases and table structures for web applications.
                            ● Tested and deployed scalable and highly available software products.

                        </Media>
                    </Col>
                </Row>

                <Row xs="1" sm="2" md="2">
                    <Col className="col-md-4 mt-auto mb-auto">
                        <Media>
                            <Media left middle href="#" >
                                <Media src={ampdLogo} alt="Generic placeholder image" className="col-md-12 mw-100" />
                            </Media>
                        </Media>
                    </Col>

                    <Col className="col-md-8">
                        <Media body>
                            <Media heading>
                                AMPD Engagement
                            </Media>
                            Web App designed for teachers and researchers to collect and visualize data from students in their classes.
                            Worked with team members to deliver a web application. written using React, JavaScript, MySQL, Sequelize (ORM),
                            Express (Server), and other APIs and packages.
                            Created multiple views for different that render without refreshing.
                            Connected MySQL server to Front end along with R shiny
                            Server.
                        </Media>
                    </Col>
                </Row>

                <Row xs="1" sm="2" md="2">
                    <Col className="col-md-4 mt-auto mb-auto">
                        <Media>
                            <Media left middle href="#" >
                                <Media src={MSULogo} alt="Generic placeholder image" className="col-md-12 mw-100" />
                            </Media>
                        </Media>
                    </Col>

                    <Col className="col-md-8">
                        <Media body>
                            <Media heading>
                                Montana State University
                            </Media>
                            Bachelor's in Computer Science and a Minor in statistics.
                            Montana State University - Bozeman, MT
                            August 2017 to May 2020
                            GPA: 3.8
                            College was a lot of work and a lot of fun!

                        </Media>
                    </Col>
                </Row>

                <Row xs="1" sm="2" md="2">
                    <Col className="col-md-4 mt-auto mb-auto">
                        <Media>
                            <Media left middle href="#" >
                                <Media src={GapFillersLogo} alt="Generic placeholder image" className="col-md-12 mw-100" />
                            </Media>
                        </Media>
                    </Col>

                    <Col className="col-md-8">
                        <Media body>
                            <Media heading>
                                Gap FIllers Flathead
                            </Media>
                            Non-profit that focuses on helping students in need particularly girls in middle school or high school.
                            Created Website using HTML5, CSS, and JavaScript.
                            Worked CSS so it is Mobile friendly. INTERESTS
                            Maintain server and SEO.
                        </Media>
                    </Col>
                </Row>
            </div>
        )
    }
}