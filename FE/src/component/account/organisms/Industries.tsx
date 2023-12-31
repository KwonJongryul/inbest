import ReactApexChart from "react-apexcharts";
import { Industry } from "../../../type/MemberInfo";
import notResult from "../../../asset/image/notResult.png";
const Industries = ({ industries }: { industries: Industry[] }) => {
  const industryList = industries.map((item) => item.industry);
  const purchaseAmount = industries.map((item) => item.purchaseAmount);
  return (
    <div className="bg-white rounded-lg shadow-md py-5 w-2/5">
      {(!industries || industries.length <= 0) && (
        <>
          <div className="flex justify-center items-center w-[450px] h-full">
            <div className="text-center">
              <img src={notResult} alt="404" className="w-56 h-56" />
              아직 데이터가 없어요!
            </div>
          </div>
        </>
      )}
      {industries && industries.length > 0 && (
        <ReactApexChart
          options={{
            chart: {
              type: "donut",
            },
            legend: {
              position: "bottom",
            },
            responsive: [
              {
                breakpoint: 480,
              },
            ],
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      showAlways: true,
                      show: true,
                      label: "총 투자금액",
                      fontSize: "12px",
                      color: "red",
                      formatter: function (w) {
                        const total = w.globals.seriesTotals.reduce((a: number, b: number) => {
                          return a + b;
                        }, 0);
                        return total.toLocaleString() + "원";
                      },
                    },
                    value: {
                      fontSize: "22px",
                      show: true,
                      color: "blue",
                    },
                  },
                },
              },
            },
            tooltip: {
              y: {
                formatter: function (value) {
                  return value.toLocaleString() + "원"; // 툴팁에 표시될 숫자 형식을 변경하려면 이 부분을 수정하세요.
                },
              },
            },
            labels: industryList,
            title: {
              text: industries.length > 0 ? "주로 투자한 종목" : "",
              align: "center",
              style: {
                fontSize: "16px",
              },
            },
          }}
          series={purchaseAmount}
          type="donut"
          width="100%"
          height={330}
        />
      )}
    </div>
  );
};
export default Industries;
