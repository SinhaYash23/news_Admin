import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import { Navigate } from "react-router-dom";
import ViewProfile from "./pages/ViewProfile";
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import UserList from "./users/UserList";
import AddUser from './users/AddUser';
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import AddNews from "./features/news/AddNews";
import EditNews from "./features/news/EditNews"
import NewsManagement from "./components/NewsManagement";
import PublishNews from "./features/news/PublishNews"
import LatestNews from "./features/news/LatestNews"
import Blog from './components/Blog'
import ForgotPassword from "./pages/ForgotPassword";

import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/users" element={<UserList/>}/>
        <Route path="/users/add" element={<AddUser/>}/>
        <Route path="/users/edit-news" element={<EditUser />} />
        <Route path="/users/:id" element={<ViewUser />} />
        <Route path="/add-news" element={<AddNews />} />
        <Route path="/edit-news" element={<EditNews />} />

        <Route path="/articles" element={<NewsManagement />} />
        <Route path="/news/publish" element={<PublishNews />} />
        <Route path="/news/latest" element={<LatestNews />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        


      </Routes> 
    </BrowserRouter>
  );
}
