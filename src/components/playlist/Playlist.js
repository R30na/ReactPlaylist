import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addPlayList, enableLoading, disableLoading, getPlaylists } from '../../redux/actions/app-actions'
import './PlayList.css'


class PlayList extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            chooseMode: true,
            addPlaylistMode: false,
            listPlaylistMode: false,
            playListTitle: ''
        }

    }

    componentDidMount() {
        setTimeout(() => {
            this.props.disableLoading()
        }, 1000)
        if (this.props.location.state.mode == 'listPlaylistMode') {
            this.getPlaylists()
            this.setState({ chooseMode: false, addPlaylistMode: false, listPlaylistMode: true })
        }
    }

    Navigate(link, index) {
        this.props.history.push(link, { 'index': index })
    }

    addPlayList() {
        var playlist = {
            title: this.state.playListTitle,
            videos: []
        }
        this.props.addPlayList(playlist)
        this.setState({ chooseMode: true, addPlaylistMode: false, listPlaylistMode: false })
    }

    createPlaylist() {
        this.setState({ chooseMode: false, addPlaylistMode: true, listPlaylistMode: false })
    }

    getPlaylists() {
        this.props.enableLoading()
        this.setState({ chooseMode: false, addPlaylistMode: false, listPlaylistMode: true })
        setTimeout(() => {
            this.props.getPlaylists()
            this.props.disableLoading()
        }, 1000)
    }

    render() {
        return (
            <div className='PlayListPage'>
                {this.state.chooseMode && this.renderChooseMode()}
                {this.state.addPlaylistMode && this.renderAddMode()}
                {this.state.listPlaylistMode && this.renderListMode()}
            </div>
        )
    }

    renderChooseMode() {
        return (
            <div className='Panel'>
                <button className='Button' onClick={() => this.createPlaylist()}>Create a Playlist</button>
                <button className='Button' onClick={() => this.getPlaylists()}>Show My Playlists</button>
            </div>
        )
    }


    renderAddMode() {
        return (
            <div className='Panel'>
                <input type='text' className='TextInput' placeholder='Title'
                    onChange={(e) => this.setState({ playListTitle: e.target.value })} />
                <button className='Button' onClick={() => this.addPlayList()}>Add Playlist</button>
            </div>
        )
    }

    renderListMode() {
        const media = this.props.myplaylists
        return (
            <div className='PanelList'>
                <div style={{ textAlign: 'center', fontSize: '3vw', padding: '1vw',fontWeight:'bolder' }}>My PlayLists</div>
                {media.length > 0 && media.map((item, index) =>
                    <button className='ButtonStart' onClick={() => this.Navigate('/player', index)} key={index}>
                        <div className='StartPlay'>
                            <div style={{ width: '30%' }}>
                                <img className='PlayButton' src={require('../../asset/images/play.svg')} alt='Play' />
                            </div>
                            <div style={{ width: '30%' }}>{item.title}</div>
                            <div style={{ width: '30%' }}>{index + 1}</div>
                        </div>
                    </button>
                )}
                <div className='backButton'
                    onClick={() => this.setState({ chooseMode: true, addPlaylistMode: false, listPlaylistMode: false })}>
                    <span className='arrowBack'>&#8249;</span></div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        loading: state.appReducer.loading,
        myplaylists: state.appReducer.myplaylists,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addPlayList,
        enableLoading,
        disableLoading,
        getPlaylists
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayList) 
