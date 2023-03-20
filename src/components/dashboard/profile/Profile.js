import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleCancel = () => {
    setIsEditMode(false);
    // reset the user information here
  };

  const handlePasswordChange = () => {
    // change the user's password here
  };

  return (
    <Grid item xs={12}>
      <Paper>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 2 }}>
              <AccountBoxIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6" color="white" sx={{ padding: 2 }}>
              Profile
            </Typography>
          </div>
          <IconButton>
            <SaveIcon onClick={handlePasswordChange} color="secondary" />
          </IconButton>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            minHeight: "calc(94vh - 120px)",
            overflowY: "scroll",
            aligneContent: "center",
          }}
          p={1}
        >
          <Box sx={{ mt: 4 }}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h6" sx={{ mb: 5 }} component="h2" gutterBottom>
                Sport: {username}
              </Typography>
            </Stack>
            <Typography component="h2" gutterBottom>
              Change Password:
            </Typography>
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              label="Current Password"
            />
            <TextField
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="New Password"
            />
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Profile;
