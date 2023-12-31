import bronze from "../../asset/image/bronze.png";
import silver from "../../asset/image/silver.png";
import gold from "../../asset/image/gold.png";
import diamond from "../../asset/image/diamond.png";

interface Props {
  tier: number | undefined;
  width?: number;
}

const NumberToTierImage = ({ tier, width }: Props) => {
  if (tier === undefined) return <></>;
  return (
    <img
      src={
        tier >= 0 && tier < 100
          ? bronze
          : tier >= 100 && tier < 200
          ? silver
          : tier >= 200 && tier < 300
          ? gold
          : diamond
      }
      style={{
        width: width ? width : 40,
      }}
    />
  );
};
export default NumberToTierImage;
