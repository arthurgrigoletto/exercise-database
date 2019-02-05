import React, { Component, Fragment } from 'react';

import { Header, Footer } from './layouts';
import Exercises from './exercises';
import { muscles, exercises } from '../store';

class App extends Component {
  state = {
    exercises,
    editMode: false,
    exercise: {}
  };

  getExercisesByMuscles() {
    const initExercises = muscles.reduce(
      (exercises, category) => ({
        ...exercises,
        [category]: []
      }),
      {}
    );

    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;

        exercises[muscles] = [...exercises[muscles], exercise];

        return exercises;
      }, initExercises)
    );
  }

  handleCategorySelected = category =>
    this.setState({
      category
    });

  handleExerciseSelected = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: false
    }));

  handleExerciseCreate = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise]
    }));

  handleExerciseDelete = id =>
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }));

  handleExerciseSelectedEdit = id =>
    this.setState({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    });
  handleExerciseEdit = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [...exercises.filter(ex => ex.id !== exercise.id), exercise]
    }));

  render() {
    const exercises = this.getExercisesByMuscles();
    const { category, exercise, editMode } = this.state;

    return (
      <Fragment>
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />
        <Exercises
          category={category}
          muscles={muscles}
          editMode={editMode}
          exercise={exercise}
          exercises={exercises}
          onSelect={this.handleExerciseSelected}
          onDelete={this.handleExerciseDelete}
          onSelectEdit={this.handleExerciseSelectedEdit}
          onEdit={this.handleExerciseEdit}
        />
        <Footer
          category={category}
          muscles={muscles}
          onSelect={this.handleCategorySelected}
        />
      </Fragment>
    );
  }
}

export default App;
