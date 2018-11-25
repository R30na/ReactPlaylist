import { ADD_PLAYLIST } from "../constants/action-types"
import { ENABLE_LOADING } from "../constants/action-types"
import { DISABLE_LOADING } from "../constants/action-types"
import { PLAYLISTS_AVAILABLE } from "../constants/action-types"
import { ACTIVE_PLAYLIST_AVAILABLE } from "../constants/action-types"
import { ADD_VIDEO } from "../constants/action-types"
import { UPDATE_CURRENT_PLAYING_VIDEO } from "../constants/action-types"
import { STOP_AUTOPLAY } from "../constants/action-types"


let appDataState = {
    loading: true,
    playingNextVideo: false,
    myplaylists: [],
    activePlayList: {
        currentPlayingVideoIndex: 0,
        title: '',
        videos: [{
            title: '',
            artist: '',
            url: ''
        }]
    }
}


export const appReducer = (state = appDataState, action) => {

    switch (action.type) {
        case ADD_PLAYLIST:
            state = Object.assign({}, state, {
                loading: action.loading,
            })
            return state
        case ENABLE_LOADING:
            state = Object.assign({}, state, {
                loading: action.loading,
            })
            return state
        case DISABLE_LOADING:
            state = Object.assign({}, state, {
                loading: action.loading,
            })
            return state
        case PLAYLISTS_AVAILABLE:
            state = Object.assign({}, state, {
                loading: action.loading,
                myplaylists: action.myplaylists,
            })
            return state
        case ACTIVE_PLAYLIST_AVAILABLE:
            state = Object.assign({}, state, {
                loading: action.loading,
                activePlayList: action.activePlayList,
            })
            return state
        case ADD_VIDEO:
            state = Object.assign({}, state, {
                loading: action.loading,
                activePlayList: action.activePlayList,
            })
            return state
        case UPDATE_CURRENT_PLAYING_VIDEO:
            state = Object.assign({}, state, {
                loading: action.loading,
                activePlayList: action.activePlayList,
                playingNextVideo: action.playingNextVideo,
            })
            return state
        case STOP_AUTOPLAY:
            state = Object.assign({}, state, {
                playingNextVideo: action.playingNextVideo,
            })
            return state
        default:
            return state
    }

}