import React, {PureComponent} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import PlayList from './components/playlist/Playlist'
import PlayerPage from "./components/player/PlayerPage"
import logo from './asset/images/logo.svg'

import {connect} from 'react-redux'


class Routing extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    render() {
        return (
            <Router>
                <div>
                    {this.props.loading ?
                        <div className='Loading'>
                            <img src={logo} className="App-logo" alt='Logo'/>
                            Loading...
                        </div>
                        :
                        null
                    }
                    <Route exact path="/" component={PlayList}/>
                    <Route exact path="/player" component={PlayerPage}/>
                </div>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.appReducer.loading,
    }
}


export default connect(mapStateToProps)(Routing) 
