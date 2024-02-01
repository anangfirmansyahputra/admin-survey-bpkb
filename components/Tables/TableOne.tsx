"use client";

import { BRAND } from "@/types/brand";
import Image from "next/image";

import { Laugh, Smile, Meh, Frown } from "lucide-react";
import { dateFormat } from "@/utils/dateFormat";

const data = [
  {
    id: 3,
    text: "Sangat Puas",
    icon: Laugh,
    value: 12,
    time: "12.00",
    day: "Senin",
    date: "March 13 2000",
  },
  {
    id: 2,
    text: "Puas",
    icon: Smile,
    value: 13,
    time: "12.00",
    day: "Senin",
    date: "March 13 2000",
  },

  {
    id: 1,
    text: "Cukup",
    icon: Meh,
    value: 2,
    time: "12.00",
    day: "Senin",
    date: "March 13 2000",
  },
  {
    id: 0,
    text: "Tidak Puas",
    icon: Frown,
    value: 1,
    time: "12.00",
    day: "Senin",
    date: "March 13 2000",
  },
];

const TableOne = ({ lastData }: { lastData: any[] }) => {

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        5 Penilaian Terakhir
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nilai Kepuasan
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Jam</h5>
          </div>
          <div className="p-2.5 xl:p-5 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Hari
            </h5>
          </div>
          <div className="hidden p-2.5 sm:block xl:p-5 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tanggal
            </h5>
          </div>
        </div>

        {lastData.map((brand, key) => {
          const { date, day, time } = dateFormat(brand.created_at);

          const findData = data.find(
            (item) => item.id === Number(brand.kepuasan)
          );

          if (findData) {
            return (
              <div
                className={`grid grid-cols-3 sm:grid-cols-4 ${key === data.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
                  }`}
                key={key}>
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    <findData.icon />
                  </div>
                  <p className="hidden text-black dark:text-white sm:block">
                    {findData.text}
                  </p>
                </div>

                <div className="flex items-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{time}</p>
                </div>
                <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{day}</p>
                </div>
                <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{date}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TableOne;
