import React, { useState } from 'react';
import { Button } from '@mui/material';
import VideoCrop from 'react-video-crop';

function CropVideo(props) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [croppedVideo, setCroppedVideo] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    video.addEventListener('loadedmetadata', () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      ctx.drawImage(
        video,
        croppedArea.x * videoWidth,
        croppedArea.y * videoHeight,
        croppedArea.width * videoWidth,
        croppedArea.height * videoHeight,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      canvas.toBlob((blob) => {
        setCroppedVideo(blob);
      }, 'video/mp4');
    });
  };

  const handleUpload = () => {
    // Code pour envoyer la vidéo recadrée au backend
  };

  return (
    <div>
      {videoUrl ? (
        <VideoCrop
          videoSrc={videoUrl}
          onCropComplete={onCropComplete}
          width={600}
          height={400}
        />
      ) : (
        <div>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              setVideoUrl(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
      )}
      {croppedVideo && (
        <div>
          <video src={URL.createObjectURL(croppedVideo)} controls></video>
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}

export default CropVideo;
