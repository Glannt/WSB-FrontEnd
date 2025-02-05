import { Customer } from '@/types/customer.type';
import { User } from '@/types/user.type';
import http from '@/utils/http';

export const changePassword = (username: string, formData: FormData) =>
  http.put(
    `/api/customer/manage-profile/change-password/${username}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

export const getUser = () => http.get('/api/customer/manage-profile');

export const changeProfile = (
  username: string,
  body: Omit<Customer, 'wallet' | 'roleName'>
) => http.put(`/api/customer/manage-profile/edit-profile/${username}`, body);

export const getHistoryBooking = () =>
  http.get('/api/customer/history-booking');

export const getService = () => http.get(`/api/get-service-items`);

export const updateServiceBooking = (formdata: FormData) =>
  http.put('/api/customer/update-service', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getDetailRoom = (roomId: string) =>
  http.get(`/api/customer/room-detail/${roomId}`);

export const getSimilarType = (roomType: string) =>
  http.get(`/api/get-room-by-type`, { params: { roomTypeName: roomType } });

export const getAllBuiding = () => http.get(`/api/auth/buildings`);

export const createBooking = (formdata: FormData) =>
  http.post('/api/customer/create-multi-booking', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const reChargeWallet = () => {};

export const createOrderTopUp = (formdata: FormData) =>
  http.post('/vnpay/createOrderTopUp', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getWalletByUserId = (userId: string) =>
  http.get(`/api/user/wallet/${userId}`);

export const getTransactionsByUserId = (userId: string) =>
  http.get(`/api/user/${userId}`);

export const cancelBooking = (formData: FormData) =>
  http.put('/api/customer/cancel-booking', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const postBuyMemberShipPackage = (formdata: FormData) =>
  http.post('/api/customer/buy/membership', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
