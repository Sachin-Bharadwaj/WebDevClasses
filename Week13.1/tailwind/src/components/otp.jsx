import { useRef, useState } from "react";

function SubOtpBox({ reference, onDone, type }) {
  return (
    <input
      ref={reference}
      onChange={(e) => {
        onDone();
      }}
      type={"text"}
      className={
        "bg-blue-200 outline-none rounded-2xl p-2 text-4xl w-16 text-center"
      }
    ></input>
  );
}

export function Otp() {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  return (
    <div className={"flex flex-col items-center justify-center h-screen"}>
      <div className={"flex flex-col items-center"}>
        <h1 className={"text-2xl font-bold"}>Enter OTP</h1>
        <div className={"flex space-x-4"}>
          <SubOtpBox
            reference={ref1}
            onDone={() => {
              ref2.current.focus();
            }}
            type={"text"}
          />
          <SubOtpBox
            reference={ref2}
            onDone={() => {
              ref3.current.focus();
            }}
            type={"text"}
          />
          <SubOtpBox
            reference={ref3}
            onDone={() => {
              ref4.current.focus();
            }}
            type={"text"}
          />
          <SubOtpBox
            reference={ref4}
            onDone={() => {
              ref5.current.focus();
            }}
            type={"text"}
          />
          <SubOtpBox
            reference={ref5}
            onDone={() => {
              ref6.current.focus();
            }}
            type={"text"}
          />
          <SubOtpBox
            reference={ref6}
            onDone={() => {
              ref6.current.focus();
              setButtonDisabled(false);
            }}
            type={"text"}
          />
        </div>
        <div className={"flex space-x-4 mt-4"}>
          <button
            className={
              "rounded-2xl text-2xl p-4 text-white cursor-pointer bg-blue-200"
            }
          >
            Resend OTP
          </button>
          <button
            className={`rounded-2xl text-2xl p-4 text-white cursor-pointer ${
              buttonDisabled ? "bg-blue-200" : "bg-green-400"
            } `}
            disabled={buttonDisabled}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
