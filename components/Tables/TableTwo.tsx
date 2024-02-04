"use client";

import { dateFormat } from "@/utils/dateFormat";
import axios from "axios";
import {
  ArrowDownNarrowWide,
  ChevronDown,
  Edit2,
  Frown,
  Laugh,
  Meh,
  Smile,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

const TableTwo = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isAscending, setIsAscending] = useState("DESC");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useRouter();

  const fetchData = async (page: number, start?: string, to?: string) => {
    const { data } = await axios.post(`/api/pagination`, {
      page,
      desc: isAscending !== "DESC" ? true : false,
      start,
      to,
    });

    setData(data.data);
    setHasNext(data.hasNext);
    setTotalPage(data.totalPage);
    setTotalData(data.totalData);
    if (data.data.length === 0) {
      setPage(0);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(page, startDate, endDate);
  }, [isAscending]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      if (startDate === "" && endDate === "") {
        await fetchData(0, "", "");
        return;
      }

      if (startDate === "" || endDate === "") {
        Swal.fire({
          title: "Gagal",
          text: "Mohon untuk mengisi tanggal terlebih dahulu",
          icon: "error",
        });
        return;
      }

      if (new Date(startDate) > new Date(endDate)) {
        Swal.fire({
          title: "Gagal",
          text: "Tanggal akhir harus lebih besar atau sama dengan tanggal awal.",
          icon: "error",
        });
        return;
      } else {
        await fetchData(0, startDate, endDate);
        setPage(0);
      }
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text: "Rekap gagal, silahkan coba kembali",
        icon: "error",
      });
    } finally {
      // setStartDate("");
      // setEndDate("");
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data akan dihapus selamanya",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const { data } = await axios.post(`/api/delete`, {
          id,
        });

        if (!data.success) {
          Swal.fire({
            title: "Gagal",
            text: "Menghapus data gagal, silahkan coba kembali",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Terhapus",
            text: "Data telah terhapus",
            icon: "success",
          });

          await fetchData(page, startDate, endDate);
        }
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Semua Daftar Penilaian
          </h4>
        </div>

        <div className="grid grid-cols-6 items-center gap-5.5 pt-3 pb-5 px-6.5">
          <div className="col-span-6 md:col-span-2 xl:col-span-1 relative z-20 bg-white dark:bg-form-input">
            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
              <ArrowDownNarrowWide className="w-5 h-5" />
            </span>
            <select
              onChange={(e) => {
                setIsAscending(e.target.value);
                setPage(0);
              }}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
              <option value="DESC">DESCENDING</option>
              <option value="ASC">ASCENDING</option>
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <ChevronDown className="w-6 h-6" />
            </span>
          </div>
          <input
            type="text"
            placeholder={`${totalPage.toString()} Halaman`}
            disabled
            className="col-span-3 md:col-span-2 xl:col-span-1 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
          />

          <input
            type="text"
            placeholder={`${totalData.toString()} Data`}
            disabled
            className="col-span-3 md:col-span-2 xl:col-span-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
          />

          <div className="flex flex-col sm:flex-row col-span-6 md:col-span-4 xl:col-span-2 items-center gap-5">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <div>Sampai</div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <button
            disabled={isLoading}
            onClick={handleFormSubmit}
            className={`flex col-span-6 md:col-span-2 xl:col-span-1 justify-center rounded w-f sm:col-1  p-3 px-10 font-medium  ${
              isLoading ? "bg-gray text-black" : "bg-primary text-gray"
            }`}>
            {isLoading ? "Loading" : "Filter"}
          </button>
        </div>

        <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:grid-cols-6 md:px-6 2xl:px-7.5">
          <div className="col-span-1 hidden md:flex items-center">
            <p className="font-medium">No</p>
          </div>
          <div className="col-span-1 md:col-span-1 flex items-center">
            <p className="font-medium">Tingkat Kepuasan</p>
          </div>
          <div className="col-span-1 hidden items-center md:flex">
            <p className="font-medium">Jam</p>
          </div>
          <div className="col-span-1 hidden md:flex items-center">
            <p className="font-medium">Hari</p>
          </div>
          <div className="col-span-1 hidden md:flex items-center">
            <p className="font-medium">Tanggal</p>
          </div>
          <div className="col-span-1 md:hidden flex items-center">
            <p className="font-medium">Waktu</p>
          </div>
          <div className="col-span-1 items-center">
            <p className="font-medium">Aksi</p>
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
                  className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:grid-cols-6 md:px-6 2xl:px-7.5"
                  key={key}>
                  <div className="col-span-1 hidden items-center md:flex">
                    <p className="text-sm text-black dark:text-white">
                      {key + 1 + page * 10}
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-1 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <findData.icon className="w-8 h-8" />
                      <p className="text-sm text-black dark:text-white">
                        {findData.text}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 hidden items-center md:flex">
                    <p className="text-sm text-black dark:text-white">{time}</p>
                  </div>

                  <div className="col-span-1 hidden md:flex items-center">
                    <p className="text-sm text-black dark:text-white">{day}</p>
                  </div>
                  <div className="col-span-1 hidden md:flex items-center">
                    <p className="text-sm text-black dark:text-white">{date}</p>
                  </div>
                  <div className="col-span-1 md:hidden flex items-center">
                    <p className="text-sm text-black dark:text-white">{`${day}, ${date} pukul ${time} WIB`}</p>
                  </div>
                  <div className="col-span-1 space-x-5 flex items-center">
                    <div
                      onClick={() =>
                        !isLoading &&
                        navigate.push(`/dashboard/edit/${product.id}`)
                      }
                      className="bg-[#f59e0b] cursor-pointer p-2 rounded hover:bg-[#fb923c] transition-colors">
                      <Edit2 className="w-5 h-5 text-[#fff]" />
                    </div>
                    <div
                      className="bg-[#f87171] cursor-pointer p-2 rounded hover:bg-[#ef4444] transition-colors"
                      onClick={() => !isLoading && handleDelete(product.id)}>
                      <Trash className="w-5 h-5 text-[#fff]" />
                    </div>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>
      <div className="grid sm:grid-cols-5">
        <div className="flex gap-5 col-span-6 md:col-end-6 xl:col-end-6 md:col-span-2 xl:col-span-1">
          <button
            onClick={() => {
              setIsLoading(true);
              setPage(page - 1);
              fetchData(page - 1, startDate, endDate);
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
              fetchData(page + 1, startDate, endDate);
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
