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
                            <ul>
                                <li>
                                    Incorporated cybersecurity priorities into development projects to reduce
                                    potential liability and increase customer security.
                                </li>
                                <li>
                                    Created long-term development plans to optimize performance within
                                    multi-project and multi-team environments.
                                </li>
                                <li>
                                    Recruited technical subject matter experts to plan and monitor software
                                    development teams through phases of project completion.
                                </li>
                                <li>
                                    Estimated work hours and tracked progress using Scrum methodology.
                                </li>
                                <li>
                                    Built databases and table structures for web applications.
                                </li>
                                <li>
                                    Tested and deployed scalable and highly available software products.
                                </li>
                            </ul>
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
                            <ul>
                                <li>
                                    Worked with team members to deliver a web application.
                                </li>
                                <li>
                                    written using React, JavaScript, MySQL, Sequelize (ORM), Express (Server), and other APIs and packages.
                                </li>
                                <li>
                                    Created multiple views for different that render without refreshing.
                                </li>
                                <li>
                                    Connected MySQL server to Front end along with R shiny
                                    Server.
                                </li>
                            </ul>
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
                            <ul>
                                <li>
                                Montana State University - Bozeman, MT
                                </li>
                                <li>
                                August 2017 to May 2020
                                </li>
                                <li>
                                GPA: 3.8
                                </li>
                            </ul>
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
                            <ul>
                                <li>
                                Created Website using HTML5, CSS, and JavaScript.
                                </li>
                                <li>
                                Worked CSS so it is Mobile friendly.
                                </li>
                                <li>
                                Maintain server and SEO.
                                </li>
                            </ul>
                        </Media>
                    </Col>
                </Row>
            </div>
        )
    }
}