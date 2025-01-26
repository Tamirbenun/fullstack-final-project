import { MdRefresh } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { getFlightsCountByDate } from "../../services/flights-service";
import { MutatingDots } from "react-loader-spinner";
import ReactApexChart from "react-apexcharts";
import { ThemeContext } from "../../contexts/ThemeContext";
import { TbFaceIdError } from "react-icons/tb";
import { Link } from "react-router-dom";

const CubeTwo = () => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [state, setState] = useState({
    series: [
      {
        name: "Flights",
        data: [0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 100,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
          distributed: true,
          borderRadius: 7,
        },
      },
      colors: ["#a9a9a9", "#004fa4", "#a9a9a9", "#a9a9a9"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: ["YES", "TOD", "TOM", "2D"],
        axisBorder: {
          show: true,
          color: "rgba(144, 144, 144, 0.5)",
          height: 1,
          width: "100%",
          offsetX: 0,
          offsetY: 0,
        },
        labels: {
          show: true,
          style: {
            colors: ["#808080", "#004fa4", "#808080", "#808080"],
            fontSize: "12px",
          },
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#808080",
          },
        },
        axisBorder: {
          color: "rgba(144, 144, 144, 0.5)",
        },
      },
      grid: {
        borderColor: "rgba(144, 144, 144, 0.5)",
      },
    },
  });

  const fetchFlightsCount = async () => {
    setLoading(true);
    const today: string = new Date().toISOString();
    const yesterday: string = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toISOString();
    const tomorrow: string = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString();
    const dayAfterTomorrow: string = new Date(
      new Date().setDate(new Date().getDate() + 2)
    ).toISOString();

    try {
      const response1 = await getFlightsCountByDate(yesterday);
      const response2 = await getFlightsCountByDate(today);
      const response3 = await getFlightsCountByDate(tomorrow);
      const response4 = await getFlightsCountByDate(dayAfterTomorrow);
      if (response1.data.error) {
        setError(response1.data.error);
      } else {
        setState({
          series: [
            {
              name: "Flights",
              data: [
                response1.data,
                response2.data,
                response3.data,
                response4.data,
              ],
            },
          ],
          options: {
            chart: {
              height: 90,
              type: "bar",
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                columnWidth: "70%",
                distributed: true,
                borderRadius: 7,
              },
            },
            colors: ["#a9a9a9", "#004fa4", "#a9a9a9", "#a9a9a9"],
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: ["YES", "TOD", "TOM", "2D"],
              axisBorder: {
                show: true,
                color: "rgba(144, 144, 144, 0.5)",
                height: 1,
                width: "100%",
                offsetX: 0,
                offsetY: 0,
              },
              labels: {
                show: true,
                style: {
                  colors: ["#808080", "#004fa4", "#808080", "#808080"],
                  fontSize: "10px",
                },
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: "#808080",
                },
              },
              axisBorder: {
                color: "rgba(144, 144, 144, 0.5)",
              },
            },
            grid: {
              borderColor: "rgba(144, 144, 144, 0.5)",
            },
          },
        });
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchFlightsCount();
  }, [theme]);

  const handleRefresh = () => {
    fetchFlightsCount();
  };

  return (
    <div className="relative transition-colors duration-500 ease-in-out bg-gray-100 dark:bg-[#343434] rounded-3xl p-6 h-64">
      <div className="flex justify-between items-center gap-3">
        <Link className="text-lg font-semibold" to={"/Flights"}>
          Daily Flights
        </Link>
        <button
          className="bg-none rounded-full hover:text-white hover:bg-black p-1"
          onClick={handleRefresh}
        >
          <MdRefresh className="text-lg" />
        </button>
      </div>

      {!loading ? (
        !error ? (
          <div className="">
            <div id="chart">
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={200}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-[28px]">
            <div className="text-center">
              <div className="flex justify-center">
                <TbFaceIdError className="text-5xl" />
              </div>
              <p className="font-medium text-xl">Network Error</p>
              <p className="text-sm">
                Plase Check your Network
                <br /> and try again
              </p>
              <p className="text-xs">{error}</p>
            </div>
          </div>
        )
      ) : (
        <>
          {localStorage.getItem("theme") === "light" ? (
            <div className="flex justify-center mt-10 h-screen">
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#003268"
                secondaryColor="#003268"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div className="flex justify-center mt-10 h-screen">
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#ffffff"
                secondaryColor="#ffffff"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CubeTwo;
