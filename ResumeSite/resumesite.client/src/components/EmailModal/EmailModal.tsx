import React, { ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
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
    this.displaySuccessMessage();
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      <Dialog open={this.state.isOpen} onClose={this.toggle} className={this.props.className}>
        <DialogTitle>Email Me!</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="subject"
            label="Email Subject"
            type="text"
            fullWidth
            variant="outlined"
            name="subject"
            value={this.state.subject}
            onChange={this.handleInputChange}
          />
          <TextField
            margin="dense"
            id="body"
            label="Body"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="body"
            value={this.state.body}
            onChange={this.handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.sendEmail} color="primary">Send</Button>
          <Button onClick={this.toggle} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EmailModal;