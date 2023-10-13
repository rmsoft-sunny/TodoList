"use client";

import React, { useState } from "react";

import { TimePicker } from "antd";
import moment from "moment"; //날짜 및 시간을 다루는 라이브러리
import DatePickerPopver from "./DatePickerPopver";

function DatePickerDemo() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");

  const onChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <>
      <h1>테스트1</h1>

      <DatePickerPopver date={date} setDate={setDate} />
      <input
        type="time"
        className="w-[280px] border-2 rounded-lg p-3"
        onChange={onChageHandler}
      />
    </>
  );
}

export default DatePickerDemo;
