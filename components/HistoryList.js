import React, { Component } from 'react';
import { Link } from '@chakra-ui/react';
import axios from 'axios';


export default class HistoriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {histories: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/history')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  exerciseList() {
    return this.state.histories.map(currenthistory => {
      return <History history={currentexercise} key={currenthistory._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.HistoryList() }
          </tbody>
        </table>
      </div>
    )
  }
}