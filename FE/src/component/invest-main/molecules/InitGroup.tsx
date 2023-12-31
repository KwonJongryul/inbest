import modalStore from "../../../store/modalStore";
interface Props {
  onNextStep: () => void;
  resetStepAndGroupSetting: () => void;
}
const InitGroup = ({ onNextStep, resetStepAndGroupSetting }: Props) => {
  const { closeModal } = modalStore();
  return (
    <div className=" relative w-full h-full">
      <div className=" flex flex-col items-center justify-around h-5/6">
        <h3 className=" text-center text-dark">
          모의 투자 그룹을 생성하려면 <br /> 몇가지 설정이 필요해요
        </h3>
        <p className=" text-myGray text-center">
          모의 투자 진행 기간, 시드 머니, 그룹 이름 <br />
          설정을 통해 모의 투자 그룹을 생성할 수 있어요
        </p>
      </div>
      <div className=" flex justify-center absolute bottom-0 w-full">
        <button
          onClick={() => {
            closeModal();
            resetStepAndGroupSetting();
          }}
          className=" ms-10 me-5 gray-btn"
        >
          취소
        </button>
        <button onClick={onNextStep} className=" me-10 ms-5 main-dark-btn">
          설정 시작
        </button>
      </div>
    </div>
  );
};
export default InitGroup;
