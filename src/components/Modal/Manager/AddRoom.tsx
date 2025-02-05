import { UploadImage } from '@/components/AdminService/UploadImage';
import { roomTypes } from '@/data/dataRoomType';
import { roomStatusManager } from '@/data/dataStatusRoom';

import {
  AddNewRoom,
  getAllStaff,
  getProfileManager,
} from '@/service/manager.api';
import { getAllBuilding } from '@/service/owner.api';
import { Building } from '@/types/building.type';
import { Manager } from '@/types/manager.type';
import { AddRoomResponse } from '@/types/room.type';
import { Staff } from '@/types/staff.type';
import { getAccessTokenFromLS } from '@/utils/auth';
import http from '@/utils/http';
import { schemaAddRoom, SchemaAddRoom } from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchRooms: () => void;
}

interface ListStaffID {
  staffID: string;
}
export const AddRoom: React.FC<RoomModalProps> = ({
  isOpen,
  onClose,
  refetchRooms,
}) => {
  const [valueStatus, setValueStatus] = React.useState(new Set(['AVAILABLE']));
  const [valueRoomType, setValueRoomType] = React.useState(new Set(['RT001']));
  const [selectedStaff, setSelectedStaff] = React.useState<string[]>([]);
  const getAllBuildingsApi = async () => {
    const response = await getAllBuilding();
    return response.data.data;
  };
  const getProfileManagerApi = async () => {
    const response = await getProfileManager();
    console.log(response.data.data);

    return response.data.data;
  };
  const {
    data: manager,
    isLoading: isLoadingProfileManager,
    refetch: isRefetchProfileManager,
  } = useQuery<Manager>({
    queryKey: ['manager'],
    queryFn: getProfileManagerApi,
  });
  const {
    data: buildings = [],
    isLoading: isLoadingBuildings,
    refetch: isRefetchBuilding,
  } = useQuery<Building[]>({
    queryKey: ['buildings'],
    queryFn: getAllBuildingsApi,
  });
  const getAllStaffApi = async () => {
    const response = await getAllStaff();
    return response.data.data;
  };
  const {
    data: staffs = [],
    isLoading,
    refetch,
  } = useQuery<Staff[]>({
    queryKey: ['staffs'],
    queryFn: getAllStaffApi,
  });

  const [images, setImages] = React.useState<{ file: File; url: string }[]>([]);

  const handleImageUpload = (uploadedImages: { file: File; url: string }[]) => {
    setImages(uploadedImages); // Cập nhật hình ảnh
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm<SchemaAddRoom>({
    resolver: yupResolver(schemaAddRoom),
    defaultValues: {
      roomName: '',
      buildingId: '',
      roomTypeId: '',
      listStaffID: [],
      image: [],
      price: 0,
      status: '',
    },
  });

  const AddNewRoomMutation = useMutation({
    mutationFn: (formData: FormData) => AddNewRoom(formData),
  });
  const addNewRoom = (data: SchemaAddRoom) => {
    const formdata = new FormData();
    console.log(data);

    // Append all form fields to the FormData object
    formdata.append('roomName', data.roomName);
    formdata.append('price', data.price.toString());
    formdata.append('status', data.status);
    formdata.append('roomTypeId', data.roomTypeId);
    formdata.append('buildingId', data.buildingId.toString());

    // Check if listStaffID exists and append it
    if (data.listStaffID && data.listStaffID.length > 0) {
      data.listStaffID.forEach((id, index) => {
        formdata.append(`listStaffID`, id); // Append each staff ID
      });
    }

    // if (images.length > 0) {
    images.forEach((image) => {
      formdata.append('image', image.file); // Chỉ sử dụng roomImg cho nhiều tệp
    });
    // } else {
    //   formData.append('image', '');
    // }
    for (let pair of formdata.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    AddNewRoomMutation.mutate(formdata, {
      onSuccess: () => {
        refetchRooms();
        // Close modal or do something on success
        onClose();
      },
      onError: (error) => {
        console.log('Add NewRoomMutation error', error);
      },
    });
  };
  const onSubmit = handleSubmit((data) => {
    // Call update room function
    addNewRoom(data); // Call add new room function
  });
  const handleFieldChange = (field: keyof SchemaAddRoom, value: any) => {
    setValue(field, value);
    console.log(getValues());
  };
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      placement="top-center"
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        base: 'max-w-[1000px] h-auto',
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {'Thêm phòng mới'}
            </ModalHeader>
            <form onSubmit={onSubmit}>
              <ModalBody>
                <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4 outline-none border-0">
                  <Input
                    isClearable
                    autoFocus
                    label="Tên phòng"
                    placeholder="Nhập tên phòng"
                    variant="bordered"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0 focus:outline-none focus:border-none',
                      clearButton: 'pb-4',
                    }}
                    defaultValue={''}
                    {...register('roomName')}
                    onChange={(e) =>
                      handleFieldChange('roomName', e.target.value)
                    }
                    errorMessage={errors.roomName?.message}
                    isInvalid={errors.roomName?.message ? true : false}
                  />
                  <Input
                    label="Giá"
                    placeholder="Nhập giá phòng"
                    type="number"
                    variant="bordered"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0',
                    }}
                    defaultValue={''}
                    {...register('price')}
                    onChange={(e) => handleFieldChange('price', e.target.value)}
                    errorMessage={errors.price?.message}
                    isInvalid={errors.price?.message ? true : false}
                  />
                </div>
                <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                  <Select
                    label="Trạng thái phòng"
                    className="max-w-xl"
                    {...register('status')}
                    onSelectionChange={(keys) => {
                      const newStatus = keys;
                      handleFieldChange('status', newStatus.toString());
                    }}
                    isInvalid={errors.status ? true : false}
                    errorMessage={errors.status?.message}
                  >
                    {roomStatusManager.map((roomStatuses) => (
                      <SelectItem key={roomStatuses.key}>
                        {roomStatuses.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Loại phòng"
                    placeholder="Chọn loại phòng"
                    className="max-w-xl"
                    {...register('roomTypeId')}
                    onSelectionChange={(keys) => {
                      const newRoomTypeId = Array.from(keys)[0];
                      // setValue('roomTypeId', newRoomTypeId.toString());
                      handleFieldChange('roomTypeId', newRoomTypeId.toString());
                    }}
                    isInvalid={errors.roomTypeId ? true : false}
                    errorMessage={errors.roomTypeId?.message}
                  >
                    {roomTypes.map((roomType) => (
                      <SelectItem key={roomType.key}>
                        {roomType.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                  <Select
                    aria-multiselectable="true"
                    aria-errormessage="Lỗi"
                    label="Nhân viên"
                    selectionMode="multiple"
                    placeholder="Chọn nhân viên phụ trách"
                    className="max-w-xl"
                    // {...register('listStaffID')}
                    onSelectionChange={(keys) => {
                      // const listStaffID = Array.from(keys).join(',');
                      // handleFieldChange('listStaffID', listStaffID);
                      const listStaffID = Array.from(keys);
                      handleFieldChange('listStaffID', listStaffID);
                    }}
                  >
                    {staffs.map((staff) => (
                      <SelectItem key={staff.userId}>
                        {staff.fullName}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Chọn cơ sở"
                    className="max-w-xl"
                    // {...register('buildingId')}
                    onSelectionChange={(keys) => {
                      const newBuilding = Array.from(keys)[0];
                      handleFieldChange('buildingId', newBuilding.toString());
                    }}
                    isInvalid={errors.buildingId ? true : false}
                    errorMessage={errors.buildingId?.message}
                  >
                    {buildings.map((building) => (
                      <SelectItem
                        key={building.buildingId}
                        isDisabled={manager?.buildingId != building.buildingId}
                      >
                        {building.buildingName}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="py-2 px-3">
                  <UploadImage onImagesUpload={handleImageUpload} />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="primary" type="submit">
                  {'Tạo'}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
