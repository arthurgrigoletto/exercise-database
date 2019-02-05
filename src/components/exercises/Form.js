import React, { Component } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  FormControl: {
    width: 500
  }
});

class Form extends Component {
  state = this.getInitialState();

  getInitialState() {
    const { exercise } = this.props;

    return exercise ? exercise : { title: '', description: '', muscles: '' };
  }

  handleChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    });

  handleSubmit = () => {
    // TODO: validate

    const { exercise } = this.state;

    this.props.onSubmit({
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
    const { muscles: categories, classes } = this.props;
    const { title, muscles, description } = this.state;
    return (
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
        <br />
        <Button color="primary" variant="contained" onClick={this.handleSubmit}>
          Create
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(Form);
