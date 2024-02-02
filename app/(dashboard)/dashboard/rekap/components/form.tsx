"use client";

import { dateFormat } from "@/utils/dateFormat";
import { items } from "@/utils/types";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Form() {
  const [data, setData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getWidthText = (doc: any, text: string) => {
    const textWidth = doc.getTextWidth(text);

    // Menghitung posisi X agar teks berada di tengah
    const pageWidth = doc.internal.pageSize.width;
    const xPosition = (pageWidth - textWidth) / 2;

    return xPosition;
  };

  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "portrait" });

    const fontSize = 13;
    doc.setFontSize(fontSize);
    doc.setFont("Helvetica", "", "bold");
    const text = "SURVEY KEPUASAN PELAYANAN BPKB DITLANTAS POLDA BALI";

    // Menghitung lebar teks

    // Menambahkan teks di tengah dokumen
    doc.text(text, getWidthText(doc, text), 20);
    doc.text(
      "DIREKTORAT LALU LINTAS POLDA BALI",
      getWidthText(doc, "DIREKTORAT LALU LINTAS POLDA BALI"),
      30
    );

    doc.addImage("/images/template.png", "PNG", 15, 50, 180, 180);
    doc.setFontSize(8);
    doc.setFont("Helvetica", "", "bold");
    doc.setTextColor("#ffffff");

    let date = "";

    if (startDate === endDate) {
      const newDate = new Date(startDate);
      date = newDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } else {
      const newDate = new Date(startDate);
      const endNewDate = new Date(endDate);

      date = `${newDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })} - ${endNewDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`;
    }

    // const date = "1 Februari 2023 - 30 Februari 2023";
    doc.text(date, getWidthText(doc, date), 223);

    doc.addPage("a4", "p");

    // @ts-ignore
    doc.autoTable({
      // html: "#my-table",
      html: "#my-table-total",
      startY: 30,
    });

    // @ts-ignore
    doc.autoTable({
      html: "#my-table",
      // html: "#my-table-total",
      startY: 85,
    });

    doc.save("data.pdf");
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);

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
        const { data } = await axios.post(`/api/getData`, {
          start: startDate,
          to: endDate,
        });

        if (data.data.length > 0) {
          setData(data.data);
          await new Promise((resolve) => setTimeout(resolve, 10));

          exportPdf();
        } else {
          Swal.fire({
            title: "Gagal",
            text: "Tidak ada data pada rentan waktu yang diminta",
            icon: "error",
          });
        }
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
                    value={startDate}
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
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                disabled={isLoading}
                className={`flex w-full justify-center rounded  p-3 font-medium  ${
                  isLoading ? "bg-gray text-black" : "bg-primary text-gray"
                }`}>
                {isLoading ? "Loading" : "Buat Rekap"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <table id="my-table-total" className="hidden">
        <thead>
          <tr>
            <th>No</th>
            <th>Kepuasan</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Sangat Puas</td>
            <td>{data.filter((item) => item.kepuasan === "3").length}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Puas</td>
            <td>{data.filter((item) => item.kepuasan === "2").length}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Cukup Puas</td>
            <td>{data.filter((item) => item.kepuasan === "1").length}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Kurang Puas</td>
            <td>{data.filter((item) => item.kepuasan === "0").length}</td>
          </tr>
          <tr>
            <td colSpan={2}>Total</td>
            <td>{data.length}</td>
          </tr>
        </tbody>
      </table>

      {data.length > 0 && (
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
              const findItem = items.find(
                (i) => i.id === Number(item.kepuasan)
              );
              const { date, day, time } = dateFormat(item.created_at);

              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{findItem?.text}</td>
                  <td>{`${day}, ${date}, ${time}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
