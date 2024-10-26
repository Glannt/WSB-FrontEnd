import { RoomTypeAnalyst } from '@/types/dashboard.type';
import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartRoomBookingState {
  series: number[];
  labels: string[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
    dropShadow: {
      enabled: true,
      color: '#C58DCCFF',
      top: 1,
      left: 1,
      blur: 1,
      opacity: 0.45, // Adjust opacity for transparency
    },
  },
  colors: [
    'rgba(254, 215, 170, 0.6)', // Tailwind's orange-200 with transparency
    'rgba(152, 226, 165, 0.6)', // Soft green with transparency
    'rgba(175, 186, 238, 0.6)', // Soft blue with transparency
    'rgba(231, 218, 176, 0.6)',
  ], // Custom colors for rooms
  labels: [
    'Phòng học 1 người',
    'Phòng học 5 người',
    'Phòng họp',
    'Phòng sự kiện',
  ], // Room types
  legend: {
    show: false,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};
interface ChartRoomBookingProps {
  roomTypeAnalysis?: RoomTypeAnalyst;
}

const ChartRoomBooking: React.FC<ChartRoomBookingProps> = ({
  roomTypeAnalysis,
}) => {
  const [state, setState] = useState<ChartRoomBookingState>({
    series: [], // Percentages for room types (example data)
    labels: [],
  });
  React.useEffect(() => {
    if (roomTypeAnalysis) {
      const labels = Object.keys(roomTypeAnalysis);
      const series = Object.values(roomTypeAnalysis);

      setState({ series, labels });
    } else {
      console.warn('roomType analysis null or undefine');
    }
    // Extracting series and labels from roomTypeAnalysis
  }, [roomTypeAnalysis]);
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [40, 30, 15, 15], // Reset to initial values
    }));
  };
  handleReset;

  return (
    <div className="sm:px-7.5 col-span-12 rounded-lg shadow-xl shadow-primary-100 bg-default-50 px-5 pb-5 pt-7.5 dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Phân tích loại phòng
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name=""
              id=""
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" className="dark:bg-boxdark">
                Tháng
              </option>
              <option value="" className="dark:bg-boxdark">
                Năm
              </option>
            </select>
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartRoomBooking" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">

            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-orange-200 "></span>

            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Phòng học 1 người </span>
              <span>
                {' '}
                {(
                  (state.series[0] / state.series.reduce((a, b) => a + b, 0)) *
                  100
                ).toFixed(2) == 'NaN'
                  ? 0
                  : (
                      (state.series[0] /
                        state.series.reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(2)}

                %{' '}
              </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-green-200"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">

              <span> Phòng học 5 người </span>
              <span>
                {' '}
                {(
                  (state.series[1] / state.series.reduce((a, b) => a + b, 0)) *
                  100
                ).toFixed(2) == 'NaN'
                  ? 0
                  : (
                      (state.series[1] /
                        state.series.reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(2)}
                %{' '}
              </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-200"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Phòng họp </span>

              <span>
                {' '}
                {(
                  (state.series[2] / state.series.reduce((a, b) => a + b, 0)) *
                  100
                ).toFixed(2) == 'NaN'
                  ? 0
                  : (
                      (state.series[2] /
                        state.series.reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(2)}
                %{' '}
              </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-yellow-200"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Phòng sự kiện </span>
              <span>
                {' '}
                {(
                  (state.series[3] / state.series.reduce((a, b) => a + b, 0)) *
                  100
                ).toFixed(2) == 'NaN'
                  ? 0
                  : (
                      (state.series[3] /
                        state.series.reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(2)}
                %{' '}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartRoomBooking;
