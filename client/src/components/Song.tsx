import { CircularProgress, Toolbar, IconButton, Typography, List, AppBar } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useArtistInfo } from "../hooks/useArtistInfo";
import { SongItem } from "./SongItem";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import LaunchIcon from "@mui/icons-material/Launch";
import { tracksAtom } from "../state/main";
import { useAtomValue } from "jotai";

export const SongScreen = () => {
    const { id } = useParams<{ id: string }>();
  const songs = useAtomValue(tracksAtom);
  const navigate = useNavigate();

  if (!id || !songs[id]) {
    return <CircularProgress />;
  }

  const song = songs[id];
  if (!song) {
    return <CircularProgress />;
  }

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ marginRight: 1 }}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {song.name}
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => window.open(`spotify:artist:${id}`, "_blank")}
          >
            <LaunchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <iframe style={{"borderRadius":"12px"}} src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator`} width="100%" height="352"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

    </div>
  );
}