import React, { Component, Fragment } from 'react';
import Post from '../../component/Post/Post';
import './Blogpost.css';
import axios from 'axios';

class Blogpost extends Component {
    state = {
        post: [],
        formBlogpost: {
            userId : 1,
            id : 1,
            title : '',
            body : ''
        }
    }

    getPostAPI = () => {
        axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
        .then((result)=>{
            this.setState({
                post: result.data
            })
        })
    }

    postDatatoAPI = () => {
        axios.post(`http://localhost:3004/posts`, this.state.formBlogpost).then((result) => {
            console.log(result);
            this.getPostAPI()
        }, (err) => {
            console.log('error:', err)
        })
    }

    handleRemove = (data) => {
        axios.delete(`http://localhost:3004/posts/${data}`).then((result)=>{
            this.getPostAPI()
        })
    }

    handleFormChange = (event) => {
        let formBlogpostNew = {...this.state.formBlogpost};
        let timestamp = new Date().getTime();
        formBlogpostNew['id'] = timestamp;
        formBlogpostNew[event.target.name] = event.target.value;
        this.setState({
            formBlogpost:formBlogpostNew
        })
    }

    handleSubmit = () => {
        this.postDatatoAPI();
        this.setState({
            formBlogpost:{
                title:'',
                body:''
            }
        })
    }

    componentDidMount(){
        this.getPostAPI();
    }

    render(){
        return(
            <Fragment>
                <p className="section-title">Blogpost</p>
                <div className="form-add-post">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="add title" onChange={this.handleFormChange} value={this.state.formBlogpost.title}/>
                    <label htmlFor="body">Blog Content</label>
                    <textarea name="body" id="body" cols="30" rows="10" onChange={this.handleFormChange} value={this.state.formBlogpost.body}></textarea>
                    <button className="btn-submit" onClick={this.handleSubmit}>Simpan</button>
                </div>
                {
                    this.state.post.map(post => {
                       return <Post key={post.id} data={post} remove={this.handleRemove} />
                    })
                }
            </Fragment>
        )
    }
}

export default Blogpost;