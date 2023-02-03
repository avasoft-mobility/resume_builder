import React, { useEffect, useState } from "react";
import PersonalDetails from "../../Components/Specified_Components/HomePage/PersonalDetails.Components";
import StepComponent from "../../Components/Specified_Components/HomePage/Steps.component";
import Text from "../../Components/Wrapper_Components/Text.wrapperComponent";
import { Divider, Space, Typography } from "antd";
import EducationDetails from "../../Components/Specified_Components/HomePage/EducationDetails.Components";
import ProjectDetails from "../../Components/Specified_Components/HomePage/ProjectDetail.Components";
import DownloadResume from "../../Components/Specified_Components/HomePage/DownloadResume.Component";
import { useNavigate } from "react-router-dom";
import { validateHeaderName } from "http";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Stores";
import useErrorSnackbar from "../../Hooks/useErrorSnackbar.hook";
import Icon from "../../Components/Wrapper_Components/Icon.WrapperComponent";
import { styled } from "@mui/material/styles";
import {
  personalDetails,
  educationalDetails,
  projectDetails,
} from "../../Types/resumeData";
import {
  setPersonalDetails,
  setEducationDetails,
  setProjectDetails,
} from "../../Global_states/ResumeDetails";
import { Button, Tooltip } from "antd";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
const { Configuration, OpenAIApi } = require("openai");

function HomePage() {
  const { forwardRef, useRef, useImperativeHandle } = React;
  const childRef = useRef<any>();
  const [currentStep, setCurrentStep] = useState(0);
  const [dragEnabled, setDragEnabled] = useState(false);
  const [stepChange, setStepChange] = useState(false);
  const showErrorSnackBar = useErrorSnackbar();
  let naviagte = useNavigate();

  const dispatch = useDispatch();

  const ResumeDetails = useSelector(
    (state: RootState) => state.ResumeDetails.value
  );

  let navigate = useNavigate();

  const { instance, accounts } = useMsal();
  const [done, setDone] = useState(true);
  let UserName: any = localStorage.getItem("UserName");

  //   const configuration = new Configuration({
  //     apiKey: "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",
  //   });
  //   const openai = new OpenAIApi(configuration);

  //   const completion = openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: "project summary for team lead in points without number",
  //     temperature: 0.3,
  //     max_tokens: 1000,
  //   });

  //   completion.then(function(result:any) {
  //     console.log(result.data)
  //  }, function(err:any) {
  //     var newName = 'Anonymous'
  //     console.log(err)
  //  });

  // useEffect(() => {
  //   console.log(accounts)
  //     // if (accounts.length == 0) {
  //     //   instance
  //     //     .loginRedirect(loginRequest)
  //     //     .then(() => {
  //     //     })
  //     //     .catch((e) => {});
  //     // }
  // }, [accounts]);

  const handleStepChange = (action: string) => {
    if (action == "back") {
      setDragEnabled(false)
      if (currentStep == 0) {
        return;
      } else {
        setCurrentStep(currentStep - 1);
      }
    } else {
      if (currentStep != 3) {
        if (validate(currentStep)) {
          setCurrentStep(currentStep + 1);
        }
      } else {
        return;
      }
    }
  };

  const validate = (currentStep: any) => {
    let flag = false;
    let isValid = 0;
    if (currentStep == 0) {
      if (ResumeDetails.personalDetails.name.length > 0) {
        isValid++;
        flag = false;
      } else {
        showErrorSnackBar("Please Enter Valid Name !!!");
        flag = true;
        return false;
      }

      if (ResumeDetails.personalDetails.emailID.length > 0) {
        isValid++;
        flag = false;
      } else {
        showErrorSnackBar("Please Enter Valid EmailID !!!");
        flag = true;
        return false;
      }

      if (ResumeDetails.personalDetails.phoneNumber.length > 0) {
        isValid++;
        flag = false;
      } else {
        showErrorSnackBar("Please Enter Valid PhoneNumber !!!");
        flag = true;
        return false;
      }

      if (ResumeDetails.personalDetails.jobTitle.length > 0) {
        isValid++;
        flag = false;
      } else {
        showErrorSnackBar("Please Enter Valid Job Title !!!");
        flag = true;
        return false;
      }

      if (isValid == 4 && flag == false) {
        return true;
      } else {
        return false;
      }
    } else if (currentStep == 1) {
      if (ResumeDetails.educationalDetails.course.length > 0) {
        isValid++;
        flag = false;
      } else {
        showErrorSnackBar("Please Enter Valid Course !!!");
        flag = true;
        return false;
      }

      if (ResumeDetails.educationalDetails.institutionName.length > 0) {
        isValid++;
        flag = false;
      } else {
        showErrorSnackBar("Please Enter Valid Institution Name !!!");
        flag = true;
        return false;
      }

      if (ResumeDetails.educationalDetails.startYear.length > 0) {
        isValid++;
        flag = false;
      } else {
        showErrorSnackBar("Please Enter Valid Start Year !!!");
        flag = true;
        return false;
      }

      if (ResumeDetails.educationalDetails.endYear.length > 0) {
        isValid++;
        flag = false;
      } else {
        showErrorSnackBar("Please Enter Valid End Year !!!");
        flag = true;
        return false;
      }

      if (isValid == 4 && flag == false) {
        return true;
      } else {
        return false;
      }
    } else if (currentStep == 2) {
      if (ResumeDetails.projectDetails.length > 0) {
        let is_Valid = true;
        let projectDetails: any = ResumeDetails.projectDetails;
        for (let i = 0; i < projectDetails.length; i++) {
          if (
            projectDetails[i].projectName.length > 0 &&
            projectDetails[i].industry.length > 0 &&
            projectDetails[i].platform.length > 0 &&
            projectDetails[i].role.length > 0 &&
            projectDetails[i].frontEnd.length > 0 &&
            projectDetails[i].versionControl.length > 0 &&
            projectDetails[i].startDate.length > 0 &&
            projectDetails[i].endDate.length > 0
          ) {
            is_Valid = true;
          } else {
            is_Valid = false;
            break;
          }
        }

        if (is_Valid == true) {
          setDragEnabled(false)
          setStepChange(!stepChange);
          return true;
        } else {
          showErrorSnackBar("Please Enter Valid Project Details !!!");
          return false;
        }
      }
    }
    return true;
  };

  const createNewResume = () => {
    dispatch(setPersonalDetails(personalDetails));
    dispatch(setEducationDetails(educationalDetails));
    dispatch(setProjectDetails([]));
    naviagte("/");
  };

  const handleStepsChange = (stepCount: any) => {
    let isvalid = true;
    if (currentStep < stepCount) {
      for (let i = 0; i < stepCount; i++) {
        if (isvalid) {
          isvalid = validate(i);
        }
      }
    } else {
      setCurrentStep(stepCount);
    }

    if(stepCount == 1 && currentStep == 2){
      setDragEnabled(false)
    }

    if (isvalid) {
      setCurrentStep(stepCount);
    }
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDragEnabled(event.target.checked);
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        height: "100vh",
        width: "100%",
        borderRadius: "30px 30px 0px 0px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ width: "25%" }}>
          <StepComponent
            currentStep={currentStep}
            handleStepsChange={handleStepsChange}
          />
        </div>
        <div
          style={{
            border: "0.10px solid #D9D9D9",
            backgroundColor: "#D9D9D9",
            height: "100vh",
          }}
        ></div>
        <div style={{ width: "75%" }}>
          <div style={{ width: "100%" }}>
            <div style={{ height: "80vh", width: "100%" }}>
              <div
                style={{
                  padding: "30px",
                  display: currentStep != 3 && currentStep != 2 ? "" : "none",
                }}
              >
                <Text
                  variant="h5"
                  color={"#434343"}
                  style={{
                    fontFamily: "Urbanist",
                    fontWeight: 700,
                    color: "#434343",
                    fontSize: "1.5rem",
                    userSelect: "none",
                    marginLeft: "5px",
                  }}
                >
                  {currentStep == 0
                    ? "Personal Details"
                    : currentStep == 1
                    ? "Education"
                    : currentStep == 2
                    ? "Project Experience"
                    : "Download Resume"}
                </Text>
              </div>
              <div
                style={{
                  flexDirection: "row",
                  display: currentStep == 3 ? "flex" : "none",
                }}
              >
                <div style={{ padding: "30px", width: "50%", display: "flex" }}>
                  <Text
                    variant="h5"
                    color={"#434343"}
                    style={{
                      fontFamily: "Urbanist",
                      fontWeight: 700,
                      color: "#434343",
                      fontSize: "1.5rem",
                      userSelect: "none",
                      marginLeft: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {currentStep == 0
                      ? "Personal Details"
                      : currentStep == 1
                      ? "Education"
                      : currentStep == 2
                      ? "Project Experience"
                      : "Download Resume"}
                  </Text>

                  <Tooltip
                    placement="right"
                    title={"Double tap to edit the description."}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Icon
                        type={"info"}
                        style={{
                          fill: "blue",
                          margin: "5px",
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                        }}   
                      />
                    </div>
                  </Tooltip>
                </div>
                <div
                  style={{
                    padding: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "50%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      <div
                        className="convert_Button"
                        style={{
                          padding: "10px 20px",
                          border: "2px solid #3574AD",
                          borderRadius: "5px",
                          fontFamily: "Urbanist",
                          fontWeight: "600",
                          color: "#3574AD",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => childRef?.current.printDocx()}
                      >
                        Download as docx
                        <Icon
                          type={"docx"}
                          style={{
                            fill: "#FFFFFF",
                            marginLeft: "6px",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div
                        className="convert_Button"
                        style={{
                          padding: "10px 20px",
                          marginLeft: "20px",
                          border: "2px solid #3574AD",
                          borderRadius: "5px",
                          fontFamily: "Urbanist",
                          fontWeight: "600",
                          color: "#3574AD",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => childRef?.current.printPdf()}
                      >
                        Download as Pdf
                        <Icon
                          type={"pdf"}
                          style={{
                            fill: "#FFFFFF",
                            marginLeft: "6px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  flexDirection: "row",
                  display: currentStep == 2 ? "flex" : "none",
                }}
              >
                <div style={{ padding: "30px", width: "50%", display: "flex" }}>
                  <Text
                    variant="h5"
                    color={"#434343"}
                    style={{
                      fontFamily: "Urbanist",
                      fontWeight: 700,
                      color: "#434343",
                      fontSize: "1.5rem",
                      userSelect: "none",
                      marginLeft: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {currentStep == 0
                      ? "Personal Details"
                      : currentStep == 1
                      ? "Education"
                      : currentStep == 2
                      ? "Project Experience"
                      : "Download Resume"}
                  </Text>
                  <Tooltip
                    placement="right"
                    title={"To enable drag & drop ON toggle."}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Icon
                        type={"info"}
                        style={{
                          fill: "blue",
                          margin: "5px",
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
                <div
                  style={{
                    padding: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "50%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AntSwitch
                        checked={dragEnabled}
                        inputProps={{ "aria-label": "ant design" }}
                        onChange={handleToggleChange}
                      />
                    </Stack>
                  </div>
                </div>
              </div>

              <div style={{ display: currentStep != 0 ? "none" : "" }}>
                <PersonalDetails />
              </div>
              <div style={{ display: currentStep != 1 ? "none" : "" }}>
                <EducationDetails />
              </div>
              <div style={{ display: currentStep != 2 ? "none" : "" }}>
                <ProjectDetails
                  currentStep={currentStep}
                  dragEnabled={dragEnabled}
                />
              </div>
              <div style={{ display: currentStep != 3 ? "none" : "" }}>
                <DownloadResume ref={childRef} stepChange={stepChange} />
              </div>
            </div>
            <div
              style={{
                height: "20vh",
                width: "90%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "baseline",
              }}
            >
              {currentStep != 3 && currentStep != 0 ? (
                <Space split={<Divider type="vertical" />}>
                  <Typography.Link
                    onClick={() => handleStepChange("back")}
                    style={{
                      fontFamily: "Urbanist",
                      userSelect: "none",
                      fontWeight: "600",
                      color: "#3574AD",
                      fontSize: "1rem",
                    }}
                  >
                    Back
                  </Typography.Link>
                  <Typography.Link
                    onClick={() => handleStepChange("next")}
                    style={{
                      fontFamily: "Urbanist",
                      userSelect: "none",
                      fontWeight: "600",
                      color: "#3574AD",
                      fontSize: "1rem",
                    }}
                  >
                    Next
                  </Typography.Link>
                </Space>
              ) : currentStep == 0 ? (
                <Typography.Link
                  onClick={() => handleStepChange("next")}
                  style={{
                    fontFamily: "Urbanist",
                    userSelect: "none",
                    fontWeight: "600",
                    color: "#3574AD",
                    fontSize: "1rem",
                  }}
                >
                  Next
                </Typography.Link>
              ) : (
                <Space split={<Divider type="vertical" />}>
                  <Typography.Link
                    onClick={() => handleStepChange("back")}
                    style={{
                      fontFamily: "Urbanist",
                      userSelect: "none",
                      fontWeight: "600",
                      color: "#3574AD",
                      fontSize: "1rem",
                    }}
                  >
                    Back
                  </Typography.Link>
                  <Typography.Link
                    onClick={createNewResume}
                    style={{
                      fontFamily: "Urbanist",
                      userSelect: "none",
                      fontWeight: "600",
                      color: "#3574AD",
                      fontSize: "1rem",
                    }}
                  >
                    Create New Resume
                  </Typography.Link>
                </Space>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
