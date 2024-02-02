"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { dateFormat } from "@/utils/dateFormat";
import { Frown, Laugh, Meh, Smile } from "lucide-react";
import Link from "next/link";

const items = [
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
    text: "Cukup Puas",
    icon: Meh,
    value: 2,
    time: "12.00",
    day: "Senin",
    date: "March 13 2000",
  },
  {
    id: 0,
    text: "Kurang Puas",
    icon: Frown,
    value: 1,
    time: "12.00",
    day: "Senin",
    date: "March 13 2000",
  },
];

const TableRekap = ({ data }: { data: any[] }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Semua Daftar Penilaian
        </h4>
        <Link
          href="#"
          onClick={() => alert("asdasd")}
          className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Buat Rekap
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Tingkat Kepuasan</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Jam</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Hari</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Tanggal</p>
        </div>
      </div>

      {data.map((product, key) => {
        const { date, day, time } = dateFormat(product.created_at);
        const findData = items.find(
          (item) => item.id === Number(product.kepuasan)
        );

        if (findData) {
          return (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5"
              key={key}>
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <findData.icon className="w-8 h-8" />
                  <p className="text-sm text-black dark:text-white">
                    {findData.text}
                  </p>
                </div>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{time}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">{day}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">{date}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TableRekap;
