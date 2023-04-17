import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import Crop from "./crop/CropImage";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  Paper,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import EventMediaService from "../../../../services/eventMediaService";
import mediaService from "../../../../services/UploadService";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";
import "../../../../styles/Media.css";
import DeleteMediaDialog from "../../../dialogs/DeleteMediaDialog";
function Medias(props) {
  const style = {
    height: "100%",
    width: "100%",
    bgcolor: "#203038",
    p: 4,
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [dialogUpload, setDialogUpload] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [FileToDelete, setFileToDelete] = useState();
  const [imageToCrop, setImageToCrop] = useState(null);
  const [originalName, setOriginalName] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [longPressTimer, setLongPressTimer] = useState(null);

  const handleTouchStart = (imageId) => {
    clearTimeout(longPressTimer);
    setLongPressTimer(
      setTimeout(() => {
        setSelectedImage(imageId);
      }, 500)
    ); // Appui long de 500 ms
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "video/mp4": [],
    },
    onDrop: (files) => goToCrop(files),
  });

  function DeleteFile() {
    EventMediaService.deleteAllByMedia(FileToDelete.idBdd).then(() => {
      mediaService.delete(FileToDelete).then((result) => {
        displayDialogDelete(false);
        props.getMedias();
        props.getEvents();
      });
    });
  }

  function displayDialogUpload() {
    setDialogUpload(!dialogUpload);
    setImageToCrop(null);
  }

  function OpenDialogDelete(file) {
    displayDialogDelete(true);
    setFileToDelete(file);
  }
  function displayDialogDelete() {
    setDialogDelete(!dialogDelete);
  }

  function goToCrop(event) {
    if (event.target.files[0].type.split("/")[0] === "video") {
      mediaService
      .upload(event.target.files[0], "video")
      .then(() => {
        props.getMedias();
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      console.log(event.target.files[0]);
      setOriginalName(event.target.files[0].name);
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageToCrop(reader.result));
      reader.readAsDataURL(event.target.files[0]);
      setMediaType(event.target.files[0].type.split("/")[0]);
      displayDialogUpload();
    }
  }

  function uploadMediaCroped(event) {
    const fileWithOriginalName = new File([event[0]], originalName, {
      type: "image/jpeg",
    });

    mediaService
      .upload(fileWithOriginalName, mediaType)
      .then(() => {
        props.getMedias();
      })
      .catch((error) => {
        console.error(error);
      });

    displayDialogUpload();
    setImageToCrop(null);
  }

  function handleImageClick(imageId) {
    if (imageId === selectedImage) {
      setSelectedImage(null);
    } else {
      setSelectedImage(imageId);
    }
  }

  return (
    <div>
      <Paper
        className="paper-container"
        style={{
          maxHeight: "calc(94vh - 56px )",
          minHeight: "calc(94vh - 56px )",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 2 }}>
              <ImageIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography color="white" sx={{ padding: 2 }}>
              Media
            </Typography>
          </div>

          <IconButton
            onClick={() => {
              document.getElementById("inputFile").click();
            }}
          >
            <AddIcon color="secondary" />
          </IconButton>

          <input
            type="file"
            id="inputFile"
            style={{ display: "none" }}
            onChange={goToCrop}
          />
        </Stack>

        <Droppable
          droppableId={`${props.eventMedia[1].id}`}
          isDropDisabled={true}
        >
          {(provided) => (
            <div ref={provided.innerRef}>
              {props.eventMedia[1].medias ? (
                props.eventMedia[1].medias.length > 0 ? (
                  <Box
                    sx={{
                      maxHeight: "calc(94vh - 120px)",
                      overflowY: "scroll",
                    }}
                    p={1}
                  >
                    <ImageList variant="masonry" cols={2} gap={8}>
                      {props.eventMedia[1].medias.map((file, index) => (
                        <ImageListItem key={file.id}>
                          <Draggable
                            disableInteractiveElementBlocking
                            key={file.id}
                            draggableId={file.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <React.Fragment>
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  onTouchStart={() => handleTouchStart(file.id)}
                                  onTouchEnd={handleTouchEnd}
                                >
                                  {file.type === "video" ? (
                                   <div style={{position: "relative"}}>
                                   <video
                                     onClick={() => handleImageClick(file.id)}
                                     alt={file.title}
                                     className={`${
                                       file.id === selectedImage
                                         ? "image"
                                         : "selected-image"
                                     }`}
                                   >
                                     <source
                                       src={file.path}
                                       type="video/mp4"
                                     />
                                   </video>
                                   <PlayCircleFilledIcon
                                     style={{
                                       position: "absolute",
                                       top: "50%",
                                       left: "50%",
                                       transform: "translate(-50%, -50%)",
                                       opacity: "0.7",
                                       width: "40%",
                                       height: "100px",
                                     }}
                                   />
                                 </div>
                                  ) : (
                                    <div>
                                      <img
                                        onClick={() =>
                                          handleImageClick(file.id)
                                        }
                                        src={file.path}
                                        alt={file.title}
                                        className={`${
                                          file.id === selectedImage
                                            ? "image"
                                            : "selected-image"
                                        }`}
                                      />
                                    </div>
                                  )}
                                  {file.id === selectedImage && (
                                    <DeleteIcon
                                      onClick={() => OpenDialogDelete(file)}
                                      color="warning"
                                      sx={{
                                        position: "absolute",
                                        top: 5,
                                        right: 5,
                                      }}
                                    />
                                  )}
                                </div>
                              </React.Fragment>
                            )}
                          </Draggable>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                ) : (
                  <Box className="Info">
                    <Typography variant="body1" color="text.secondary">
                      Ajouter media "+"
                    </Typography>
                  </Box>
                )
              ) : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Paper>
      {/* Modal upload  */}
      <Modal open={dialogUpload} onClose={displayDialogUpload}>
        <Box sx={style}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton sx={{ ml: 2 }}>
                <UploadIcon sx={{ color: "white" }} />
              </IconButton>
              <Typography variant="h6" color="white" sx={{ padding: 2 }}>
                Upload
              </Typography>
            </div>

            <IconButton onClick={displayDialogUpload}>
              <CloseIcon color="secondary" />
            </IconButton>
          </Stack>
          {imageToCrop ? (
            <>
              <Crop
                imageToCrop={imageToCrop}
                uploadMediaCroped={uploadMediaCroped}
                mediaType={mediaType}
              />
            </>
          ) : null}
        </Box>
      </Modal>

      {/* Modal confirm suppression file */}
      <DeleteMediaDialog
        open={dialogDelete}
        onClose={displayDialogDelete}
        DeleteFile={DeleteFile}
        displayDialogDelete={displayDialogDelete}
      />
    </div>
  );
}

export default Medias;
