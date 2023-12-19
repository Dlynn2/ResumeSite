import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import { toast } from 'react-toastify';


class EmailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      subject: "",
      body: "",
    };

    this.toggle = this.toggle.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.props.openClose();
  }

  sendEmail = () => {
    this.props.email(this.state.subject, this.state.body);
    this.toggle();
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  displaySuccessMessage = () => {
    toast.success('Success message!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  render() {
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} title='Email Me!'>Modal title</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="subject">Email subject</Label>
                <Input name="subject" value={this.state.subject} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="body">Body</Label>
                <Input name="body" type='textarea' onChange={this.handleInputChange} value={this.state.body} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.sendEmail}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EmailModal;