import React, { Fragment, Component } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Fab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

const styles = theme => ({
  FormControl: {
    width: 500
  }
});

class Create extends Component {
  state = {
    open: false,
    exercise: {
      title: '',
      description: '',
      muscles: ''
    }
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      exercise: {
        ...this.state.exercise,
        [name]: value
      }
    });
  };

  handleSubmit = () => {
    // TODO: validate

    const { exercise } = this.state;

    this.props.onCreate({
      ...exercise,
      id: exercise.title.toLowerCase().replace(/ /g, '-')
    });

    this.setState({
      exercise: {
        title: '',
        description: '',
        muscles: ''
      },
      open: false
    });
  };

  render() {
    const {
      open,
      exercise: { title, description, muscles }
    } = this.state;

    const { muscles: categories, classes } = this.props;

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
            <form>
              <TextField
                label="Title"
                value={title}
                onChange={this.handleChange('title')}
                margin="normal"
                className={classes.FormControl}
              />
              <br />
              <FormControl className={classes.FormControl}>
                <InputLabel htmlFor="muscles">Muscles</InputLabel>
                <Select value={muscles} onChange={this.handleChange('muscles')}>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <TextField
                label="Description"
                value={description}
                onChange={this.handleChange('description')}
                multiline
                rows="4"
                margin="normal"
                className={classes.FormControl}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSubmit}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Create);
