import { useModal } from "common/hooks/useModal";
import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { QRCodeSVG } from "qrcode.react";

export const Modal = ({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const mainRef = useRef(null);
  useModal(mainRef, () => setModal(false));
  return (
    <div className="fixed w-full h-full bg-black bg-opacity-40 top-0 bottom-0 left-0 right-0  z-50 flex items-center justify-center cursor-pointer ">
      <div
        ref={mainRef}
        className="h-4/5 w-4/5 bg-quan rounded-lg cursor-default flex items-center justify-center relative"
      >
        <QRCodeSVG
          className="absolute top-4 left-4"
          bgColor="#F8F4EA"
          value={`الاسم:${"دريد"}`}
        />
      </div>
    </div>
  );
};
