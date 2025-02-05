import { Manager } from '@/types/manager.type';
import { AddRoomResponse } from '@/types/room.type';
import http from '@/utils/http';

//Room
export const AddNewRoom = (formdata: FormData) =>
  http.post('/api/manager/add-new-room-img', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const UpdateRoom = (roomId: string | undefined, formData: FormData) =>
  http.put(`/api/manager/update-room/${roomId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getAllRoom = () => http.get('/api/get-all-room');

export const deleteRoomById = (roomId: string | undefined) =>
  http.delete(`/api/manager/delete-room/${roomId}`);

//Staff
export const getAllStaff = () => http.get('/api/auth/staffs/get-staff');

export const updateStaff = (
  staffId: string | undefined,
  body: {
    status: string;
    workDays: string;
    workShift: string;
  }
) => http.put(`/api/auth/staffs/${staffId}`, body);

export const AddNewStaff = (body: {
  fullName: string;
  phoneNumber: string;
  dateOfBirth?: string;
  email?: string;
  workShift: string;
  workDays: string;
  buildingId: string;
  // status: string;
}) => http.post('/api/auth/staffs', body);

export const getTotalBookingInDate = () =>
  http.get('/api/dashboard/total-booking-in-date');

export const getTotalBookingInWeek = () =>
  http.get('/api/dashboard/total-booking-in-week');

export const getTotalBookingInMonth = () =>
  http.get('/api/dashboard/total-booking-in-moth');

export const getTotalSpace = () => http.get('/api/dashboard/total-space');

export const getRoomTypeAnalysisByDate = () =>
  http.get('/api/dashboard/room-type-analyst-date');

export const getRoomTypeAnalysisByWeek = () =>
  http.get('/api/dashboard/room-type-analyst-week');

export const getRoomTypeAnalysisByMonth = () =>
  http.get('/api/dashboard/room-type-analyst-month');

export const getBookingAnalysisByMonth = () =>
  http.get('/api/dashboard/booking-analyst-month');

export const getBookingAnalysisByWeek = () =>
  http.get('/api/dashboard/booking-analyst-week');

export const getBookingAnalysisByDate = () =>
  http.get('/api/dashboard/booking-analyst-date');

export const getProfileManager = () => http.get('/api/auth/managers/profile');

export const updateProfileManager = (
  id: string,
  body: Omit<Manager, 'roleName' | 'buildingId' | 'userId'>
) => {
  http.put(`/api/auth/managers/${id}`, body);
};
export const getRevenueByMonth = () => http.get(`/api/dashboard/revenue`);
