import { useQuery } from "react-query";
import { getRecentlyDeal } from "../../../api/investingMyInfo";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../util/formatDateSign";

const RecentDealStock = () => {
  const { simulationSeq } = useParams();
  const { data, isLoading } = useQuery(["recentlyDeal", simulationSeq], () => getRecentlyDeal(simulationSeq));

  return (
    <div className=" shadow-component col-span-full p-4 flex flex-col gap-4">
      <div className="  flex items-center gap-2">
        <h5>최근 거래 내역</h5>
      </div>
      <div className=" flex items-center gap-2">
        {isLoading ? (
          <></>
        ) : (
          data?.map((stockInfo) => (
            <div
              className={`${
                stockInfo.tradingType === 0 ? "bg-lightPrimary" : "bg-lightRed"
              } bg-opacity-30 flex flex-col items-center p-2 rounded-md w-1/6 gap-6`}
              key={stockInfo.stockCode}
            >
              <div className=" flex items-center justify-between w-full">
                <p className=" text-black font-semiBold">{stockInfo.stockName}</p>
                {stockInfo.tradingType === 0 ? (
                  <p className=" text-primary">판매</p>
                ) : (
                  <p className=" text-myRed">구매</p>
                )}
              </div>
              <div className=" flex justify-around items-center w-full">
                <div className=" flex flex-col  items-center">
                  <p className=" text-myGray font-light">거래수량</p>
                  <p>{stockInfo.amount}주</p>
                </div>
                <div className=" flex flex-col  items-center">
                  <p className=" text-myGray font-light">주당 가격</p>
                  <p>{stockInfo.price}원</p>
                </div>
              </div>
              <p className=" text-myGray">{formatDate(stockInfo.createdDate)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default RecentDealStock;
