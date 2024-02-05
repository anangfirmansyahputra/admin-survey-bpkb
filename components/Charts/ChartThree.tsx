"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartThreeState {
  series: number[];
}

const ChartThree = () => {
  const [montly, setMontly] = useState("0");
  const [state, setState] = useState<ChartThreeState>({
    series: [25, 25, 25, 25],
  });

  const percentage = (number: number) => {
    const total =
      (number /
        (state.series[0] +
          state.series[1] +
          state.series[2] +
          state.series[3])) *
      100;

    return total.toFixed(1);
  };

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    colors: ["#10B981", "#375E83", "#259AE6", "#FFA70B"],
    labels: ["Sangat Puas", "Puas", "Cukup Puas", "Kurang Puas"],
    legend: {
      show: true,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
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

  useEffect(() => {
    const today = new Date().toISOString();
    // @ts-ignore
    let start, to;

    if (montly === "0") {
      // Jika montly === "0", kirim data dari 00.000 sampai 24.000 pada hari tersebut
      start = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
      to = today;
    } else if (montly === "1") {
      // Jika montly === "1", kirim data dari Senin sampai Minggu di periode hari tersebut
      const currentDay = new Date().getDay();
      const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1;
      const daysFromSunday = 7 - currentDay;

      start = new Date(
        new Date().setHours(0, 0, 0, 0) - daysUntilMonday * 24 * 60 * 60 * 1000
      ).toISOString();
      to = new Date(
        new Date().setHours(23, 59, 59, 999) +
          daysFromSunday * 24 * 60 * 60 * 1000
      ).toISOString();
    } else if (montly === "2") {
      // Jika montly === "2", kirim data dari tanggal 1 sampai akhir bulan
      start = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ).toISOString();
      to = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).toISOString();
    } else if (montly === "3") {
      // Jika montly === "3", kirim data dari tanggal 1 Januari sampai akhir Desember
      start = new Date(new Date().getFullYear(), 0, 1).toISOString();
      to = new Date(
        new Date().getFullYear(),
        11,
        31,
        23,
        59,
        59,
        999
      ).toISOString();
    }

    const fetchData = async () => {
      const { data } = await axios.post("/api/statistic", {
        // @ts-ignore
        start,
        // @ts-ignore
        to,
      });

      setState({
        series: [
          data.totalSangatPuas,
          data.totalPuas,
          data.totalCukup,
          data.totalTidakPuas,
        ],
      });
    };

    fetchData();
  }, [montly]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Kepuasan Analytics
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name=""
              id=""
              onChange={(e) => setMontly(e.target.value)}
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none">
              <option value="0">Hari Ini</option>
              <option value="1">Minggu Ini</option>
              <option value="2">Bulan Ini</option>
              <option value="3">Tahun Ini</option>
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
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
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      {state.series[0] === 0 &&
      state.series[1] === 0 &&
      state.series[2] === 0 &&
      state.series[3] === 0 ? (
        <></>
      ) : (
        <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
          <div className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#10B981]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>Sangat Puas</span>
                <span>{percentage(state.series[0])}%</span>
              </p>
            </div>
          </div>
          <div className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#375E83]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> Puas </span>
                <span>{percentage(state.series[1])}%</span>
              </p>
            </div>
          </div>
          <div className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#259AE6]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> Cukup Puas </span>
                <span>{percentage(state.series[2])}%</span>
              </p>
            </div>
          </div>
          <div className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#FFA70B]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> Kurang Puas </span>
                <span>{percentage(state.series[3])}%</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartThree;
