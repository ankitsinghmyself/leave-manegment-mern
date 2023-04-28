import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import UserDashboard from './pages/UserDashboard';

var routers = []

routers.push(
    { path: '/', element: <Login /> },
    { path: '/signup', element: <SignUp role={false} /> },
    { path: '/admindashboard', element: <AdminDashboard /> },
    { path: '/userdashboard', element: <UserDashboard /> },
    { path: '/admin/register', element: <SignUp role={true} /> }
)
export default routers;