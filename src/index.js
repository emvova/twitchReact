import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from "react-infinite-scroll-component";
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
                            //onClick="getStreams('https://twitch-tv.glitch.me/api/kraken/streams?limit=40&client_id=5umdahxg39d3df4xvs0vbmlmurd9xoc&language=ru%2Cen',true)"
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
                        <div id="headerMain">
                            <div className="row"
                                style={{ textAlign: "center", marginTop: "-25px", marginBottom: 10 }}
                            >
                                <div className="col-md-6 col-md-offset-3 col-sm-4 col-sm-offset-4 col-xs-12 col-xs-offset-0">
                                    <h2>Top Twitch Streams</h2>
                                </div>
                            </div>
                            <div id ="search" className="row sticky" style={{"padding-bottom": "20px"}}>
                                <div className="col-md-6 col-md-offset-3 col-sm-4 col-sm-offset-4 col-xs-12 col-xs-offset-0">
                                    <input
                                        type="text"
                                        id="search"
                                        className="form-control"
                                        placeholder="type game or channel"
                                        autoFocus
                                        onInput="search(this.value)"
                                        onFocus="this.value=''"
                                    />
                                </div>
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


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      url: 'https://twitch-tv.glitch.me/api/kraken/streams?limit=40',
      pageNo: 1,
      displayCount: 5,
      noMoreData: false
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }


  fetchData() {
    const { items, url, pageNo, noMoreData } = this.state;

    if (noMoreData) {
      console.log('no more data');
      return;
    }
    fetch(url, {
      headers: {
        'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Content-type': 'application/vnd.twitchtv.v5+json'
      }
    })
      .then(res => res.json())
      .then(
          (result) => {
              this.setState({
              isLoaded: true,
              items: [ ...items, ...result.streams ],
              url: result._links.next,
              pageNo: pageNo + 1
              });
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
              this.setState({
              isLoaded: true,
              error
              });
          }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchData}
            hasMore={!this.state.noMoreData}
            loader={<h4>Loading...</h4>}
            style={{overflow: "hidden"}}
          >
            { items.map((item, index) => (
              <Stream key={`item-${index}`} channel_name={item.channel.name} display_name={item.channel.display_name} game={item.channel.game} viewers={item.viewers} />
            ))}
          </InfiniteScroll>
      );
    }
  }
}
ReactDOM.render(<App />, document.getElementById('streams'));
