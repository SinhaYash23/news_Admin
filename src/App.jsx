import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import Logout from "./pages/Logout";
import Settings from "./components/Settings";

import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Articles from "./components/Articles";



export default function App() {


  const queryClient = new QueryClient();
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
        <Route path="/users/view/:id" element={<ViewUser />} />
        <Route path="/add-news" element={<AddNews />} />
        <Route path="/edit-news" element={<EditNews />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/news/publish" element={<PublishNews />} />
        <Route path="/news/latest" element={<LatestNews />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/news" element={<NewsManagement />} />
        <Route path="/settings" element={<Settings />} />
        


      </Routes> 
    </BrowserRouter>
  );
}
