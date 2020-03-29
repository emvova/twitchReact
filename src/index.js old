import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Body extends React.Component {
    render() {
        return (
            <div className="container-fluid" style={{ marginTop: 25 }}>
                <div className="row">
                    <div id="top" className="col-md-3 col-lg-2 col-sm-4 col-xs-6">
                        <div className="panel panel-info">
                            <div
                            className="panel-heading"
                            onclick="getStreams('https://api.twitch.tv/kraken/streams?limit=40&client_id=5umdahxg39d3df4xvs0vbmlmurd9xoc&language=ru%2Cen',true)"
                            >
                            TopGames
                            </div>
                            <div className="panel-body" />
                        </div>
                        <div className="feedback">
                            <span>FeedBack: </span>
                            <a href="mailto:emvovan@gmail.com">emvovan@gmail.com</a>
                        </div>
                    </div>
                    <div id="content" className="col-md-9 col-lg-10 col-sm-8 col-xs-6">
                        <div
                            className="row"
                            style={{ textAlign: "center", marginTop: "-25px", marginBottom: 10 }}
                        >
                        <div className="col-md-6 col-md-offset-3 col-sm-4 col-sm-offset-4 col-xs-12 col-xs-offset-0">
                            <h2>Top Twitch Streams</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3 col-sm-4 col-sm-offset-4 col-xs-12 col-xs-offset-0">
                            <input
                                type="text"
                                id="search"
                                className="form-control"
                                placeholder="type game or channel"
                                autofocus
                                oninput="search(this.value)"
                                onfocus="this.value=''"
                            />
                        </div>
                    </div>
                    <div id="streams" className="row" />
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Body />, document.getElementById('root'));

class Stream extends React.Component{
    render() {
        return (
            <div className="stream">
                <div className="col-md-3 col-sm-4 col-xs-12 col-lg-1-5">
                    <Url display_name={this.props.display_name} channel_name={this.props.channel_name}/>
                    <Thumb id={this.props.id} channel_name={this.props.channel_name} display_name={this.props.display_name} game={this.props.game} viewers={this.props.viewers}/>
                </div>
            </div>
        )
    }
}

class Url extends React.Component{
    render() {
        return (
            <div align="center">
                <a href={"potplayer://https://twitch-tv.glitch.me/"+this.props.name+".m3u8"}>
                {this.props.display_name}
                </a>
            </div>
        )
    }
}

class Thumb extends React.Component{
    render() {
        return (
            <div className="thumb">
                <a className="fancyimage" title={this.props.display_name} rel="group" id={this.props.id} href="#foo">
                    <img
                    className="img-responsive"
                    alt={"streem "+this.props.display_name}
                    src={"https://static-cdn.jtvnw.net/previews-ttv/live_user_"+this.props.channel_name+"-640x360.jpg?"+ new Date().getTime()}
                    />
                </a>
                <a className="boxart" title={this.props.game} href="#foo">
                    <img
                    className="boxart"
                    name={this.props.game}
                    alt={"boxart "+this.props.game}
                    src={"https://static-cdn.jtvnw.net/ttv-boxart/"+this.props.game+"-52x72.jpg"}
                    />
                </a>
                <p className="channelName">
                    <a
                    style={{ color: "white" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"http://twitch-tv.glitch.me/player_new/"+this.props.channel_name}
                    >
                    {this.props.display_name}
                    </a>
                    <br />
                    {this.props.viewers/1000}
                </p>
        </div>
        )
    }
}
var topStreams = 'https://api.twitch.tv/kraken/streams?limit=40&client_id=5umdahxg39d3df4xvs0vbmlmurd9xoc';
function getJson(uri,callback){
    var requestURL = new XMLHttpRequest();
    requestURL.open("GET", uri || 'https://api.twitch.tv/kraken/streams?limit=40&client_id=5umdahxg39d3df4xvs0vbmlmurd9xoc');
    requestURL.setRequestHeader("Client-ID", "kimne78kx3ncx6brgo4mv6wki5h1ko");
    requestURL.overrideMimeType('application/vnd.twitchtv.v5+json');
    requestURL.send();
    requestURL.onreadystatechange = function() {
        if (this.readyState !== 4) return;

        // по окончании запроса доступны:
        // status, statusText
        // responseText, responseXML (при content-type: text/xml)

        if (this.status !== 200) {
            // обработать ошибку
            alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
            return;
        }
        var json = JSON.parse(this.responseText);
        //console.log(json);
        if (callback) {
            callback(json);
        }
        
    }
}
getJson(topStreams, (json)=>{
    //console.log(json);
    let array = [];
    for (var i=0; i<json.streams.length;i++) array.push(<Stream id={i} channel_name={json.streams[i].channel.name} display_name={json.streams[i].channel.display_name} game={json.streams[i].channel.game} viewers={json.streams[i].viewers} />);
    ReactDOM.render(array, document.getElementById('streams'));
});
