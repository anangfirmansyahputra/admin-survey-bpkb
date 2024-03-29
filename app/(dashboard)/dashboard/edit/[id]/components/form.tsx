"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

const FormLayout = ({ id }: { id: string }) => {
  const [kepuasan, setKepuasan] = useState("3");
  const [waktu, setWaktu] = useState("");
  const [detik, setDetik] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (waktu === "" || detik === "") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Mohon untuk mengisi data terlebih dahulu",
      });

      return;
    }

    const dateObj = new Date(waktu);
    dateObj.setSeconds(Number(detik));

    const formattedWaktu =
      dateObj.toISOString().slice(0, 19).replace("T", " ") + ".077+00";

    const { data } = await axios.post("/api/update", {
      id,
      kepuasan,
      created_at: formattedWaktu,
    });

    if (!data.success) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Server sedang bermasalah, silahkan ulangi kembali",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data Telah Diupdate",
      });

      navigate.push("/dashboard/daftar-penilaian");
    }
  };

  const handleDetikChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let detikValue;

    if (inputValue === "") {
      detikValue = "";
    } else {
      const parsedValue = parseInt(inputValue, 10);
      detikValue = parsedValue <= 59 ? inputValue : "59";
    }

    setDetik(detikValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post("/api/find", {
        id,
      });

      if (data) {
        const dateObj = new Date(data.data.created_at);
        const tahun = dateObj.getFullYear();
        const bulan = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Tambah 1 karena bulan dimulai dari 0
        const tanggal = dateObj.getDate().toString().padStart(2, "0");
        const jam = dateObj.getHours().toString().padStart(2, "0");
        const menit = dateObj.getMinutes().toString().padStart(2, "0");

        const created_at = `${tahun}-${bulan}-${tanggal}T${jam}:${menit}`;
        const detik = dateObj.getSeconds();

        setKepuasan(data.data.kepuasan);
        setWaktu(created_at);
        setDetik(detik.toString());
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Data tidak ditemukan",
        });
        navigate.push("/dashboard/daftar-penilaian");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Update Data" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Update Nilai Kepuasan
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Kepuasan
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        onChange={(e) => setKepuasan(e.target.value)}
                        value={kepuasan}
                        disabled={isLoading}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="3">Sangat Puas</option>
                        <option value="2">Puas</option>
                        <option value="1">Cukup Puas</option>
                        <option value="0">Kurang Puas</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Waktu
                    </label>
                    <input
                      type="datetime-local"
                      disabled={isLoading}
                      onChange={(e) => setWaktu(e.target.value)}
                      value={waktu}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Detik
                    </label>
                    <input
                      disabled={isLoading}
                      type="number"
                      min={0}
                      max={59}
                      onChange={handleDetikChange}
                      onClick={() => detik === "0" && setDetik("")}
                      value={detik}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  disabled={isLoading}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormLayout;
