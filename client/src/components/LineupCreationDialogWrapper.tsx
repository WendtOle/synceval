import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Chip,
} from "@mui/material";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { lineupsAtom } from "../state/lineups";
import { selectedLineupKeyAtom } from "../state/main";

export const LinueupCreationDialogWrapper = ({
  children,
}: {
  children: (onClick: () => void) => any;
}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const setLineups = useSetAtom(lineupsAtom);
  const [lineupName, setLineupName] = useState("");
  const setSelectedLineupKey = useSetAtom(selectedLineupKeyAtom);

  const parsedArtists = text
    .replace(/"/g, "")
    .split(/,|\n/)
    .map((artist: string) => artist.trim())
    .filter((artist: string) => artist.length > 0);

  const addLineUp = () => {
    if (lineupName.length === 0 || parsedArtists.length === 0) {
      return;
    }
    const key = Math.random().toString(36).substring(2);
    setLineups((cur) => {
      return [...cur, { key, name: lineupName, artists: parsedArtists }];
    });
    setLineupName("");
    setSelectedLineupKey(key);
    setOpen(false);
  };

  const clear = () => {
    setText("");
  };

  return (
    <>
      {children(() => setOpen(true))}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Lineup manually</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            variant="standard"
            label="Name"
            value={lineupName}
            onChange={(event) => setLineupName(event.target.value)}
            fullWidth
          />
          <TextField
            placeholder="Enter your artists here ..."
            label="Artists"
            value={text}
            variant="standard"
            onChange={(event) => setText(event.target.value)}
            fullWidth
            rows={3}
            sx={{ marginTop: 2 }}
            multiline
          />
          <div style={{ margin: 5, marginTop: 10 }}>
            {parsedArtists.map((artist: string, index) => (
              <Chip
                key={index}
                size="small"
                label={artist}
                sx={{ margin: 0.2, padding: "0px 1px" }}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={clear}>Clear</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={addLineUp}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
