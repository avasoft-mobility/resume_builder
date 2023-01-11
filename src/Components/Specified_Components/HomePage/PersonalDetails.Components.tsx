import React, { useState } from "react";
import Text from "../../Wrapper_Components/Text.wrapperComponent";
import { DatePicker, Input } from "antd";
import { Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Stores";
import { setPersonalDetails } from "../../../Global_states/ResumeDetails";

function PersonalDetails() {
  const ResumeDetails = useSelector(
    (state: RootState) => state.ResumeDetails.value
  );

  let ResumeDetailsObj = {
    name: ResumeDetails.personalDetails.name,
    emailID: ResumeDetails.personalDetails.emailID,
    phoneNumber: ResumeDetails.personalDetails.phoneNumber,
    jobTitle: ResumeDetails.personalDetails.jobTitle,
    joiningDate: ResumeDetails.personalDetails.joiningDate
  };

  const [personalDetails, setpersonalDetails] = useState(ResumeDetailsObj);

  const dispatch = useDispatch();

  const onValueChange = (event: any) => {
    setpersonalDetails({
      ...personalDetails,
      [event.target.name]: event.target.value,
    });
    dispatch(
      setPersonalDetails({
        ...personalDetails,
        [event.target.name]: event.target.value,
      })
    );
  };

  const onDateChange = (date: any, dateString: any) => {
    setpersonalDetails({
      ...personalDetails,
      ["joiningDate"]: dateString,
    });
    dispatch(
      setPersonalDetails({
        ...personalDetails,
        ["joiningDate"]: dateString,
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
            Name
          </Text>
          <div style={{ paddingTop: "5px" }}>
            <Input
              placeholder="Enter Name"
              size="large"
              name="name"
              value={personalDetails.name}
              id="name"
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
                Email ID
              </Text>
              <div style={{ paddingTop: "5px" }}>
                <Input
                  placeholder="Enter Email ID"
                  size="large"
                  name="emailID"
                  value={personalDetails.emailID}
                  id="emailID"
                  style={{
                    width: "95%",
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
                Phone Number
              </Text>
              <div style={{ paddingTop: "5px" }}>
                <Input
                  placeholder="Enter Phone Number"
                  size="large"
                  type="number"
                  name="phoneNumber"
                  value={personalDetails.phoneNumber}
                  maxLength={10}
                  id="phoneNumber"
                  style={{
                    width: "94%",
                    fontFamily: "Urbanist",
                    color: "#212121",
                    fontWeight: "500",
                  }}
                  onChange={(event) => {
                    event.target.value.length <= 10 && onValueChange(event);
                  }}
                />
              </div>
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
                  fontWeight: 1000,
                  color: "#888888",
                  fontSize: "1.13rem",
                  userSelect: "none",
                  marginLeft: "5px",
                }}
              >
                Job title
              </Text>
              <div style={{ paddingTop: "5px" }}>
                <Input
                  placeholder="Enter Job title"
                  size="large"
                  name="jobTitle"
                  value={personalDetails.jobTitle}
                  id="jobTitle"
                  style={{
                    width: "94%",
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
                Company Joining Date
              </Text>
              <div style={{ paddingTop: "5px" }}>
                <DatePicker
                  onChange={onDateChange}
                  picker="month"
                  placeholder="Select Year & Month"
                  style={{ width: "95%" }}
                  size="large"
                  onKeyDown={(e) => e.preventDefault()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
