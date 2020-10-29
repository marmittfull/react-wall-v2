import React, { Component } from 'react'
import PhotosHome from './PhotosHome'
import { Route } from 'react-router-dom'
import PostCard from './PostCard'

class Photos extends Component {
  state = {
    loading: false,
    mensagemErro: ''
  }
  obterSubReddit = (key) => {
    if(this.refs.inputSubReddit.value === '')
      this.setState({
        mensagemErro: 'Informe um subreddit!'
      })
    else if (key.keyCode === 13) {
      this.setState({
        loading: true,
        mensagemErro: ''
      })
      this.props.obterSubReddit(this.refs.inputSubReddit.value).then(
        () => {
          this.setState({
            loading: false,
          })
          this.refs.inputSubReddit.value = ''
        }
      ).catch(() =>
        this.setState({
          loading: false,
          mensagemErro: 'Nenhuma imagem foi localizada no subreddit ' + this.refs.inputSubReddit.value
        })
      )
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="container my-4">
              <div className="text-center">
                <h5>Busque um subreddit!</h5>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">r/</span>
                </div>
                <input ref="inputSubReddit" onKeyUp={this.obterSubReddit} type="text" className="form-control" />
              </div>
              <small className="text-muted">Pressioner Enter para buscar o subreddit.</small>
            </div>
          </div>
        </div>
        <div className="col-md-9" style={{ minHeight: '75vh' }}>
          <div className="card h-100 mt-4 mt-md-0">
            <div className="container my-3 align-items">
              {this.props.posts == '' && !this.state.loading && <Route exact path={this.props.match.url} component={PhotosHome} />}
              {this.state.loading &&
                <div className="d-flex h-100 justify-content-center align-items-center">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              }
              {this.state.mensagemErro &&
                <p className="alert alert-danger col-md-7">{this.state.mensagemErro}</p>}
              <div className="row justify-content-around">
                {this.props.posts && this.props.posts.map(post => <PostCard post={post} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Photos