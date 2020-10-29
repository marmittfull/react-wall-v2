import React, { Component } from 'react'

class PostCard extends Component {
  render() {
    return (
      <div className="col-md-5 d-flex mt-3 p-0">
        <div className="card">
          <img className="w-100" style={{ height: '200px' }}
            src={this.props.post.small_img} alt="cardImg" />
          <div className="card-footer" >
            {/* <h6>{this.props.post.title}</h6> */}
            <a target='new' href={this.props.post.url}>{this.props.post.url}</a>
          </div>
        </div>
      </div>
    )
  }
}
export default PostCard