import { Route, Routes } from 'react-router-dom';
import Recipes from './Recipes';
import HomePage from './HomePage';
import About from './About';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/recipes/*" element={<Recipes />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
};

export default AppRoutes;
