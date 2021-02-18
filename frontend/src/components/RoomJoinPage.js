import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const RoomJoinPage = () => {
  const history = useHistory();
  const [roomCode, setRoomCode] = useState();
  const [error, setError] = useState();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };
  const roomButtonPressed = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };

    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          history.push(`/room/${roomCode}`);
        } else {
          setError("Room not found");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={(e) => handleTextFieldChange(e)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => roomButtonPressed(e)}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;
