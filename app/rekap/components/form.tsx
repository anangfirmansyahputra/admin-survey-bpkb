"use client";

import { dateFormat } from "@/utils/dateFormat";
import { items } from "@/utils/types";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useState } from "react";

export default function Form() {
  const [data, setData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "portrait" });

    // doc.text("Anang", 20, 30);
    // @ts-ignore
    doc.autoTable({
      html: "#my-table",
    });

    doc.save("data.pdf");
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      console.log(
        "Tanggal akhir harus lebih besar atau sama dengan tanggal awal."
      );
      return;
    } else {
      const { data } = await axios.post("http://localhost:3000/api/getData", {
        start: startDate,
        to: endDate,
      });

      setData(data.data);
      await new Promise((resolve) => setTimeout(resolve, 2));

      exportPdf();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Form Rekap Data
            </h3>
          </div>
          <form action="#" onSubmit={handleFormSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Dari
                  </label>
                  <input
                    type="date"
                    // onChange={handleStartDateChange}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Sampai
                  </label>
                  <input
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    // onChange={handleEndDateChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                Buat Rekap
              </button>
            </div>
          </form>
        </div>
      </div>

      <table id="my-table" className="hidden">
        <thead>
          <tr>
            <th>No</th>
            <th>Kepuasan</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            const findItem = items.find((i) => i.id === Number(item.kepuasan));
            const { date, day, time } = dateFormat(item.created_at);

            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{findItem?.text}</td>
                <td>{`${day}, ${date} pukul ${time} WIB`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
