import { useEffect, useMemo, useState } from "react"
import { Playlist } from "./SinglePlaylist"
import { excludedPlaylistIdsAtom, filteredArtistsAtom, playlistSongsAtom, playlistsAtom } from "../state/main"
import { accessTokenAtom } from "../state/auth"
import { atom, useAtom, useAtomValue } from "jotai"
import { getPlaylists } from "../provider/playlists"
import { getPlaylistTracks } from "../provider/songs"
import { AppBar, Box, CircularProgress, Fab, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Toolbar, Typography } from "@mui/material"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link, useNavigate } from "react-router-dom"
import { Favorite, Title } from "@mui/icons-material"
import PlaylistIcon from '@mui/icons-material/Folder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FollowedPlaylistIcon from '@mui/icons-material/Public';
import { extractArtists } from "../util/extractArtists"

export const PlaylistItem = ({id}: {id: string}) => {
    const playlist = useAtomValue(useMemo(() => atom((get) => get(playlistsAtom).find(({id: cur}) => cur === id)), [id]))
    const songs = useAtomValue(useMemo(() => atom((get) => get(playlistSongsAtom)[id] ?? []), [id]))
    const [excludedPlaylistId, setExcludedPlaylistId] = useAtom(excludedPlaylistIdsAtom)
    const filteredArtists  = useAtomValue(filteredArtistsAtom)
    const navigate = useNavigate()

    if (!playlist) {
        return <CircularProgress />
    }

    const {isOwn, name, tracks} = playlist

    const visible = !excludedPlaylistId.includes(id)
    const toggle = (id: string) => {
        setExcludedPlaylistId(cur => {
            if (cur.includes(id)) {
                return cur.filter((curId) => curId !== id)
            }
            return [...cur, id]
        })
    }

    const playlistArtists = extractArtists(songs)
    const matchingPlaylistArtists = filteredArtists.filter(({id: lineupArtistId}) => playlistArtists.find(({id: playlistArtistId}) => playlistArtistId === lineupArtistId)) 
    const containsLineUpArtist = matchingPlaylistArtists.length > 0
    
    return (<ListItem key={id} onClick={() => navigate("/playlist/" + id)} sx={{background: containsLineUpArtist && visible ? "#bffde6" : ""}}>
    <ListItemIcon>
        {isOwn ? <PlaylistIcon /> : <FollowedPlaylistIcon />}
    </ListItemIcon>
    <ListItemText primary={name} secondary={`${tracks ?? songs.length} songs, ${matchingPlaylistArtists.length}/${playlistArtists.length} artists`}/>
    <ListItemSecondaryAction onClick={() => toggle(id)}>
        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </ListItemSecondaryAction>
    </ListItem>)
}