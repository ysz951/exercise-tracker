import React, { Component } from 'react'
import axios from 'axios'

class CreateUsers extends Component {
    constructor(props) {
        super(props)

        this.ChangeHandler = this.ChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    
        this.state = {
             username:'',
             password:''
        }
    }

    ChangeHandler(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        const user = {
          username: this.state.username,
          password: this.state.password
        }
        console.log(user)

        axios.post('http://localhost:5000/users/add', user)
             .then(res => console.log(res.data))

        this.setState({
            username:''
        })
    }
    render() {
        return (
            <div>
                 <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                    type="text"
                    required
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.ChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                    type="password"
                    required
                    name="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.ChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Create User"
                    className="btn btn-primary"
                    />
                </div>
                </form>
            </div>
        )
    }
}

export default CreateUsers
