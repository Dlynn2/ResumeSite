import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import '../../css/custom.css';
import EmailModal from '../EmailModal/EmailModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class IconBar extends React.Component {
    static displayName = 'IconBar';

    state = {
        isEmailPopOpen: false,
    };

    // Display a success message using React Toastify
    displaySuccessMessage = () => {
        toast.success('Email sent!', {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    // Send an email using the provided subject and body
    email = async (emailSubject, emailBody) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailSubject, emailBody }),
            };

            const response = await fetch('email', requestOptions);
            const { error } = await response.json();

            if (error) {
                this.displaySuccessMessage();
            } else {
                this.displaySuccessMessage();
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    // Toggle the email modal's visibility
    toggleEmailModal = () => {
        this.setState((prevState) => ({
            isEmailPopOpen: !prevState.isEmailPopOpen,
        }));
    };

    render() {
        return (
            <div>
                <ul className="icon-bar">
                    <li>
                        <a href="https://www.facebook.com/dylan.lynn.56" className="facebook" id="facebook">
                            <i className="fa fa-facebook"></i>
                        </a>
                        <UncontrolledTooltip placement="right" target="facebook">
                            Facebook
                        </UncontrolledTooltip>
                    </li>
                    <li>
                        <a href="https://github.com/Dlynn2" className="github" id="github">
                            <i className="fa fa-github"></i>
                        </a>
                        <UncontrolledTooltip placement="right" target="github">
                            Github
                        </UncontrolledTooltip>
                    </li>
                    <li>
                        {/* eslint-disable-next-line */}
                        <a onClick={this.toggleEmailModal} className="google" id="email">
                            <i className="fa fa-envelope"></i>
                        </a>
                        <UncontrolledTooltip placement="right" target="email">
                            Email me!
                        </UncontrolledTooltip>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/dylan-lynn-47b76965/" className="linkedin" id="linkedIn">
                            <i className="fa fa-linkedin"></i>
                        </a>
                        <UncontrolledTooltip placement="right" target="linkedIn">
                            LinkedIn
                        </UncontrolledTooltip>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/dylan-lynn-47b76965/" className="resume" id="resume">
                            <i className="fa fa-file-pdf-o"></i>
                        </a>
                        <UncontrolledTooltip placement="right" target="resume">
                            Download my resume.
                        </UncontrolledTooltip>
                    </li>
                </ul>
                {this.state.isEmailPopOpen && (
                    <EmailModal isOpen={this.state.isEmailPopOpen} openClose={this.toggleEmailModal} email={this.email} />
                )}
            </div>
        );
    }
}

export default IconBar;
