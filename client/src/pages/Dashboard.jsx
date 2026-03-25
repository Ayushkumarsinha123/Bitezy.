import Button from '@mui/material/Button';
import UploadReelForm from '../components/reels/UploadReelForm';
import { useAuth } from '../context/AuthContext'; 
import MyReels from '../components/reels/MyReels';


const Dashboard = () => {
  
  const { user, logout } = useAuth(); 

  return (
    <div className="min-h-screen bg-gray-50 p-6">
     
      
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Restaurant Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || "Chef"}</p>
        </div>
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>
      </div>

      
      <div className="max-w-xl mx-auto">
        <UploadReelForm />
      </div>
      <section>
        <MyReels /> 
      </section>
      
    </div>
  );
};

export default Dashboard;