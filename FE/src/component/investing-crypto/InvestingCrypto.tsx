import CryptoStockList from "./CryptoStockList";
import { getCoinStockList, getCryptoVolume, getCryptoMarketCap, getFearIndex } from "../../api/investingStockInfo";
import { useQuery } from "react-query";
import FearRadialBar from "./FearRadialBar";
import GraphIconComponent from "../common/GraphIconComponent";
import { CompanyInfo } from "../../type/InvestingCompanyDetail";
interface Props {
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
}

const InvestingCrypto = ({ setCompanyInfo }: Props) => {
  const { data, isLoading } = useQuery(["coinStockList"], getCoinStockList);
  const { data: cryptoVolume, isLoading: isLoadingCryptoVolume } = useQuery(["cryptoVolume"], getCryptoVolume);
  const { data: cryptoMarketCap, isLoading: isLoadingCryptoMarketCap } = useQuery(
    ["cryptoMarketCap"],
    getCryptoMarketCap
  );
  const { data: fearIndex } = useQuery(["fearIndex"], getFearIndex);

  return (
    <div className=" flex flex-col items-center gap-4">
      <div className=" flex gap-4 items-center">
        <GraphIconComponent
          title="가상화폐 거래량"
          width={250}
          top={-50}
          desc1="가상화폐 거래량의 변화를 나타냅니다."
          desc2={`
              현재 ${cryptoVolume?.fluctuation_rate.toFixed(2)}% 만큼 변화하였습니다.
            `}
          state={cryptoVolume?.fluctuation_state}
          isLoading={isLoadingCryptoVolume}
        />
        <GraphIconComponent
          title="가상화폐 시가총액"
          width={250}
          top={-50}
          desc1="가상화폐 시가총액의 변화를 나타냅니다."
          desc2={`
              
              현재 ${cryptoMarketCap?.fluctuation_rate.toFixed(2)}% 만큼 변화하였습니다.
            `}
          state={cryptoMarketCap?.fluctuation_state}
          isLoading={isLoadingCryptoMarketCap}
        />

        <FearRadialBar percentage={fearIndex?.fear_index || 0} />
      </div>
      <div className=" flex gap-4 w-full">
        <CryptoStockList
          setCompanyInfo={setCompanyInfo}
          stockList={data?.slice(0, 10)}
          isLoading={isLoading}
          title="시가총액 높은 가상화폐"
        />
        <CryptoStockList
          setCompanyInfo={setCompanyInfo}
          stockList={data?.slice(10, 20)}
          isLoading={isLoading}
          title="많이 검색된 가상화폐"
        />
        <CryptoStockList
          setCompanyInfo={setCompanyInfo}
          stockList={data?.slice(20, 30)}
          isLoading={isLoading}
          title="거래량 많은 가상화폐"
        />
      </div>
    </div>
  );
};
export default InvestingCrypto;
