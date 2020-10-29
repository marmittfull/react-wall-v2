import React, { Component } from 'react'
import Home from './Home'
import Photos from './Photos'
import axios from 'axios'
import {
  BrowserRouter as Router, Route, Link
} from 'react-router-dom'

class App extends Component {
  state = {
    posts: []
  }
  obterSubReddit = (subReddit) => {
    this.setState({
      posts: []
    })
    const url = `https://www.reddit.com/r/${subReddit}.json?&limit=25&raw_json=1`
    return axios.get(url).then(res => {
      res.data.data.children.map(post => {
        try {
          if (post.data.preview && post.data.preview.images[0].resolutions[4]) {
            const parent_img = post.data.preview.images[0].resolutions[4].url;
            this.setState({
              posts: [...this.state.posts, {
                id: post.data.id,
                title: post.data.title,
                thumbnail: post.data.thumbnail,
                url: post.data.url,
                author: post.data.author,
                small_img: parent_img,
              }]
            })
          }
        } catch (e) {
          console.log(e);
          Promise.reject(e)
        }
      })
    })
  }
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <a className="navbar-brand">React Wallpaper v2</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#meuNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="meuNav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                  <li className="nav-item"><Link to="/photos" className="nav-link">Photos</Link></li>
                </ul>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item"><a target='new' href="https://www.facebook.com/Marmitt2003/" className="nav-link fab fa-2x fa-facebook"></a></li>
                  <li className="nav-item"><a target='new' href="https://www.instagram.com/tiago_marmitt/" className="nav-link fab fa-2x fa-instagram"></a></li>
                  <li className="nav-item"><a target='new' href="https://www.linkedin.com/in/tiago-marmitt-762bb61b0/" className="nav-link fab fa-2x fa-linkedin"></a></li>
                  <li className="nav-item"><a target='new' href="https://github.com/marmittfull" className="nav-link fab fa-2x fa-github"></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container my-5">
            <Route exact path={'/'} component={Home} />
            <Route path={'/photos'} render={(props) =>
              <Photos {...props} 
                obterSubReddit={this.obterSubReddit}
                posts={this.state.posts}
              />} 
              />
          </div>
        </div>
      </Router>
    )
  }
}
export default App