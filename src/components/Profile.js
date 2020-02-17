import React, { Component } from "react";
import DataGrid from "./DataGrid";
import {withRouter} from 'react-router-dom';

class Profile extends Component {

    state = {
        data: {},
        username: "",
        repositories: []
    }

    onChange = (e) => {
        this.setState({
                data: this.state.data,
                username: e.target.value,
                repositories: this.state.repositories
        });
    }

    submitHandler = async (e) => {
        e.preventDefault();

        const prof = await fetch(`https://api.github.com/users/${this.state.username}`);
        let profJson = await prof.json();

        if (profJson.hasOwnProperty('login'))
        {
            const repositories = await fetch(profJson.repos_url);
            let repoJson = await repositories.json();

            repoJson = repoJson
                        .sort(function(a, b){                  
                            return b["stargazers_count"] - a["stargazers_count"];
                        })
                        .slice(0, 6);

            this.setState({
                data: profJson,
                username: this.state.username,
                repositories: repoJson
            });            
        }
        else {
            this.setState({
                data: {},
                username: this.state.username,
                repositories: []
            });
        }
    }

    render(){
        return (
            <div>
                <div className="ui search">
                    <div className="ui action input">
                        <input
                            placeholder="search a github user"
                            type="text"
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                        <button
                            className="ui  button"
                            type="submit"
                            onClick={this.submitHandler}
                        >
                            <i className="github icon"></i>
                            Search
                        </button>
                    </div>
                    <DataGrid data={this.state.data} repo={this.state.repositories} />
                </div>
            </div>)
        }
}

export default withRouter(Profile);