import React, { Fragment, Component } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Fab
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Form from './Form';

class Create extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { open } = this.state;
    const { muscles, onCreate } = this.props;

    return (
      <Fragment>
        <Fab onClick={this.handleToggle} size="small">
          <Add />
        </Fab>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Create a New Exercise
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below.
            </DialogContentText>
            <Form muscles={muscles} onSubmit={onCreate} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default Create;
