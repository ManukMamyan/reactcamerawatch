import React, { Component } from 'react';

import Pictures from './components/Pictures';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();

    this.state = {
      width: 320,
      height: 0,
      streaming: false,
      pictures: []
    };
  }

  componentDidMount() {
    const video = this.videoRef.current;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log('An error occurred: ' + err);
      });
  }

  setVideoParams = () => {
    const video = this.videoRef.current;
    const canvas = this.canvasRef.current;
    const { height, width, streaming } = this.state;
    if (!streaming) {
      this.setState({
        height: video.videoHeight / (video.videoWidth / width)
      });

      if (isNaN(height)) {
        this.setState({
          height: width / (4 / 3)
        });
      }

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      this.setState({
        streaming: true
      });
    }
  };

  takePicture = () => {
    const video = this.videoRef.current;
    const canvas = this.canvasRef.current;
    const { height, width, pictures } = this.state;

    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const data = canvas.toDataURL('image/png');
    const newPictures = [...pictures, data];

    this.setState({
      pictures: newPictures
    });
  };

  render() {
    const { pictures } = this.state;

    return (
      <div className='contentarea'>
        <h1>Demo проект - фото с камеры</h1>
        <p>Нажмите take photo, чтобы сфотографироваться.</p>
        <div className='camera'>
          <video ref={this.videoRef} id='video' onCanPlay={this.setVideoParams}>
            Video stream not available.
          </video>
          <button id='startbutton' onClick={this.takePicture}>
            Take photo
          </button>
        </div>
        <canvas id='canvas' ref={this.canvasRef}></canvas>
        <Pictures pictures={pictures} />
      </div>
    );
  }
}

export default App;
