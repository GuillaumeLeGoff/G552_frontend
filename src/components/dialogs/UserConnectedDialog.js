import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from 'react-i18next';

function UserConnectedDialog({ open, onClose, userDisconnect }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('userAlreadyConnected')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('doYouWantToDisconnect')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          {t('no')}
        </Button>
        <Button onClick={userDisconnect} sx={{ color: "secondary.main" }}>
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserConnectedDialog;
