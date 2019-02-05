import React, { Fragment } from 'react';
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import Form from './Form';

const styles = {
  Paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    heigth: 500,
    overflowY: 'auto'
  }
};
export default ({
  exercises,
  muscles,
  exercise,
  exercise: {
    id,
    title = 'Welcome!',
    description = 'Please selecte an exercise from the list on the left'
  },
  editMode,
  category,
  onSelect,
  onDelete,
  onSelectEdit,
  onEdit
}) => (
  <Grid container spacing={24}>
    <Grid item sm>
      <Paper style={styles.Paper}>
        {exercises.map(([group, exercises]) =>
          !category || category === group ? (
            <Fragment key={group}>
              <Typography
                variant="headline"
                style={{ textTransform: 'capitalize' }}
              >
                {group}
              </Typography>
              <List component="ul">
                {exercises.map(({ id, title }) => (
                  <ListItem key={id} button onClick={() => onSelect(id)}>
                    <ListItemText primary={title} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => onSelectEdit(id)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => onDelete(id)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Fragment>
          ) : null
        )}
      </Paper>
    </Grid>
    <Grid item sm>
      <Paper style={styles.Paper}>
        {editMode ? (
          <Form exercise={exercise} muscles={muscles} onSubmit={onEdit} />
        ) : (
          <Fragment>
            <Typography variant="display1">{title}</Typography>
            <Typography variant="subheading" style={{ marginTop: 20 }}>
              {description}
            </Typography>
          </Fragment>
        )}
      </Paper>
    </Grid>
  </Grid>
);
