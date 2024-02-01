"use client";

import { dateFormat } from "@/utils/dateFormat";
import { supabase } from "@/utils/supabase";
import axios from "axios";
import { Frown, Laugh, Meh, Smile } from "lucide-react";
import { useEffect, useState } from "react";

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

const TableTwo = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(`${process.env.URL}/api/pagination`, {
        page,
      });

      setData(data.data);
      setHasNext(data.hasNext);
      setIsLoading(false);
    };

    fetchData();
    // setIsLoading(false);
  }, [page]);

  return (
    <div className="space-y-5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Semua Daftar Penilaian
          </h4>
        </div>

        <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">No</p>
          </div>
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

        {data.length === 0 ? (
          <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
            <div className="col-span-5 hidden items-center sm:flex text-center">
              <p className="text-lg text-graydark dark:text-white w-full py-5">
                Tidak Ada Data
              </p>
            </div>
          </div>
        ) : (
          data.map((product, key) => {
            const { date, day, time } = dateFormat(product.created_at);
            const findData = items.find(
              (item) => item.id === Number(product.kepuasan)
            );

            if (findData) {
              return (
                <div
                  className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5"
                  key={key}>
                  <div className="col-span-1 hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                      {key + 1 + page * 10}
                    </p>
                  </div>
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
          })
        )}
      </div>
      <div className="grid sm:grid-cols-5">
        <div className="col-span-1 sm:block hidden"></div>
        <div className="col-span-1 sm:block hidden"></div>
        <div className="col-span-1 sm:block hidden"></div>
        <div className="col-span-1 sm:block hidden"></div>
        <div className="flex gap-5 col-span-1">
          <button
            onClick={() => {
              setIsLoading(true);
              setPage(page - 1);
            }}
            disabled={isLoading || page === 0}
            className={`flex w-full justify-center rounded  p-3 font-medium  ${
              isLoading || page === 0
                ? "bg-stroke text-black"
                : "bg-secondary text-white"
            }`}>
            {"Prev"}
          </button>
          <div className="bg-white flex items-center justify-center w-full rounded-sm font-semibold">
            {page + 1}
          </div>
          <button
            disabled={isLoading || !hasNext}
            onClick={() => {
              setIsLoading(true);
              setPage(page + 1);
            }}
            className={`flex w-full justify-center rounded  p-3 font-medium  ${
              isLoading || !hasNext
                ? "bg-stroke text-black"
                : "bg-primary text-gray"
            }`}>
            {"Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableTwo;
