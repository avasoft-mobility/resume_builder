import React, { useState } from "react";
import Text from "../../Wrapper_Components/Text.wrapperComponent";
import { DatePicker, Input } from "antd";
import { Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Stores";
import { setEducationDetails } from "../../../Global_states/ResumeDetails";
import type { DatePickerProps } from "antd";

function EducationDetails() {
  const ResumeDetails = useSelector(
    (state: RootState) => state.ResumeDetails.value
  );

  let ResumeDetailsObj = {
    course: ResumeDetails.educationalDetails.course,
    institutionName: ResumeDetails.educationalDetails.institutionName,
    startYear: ResumeDetails.educationalDetails.startYear,
    endYear: ResumeDetails.educationalDetails.endYear,
  };

  const [educationalDetails, seteducationalDetails] =
    useState(ResumeDetailsObj);

  const dispatch = useDispatch();

  const onValueChange = (event: any) => {
    seteducationalDetails({
      ...educationalDetails,
      [event.target.name]: event.target.value,
    });
    dispatch(
      setEducationDetails({
        ...educationalDetails,
        [event.target.name]: event.target.value,
      })
    );
  };

  const onStartYearChange: DatePickerProps["onChange"] = (date, dateString) => {
    seteducationalDetails({
      ...educationalDetails,
      ["startYear"]: dateString,
    });
    dispatch(
      setEducationDetails({
        ...educationalDetails,
        ["startYear"]: dateString,
      })
    );
  };

  const onEndYearChange: DatePickerProps["onChange"] = (date, dateString) => {
    seteducationalDetails({
      ...educationalDetails,
      ["endYear"]: dateString,
    });
    dispatch(
      setEducationDetails({
        ...educationalDetails,
        ["endYear"]: dateString,
      })
    );
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          padding: "0px 0px 0px 40px",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <div>
          <Text
            variant="subtitle1"
            color={"#888888"}
            style={{
              fontFamily: "Urbanist",
              fontWeight: 700,
              color: "#888888",
              fontSize: "1.13rem",
              userSelect: "none",
              marginLeft: "5px",
            }}
          >
            Course
          </Text>
          <div style={{ paddingTop: "5px" }}>
            <Input
              placeholder="Enter Course"
              size="large"
              name="course"
              value={educationalDetails.course}
              id="course"
              style={{
                width: "68%",
                fontFamily: "Urbanist",
                color: "#212121",
                fontWeight: "500",
              }}
              onChange={(event) => {
                onValueChange(event);
              }}
            />
          </div>
        </div>
        <div style={{ width: "100%", paddingTop: "20px" }}>
          <div>
            <Text
              variant="subtitle1"
              color={"#888888"}
              style={{
                fontFamily: "Urbanist",
                fontWeight: 1000,
                color: "#888888",
                fontSize: "1.13rem",
                userSelect: "none",
                marginLeft: "5px",
              }}
            >
              Institution Name
            </Text>
            <div style={{ paddingTop: "5px" }}>
              <Input
                placeholder="Enter Institution Name"
                size="large"
                name="institutionName"
                value={educationalDetails.institutionName}
                id="institutionName"
                style={{
                  width: "68%",
                  fontFamily: "Urbanist",
                  color: "#212121",
                  fontWeight: "500",
                }}
                onChange={(event) => {
                  onValueChange(event);
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ width: "100%", paddingTop: "20px" }}>
          <div
            className="space_antd"
            style={{
              display: "flex",
              flexDirection: "row",
              width: "70%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "50%" }}>
              <Text
                variant="subtitle1"
                color={"#888888"}
                style={{
                  fontFamily: "Urbanist",
                  fontWeight: 700,
                  color: "#888888",
                  fontSize: "1.13rem",
                  userSelect: "none",
                  marginLeft: "5px",
                }}
              >
                Start Year
              </Text>
              <div style={{ paddingTop: "5px" }}>
                <DatePicker
                  picker="year"
                  size="large"
                  style={{ width: "95%" }}
                  onChange={onStartYearChange}
                />
              </div>
            </div>
            <div style={{ width: "50%" }}>
              <Text
                variant="subtitle1"
                color={"#888888"}
                style={{
                  fontFamily: "Urbanist",
                  fontWeight: 700,
                  color: "#888888",
                  fontSize: "1.13rem",
                  userSelect: "none",
                  marginLeft: "5px",
                }}
              >
                End Year
              </Text>
              <div style={{ paddingTop: "5px" }}>
                <DatePicker
                  picker="year"
                  size="large"
                  name="endYear"
                  id="endYear"
                  style={{ width: "95%" }}
                  onChange={onEndYearChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationDetails;
