import React, {PureComponent} from 'react'
import VideoPlayer from './VideoPlayer'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    getActivePlaylist,
    enableLoading,
    disableLoading,
    addVideo,
    updateCurrentPlayingVideo
} from '../../redux/actions/app-actions'
import './PlayerPage.css'


class PlayerPage extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            addVideoMode: false,
            videoTitle: '',
            videoArtist: '',
            videoUrl: '',
        }
        this.playListIndex = props.location.state.index
    }

    componentWillMount() {
        this.props.enableLoading()
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.getActivePlaylist(this.playListIndex)
            this.props.disableLoading()
        }, 1000)
        // this.setState({currentPlayingVideoIndex:1})

    }

    addVideo() {
        var video = {
            title: this.state.videoTitle,
            artist: this.state.videoArtist,
            url: this.state.videoUrl,
        }
        this.props.addVideo(video, this.playListIndex)
        this.setState({addVideoMode: false})
    }

    updateCurrentPlayingVideo(index) {
        this.props.updateCurrentPlayingVideo(this.playListIndex, index)
    }


    render() {
        const media = this.props.activePlayList.videos
        const playingVideoIndex = this.props.activePlayList.currentPlayingVideoIndex


        return (
            <div className="PlayerPage">
                {this.state.addVideoMode &&
                <div className='modal'>
                    <div className='modal-content'>
                        <input type='text' className='TextInput' placeholder='Title'
                               onChange={(e) => this.setState({videoTitle: e.target.value})}/>
                        <input type='text' className='TextInput' placeholder='Artist'
                               onChange={(e) => this.setState({videoArtist: e.target.value})}/>
                        <input type='text' className='TextInput' placeholder='Video URL'
                               onChange={(e) => this.setState({videoUrl: e.target.value})}/>
                        <button className='Button' onClick={() => this.addVideo()}>Add Video</button>
                        <button className='Button' onClick={() => this.setState({addVideoMode: false})}>Cancel</button>
                    </div>
                </div>
                }
                <div>
                    <div className='PlayList'>
                        <div className='buttonContainer'>
                            <button className='Button' onClick={() => this.setState({addVideoMode: true})}>Add Video
                            </button>
                        </div>
                        {media.length === 0 && <div className='TextInput'>No Videos Yet..! Please Add some...</div>}
                        {media.map((item, index) =>
                            <button
                                className={this.props.activePlayList.currentPlayingVideoIndex === index ? 'ButtonStart active' : 'ButtonStart'}
                                key={index}
                                onClick={() => this.updateCurrentPlayingVideo(index)}>
                                <div className='StartPlay'>
                                    <div style={{width: '20%'}}>
                                        <img className='PlayButton' src={require('../../asset/images/play.svg')}
                                             key={index} alt='Play'/>
                                    </div>
                                    <div style={{width: '40%'}}>{item.title}</div>
                                    <div style={{width: '40%'}}>{item.artist}</div>
                                </div>
                            </button>
                        )}
                    </div>
                    <div className='PlaylistTitle'>{this.props.activePlayList.title}</div>
                    <div className="Player">
                        {media.length > 0 &&
                        <VideoPlayer
                            key={Date()}
                            src={media[playingVideoIndex].url}
                            playListIndex={this.playListIndex}
                            payListLength={media.length}
                            videoIndex={playingVideoIndex}
                        />}
                    </div>
                    <div className='backButton' onClick={() => this.props.history.push('/',{mode:'listPlaylistMode'})}><span
                        className='arrowBack'>&#8249;</span></div>
                </div>
            </div>
        )
    }


}


function mapStateToProps(state) {
    return {
        loading: state.appReducer.loading,
        activePlayList: state.appReducer.activePlayList,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getActivePlaylist,
        enableLoading,
        disableLoading,
        addVideo,
        updateCurrentPlayingVideo

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage) 
