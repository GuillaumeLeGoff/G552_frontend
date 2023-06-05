import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";

function Crop({ imageToCrop, uploadMediaCroped, mediaType }) {
  const theme = useTheme();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
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
    if (mediaType === "image") {
      if (!imageToCrop || !croppedAreaPixels) return;
      const croppedImage = await getCroppedImage();
      uploadMediaCroped([croppedImage]);
    } else if (mediaType === "video") {
      uploadMediaCroped([imageToCrop], croppedAreaPixels);
    }
  };
  /*  */
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
        {mediaType === "image" && (
          <Cropper
            image={imageToCrop}
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
        <Button
          sx={{ backgroundColor: theme.palette.secondary.main }}
          variant="contained"
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
