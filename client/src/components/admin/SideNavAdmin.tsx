import { useDispatch, useSelector } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { Link, useLocation, useNavigate } from "react-router-dom";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { authAxios } from "../../api/axios/authAxios";
import { RootState } from "../../redux/store/store";
import { authEndpoints } from "../../api/endpoints/authEndpoints";
import { logout } from "../../redux/slice/AuthSlice";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const SideNavAdmin = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const token = useSelector((state: RootState) => state.Auth.token);
    const adminAxios = authAxios(token);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector((store: RootState) => store.Auth.isAuthenticated);
  
    const handleLogout = async () => {
      try {
        const response = await adminAxios.post(authEndpoints.logout);
        if (response.status === 200) {
          dispatch(logout());
          navigate('/admin/');
        }
      } catch (error) {
        console.log("Error logging out", error);
      }
    };
  
    const handleButtonClick = (path: string) => {
      navigate(path);
      setIsMobileMenuOpen(false);
    };
  
    const isActive = (path: string) => location.pathname === path;
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const NavButton = ({ path, icon: Icon, label }: { path: string; icon: any; label: string }) => (
      <button
        onClick={() => handleButtonClick(path)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full
          ${isActive(path) 
            ? 'bg-slate-600 text-slate-300' 
            : 'text-slate-500 hover:text-white'}`}
      >
        <Icon />
        <span className="md:hidden lg:inline">{label}</span>
      </button>
    );
  
    return (
      <>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed top-4 left-4 z-50 text-slate-300 bg-slate-800 p-2 rounded-lg"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
  
        <div className={`
          fixed md:sticky 
          ${isMobileMenuOpen ? 'left-0' : '-left-full md:left-0'} 
          transition-all duration-300
          top-0 min-h-screen
          bg-gradient-to-b from-black to-slate-900
          w-64 md:w-20 lg:w-64
          p-6 
          flex flex-col gap-6
          z-40
        `}>
          <div className="flex items-center justify-center text-purple-600 mb-6">
            <AcUnitRoundedIcon fontSize="large" />
          </div>
  
          <div className="flex flex-col gap-4">
            <NavButton path="/admin/dashboard" icon={HomeIcon} label="Dashboard" />
            <NavButton path="/admin/category" icon={CategoryOutlinedIcon} label="Categories" />
            <NavButton path="/admin/products" icon={LocalOfferOutlinedIcon} label="Products" />
          </div>
  
          <div className="mt-auto">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="flex items-center gap-2 text-slate-500 hover:text-white w-full px-4 py-2">
                <LogoutRoundedIcon />
                <span className="md:hidden lg:inline">Logout</span>
              </button>
            ) : (
              <Link to="/admin/" className="flex items-center gap-2 text-slate-500 hover:text-white w-full px-4 py-2">
                <LoginOutlinedIcon />
                <span className="md:hidden lg:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </>
    );
};

export default SideNavAdmin