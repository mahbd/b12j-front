import React from 'react';
import Form from "../../common/Form";
import {SuperContext} from "../../context";
import {renderCol2} from "../../common/helperFunctions";

class ContestForm extends Form {
  static contextType = SuperContext;

  state = {
    data: {
      testers: [1],
      writers: [],
      title: '',
      start_time: undefined,
    },
    errors: {}
  }

  schema = {
    testers: {
      arrLength: {min: 1, max: 5}
    },
    writers: {
      arrLength: {min: 1, max: 5}
    },
    title: {
      length: {min: 10, max: 255}
    },
    start_time: {required: true},
    end_time: {required: true},
    text: {required: true, length: {min: 1, max: 20}}
  }

  extraValidation() {
    const errors = {...this.state.errors};
    if (Date.parse(this.state.data.start_time) < Date.now()) {
      errors['start_time'] = 'Start time can not be past'
    }
    if (Date.parse(this.state.data.end_time) < Date.now()) {
      errors['end_time'] = 'End time can not be past'
    }
    if (Date.parse(this.state.data.start_time) >= Date.parse(this.state.data.end_time)) {
      errors['start_time'] = 'Contest can not start after end'
      errors['end_time'] = 'Contest can not end before start'
    }
    this.setState({errors});
  }

  doSubmit = () => {
    this.extraValidation()
    console.log(this.state.errors)
  }

  check = () => {
    console.log("Error", this.state.errors)
    console.log("data", this.state.data)
  }

  convertRawUsers() {
    const rawUserList = this.context.userActs.getList();
    const userList = [];
    for (let i = 0; i < rawUserList.length; i++) {
      const user = rawUserList[i];
      userList.push({value: user.id, label: `${user.id}: ${user.first_name} ${user.last_name}   ${user.email}`});
    }
    return userList;
  }

  render() {
    return (
      <div>
        <h1>Add new contest</h1>
        {renderCol2(this.renderSelect('writers', this.convertRawUsers(), 'Contest Writers', true),
          this.renderSelect('testers', this.convertRawUsers(), 'Contest Testers', true)
        )}
        {this.renderInput('title', 'Contest Title')}
        {renderCol2(this.renderInput('start_time', 'Contest Start Time', 'datetime-local'),
          this.renderInput('end_time', 'Contest End Time', 'datetime-local')
        )}
        {this.renderEditor('text', 'About Contest')}
        {this.renderSubmitButton('Submit')}
        <button onClick={this.check}>Check</button>
      </div>
    );
  }
}

export default ContestForm;