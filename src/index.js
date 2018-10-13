import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
 

const API_KEY = 'AIzaSyD6EwjrpDKyXeIjoVRSw29EJsxIpJ-XMiw';

// Create new component. This component should produce some HMTL
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            youtubeUrl: '',
            youtubeUrltext: '',
            history:[],
            showPreview: false
        };
    }
    _changeTextContent(e) {
        this.setState({youtubeUrltext: e.target.value});
    } 
    _changeContent(e) {
        this.setState({youtubeUrl: this.state.youtubeUrltext});
        this._validateYouTubeUrl(this.state.youtubeUrltext);
    } 

    _validateYouTubeUrl(url) {    
        if (url != undefined || url != '') {        
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                var embededUrl = 'https://www.youtube.com/embed/' + match[2] + '?autoplay=1&enablejsapi=1';
                 let currentHistory = this.state.history ;
                 currentHistory.push(url);
                this.setState({youtubeUrl: embededUrl});
                this.setState({showPreview: true,history:currentHistory});
            } else {
                this.setState({youtubeUrl: url});
                this.setState({showPreview: true});
            }
        }
    }

    render() {
        var partial,historylist;
        if(this.state.showPreview) {
            partial = <div  ><iframe id="videoObject" src={this.state.youtubeUrl} width="500" height="265" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>;
        }
      historylist = () => (this.state.history.filter((g,k)=>(k<3)).map(r=>(<li className="list-group-item">{r}</li>)))
        return (
            <div>
                <div className="col-md-8">
                    <input type="text" id="youtubeUrl" value= {this.state.youtubeUrltext}  style={{width:"100%"}} onChange={this._changeTextContent.bind(this)} placeholder="Enter your YouTube URL here"/>
                </div>
                <div className="col-md-4">
                     <button  onClick={this._changeContent.bind(this)} text="Search Video" >Search Video</button>
                </div>
                {partial}
                  <div>
        {this.state.history.length>0 ? (<b>History</b>):null}
                </div>
                <div>
               
                <ul className="list-group">
               
                 { historylist()}   
                    </ul>
                </div>
            </div>
        );

    }
}


// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));