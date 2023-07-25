import React from 'react';
import {
    HashRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom"
import WithRouter from './comonents/withRouter'
import Login from './pages/login'
import Pay from './comonents/pay'
import Video from './pages/video'
import Live from './pages/live'
import Play from './comonents/play'
import Profile from './comonents/profile'
import VideoCreate from './comonents/video-create'
import Footer from './comonents/footer'
import './App.css';

const App: React.FC = function () {
	return (
    	<div className="App">
                <HashRouter>
                    <WithRouter>
                        <Routes>
                            <Route path="/video" element={<Video />} />
                            <Route path="/pay" element={<Pay />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/tool" element={<VideoCreate />} />
                            <Route path="/live" element={<Live />} />
                            <Route path="/play/:name" element={<Play />} />
                            <Route path="*" element={<Navigate to="/video" replace/>} />
                        </Routes> 
                    </WithRouter>
                <Footer />
            </HashRouter>
    	</div>
  	)
}

export default App
