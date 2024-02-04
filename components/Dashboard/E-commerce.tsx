import { Frown, Laugh, Meh, Smile } from "lucide-react";

import CardDataStats from "../CardDataStats";
import ChartThree from "../Charts/ChartThree";
import TableOne from "../Tables/TableOne";
// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});

const ECommerce = ({
  totalCukup,
  totalPuas,
  totalSangatPuas,
  totalTidakPuas,
}: {
  totalSangatPuas: any;
  totalPuas: any;
  totalCukup: any;
  totalTidakPuas: any;
}) => {
  const data = [
    {
      id: 3,
      text: "Sangat Puas",
      icon: Laugh,
      value: totalSangatPuas.count,
    },
    {
      id: 2,
      text: "Puas",
      icon: Smile,
      value: totalPuas.count,
    },

    {
      id: 1,
      text: "Cukup Puas",
      icon: Meh,
      value: totalCukup.count,
    },
    {
      id: 0,
      text: "Kurang Puas",
      icon: Frown,
      value: totalTidakPuas.count,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {data.map((item) => (
          <CardDataStats
            key={item.id}
            title={"Total Hari Ini"}
            total={item.text}
            rate={item.value.toString()}
            levelUp={item.value === 0 ? false : true}>
            <item.icon className="text-[#3C50E0] dark:text-white" />
          </CardDataStats>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <TableOne />
        </div>
        <ChartThree />
      </div>
    </>
  );
};

export default ECommerce;
