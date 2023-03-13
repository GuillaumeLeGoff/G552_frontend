import React, {useCallback, useEffect, useState} from "react";
import Cropper from "react-easy-crop";
import 'react-image-crop/dist/ReactCrop.css';

function ImageCropper(props) {
    
    const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])
  return (
    <div>

        <Cropper
          image={props.imageToCrop}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
    </div>
  )
    }

export default ImageCropper;
