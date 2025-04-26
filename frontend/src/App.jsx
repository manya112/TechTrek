import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import NotFound from './pages/NotFound';
import HomePage2 from './pages/HomePage2';
import Quiz from './pages/Quiz';
import Notepad from './components/notepad';
import Layout from './components/Layout';
import Profile from './components/Profile';
import FrontendRoadmap from './components/FrontendRoadmap';
import BackendDeveloperRoadmap from './components/BackendDeveloperRoadmap';
import AIEngineer from './components/AIEngineer';
import AIDataScientist from './components/AIDataScientist';
import VibrantLoginPage from './pages/Login';
import VibrantSignupPage from './pages/Signup';
import Login2 from './pages/Login2';
import Signup from './pages/Signup2';
import QuizPage from './pages/QuizPage';






const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Home/>} /> */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login2/>} />
          <Route path="/quiz" element={<QuizPage/>} />
          <Route path="/notepad" element={<Notepad/>} />
          <Route path="/roadmap/frontend" element={<FrontendRoadmap/>} />
          <Route path="/roadmap/backend" element={<BackendDeveloperRoadmap/>} />
          <Route path="/roadmap/ai-engineer" element={<AIEngineer/>} />
          <Route path="/ai-data-scientist" element={<AIDataScientist/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
