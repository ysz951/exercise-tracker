import React, { Component } from 'react';
import axios from 'axios';
export default class ImagePart extends Component {
    state = {
        selectedFile: null,
        img_src: null,
        display_img: null,
        recipeName: "",
        recipeContent: "",
        categoryId: null,
    };
    singleFileChangedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            display_img: event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : null,
        });
    };

    //   upLoadImage = data => {
    //     console.log(data._boundary);
    //     return axios.post( `http://localhost:5000/api/aws/profile-img-upload`, data, {
    //       headers: {
    //       // 'accept': 'application/json',
    //       'Content-Type': `multipart/form-data`
    //       }
    //   })
    //   }

    upLoadImage = (data) => {
        return axios.post(`http://localhost:5000/api/aws/profile-img-upload`, data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })
    }

    singleFileUploadHandler = (ev) => {
        ev.preventDefault();
        const data = new FormData();
        // // this.context.clearError();
        // console.log(data);
        // console.log(this.state.selectedFile);
        if (this.state.selectedFile) {
            console.log(this.state.selectedFile);
            data.append( 'profileImage', this.state.selectedFile, this.state.selectedFile.name);
            // const data = new FormData()
            this.upLoadImage(data)
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err.response.data);
                });
        }
        else {
            // if file not selected throw error
            alert("Please upload file")
            // this.context.setError('Please upload file')
        }
    };
    imagePart = () => {
        return (
            <div className="container">
                <div className="card border-light mb-3 mt-5">
                    <div className="card-header">
                        <p className="text-muted">
                            Upload Size: 250px x 250px ( Max 2MB )
                  </p>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            Please upload an image for your profile
                      <span className='Required red'>
                                &#42;
                      </span>
                        </p>
                        <input type="file" onChange={this.singleFileChangedHandler} />
                        <div className="fix250Square">
                            {this.state.display_img ?
                                <img src={this.state.display_img} alt="" />
                                :
                                <img src={this.state.img_src} alt="" />}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div >
                <p>Hello</p>
                <form
                    className='EditForm'
                    onSubmit={this.singleFileUploadHandler}
                >
                    {this.imagePart()}
                    <button
                        className="btn btn-info"
                        type='submit'
                    >
                        Update
                    </button>
                </form>
            </div>
        );
    }
}

