import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import Crop from "./crop/CropImage";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
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
import React, { useContext, useState } from "react";
import EventMediaService from "../../../../services/eventMediaService";
import UploadService from "../../../../services/uploadService";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./Medias.css";
import { LoadingContext } from "../../../../contexts/Context";

import DeleteMediaDialog from "../../../dialogs/DeleteMediaDialog";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
function Medias(props) {
  const { t } = useTranslation(); // Utilisation de useTranslation
  const uploadService = UploadService();
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [dialogUpload, setDialogUpload] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [FileToDelete, setFileToDelete] = useState();
  const [imageToCrop, setImageToCrop] = useState(null);
  const [originalName, setOriginalName] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const { loading, setLoading } = useContext(LoadingContext);
  const { progress, setProgress } = useContext(LoadingContext);

  const handleTouchStart = (imageId) => {
    clearTimeout(longPressTimer);
    setLongPressTimer(
      setTimeout(() => {
        if (imageId === selectedImage) {
          setSelectedImage(null);
        } else {
          setSelectedImage(imageId);
        }
      }, 500)
    ); // Appui long de 500 ms
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };

  function DeleteFile() {
    EventMediaService.deleteAllByMedia(FileToDelete.idBdd).then(() => {
      uploadService.deleteFile(FileToDelete).then((result) => {
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
    console.log("upload");
    if (event.target.files[0].type.split("/")[0] === "video") {
      uploadService
        .upload(setLoading, event.target.files[0], setProgress)
        .then(() => {
          props.getMedias();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setOriginalName(event.target.files[0].name);
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageToCrop(reader.result));
      reader.readAsDataURL(event.target.files[0]);
      setMediaType(event.target.files[0].type.split("/")[0]);
      displayDialogUpload();
    }
    setSelectedImage(null);
  }

  function uploadMediaCroped(event) {
    const fileWithOriginalName = new File([event[0]], originalName, {
      type: "image/jpeg",
    });

    uploadService
      .upload(setLoading, fileWithOriginalName, setProgress)
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
    <>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <div className="headerLeft">
            <IconButton className="header-button">
              <ImageIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              {t("media")}
            </Typography>
          </div>
          <div className="headerRight">
            <IconButton
              className="header-button"
              onClick={() => {
                document.getElementById("inputFile").click();
              }}
            >
              <AddIcon sx={{ color: "secondary.main" }} />
            </IconButton>

            <input
              type="file"
              id="inputFile"
              style={{ display: "none" }}
              onChange={goToCrop}
            />
          </div>
        </Stack>
        <Box className="container-medias">
          <Droppable
            droppableId={`${props.eventMedia[1].id}`}
            isDropDisabled={true}
          >
            {(provided) => (
              <div ref={provided.innerRef}>
                {props.eventMedia[1].medias ? (
                  props.eventMedia[1].medias.length > 0 ? (
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
                                    <div>
                                      <video
                                        onClick={() =>
                                          handleImageClick(file.id)
                                        }
                                        alt={file.title}
                                        className={`${
                                          file.id === selectedImage
                                            ? "image"
                                            : "selected-image"
                                        } media-size`}
                                        ref={(ref) => {
                                          if (ref && file.type === "video") {
                                            ref.currentTime = 5; 
                                          }
                                        }}
                                      >
                                        <source
                                          src={file.path}
                                          type="video/mp4"
                                        />
                                      </video>
                                      <PlayCircleFilledIcon className="playCircleFilledIcon" />
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
                                        } media-size`}
                                      />
                                    </div>
                                  )}
                                  {file.id === selectedImage && (
                                    <DeleteIcon
                                      onClick={() => OpenDialogDelete(file)}
                                      color="warning"
                                      className="deleteIcon"
                                    />
                                  )}
                                </div>
                              </React.Fragment>
                            )}
                          </Draggable>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  ) : (
                    <Box className="Info">
                      <Typography color="text.secondary">
                        {t("ajouterMedia")}
                      </Typography>
                    </Box>
                  )
                ) : null}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Box>
      </Paper>
      {/* Modal upload  */}
      <Modal open={dialogUpload} onClose={displayDialogUpload}>
        <Box
          sx={{ backgroundColor: theme.palette.primary.main }}
          className="modalBox"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <div className="modalHeader">
              <IconButton>
                <UploadIcon
                  sx={{ color: "primary.light" }}
                  className="uploadIcon"
                />
              </IconButton>
              <Typography variant="h6" className="modalHeaderText">
                {t("upload")}
              </Typography>
            </div>

            <IconButton onClick={displayDialogUpload}>
              <CloseIcon sx={{ color: "secondary.main" }} />
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
    </>
  );
}

export default Medias;
