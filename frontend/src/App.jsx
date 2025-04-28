import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import NotFound from './pages/NotFound';
import Notepad from './pages/Notepad';
import Layout from './components/Layout';
import Profile from './components/Profile';
import FrontendRoadmap from './components/FrontendRoadmap';
import BackendDeveloperRoadmap from './components/BackendDeveloperRoadmap';
import AIEngineer from './components/AIEngineer';
import AIDataScientist from './components/AIDataScientist';
import Android from './components/Android';
import Blockchain from './components/Blockchain';
import Cyber from './components/Cyber';
import DataAnyalyst from './components/DataAnalyst';
import Devops from './components/Devops';
import DevRel from './components/DevRel';
import EngineeringManager from './components/EngineeringManager';
import Fullstack from './components/Fullstack';
import Game from './components/Game';
import Ios from './components/Ios';
import MlOps from './components/MLOps';
import Postgre from './components/Postgre';
import Product from './components/Product';
import QA from './components/QA';
import Software from './components/Software';
import Technical from './components/Technical';
import Ux from './components/Ux';
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
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login2/>} />
          <Route path="/quiz" element={<QuizPage/>} />
          <Route path="/notepad" element={<Notepad/>} />
          <Route path="/roadmap/frontend" element={<FrontendRoadmap/>} />
          <Route path="/roadmap/backend" element={<BackendDeveloperRoadmap/>} />
          <Route path="/roadmap/ai-engineer" element={<AIEngineer/>} />
          <Route path="/ai-data-scientist" element={<AIDataScientist/>} />
          <Route path="/android" element={<Android/>} />
          <Route path="/blockchain" element={<Blockchain/>} />
          <Route path="/cyber" element={<Cyber/>} />
          <Route path="/data-analyst" element={<DataAnyalyst/>} />
          <Route path="/devops" element={<Devops/>} />
          <Route path="/devrel" element={<DevRel/>} />
          <Route path="/engineering-manager" element={<EngineeringManager/>} />
          <Route path="/fullstack" element={<Fullstack/>} />
          <Route path="/game-developer" element={<Game/>} />
          <Route path="/ios" element={<Ios/>} />
          <Route path="/mlops" element={<MlOps/>} />
          <Route path="/postgre" element={<Postgre/>} />
          <Route path="/product-manager" element={<Product/>} />
          <Route path="/qa" element={<QA/>} />
          <Route path="/software-architect" element={<Software/>} />
          <Route path="/technical-writer" element={<Technical/>} />
          <Route path="/ux-design" element={<Ux/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
