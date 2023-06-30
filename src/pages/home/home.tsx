import { BsFileEarmarkPdf } from "react-icons/bs";
import col_logo from "../../common/images/col-logo.png";
import uni_logo from "../../common/images/uni-logo.png";
export const Home = () => {
  return (
    <div className="w-full h-screen pb-4 flex pt-24 flex-col items-center justify-center  gap-32 px-4">
      <div className="flex justify-center gap-24">
        <img src={col_logo} className="h-[270px]"></img>
        <img src={uni_logo} className="h-[270px]"></img>
      </div>
      <h1 className=" text-xl lg:text-4xl font-semibold text-blue-600">
        نظام ارشفة نشاطات منتسبي كلية علوم الحاسوب والرياضيات - جامعة الموصل{" "}
      </h1>
      <a
        href={`${process.env.REACT_APP_URL}files/instructions.pdf`}
        target="_blank"
        className=" text-2xl flex gap-2"
      >
        ملف تعريفي للتسجيل والدخول الى النظام
        <BsFileEarmarkPdf className="text-3xl text-red-500" />
      </a>
    </div>
  );
};
