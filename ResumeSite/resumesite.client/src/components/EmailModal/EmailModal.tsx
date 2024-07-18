import React, { ChangeEvent } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  openClose: () => void;
  email: (subject: string, body: string) => void;
  className?: string;
}

interface State {
  isOpen: boolean;
  subject: string;
  body: string;
}

class EmailModal extends React.Component<Props, State> {
  constructor(props: Props) {
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

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // This ensures that TypeScript understands the dynamic key access and updating of state.
    // It's a more type-safe approach to updating state based on input changes.
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  displaySuccessMessage = () => {
    toast.success('Email sent');
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
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