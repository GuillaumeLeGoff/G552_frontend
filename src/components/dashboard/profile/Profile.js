import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function Profile() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#203038",
    boxShadow: 24,
    p: 4,
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
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
    <Paper
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
      <Box sx={{ padding: 3, textAlign: "center", mt: 4 }}>
        <Typography variant="h5" component="h2">
          Sport: {username}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Change Password:
          </Typography>
          <TextField
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
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handlePasswordChange}>
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default Profile;
