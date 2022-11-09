import NavBar from '../components/ui/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);
export default MainLayout;
