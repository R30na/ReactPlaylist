import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateCurrentPlayingVideo, stopAutoPlay } from '../../redux/actions/app-actions'
import './VideoPlayer.css'

class VideoPlayer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            paused: true,
            muted: false,
            length: null,
            formattedLength: null,
            currentTime: 0,
            formattedTime: null,
            volume: 0.25
        }
        this.interval = ''
    }

    componentDidMount() {
        this.customVolume()
        this.interval = setInterval(() => {
            this.setState({ currentTime: this.currentTime() })
            this.setState({ length: this.duration() })

            if (this.currentTime() === this.duration() && (this.props.videoIndex + 1) === this.props.payListLength) {
                this.props.updateCurrentPlayingVideo(this.props.playListIndex, 0)
            } else if (this.currentTime() === this.duration()) {
                this.props.updateCurrentPlayingVideo(this.props.playListIndex, this.props.videoIndex + 1)
            }

            // console.log(this.props.playListIndex)
            // console.log(this.props.payListLength)
            // console.log(this.props.videoIndex)
            // console.log(this.duration())
            // console.log(this.currentTime())
            // console.log('Paused:' + this.state.paused)

        }, 500)

        if (this.props.playingNextVideo) {
            this.play()
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        this.props.stopAutoPlay()
    }


    play() {
        this.duration()
        const v = document.getElementById("video")

        if (this.state.paused === true) {
            v.play()
            this.setState({
                paused: false
            })
        } else {
            v.pause()
            this.setState({
                paused: true
            })
        }
    }

    duration() {
        if (document.getElementById("video")) {
            let dur = document.getElementById("video").duration
            dur = dur.toFixed()
            let formattedLength = dur.toMMSS()

            this.setState({
                length: dur,
                formattedLength: formattedLength
            })
            return dur
        }
    }

    currentTime() {
        String.prototype.toMMSS = function () {
            let sec_num = parseInt(this, 10)
            let hours = Math.floor(sec_num / 3600)
            let minutes = Math.floor((sec_num - hours * 3600) / 60)
            let seconds = sec_num - hours * 3600 - minutes * 60

            if (hours < 10) {
                hours = "0" + hours
            }
            if (minutes < 10) {
                minutes = "0" + minutes
            }
            if (seconds < 10) {
                seconds = "0" + seconds
            }

            return hours + ":" + minutes + ":" + seconds
        }

        if (document.getElementById("video")) {
            let cur = document.getElementById("video").currentTime
            cur = cur.toFixed()
            let formattedTime = cur.toMMSS()
            this.setState({
                currentTime: cur,
                formattedTime: formattedTime
            })
            if (parseInt(this.state.currentTime) === parseInt(this.state.length)) {
                this.setState({ paused: true })
            }

            return cur
        }


    }

    customTime() {
        const time_range = document.querySelector(".time_range")
        document.getElementById("video").currentTime = time_range.value

        this.setState({
            currentTime: time_range.value
        })
    }

    customVolume() {
        const volume_range = document.querySelector(".volume_range")
        document.getElementById("video").volume = volume_range.value

        this.setState({
            volume: volume_range.value
        })

        if (volume_range.value === 0) {
            this.setState({
                muted: true
            })
        } else {
            this.setState({
                muted: false
            })
        }
    }

    mute() {
        document.getElementById("video").muted = true

        this.setState({
            muted: true
        })

        if (this.state.muted === true) {
            document.getElementById("video").muted = false

            this.setState({
                muted: false
            })
        } else {
            document.getElementById("video").muted = true
            this.setState({
                muted: true
            })
        }
    }


    render() {
        return (
            <div className="VideoPlayer">
                <video id="video" width="100%" height="100%">
                    <source src={this.props.src} type="video/mp4" />
                </video>
                <div className="controls">
                    <button onClick={() => this.play()} className="play_pause_btn">
                        {
                            this.state.paused ?
                                <img src={require('../../asset/images/play-button.svg')} width='17vw' alt='Play' />
                                :
                                <img src={require('../../asset/images/pause-button.svg')} width='17vw' alt='Pause' />
                        }
                    </button>
                    <span className="time">
                        <span className="video_time">{this.state.formattedTime}</span>
                        <span> / </span>
                        <span className="video_length">{this.state.formattedLength}</span>
                    </span>
                    <input
                        type="range"
                        className="time_range"
                        onChange={() => this.customTime()}
                        value={this.state.currentTime}
                        step={0.1}
                        min={0}
                        max={this.state.length}
                    />

                    <button onClick={() => this.mute()} className="play_pause_btn">
                        {
                            this.state.muted ?
                                <img src={require('../../asset/images/mute.svg')} width='17vw' alt='Mute' />
                                :
                                <img src={require('../../asset/images/speaker.svg')} width='17vw' alt='Unmute' />
                        }
                    </button>

                    <input
                        type="range"
                        className="volume_range"
                        onChange={() => this.customVolume()}
                        value={this.state.volume}
                        step={0.1}
                        min={0}
                        max={1}
                    />
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        loading: state.appReducer.loading,
        activePlayList: state.appReducer.activePlayList,
        playingNextVideo: state.appReducer.playingNextVideo,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

        updateCurrentPlayingVideo,
        stopAutoPlay

    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer)
