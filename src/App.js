import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Activity from './pages/Activity/Activity.jsx';
import Main from './pages/Main/Main';
import Profile from './pages/Profile/Profile.jsx';
import StoryPage from './pages/StoryPage/StoryPage.jsx';
import GetServices from "./api/getServices.js";



function App() {

  const [data, setData] = useState(false);

  async function getArray(){
    const array  = GetServices.getData()
    setData(array)
  }
      useEffect(() => {
  getArray()},[])

            if (!data) {
              return <div>Загрузка...</div>;
            }
            return (
    <Router>
      <Routes>
        <Route path="/activity" element={<Activity data = {data}/>} />
        <Route path="/story/:id" element={<StoryPage data={data.stories}/>}/>
        <Route path="/" element={<Profile data = {data} />} />
        <Route path="/auth" element={<Main/>} />
      </Routes>
    </Router>
  );
}

export default App;
