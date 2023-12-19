import React, { useState } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import '../../custom.css';
import EmailModal from '../EmailModal/EmailModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class IconBar extends React.Component {
    static displayName = 'IconBar'; // You can set the displayName directly

    state = {
        isEmailPopOpen: false,
    };

    // Use arrow functions for class methods to avoid manual binding
    displaySuccessMessage = () => {
        toast.success('Email sent!', {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    // Use async/await to handle the fetch response
    email = async (emailSubject, emailbody) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailSubject, emailBody: emailbody }), // Use object destructuring
        };

        const response = await fetch('email', requestOptions);
        const { error } = await response.json();

        if (error) {
            this.displaySuccessMessage();
        } else {
            this.displaySuccessMessage();
        }
    };

    // Simplify the greeting method
    greeting = () => {
        this.setState((prevState) => ({
            isEmailPopOpen: !prevState.isEmailPopOpen,
        }));
    };

    render() {
        return (
            <div>
                <ul className="icon-bar">
                    <li>
                        <a href="https://www.facebook.com/dylan.lynn.56" className="facebook" id="facebook"><i className="fa fa-facebook"></i></a>
                        <UncontrolledTooltip placement="right" target="facebook">
                            Facebook
                        </UncontrolledTooltip>
                    </li>
                    <li>
                        <a href="https://github.com/Dlynn2" className="github" id="github"><i className="fa fa-github"></i></a>
                        <UncontrolledTooltip placement="right" target="github">
                            Github
                        </UncontrolledTooltip>
                    </li>
                    <li>
                        <a onClick={this.greeting} className="google" id="email"><i className="fa fa-envelope"></i></a>
                        <UncontrolledTooltip placement="right" target="email">
                            Email me!
                        </UncontrolledTooltip>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/dylan-lynn-47b76965/" className="linkedin" id="linkedIn"><i className="fa fa-linkedin"></i></a>
                        <UncontrolledTooltip placement="right" target="linkedIn">
                            LinkedIn
                        </UncontrolledTooltip>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/dylan-lynn-47b76965/" className="resume" id="resume"><i className="fa fa-file-pdf-o"></i></a>
                        <UncontrolledTooltip placement="right" target="resume">
                            Download my resume.
                        </UncontrolledTooltip>
                    </li>
                </ul>
                {this.state.isEmailPopOpen && (
                    <EmailModal isOpen={this.state.isEmailPopOpen} openClose={this.greeting} email={this.email} />
                )}
            </div>
        );
    }
}

export default IconBar;
