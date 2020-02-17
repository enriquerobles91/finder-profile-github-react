import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default  class DataGrid extends Component {
    
    render() {

        const data = this.props.data;
        const repositories = this.props.repo;
                
        return (
            <>
                <table className="ui celled table">
                    <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Bio</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                        {!data.avatar_url ? (
                            " "
                        ) : (
                            <img
                            className="ui small circular image"
                            src={data.avatar_url}
                            alt={data.avatar_url}
                            />
                        )}
                        </td>
                        <td>{data.name}</td>
                        <td>{data.location}</td>
                        <td>{data.bio}</td>
                    </tr>
                    </tbody>
                </table>
                        <h2 
                            className="ui header"
                            style={{display:repositories.length > 0 ? "block": "none"}}
                        >
                            The {repositories.length < 6 ? repositories.length : 6} most relevant Repositories
                        </h2>
                <div className="ui three column doubling grid container">
                    {
                        repositories.map(repo => (      
                            <div className="column" key={repo.id}>
                                <div className="ui cards">
                                    <div className="card">
                                        <div className="content">
                                            <div className="header">{repo.name}</div>
                                            <div className="meta">{repo.language}</div>
                                            <div className="description">
                                                <p style={{textAlign: "justify"}}>{repo.description}</p>
                                                <br />
                                                <p className="right aligned header">
                                                    <Link to={{
                                                        pathname:'/contributors',
                                                        state:{
                                                            contributors_url: repo.contributors_url,
                                                            test: "hola"
                                                        }
                                                    }}>
                                                        <span>Top Contributors</span>
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="extra content">
                                            <span className="left floated like">
                                                <i className="star icon"></i>  
                                                {repo.stargazers_count}                                          
                                            </span>
                                            <span className="right floated star">
                                                <i className="exclamation triangle icon"></i>  
                                                {repo.open_issues}                                          
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>                             
                        ))
                    }           
                </div> 
            </>
        );
        
    }
};
