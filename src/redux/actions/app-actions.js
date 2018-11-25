import { ADD_PLAYLIST } from "../constants/action-types"
import { ENABLE_LOADING } from "../constants/action-types"
import { DISABLE_LOADING } from "../constants/action-types"
import { PLAYLISTS_AVAILABLE } from "../constants/action-types"
import { ACTIVE_PLAYLIST_AVAILABLE } from "../constants/action-types"
import { ADD_VIDEO } from "../constants/action-types"
import { UPDATE_CURRENT_PLAYING_VIDEO } from "../constants/action-types"
import { STOP_AUTOPLAY } from "../constants/action-types"

import StorageService from '../../services/Storage'

export function addPlayList(playlist) {
    return (dispatch) => {
        StorageService.getItem('myplaylists').then(playlists => {
            if (!playlists) {
                playlists = []
            }
            playlists.push(playlist)
            StorageService.saveItem('myplaylists', playlists)
            dispatch({
                type: ADD_PLAYLIST,
                loading: false
            })
        })

    }
}

export function enableLoading() {
    return (dispatch) => {
        dispatch({
            type: ENABLE_LOADING,
            loading: true
        })
    }
}


export function disableLoading() {
    return (dispatch) => {
        dispatch({
            type: DISABLE_LOADING,
            loading: false
        })
    }
}


export function getPlaylists() {
    return (dispatch) => {
        StorageService.getItem('myplaylists').then(playlists => {
            if (playlists) {
                dispatch({
                    type: PLAYLISTS_AVAILABLE,
                    loading: false,
                    myplaylists: playlists
                })
            }
        })
    }
}

export function getActivePlaylist(index) {
    return (dispatch) => {
        StorageService.getItem('myplaylists').then(playlists => {
            if (playlists) {
                dispatch({
                    type: ACTIVE_PLAYLIST_AVAILABLE,
                    loading: false,
                    activePlayList: playlists[index]
                })
            }
        })
    }
}

export function addVideo(video, playListIndex) {
    return (dispatch) => {
        StorageService.getItem('myplaylists').then(playlists => {
            if (playlists) {
                var tempLists = playlists
                tempLists[playListIndex].videos.push(video)
                tempLists[playListIndex].currentPlayingVideoIndex = tempLists[playListIndex].videos.length - 1
                StorageService.saveItem('myplaylists', tempLists)
                dispatch({
                    type: ADD_VIDEO,
                    loading: false,
                    activePlayList: tempLists[playListIndex],
                })
            }
        })
    }
}

export function updateCurrentPlayingVideo(playListIndex, videoIndex) {
    return (dispatch) => {
        StorageService.getItem('myplaylists').then(playlists => {
            if (playlists) {
                var tempLists = playlists
                tempLists[playListIndex].currentPlayingVideoIndex = videoIndex
                StorageService.saveItem('myplaylists', tempLists)
                dispatch({
                    type: UPDATE_CURRENT_PLAYING_VIDEO,
                    loading: false,
                    activePlayList: tempLists[playListIndex],
                    playingNextVideo: true,
                })
            }
        })
    }
}

export function stopAutoPlay() {
    return (dispatch) => {
        dispatch({
            type: STOP_AUTOPLAY,
            playingNextVideo: false,
        })
    }
}