import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@mui/material";

function Crop({ imageToCrop, uploadMediaCroped, mediaType }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  useEffect(() => {
    console.log("mediaType", mediaType);
  }, [mediaType]);
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    console.log("croppedAreaPixels", croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedImage = async () => {
    const image = await createImage(imageToCrop);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        resolve(file);
      }, "image/jpeg");
    });
  };

  const handleUpload = async () => {
    if (mediaType == "image") {
      if (!imageToCrop || !croppedAreaPixels) return;
      const croppedImage = await getCroppedImage();
      console.log("donee", { croppedImage });
      uploadMediaCroped([croppedImage]);
    } else if (mediaType == "video") {
      uploadMediaCroped([imageToCrop], croppedAreaPixels);
    }
  };
  const showCroppedImage = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;
    const croppedImage = await getCroppedImage();
    const objectUrl = URL.createObjectURL(croppedImage);
    setCroppedImageURL(objectUrl);
  };
  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          background: "#333",
        }}
      >
        {/* si image afficher  Cropper image sinon Cropper video*/}
        {mediaType === "image" ? (
          <Cropper
            image={imageToCrop}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        ) : (
          <Cropper
            video={imageToCrop}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
    
        {croppedImageURL && (
          <img
            src={croppedImageURL}
            alt="Cropped"
            style={{ marginTop: "16px" }}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          style={{ marginTop: "16px" }}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Crop;
