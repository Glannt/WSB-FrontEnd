import App from '@/App';
import { BookingRoomDetail } from '@/components/Content/BookingRoomDetail';
import { HomePage } from '@/components/Content/HomePage';
import { ListFood } from '@/components/Content/ListFood';
import { ListRoom } from '@/components/Content/ListRoom';
import Login from '@/components/Login/Login';
import ProfileEditor from '@/components/ProfileEditor/ProfileEditor';
import SignUp from '@/components/SignUp/SignUp';
import { AppContext } from '@/context/app.context';
import { MainLayout } from '@/layouts/MainLayout';
import { useContext } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import path from '@/constants/path';

import { Settings } from '@/components/Customer/Settings';
import BookingHistory from '@/components/Customer/BookingHistory';
import TransactionHistory from '@/components/Customer/TransactionHistory';
import MyWallet from '@/components/Customer/MyWallet';
import PackageMembership from '@/components/Customer/PackageMembership';
import ChangePassword from '@/components/ProfileEditor/ChangePassword';
import { DashboardManager } from '@/components/Admin/DashboardManager';
import ManageRoom from '@/components/AdminService/ManageRoom';
import ManageStaff from '@/components/AdminService/ManageStaff';
import { AdminDashboard } from '@/components/Admin/AdminDashboard';
import EquipmentList from '@/components/Content/ListEquipment';
import { DashboardStaff } from '@/components/Staff/DashboardStaff';
import { StaffWelComeback } from '@/components/Staff/StaffWelcomeback';
import StaffBookings from '@/components/Staff/StaffBookings';
import StaffRoomOverview from '@/components/Staff/StaffRoomOverview';
import { StaffProfile } from '@/components/Staff/StaffProfie';
import AboutUs from '@/components/AboutUs/AboutUs';
import RoomDetail from '@/components/Content/RoomDetail';
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/profile" />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: path.rooms,
    element: (
      <MainLayout>
        <ListRoom />
      </MainLayout>
    ),
  },
  {
    path: path.equipments,
    element: (
      <MainLayout>
        <EquipmentList />
      </MainLayout>
    ),
  },
  // {
  //   path: 'contact',
  //   element: 'Contact',
  // },

  {
    path: path.foods,
    element: (
      <MainLayout>
        <ListFood />
      </MainLayout>
    ),
  },

  {
    path: path.aboutUs,
    element: (
      <MainLayout>
        <AboutUs />
      </MainLayout>
    ),
  },

  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'room-detail/:roomId',
        element: (
          <MainLayout>
            <RoomDetail />
          </MainLayout>
        ),
        // <BookingRoomDetail />,
      },
      {
        path: 'room-bill',
        element: 'room-bill',
      },
      {
        path: path.settings,
        element: (
          <MainLayout>
            <Settings />
          </MainLayout>
        ),
        children: [
          {
            path: 'edit-profile',
            element: (
              // <MainLayout>
              <ProfileEditor />
              // </MainLayout>
            ),
          },
          {
            path: 'change-password',
            element: (
              // <MainLayout>
              <ChangePassword />
              // </MainLayout>
            ),
          },
          {
            path: 'booking-history',
            element: <BookingHistory />,
          },
          {
            path: 'transaction-history',
            element: <MyWallet />,
          },
          {
            path: 'package-membership',
            element: <PackageMembership />,
          },
        ],
      },
      {
        path: path.manager,
        element: <DashboardManager />,
        children: [
          {
            path: path.managerRooms,
            element: <ManageRoom />,
          },
          {
            path: path.managerStaff,
            element: <ManageStaff />,
          },
          {
            path: '',
            element: <AdminDashboard />,
          },
        ],
      },
      {
        path: path.staff,
        element: <DashboardStaff />,
        children: [
          {
            path: path.staffRooms,
            element: <StaffRoomOverview />,
          },
          {
            path: path.staffBooking,
            element: <StaffBookings />,
          },
          {
            path: '',
            element: <StaffWelComeback />,
          },
          {
            path: path.staffProfile,
            element: <StaffProfile />,
          },
        ],
      },
    ],
  },

  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: path.register,
        element: (
          <MainLayout>
            <SignUp />
          </MainLayout>
        ),
      },
      {
        path: path.login,
        element: (
          <MainLayout>
            <Login />
          </MainLayout>
        ),
      },
    ],
  },
]);
// checkAuthenticated();