import { useRef, useState, useEffect } from "react";
import { Input } from "antd";
import Text from "../../../Wrapper_Components/Text.wrapperComponent";
import { Button, Checkbox, DatePicker } from "antd";
import IconButton from "../../../Wrapper_Components/IconButton.WrapperComponent";
import Icon from "../../../Wrapper_Components/Icon.WrapperComponent";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Select } from "antd";
import { RootState } from "../../../../Stores";
import { useSelector } from "react-redux";
import moment from "moment";

const AccordionItem = ({
  faq,
  active,
  onToggle,
  projectList,
  index,
  DeleteProject,
  updateValueChage,
  allProjects,
  dragEnabled,
  updateDate
}) => {
  const contentEl = useRef();


  const ResumeDetails = useSelector(
    (state) => state.ResumeDetails.value
  );

  let projectDetails = {
    id: projectList.id,
    projectName: projectList.projectName,
    industry: projectList.industry,
    platform: projectList.platform,
    role: projectList.role,
    hasadminpanel: projectList.hasadminpanel,
    apFrontEnd: projectList.apFrontEnd,
    apBackEnd: projectList.apBackEnd,
    frontEnd: projectList.frontEnd,
    backEnd: projectList.backEnd,
    database: projectList.database,
    versionControl: projectList.versionControl,
    startDate: projectList.startDate,
    endDate: projectList.endDate,
    description: "",
    projectMonth: projectList.projectMonth,
    projectYear: projectList.projectYear,
  };
  

  const [currentProjectDetails, setCurrentProjectDetails] =
    useState(projectDetails);


    useEffect(() => {
      let projectDetails = {
        id: projectList.id,
        projectName: projectList.projectName,
        industry: projectList.industry,
        platform: projectList.platform,
        role: projectList.role,
        hasadminpanel: projectList.hasadminpanel,
        apFrontEnd: projectList.apFrontEnd,
        apBackEnd: projectList.apBackEnd,
        frontEnd: projectList.frontEnd,
        backEnd: projectList.backEnd,
        database: projectList.database,
        versionControl: projectList.versionControl,
        startDate: projectList.startDate,
        endDate: projectList.endDate,
        description: "",
        projectMonth: projectList.projectMonth,
        projectYear: projectList.projectYear,
      };
  
      setCurrentProjectDetails(projectDetails)
    }, [projectList])

  console.log(currentProjectDetails , "DAsfasf")
  const [updatedValue, setUpdatedValue] = useState(false);
  const Color = [
    "#1D99F3",
    "#78B700",
    "#FF8007",
    "#1E8A80",
    "#FEAB1A",
    "#03B0AE",
    "#BB4DE2",
    "#5E97F3",
    "#2BC8DA",
    "#109E56",
    "#F05C8E",
    "#01C752",
    "#7086D9",
  ];

  const onValueChange = (event) => {
    setCurrentProjectDetails({
      ...currentProjectDetails,
      [event.target.name]: event.target.value,
    });
    setUpdatedValue(!updatedValue);
  };

  const onDropDownChange = (event) => {
    setCurrentProjectDetails({
      ...currentProjectDetails,
      ["platform"]: event,
    });
    setUpdatedValue(!updatedValue);
  };

  const onCheckedChanged = (event) => {
    setCurrentProjectDetails({
      ...currentProjectDetails,
      ["hasadminpanel"]: event.target.checked,
    });
    setUpdatedValue(!updatedValue);
  };

  useEffect(() => {
    updateValueChage(index, currentProjectDetails);
  }, [updatedValue]);

  const onStartYearChange = (date, dateString) => {
    setCurrentProjectDetails({
      ...currentProjectDetails,
      ["startDate"]: dateString,
    });
    setUpdatedValue(!updatedValue);
  };

  const onEndYearChange = (date, dateString) => {
    setCurrentProjectDetails({
      ...currentProjectDetails,
      ["endDate"]: dateString,
    });
    setUpdatedValue(!updatedValue);
  };

  
  useEffect(() => {
    if (index == 0) {
      setCurrentProjectDetails({...currentProjectDetails,["startDate"]: ResumeDetails.personalDetails.joiningDate,});

      if(currentProjectDetails.projectMonth != "" && currentProjectDetails.projectYear){
        let joined_year = new Date(new Date(currentProjectDetails.startDate).setFullYear(new Date(currentProjectDetails.startDate).getFullYear() + parseInt(currentProjectDetails.projectYear) ));
        let joined_Month = new Date(joined_year.setMonth(joined_year.getMonth() + parseInt(currentProjectDetails.projectMonth)))
        setCurrentProjectDetails({
          ...currentProjectDetails,
          ["endDate"]: joined_Month.toString(),
        });
      } 
      else if(currentProjectDetails.projectYear != ""){
        setCurrentProjectDetails({
          ...currentProjectDetails,
          ["endDate"]: new Date(new Date(currentProjectDetails.startDate).setFullYear(new Date(currentProjectDetails.startDate).getFullYear() + parseInt(currentProjectDetails.projectYear) )).toString(),
        });
      }
      else if(currentProjectDetails.projectMonth != ""){
        setCurrentProjectDetails({
          ...currentProjectDetails,
          ["endDate"]: new Date(new Date(currentProjectDetails.startDate).setMonth(new Date(currentProjectDetails.startDate).getMonth() + parseInt(currentProjectDetails.projectMonth) )).toString(),
        });
      }

      setUpdatedValue(!updatedValue);
    }
    else{
      debugger;
      setCurrentProjectDetails({
        ...currentProjectDetails,
        ["startDate"]: allProjects[index - 1].endDate,
      });

      if(currentProjectDetails.projectMonth != "" && currentProjectDetails.projectYear){
        let joined_year = new Date(new Date(currentProjectDetails.startDate).setFullYear(new Date(currentProjectDetails.startDate).getFullYear() + parseInt(currentProjectDetails.projectYear) ));
        let joined_Month = new Date(joined_year.setMonth(joined_year.getMonth() + parseInt(currentProjectDetails.projectMonth)))
        setCurrentProjectDetails({
          ...currentProjectDetails,
          ["endDate"]: joined_Month.toString(),
        });
      } 
      else if(currentProjectDetails.projectYear != ""){
        setCurrentProjectDetails({
          ...currentProjectDetails,
          ["endDate"]: new Date(new Date(currentProjectDetails.startDate).setFullYear(new Date(currentProjectDetails.startDate).getFullYear() + parseInt(currentProjectDetails.projectYear) )).toString(),
        });
      }
      else if(currentProjectDetails.projectMonth != ""){
        setCurrentProjectDetails({
          ...currentProjectDetails,
          ["endDate"]: new Date(new Date(currentProjectDetails.startDate).setMonth(new Date(currentProjectDetails.startDate).getMonth() + parseInt(currentProjectDetails.projectMonth) )).toString(),
        });
      }

      setUpdatedValue(!updatedValue);
    }

  }, [currentProjectDetails.startDate,projectList.startDate,currentProjectDetails.projectMonth,currentProjectDetails.projectYear,index,projectList.projectMonth,currentProjectDetails.projectMonth,ResumeDetails.personalDetails.joiningDate]);

  useEffect(() => {
    if (index == 0) {
      setCurrentProjectDetails({...currentProjectDetails,["startDate"]: ResumeDetails.personalDetails.joiningDate});
      setUpdatedValue(!updatedValue);
    }
    else{
      setCurrentProjectDetails({
        ...currentProjectDetails,
        ["startDate"]: allProjects[index - 1].endDate,
      });
      setUpdatedValue(!updatedValue);
    }
  }, [ResumeDetails.personalDetails.joiningDate])



  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ width: "95%" }}>
        <li
          className={`accordion_item ${active ? "active" : ""}`}
          style={{ marginBottom: "10px" }}
        >
          <div
            className="accordion_button"
            style={{ borderRadius: active ? "10px 10px 0px 10px" : "10px" }}
            onClick={onToggle}
          >
            <span
              style={{
                width: "10px",
                backgroundColor: Color[index]
                  ? Color[index]
                  : Color[Math.floor(Math.random() * Color.length)],
                height: "60px",
                borderRadius: active ? "10px 0px 0px 0px" : "10px 0px 0px 10px",
              }}
            ></span>
            <span
              style={{
                margin: "0px 10px",
                width: "90%",
                fontFamily: "Quicksand",
                fontWeight: "700",
                color: "#000000",
              }}
            >
              {currentProjectDetails?.projectName}
            </span>
            <span className="accordion_control">
              {active ? (
                <ExpandLessOutlinedIcon
                  fill="rgb(0, 0, 0)"
                  style={{ color: "rgb(0, 0, 0)" }}
                />
              ) : (
                <ExpandMoreOutlinedIcon
                  fill="rgb(0, 0, 0)"
                  style={{ color: "rgb(0, 0, 0)" }}
                />
              )}{" "}
            </span>
          </div>
          <div
            ref={contentEl}
            className="accordion_answer_wrapper"
            style={{
              height: active
                ? active && currentProjectDetails.hasadminpanel == true
                  ? "738px"
                  : "580px"
                : "0px",
            }}
          >
            <div
              className="accordion_answer"
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                borderRadius: "0px 0px 10px 10px",
              }}
            >
              <div style={{ width: "3%" }}>
                <div
                  style={{
                    backgroundColor: Color[index]
                      ? Color[index]
                      : Color[Math.floor(Math.random() * Color.length)],
                    height: active
                      ? active && currentProjectDetails.hasadminpanel == true
                        ? "738px"
                        : "580px"
                      : "0px",
                    marginRight: "10px",
                    width: "10px",
                    borderRadius: "0px 0px 0px 10px",
                  }}
                ></div>
              </div>
              <div style={{ width: "100%", padding: "0px 20px 0px 20px" }}>
                <div>
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
                      Project Name
                    </Text>
                    <div style={{ paddingTop: "5px" }}>
                      <Input
                        placeholder="Project Name"
                        size="large"
                        name="projectName"
                        value={currentProjectDetails.projectName}
                        id="projectName"
                        style={{
                          width: "87.5%",
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
                  <div style={{ marginTop: "10px" }}>
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
                      Industry
                    </Text>
                    <div style={{ paddingTop: "5px" }}>
                      <Input
                        placeholder="Enter Industry"
                        size="large"
                        name="industry"
                        id="industry"
                        value={currentProjectDetails.industry}
                        style={{
                          width: "87.5%",
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
                  <div style={{ width: "100%", paddingTop: "10px" }}>
                    <div
                      className="space_antd"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "90%",
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
                          Platform
                        </Text>
                        <div style={{ paddingTop: "5px" }}>
                          <Select
                            placeholder="Select a platform"
                            optionFilterProp="children"
                            value={currentProjectDetails.platform}
                            size="large"
                            name="platform"
                            id="platform"
                            onChange={(event) => {
                              onDropDownChange(event);
                            }}
                            style={{
                              width: "95%",
                              fontFamily: "Urbanist",
                              color: "#212121",
                              fontWeight: "500",
                            }}
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={[
                              {
                                value: "Mobile",
                                label: "Mobile",
                              },
                              {
                                value: "Web",
                                label: "Web",
                              },
                            ]}
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
                          Role
                        </Text>
                        <div style={{ paddingTop: "5px" }}>
                          <Input
                            placeholder="Enter Role"
                            size="large"
                            name="role"
                            id="role"
                            value={currentProjectDetails.role}
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
                    </div>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div>
                      <Checkbox
                        defaultChecked={projectList.hasadminpanel}
                        size={"small"}
                        value={currentProjectDetails.hasadminpanel}
                        onChange={onCheckedChanged}
                        style={{
                          fontFamily: "Urbanist",
                          color: "#434343",
                          fontWeight: "400",
                        }}
                      >
                        Have admin panel
                      </Checkbox>
                    </div>
                    {projectList.hasadminpanel == true && (
                      <div style={{ width: "100%" }}>
                        <div
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#FDFDFD",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "88%",
                          }}
                        >
                          <Text
                            variant="subtitle1"
                            color={"#000000"}
                            style={{
                              fontFamily: "Urbanist",
                              fontWeight: 700,
                              color: "#000000",
                              fontSize: "1.13rem",
                              userSelect: "none",
                              marginLeft: "5px",
                            }}
                          >
                            Admin Panel
                          </Text>
                          <div
                            className="space_antd"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
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
                                Front-end
                              </Text>
                              <div style={{ paddingTop: "5px" }}>
                                <Input
                                  placeholder="Enter Front-end"
                                  size="large"
                                  value={currentProjectDetails.apFrontEnd}
                                  name="apFrontEnd"
                                  id="apFrontEnd"
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
                                Backend
                              </Text>
                              <div style={{ paddingTop: "5px" }}>
                                <Input
                                  placeholder="Enter Backend"
                                  size="large"
                                  name="apBackEnd"
                                  id="apBackEnd"
                                  value={currentProjectDetails.apBackEnd}
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
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ width: "100%", paddingTop: "10px" }}>
                    <div
                      className="space_antd"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "90%",
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
                          Front-end
                        </Text>
                        <div style={{ paddingTop: "5px" }}>
                          <Input
                            placeholder="Enter Front-end"
                            size="large"
                            name="frontEnd"
                            value={currentProjectDetails.frontEnd}
                            id="frontEnd"
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
                          Backend
                        </Text>
                        <div style={{ paddingTop: "5px" }}>
                          <Input
                            placeholder="Enter Backend"
                            size="large"
                            name="backEnd"
                            value={currentProjectDetails.backEnd}
                            id="backEnd"
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
                    </div>
                  </div>
                  <div style={{ width: "100%", paddingTop: "10px" }}>
                    <div
                      className="space_antd"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "90%",
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
                          Database
                        </Text>
                        <div style={{ paddingTop: "5px" }}>
                          <Input
                            placeholder="Enter Database"
                            size="large"
                            value={currentProjectDetails.database}
                            name="database"
                            id="database"
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
                          Version Control
                        </Text>
                        <div style={{ paddingTop: "5px" }}>
                          <Input
                            placeholder="Enter Version Control"
                            size="large"
                            name="versionControl"
                            id="versionControl"
                            value={currentProjectDetails.versionControl}
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
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "10px",
                      marginBottom: "40px",
                    }}
                  >
                    <div
                      className="space_antd"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "90%",
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
                          Start Date
                        </Text>
                        <div style={{ paddingTop: "5px" }}>
                          <Input
                            size="large"
                            value={moment(currentProjectDetails.startDate).format("YYYY-MM")}
                            disabled
                            style={{
                              width: "95%",
                              fontFamily: "Urbanist",
                              color: "#212121",
                              fontWeight: "500",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div style={{ width: "48%" }}>
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
                            Project Year
                          </Text>
                          <div style={{ paddingTop: "5px" }}>
                            <Input
                              placeholder="Year"
                              size="large"
                              name="projectYear" 
                              id="projectYear"
                              value={currentProjectDetails.projectYear}
                              type="Number"
                              style={{
                                width: "94%",
                                fontFamily: "Urbanist",
                                color: "#212121",
                                fontWeight: "500",
                              }}
                              onChange={(event) => {
                                event.target.value.length <= 10 &&
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
                            Project Month
                          </Text>
                          <div style={{ paddingTop: "5px" }}>
                            <Input
                              placeholder="Month"
                              size="large"
                              type="Number"
                              name="projectMonth"
                              id="projectMonth"
                              value={currentProjectDetails.projectMonth}
                              style={{
                                width: "94%",
                                fontFamily: "Urbanist",
                                color: "#212121",
                                fontWeight: "500",
                              }}
                              onChange={(event) => {
                                event.target.value.length <= 10 &&
                                  event.target.value <= 12 &&
                                  onValueChange(event);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "10px",
                      marginBottom: "40px",
                    }}
                  >
                    <div
                      className="space_antd"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "90%",
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
                          Start Date
                        </Text>
                        <div style={{ paddingTop: "5px" }}>
                          <DatePicker
                            onChange={onStartYearChange}
                            picker="month"
                            style={{ width: "95%" }}
                            size="large"
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
                          End Date
                        </Text>
                        <div style={{ paddingTop: "5px" }}>
                          <DatePicker
                            onChange={onEndYearChange}
                            picker="month"
                            style={{ width: "95%" }}
                            size="large"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "5px" }}>
                
              </div>
            </div>
          </div>
        </li>
      </div>
      <div
        style={{
          width: "5%",
          display: dragEnabled ? "none" : "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-10px",
        }}
      >
        <div style={{ marginLeft: "10px" }}>
          <div>
            <IconButton
              color={"primary"}
              style={{
                color: "rgba(247, 85, 85, 0.08)",
                border: "1px solid rgba(255, 185, 185, 0.05)",
                width: "30px",
                height: "30px",
              }}
              onClick={() => DeleteProject(projectList.id)}
            >
              <Icon
                type={"delete"}
                style={{
                  fill: "#F75555",
                  height: "25px",
                  width: "25px",
                }}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
