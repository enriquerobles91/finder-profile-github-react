import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

class Contributors extends Component {

    state = {
        constributions: [],
        partialData:[],
        totalRecords: 0,
        currentStartRecord: 0,        
        currentEndRecord: 10,        
        initialLoadRecord: 10,
        NumLoadRecord:5,
        isTheLimit: true,

    }

    async componentDidMount() {
        
        if (this.props.location.state === undefined)
            return;
    
        const { contributors_url } = this.props.location.state;
        
        const data = await fetch(contributors_url);
        const dataJson = await data.json();
        let count = Object.keys(dataJson).length;

        this.setState({
            constributions: dataJson,
            partialData: dataJson.slice(this.state.currentRecord, this.state.initialLoadRecord),
            totalRecords: count,
            isTheLimit: this.state.initialLoadRecord  >= count,
            contributors_url: contributors_url
        });
    }

    LoadMoreData = () => {
  
        let start = this.state.currentStartRecord;
        let end = this.state.currentEndRecord;
        const toAdd = this.state.NumLoadRecord;
        const total = this.state.totalRecords;

        if (end >= total)
            return;        
            
        
        start = end;
        end = end + toAdd;

        this.setState({
            partialData: this.state.constributions.slice(0, end),
            currentStartRecord: start,
            currentEndRecord: end,
            isTheLimit: end >= total
        });
    }

    Style = () => {
        return {
            display: this.state.isTheLimit ? "none":"block",
            textAlign:"right",
            margin:"20px 10px 30px 0px"
        }
    }

    contributor = (obj) => {
        
        return (
            obj.map(cons => (      
                <div className="column" key={cons.id}>
                    <div className="ui card">

                        <div className="image">
                            {
                                !cons.avatar_url ? (
                                " "
                                ) : (
                                    <img   
                                        className="ui small image"                                    
                                        src={cons.avatar_url}
                                        alt={cons.avatar_url}
                                    />
                            )}                                
                        </div>
                        <div className="content">
                            <span className="header">{cons.login}</span>
                            <div className="meta">
                                <span className="date"></span>
                            </div>
                            <div className="description">
                                <a
                                    href={cons.html_url}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Profile
                                </a>
                            </div>
                        </div>
                        <div className="extra content">
                            <span>
                                <i className="handshake outline icon"></i>
                                {cons.contributions} contribution(s)
                            </span>
                        </div>                       
                    </div>
                </div>                             
            ))
        )
    }

    render(){
        return (
            <>
            <div className="ui grid">
                <div className="eight wide column">
                    <h1 className="ui header">Contributors</h1>
                </div>
                <div className="eight wide column right aligned header">
                    <button className="ui default button" onClick={() => this.props.history.push("/")}>
                        Go Back
                    </button>
                </div>
            </div>
            <div className="ui five column doubling grid container" id="contributors"> 
                {this.contributor(this.state.partialData)}
            </div> 
            <div style={this.Style()}>
                <button className="ui primary button" onClick={this.LoadMoreData}>
                    <i className="plus square outline icon"></i>
                    Load more
                </button>
            </div>
            </>
        )
    }
}

export default withRouter(Contributors);