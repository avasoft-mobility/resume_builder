import React, { useEffect, useState } from "react";
import Text from "../../Wrapper_Components/Text.wrapperComponent";
import { DatePicker, Input } from "antd";
import { Button, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../Stores";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "../../Wrapper_Components/Icon.WrapperComponent";
import { profileSummary } from "../../../Content/summary";
import {
  projectDetails,
  commonstackPoints,
  commonVersionControl,
  adminPanel,
} from "../../../Content/projectDetails";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Divider } from "antd";
import { Tooltip } from "antd";

const { forwardRef, useRef, useImperativeHandle } = React;

interface DownloadResumeProps {
  stepChange: any;
  ref: any;
}

const DownloadResume: React.FC<DownloadResumeProps> = forwardRef(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      printPdf() {
        handlePrint();
      },

      printDocx() {
        exportHTML();
      },
    }));

    const ResumeDetails = useSelector(
      (state: RootState) => state.ResumeDetails.value
    );

    var toolbarOptions = [
      ["bold", "italic", "underline"], // toggled buttons

      [{ list: "bullet" }],
    ];

    let modules: any = {
      toolbar: toolbarOptions,
    };



    const [resumeSummary, setResumeSummary] = useState("");
    const [yearExprience, setYearExprience] = useState(0);
    const [editorSummary, setEditorSummary] = useState(resumeSummary);
    const [frontEnd, setfrontEnd] = useState("");
    const [backEnd, setBackEnd] = useState("");
    const [industry, setIndustry] = useState("");
    const [platforms, setPlatforms] = useState("");
    const [versionControl, setVersionControl] = useState("");
    const [DataBase, setDatabase] = useState("");
    const [allStacks, setAllStacks] = useState("");
    const [stackList, setStackList] = useState("");
    const [project_Summary, setproject_Summary] = useState<any>([]);
    const [htmlContent, sethtmlContent] = useState("");
    const [editSummary, setEditSummary] = useState(false);
    const [selectedProjectIndex, setselectedProjectIndex] = useState(null);
    const [EditorprojectSummary, setEditorprojectSummary] = useState("");

    useEffect(() => {
      if (
        profileSummary != null &&
        profileSummary != undefined &&
        ResumeDetails.personalDetails.jobTitle.length > 0
      ) {
        let summaryArray: any = [];
        let temporaryArray: any = [];

        if (
          ResumeDetails.personalDetails.jobTitle.toLowerCase().includes("lead")
        ) {
          //Gets all the Lead
          for (let i = 0; i < profileSummary.length; i++) {
            if (profileSummary[i].Role.toLowerCase().includes("lead")) {
              summaryArray.push(profileSummary[i]);
            }
          }

          //Get Stack Specific
          if (summaryArray.length > 1) {
            temporaryArray = summaryArray;
            summaryArray = [];
            for (let i = 0; i < temporaryArray.length; i++) {
              if (
                ResumeDetails.personalDetails.jobTitle
                  .toLowerCase()
                  .split(" ")
                  .includes(temporaryArray[i].Role.toLowerCase().split(" ")[1])
              ) {
                summaryArray.push(temporaryArray[i]);
              }
            }
          }
        } else {
          //Getting the List of Summary
          for (let i = 0; i < profileSummary.length; i++) {
            if (profileSummary[i].Role.length > 0) {
              let user_role = ResumeDetails.personalDetails.jobTitle
                .toLowerCase()
                .split(" ");
              let current_role =
                profileSummary[i].Role.toLowerCase().split(" ");
              for (let j = 0; j < current_role.length; j++) {
                if (user_role.includes(current_role[j].toLowerCase())) {
                  summaryArray.push(profileSummary[i]);
                  break;
                }
              }
            }
          }

          //Getting the List of Summary - (Senior/Junior)
          if (summaryArray.length > 1) {
            temporaryArray = summaryArray;
            summaryArray = [];
            if (
              ResumeDetails.personalDetails.jobTitle
                .toLowerCase()
                .split(" ")
                .includes("senior")
            ) {
              for (let i = 0; i < temporaryArray.length; i++) {
                if (
                  temporaryArray[i].Role.toLowerCase()
                    .split(" ")
                    .includes("senior")
                ) {
                  summaryArray.push(temporaryArray[i]);
                }
              }
            } else {
              for (let i = 0; i < temporaryArray.length; i++) {
                if (
                  temporaryArray[i].Role.toLowerCase()
                    .split(" ")
                    .includes("junior")
                ) {
                  summaryArray.push(temporaryArray[i]);
                }
              }
            }
          }

          //Getting the List of Summary - (Stack)
          if (summaryArray.length > 1) {
            temporaryArray = summaryArray;
            summaryArray = [];
            for (let i = 0; i < temporaryArray.length; i++) {
              if (
                ResumeDetails.personalDetails.jobTitle
                  .toLowerCase()
                  .split(" ")
                  .includes(temporaryArray[i].Role.toLowerCase().split(" ")[1])
              ) {
                summaryArray.push(temporaryArray[i]);
              }
            }
          }
        }

        if (summaryArray.length > 1) {
          temporaryArray = summaryArray;
          summaryArray = [];
          for (let i = 0; i < temporaryArray.length; i++) {
            if (
              ResumeDetails.personalDetails.jobTitle
                .toLowerCase()
                .split(" ")
                .includes(temporaryArray[i].Role.toLowerCase().split(" ")[0])
            ) {
              summaryArray.push(temporaryArray[i]);
            }
          }
        }

        if (summaryArray.length == 0) {
          if (
            ResumeDetails.personalDetails.jobTitle
              .toLowerCase()
              .includes("lead")
          ) {
            summaryArray = [profileSummary[profileSummary.length - 4]];
          } else if (
            ResumeDetails.personalDetails.jobTitle
              .toLowerCase()
              .includes("senior")
          ) {
            summaryArray = [profileSummary[profileSummary.length - 3]];
          } else if (
            ResumeDetails.personalDetails.jobTitle
              .toLowerCase()
              .includes("junior")
          ) {
            summaryArray = [profileSummary[profileSummary.length - 2]];
          } else {
            summaryArray = [profileSummary[profileSummary.length - 1]];
          }
        }

        if (
          ResumeDetails.personalDetails.jobTitle.toLowerCase() !=
          "mobile architect"
        ) {
          summaryArray = [];
          summaryArray = [profileSummary[profileSummary.length - 1]];
        }

        setResumeSummary(
          summaryArray[0].Summary[
            Math.floor(Math.random() * summaryArray[0].Summary.length)
          ]
        );
      }
    }, [ResumeDetails.personalDetails]);

    useEffect(() => {
      let frontEndData = "";
      let backEndData = "";
      let DataBaseData = "";

      let projectDetails: any = ResumeDetails.projectDetails;

      //Year Calculation
      let data = new Date(ResumeDetails.personalDetails.joiningDate)
      // console.log(new Date(data.setFullYear(data.getFullYear() + 1)))
      // console.log(new Date(data.setMonth(data.getMonth() + 1)))
      if (ResumeDetails.projectDetails.length > 0) {
        let yearSet = [];
        for (let i = 0; i < projectDetails.length; i++) {
          yearSet.push(parseInt(moment(projectDetails[i].startDate).format("YYYY")));
          yearSet.push(parseInt(moment(projectDetails[i].endDate).format("YYYY")));
        }
        let years = Array.from(new Set(yearSet)).sort();
        const d = new Date();
        let year: any = d.getFullYear();
        setYearExprience(year - years[0]);
      }

      //Gets All the FrontEnd
      if (projectDetails.length > 0) {
        let frontEnd = [];
        for (let i = 0; i < projectDetails.length; i++) {
          frontEnd.push(projectDetails[i].frontEnd);
        }
        let frontEndList = Array.from(new Set(frontEnd)).sort();
        setfrontEnd(frontEndList.join(", "));
        frontEndData = frontEndList.join(", ");
      }

      //Get All the Industry List
      if (projectDetails.length > 0) {
        let industry = [];
        for (let i = 0; i < projectDetails.length; i++) {
          industry.push(projectDetails[i].industry);
        }
        let industryList = Array.from(new Set(industry)).sort();
        setIndustry(industryList.join(", "));
      }

      //Get All the PlatForms List
      if (projectDetails.length > 0) {
        let platform = [];
        for (let i = 0; i < projectDetails.length; i++) {
          platform.push(projectDetails[i].platform);
        }
        let platformList = Array.from(new Set(platform)).sort();
        setPlatforms(platformList.join(", "));
      }

      //Get All the Version Control List
      if (projectDetails.length > 0) {
        let version_control = [];
        for (let i = 0; i < projectDetails.length; i++) {
          version_control.push(projectDetails[i].versionControl);
        }
        let version_controlList = Array.from(new Set(version_control)).sort();
        setVersionControl(version_controlList.join(", "));
      }

      //Get All the Database Control List
      if (projectDetails.length > 0) {
        let Database = [];
        for (let i = 0; i < projectDetails.length; i++) {
          Database.push(projectDetails[i].database);
        }
        let DatabaseList = Array.from(new Set(Database)).sort();
        setDatabase(DatabaseList.join(", "));
        DataBaseData = DatabaseList.join(", ");
      }

      //Get All the Backend Control List
      if (projectDetails.length > 0) {
        let backEnd = [];
        for (let i = 0; i < projectDetails.length; i++) {
          backEnd.push(projectDetails[i].backEnd);
        }
        let backEndList = Array.from(new Set(backEnd)).sort();
        setBackEnd(backEndList.join(", "));
        backEndData = backEndList.join(", ");
      }

      //Set Data for all the Stacks
      let All_Stacks =
        frontEndData +
        " for frontend " +
        ((backEndData.length > 0) ? backEndData +
        " for backend " : " ") +
        ((DataBaseData.length > 0) ? DataBaseData +
        " for database." : "" );
      setAllStacks(All_Stacks);
      setStackList(frontEndData + ", " + backEndData + ", " + DataBaseData);
    }, [ResumeDetails.projectDetails]);

    useEffect(() => {
      setproject_Summary([]);
      for (let i = 0; i < ResumeDetails.projectDetails.length; i++) {
        getProjectDetails(ResumeDetails.projectDetails[i], i);
      }
    }, [ResumeDetails.projectDetails]);

    const componentRef = React.useRef<HTMLDivElement>(null);

    const onBeforeGetContentResolve = React.useRef(null);

    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState("old boring text");

    const handleAfterPrint = React.useCallback(() => {}, []);

    const handleBeforePrint = React.useCallback(() => {}, []);

    const handleOnBeforeGetContent = React.useCallback(() => {
      setLoading(true);
      setText("Loading new text...");
    }, [setLoading, setText]);

    const reactToPrintContent = React.useCallback(() => {
      return componentRef.current;
    }, [componentRef.current]);

    const handlePrint = useReactToPrint({
      content: reactToPrintContent,
      documentTitle: ResumeDetails.personalDetails.name,
      onBeforeGetContent: handleOnBeforeGetContent,
      onBeforePrint: handleBeforePrint,
      onAfterPrint: handleAfterPrint,
      removeAfterPrint: true,
    });

    React.useEffect(() => {
      if (
        text === "New, Updated Text!" &&
        typeof onBeforeGetContentResolve.current === "function"
      ) {
        // onBeforeGetContentResolve.current();
      }
    }, [onBeforeGetContentResolve.current, text]);

    const getProjectDetails = (Dataset: any, index: any) => {
      let data: any = Dataset;
      let project_Details = [];
      if (data != undefined && data != null) {
        if (data.role.length > 0) {
          if (data.role.toLowerCase().split(" ").includes("architect")) {
            let details = projectDetails.filter((x) =>
              x.Role.toLowerCase().split(" ").includes("architect")
            );
            let projects = details[0];
            let objectList = {
              Role: "",
              Description:
                "<ul>" +
                projects.Description[
                  Math.floor(Math.random() * projects.Description.length)
                ] +
                (data.frontEnd.length > 0
                  ? commonstackPoints[0].Stack_Frontend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Frontend.length
                      )
                    ]
                      .replaceAll("{front_end}", data.frontEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.backEnd.length > 0
                  ? commonstackPoints[0].Stack_Backend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Backend.length
                      )
                    ]
                      .replaceAll("{back_end}", data.backEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.database.length > 0
                  ? commonstackPoints[0].Stack_Database[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Database.length
                      )
                    ].replaceAll("{database}", data.database)
                  : "") +
                (data.hasadminpanel == true &&
                data.apFrontEnd.length > 0 &&
                data.apBackEnd.length > 0
                  ? adminPanel[0].Admin_Panel[
                      Math.floor(
                        Math.random() * adminPanel[0].Admin_Panel.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{ad_back_end}", data.apBackEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : data.hasadminpanel == true && data.apFrontEnd.length > 0
                  ? adminPanel[0].Ad_Frontend[
                      Math.floor(
                        Math.random() * adminPanel[0].Ad_Frontend.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : "") +
                (data.versionControl.toLowerCase().split(" ").includes("tfs")
                  ? commonVersionControl[0].content
                  : data.versionControl.toLowerCase().split(" ").includes("git")
                  ? commonVersionControl[1].content
                  : commonVersionControl[2].content[
                      Math.floor(
                        Math.random() * commonVersionControl[2].content.length
                      )
                    ].replaceAll("{version_Control}", data.versionControl)) +
                "</ul>",
            };

            project_Details.push(objectList);
          } else if (data.role.toLowerCase().split(" ").includes("lead")) {
            let details = projectDetails.filter((x) =>
              x.Role.toLowerCase().split(" ").includes("lead")
            );
            let projects = details[0];
            let objectList = {
              Role: "",
              Description:
                "<ul>" +
                projects.Description[
                  Math.floor(Math.random() * projects.Description.length)
                ] +
                (data.frontEnd.length > 0
                  ? commonstackPoints[0].Stack_Frontend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Frontend.length
                      )
                    ]
                      .replaceAll("{front_end}", data.frontEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.backEnd.length > 0
                  ? commonstackPoints[0].Stack_Backend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Backend.length
                      )
                    ]
                      .replaceAll("{back_end}", data.backEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.database.length > 0
                  ? commonstackPoints[0].Stack_Database[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Database.length
                      )
                    ].replaceAll("{database}", data.database)
                  : "") +
                (data.hasadminpanel == true &&
                data.apFrontEnd.length > 0 &&
                data.apBackEnd.length > 0
                  ? adminPanel[0].Admin_Panel[
                      Math.floor(
                        Math.random() * adminPanel[0].Admin_Panel.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{ad_back_end}", data.apBackEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : data.hasadminpanel == true && data.apFrontEnd.length > 0
                  ? adminPanel[0].Ad_Frontend[
                      Math.floor(
                        Math.random() * adminPanel[0].Ad_Frontend.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : "") +
                (data.versionControl.toLowerCase().split(" ").includes("tfs")
                  ? commonVersionControl[0].content
                  : data.versionControl.toLowerCase().split(" ").includes("git")
                  ? commonVersionControl[1].content
                  : commonVersionControl[2].content[
                      Math.floor(
                        Math.random() * commonVersionControl[2].content.length
                      )
                    ].replaceAll("{version_Control}", data.versionControl)) +
                "</ul>",
            };

            project_Details.push(objectList);
          } else if (data.role.toLowerCase().split(" ").includes("senior")) {
            let details = projectDetails.filter((x) =>
              x.Role.toLowerCase().split(" ").includes("senior")
            );
            let projects = details[0];
            let objectList = {
              Role: "",
              Description:
                "<ul>" +
                projects.Description[
                  Math.floor(Math.random() * projects.Description.length)
                ] +
                (data.frontEnd.length > 0
                  ? commonstackPoints[0].Stack_Frontend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Frontend.length
                      )
                    ]
                      .replaceAll("{front_end}", data.frontEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.backEnd.length > 0
                  ? commonstackPoints[0].Stack_Backend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Backend.length
                      )
                    ]
                      .replaceAll("{back_end}", data.backEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.database.length > 0
                  ? commonstackPoints[0].Stack_Database[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Database.length
                      )
                    ].replaceAll("{database}", data.database)
                  : "") +
                (data.hasadminpanel == true &&
                data.apFrontEnd.length > 0 &&
                data.apBackEnd.length > 0
                  ? adminPanel[0].Admin_Panel[
                      Math.floor(
                        Math.random() * adminPanel[0].Admin_Panel.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{ad_back_end}", data.apBackEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : data.hasadminpanel == true && data.apFrontEnd.length > 0
                  ? adminPanel[0].Ad_Frontend[
                      Math.floor(
                        Math.random() * adminPanel[0].Ad_Frontend.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : "") +
                (data.versionControl.toLowerCase().split(" ").includes("tfs")
                  ? commonVersionControl[0].content
                  : data.versionControl.toLowerCase().split(" ").includes("git")
                  ? commonVersionControl[1].content
                  : commonVersionControl[2].content[
                      Math.floor(
                        Math.random() * commonVersionControl[2].content.length
                      )
                    ].replaceAll("{version_Control}", data.versionControl)) +
                "</ul>",
            };

            project_Details.push(objectList);
          } else if (data.role.toLowerCase().split(" ").includes("junior")) {
            let details = projectDetails.filter((x) =>
              x.Role.toLowerCase().split(" ").includes("junior")
            );
            let projects = details[0];
            let objectList = {
              Role: "",
              Description:
                "<ul>" +
                projects.Description[
                  Math.floor(Math.random() * projects.Description.length)
                ] +
                (data.frontEnd.length > 0
                  ? commonstackPoints[0].Stack_Frontend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Frontend.length
                      )
                    ]
                      .replaceAll("{front_end}", data.frontEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.backEnd.length > 0
                  ? commonstackPoints[0].Stack_Backend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Backend.length
                      )
                    ]
                      .replaceAll("{back_end}", data.backEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.database.length > 0
                  ? commonstackPoints[0].Stack_Database[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Database.length
                      )
                    ].replaceAll("{database}", data.database)
                  : "") +
                (data.hasadminpanel == true &&
                data.apFrontEnd.length > 0 &&
                data.apBackEnd.length > 0
                  ? adminPanel[0].Admin_Panel[
                      Math.floor(
                        Math.random() * adminPanel[0].Admin_Panel.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{ad_back_end}", data.apBackEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : data.hasadminpanel == true && data.apFrontEnd.length > 0
                  ? adminPanel[0].Ad_Frontend[
                      Math.floor(
                        Math.random() * adminPanel[0].Ad_Frontend.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : "") +
                (data.versionControl.toLowerCase().split(" ").includes("tfs")
                  ? commonVersionControl[0].content
                  : data.versionControl.toLowerCase().split(" ").includes("git")
                  ? commonVersionControl[1].content
                  : commonVersionControl[2].content[
                      Math.floor(
                        Math.random() * commonVersionControl[2].content.length
                      )
                    ].replaceAll("{version_Control}", data.versionControl)) +
                "</ul>",
            };

            project_Details.push(objectList);
          } else if (data.role.toLowerCase().split(" ").includes("intern")) {
            let details = projectDetails.filter((x) =>
              x.Role.toLowerCase().split(" ").includes("intern")
            );
            let projects = details[0];
            let objectList = {
              Role: "",
              Description:
                "<ul>" +
                projects.Description[
                  Math.floor(Math.random() * projects.Description.length)
                ] +
                (data.frontEnd.length > 0
                  ? commonstackPoints[0].Stack_Frontend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Frontend.length
                      )
                    ]
                      .replaceAll("{front_end}", data.frontEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.backEnd.length > 0
                  ? commonstackPoints[0].Stack_Backend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Backend.length
                      )
                    ]
                      .replaceAll("{back_end}", data.backEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.database.length > 0
                  ? commonstackPoints[0].Stack_Database[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Database.length
                      )
                    ].replaceAll("{database}", data.database)
                  : "") +
                (data.hasadminpanel == true &&
                data.apFrontEnd.length > 0 &&
                data.apBackEnd.length > 0
                  ? adminPanel[0].Admin_Panel[
                      Math.floor(
                        Math.random() * adminPanel[0].Admin_Panel.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{ad_back_end}", data.apBackEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : data.hasadminpanel == true && data.apFrontEnd.length > 0
                  ? adminPanel[0].Ad_Frontend[
                      Math.floor(
                        Math.random() * adminPanel[0].Ad_Frontend.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : "") +
                (data.versionControl.toLowerCase().split(" ").includes("tfs")
                  ? commonVersionControl[0].content
                  : data.versionControl.toLowerCase().split(" ").includes("git")
                  ? commonVersionControl[1].content
                  : commonVersionControl[2].content[
                      Math.floor(
                        Math.random() * commonVersionControl[2].content.length
                      )
                    ].replaceAll("{version_Control}", data.versionControl)) +
                "</ul>",
            };

            project_Details.push(objectList);
          } else {
            let details = projectDetails[3];
            let projects = details;
            let objectList = {
              Role: "",
              Description:
                "<ul>" +
                projects.Description[
                  Math.floor(Math.random() * projects.Description.length)
                ] +
                (data.frontEnd.length > 0
                  ? commonstackPoints[0].Stack_Frontend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Frontend.length
                      )
                    ]
                      .replaceAll("{front_end}", data.frontEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.backEnd.length > 0
                  ? commonstackPoints[0].Stack_Backend[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Backend.length
                      )
                    ]
                      .replaceAll("{back_end}", data.backEnd)
                      .replaceAll("{platform}", data.platform)
                  : "") +
                (data.database.length > 0
                  ? commonstackPoints[0].Stack_Database[
                      Math.floor(
                        Math.random() *
                          commonstackPoints[0].Stack_Database.length
                      )
                    ].replaceAll("{database}", data.database)
                  : "") +
                (data.hasadminpanel == true &&
                data.apFrontEnd.length > 0 &&
                data.apBackEnd.length > 0
                  ? adminPanel[0].Admin_Panel[
                      Math.floor(
                        Math.random() * adminPanel[0].Admin_Panel.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{ad_back_end}", data.apBackEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : data.hasadminpanel == true && data.apFrontEnd.length > 0
                  ? adminPanel[0].Ad_Frontend[
                      Math.floor(
                        Math.random() * adminPanel[0].Ad_Frontend.length
                      )
                    ]
                      .replaceAll("{ad_front_end}", data.apFrontEnd)
                      .replaceAll("{project_industry}", data.industry)
                  : "") +
                (data.versionControl.toLowerCase().split(" ").includes("tfs")
                  ? commonVersionControl[0].content
                  : data.versionControl.toLowerCase().split(" ").includes("git")
                  ? commonVersionControl[1].content
                  : commonVersionControl[2].content[
                      Math.floor(
                        Math.random() * commonVersionControl[2].content.length
                      )
                    ].replaceAll("{version_Control}", data.versionControl)) +
                "</ul>",
            };

            project_Details.push(objectList);
          }
        }
      }

      if (project_Details.length > 0) {
        let projectsList = project_Summary;
        projectsList[index] = project_Details[0];
        setproject_Summary(projectsList);
      }
    };

    function exportHTML() {
      if (document.getElementById("source-html") != null) {
        var content = document.getElementById("source-html");
        var header =
          "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
          "xmlns:w='urn:schemas-microsoft-com:office:word' " +
          "xmlns='http://www.w3.org/TR/REC-html40'>" +
          "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        var footer = "</body></html>";
        var sourceHTML = header + content?.innerHTML + footer;
        sethtmlContent(sourceHTML);
        var source =
          "data:application/vnd.ms-word;charset=utf-8," +
          encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = "document.doc";
        fileDownload.click();
        document.body.removeChild(fileDownload);
      }
    }

    const getProjectSummary = (index: any) => {
      if (project_Summary[index] != undefined) {
        return project_Summary[index].Description.trim()
          .split("\n")
          .map((line: any, key: any) => {
            if (line.length > 1) {
              return (
                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: "19px",
                    fontFamily: "Lato",
                    fontWeight: "500",
                    color: "#242424",
                    display: line.trim().length > 0 ? "" : "none",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: line,
                  }}
                ></div>
              );
            }
          });
      } else {
        return null;
      }
    };

    const handleProjectSummaryChange = (event: any) => {
      if (selectedProjectIndex != null) {
        if (project_Summary[selectedProjectIndex] != undefined) {
          let project = project_Summary;
          let currentProject = project[selectedProjectIndex];
          currentProject.Description = event;
          setproject_Summary(() => project);
          setEditorprojectSummary(event);
        }
      }
    };




useEffect(() => {
  const concernedElement:any = document.querySelector(".click-text");

  document.addEventListener("mousedown", (event) => {
    if(editSummary == false){
      if(concernedElement != null){
        if (concernedElement.contains(event.target)) {
          } else {
            setEditSummary(false);
            // setResumeSummary(editorSummary);
          }
      }

    }
  });
}, [editorSummary])


// useEffect(() => {
//   const concernedElement:any = document.querySelector(".project-text");

//   document.addEventListener("mousedown", (event) => {
//     if(editSummary == false){
//     if (concernedElement.contains(event.target)) {
//       console.log("Clicked Inside");
//     } else {
//       setselectedProjectIndex(null);
//         // setResumeSummary(editorSummary);
//       }
//     }
//   });
// }, [selectedProjectIndex])




    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          marginBottom: "40px",
          userSelect: "none",
        }}
      >
        <div
          className="scrollbar_resume"
          style={{
            margin: "0px 50px",
            border: "0.5px solid #EDEDED",
            width: "100%",
            padding: "50px 50px",
            height: "65vh",
            overflowY: "scroll",
          }}
          id="outerDiv"
        >
          <div className="header" style={{ marginBottom: "30px" }}>
            <span
              className="full-name"
              style={{
                fontSize: "30px",
                marginBottom: "10px",
                width: "50%",
                fontFamily: "Spectral",
                fontWeight: "700",
                color: "#2D3E5B",
              }}
            >
              {ResumeDetails.personalDetails.name}
            </span>
            <div
              className="contact-info"
              style={{ marginBottom: "20px", float: "right", display: "block" }}
            >
              <div>
                <span
                  className="email"
                  style={{
                    color: "#242424",
                    fontWeight: "300",
                    fontFamily: "Lato",
                    display: "flex",
                  }}
                >
                  <Icon
                    type={"mail"}
                    style={{
                      fill: "#FFFFFF",
                      paddingRight: "5px",
                    }}
                  />{" "}
                  {ResumeDetails.personalDetails.emailID}
                </span>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <span
                  className="email"
                  style={{
                    color: "#242424",
                    fontWeight: "300",
                    fontFamily: "Lato",
                    display: "flex",
                  }}
                >
                  <Icon
                    type={"phone"}
                    style={{
                      fill: "#FFFFFF",
                      paddingRight: "5px",
                    }}
                  />
                  {ResumeDetails.personalDetails.phoneNumber}
                </span>
              </div>
            </div>
            <div>
              <span
                className="position"
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginRight: "10px",
                  color: "#DB9291",
                  fontFamily: "Lato",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                {ResumeDetails.personalDetails.jobTitle}
              </span>
            </div>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <span
              onDoubleClick={() => {
                setEditSummary(false);
                setResumeSummary(editorSummary);
              }}
              style={{ display: editSummary == true ? "" : "none" }}
              id="summaryEditSpan"
              className="click-text"
            >
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#F7F8F8",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <ReactQuill
                  theme="snow"
                  value={editorSummary
                    .replaceAll(
                      "{total_years}",
                      yearExprience.toString() + "+ "
                    )
                    .replaceAll("{front_end}", frontEnd)
                    .replaceAll("{industry}", industry)
                    .replaceAll("{version_control}", versionControl)
                    .replaceAll("{version-control}", versionControl)
                    .replaceAll("{platforms}", platforms)
                    .replaceAll("{all_stacks}", allStacks)}
                  onChange={(value) => {setEditorSummary(value)
                    setResumeSummary(value)}}
                  modules={modules}
                  style={{
                    fontFamily: "Spectral",
                    fontWeight: "500",
                    textAlign: "justify",
                    letterSpacing: "-0.8px",
                    wordBreak: "break-word",
                  }}
                />
              </div>
            </span>
            <span
              onDoubleClick={() => {
                setEditSummary(true);
                setEditorSummary(resumeSummary);
              }}
              style={{ display: editSummary == true ? "none" : "" }}
              id="summarySpan"
            >
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#F7F8F8",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                {resumeSummary.split("\n").map((line, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        fontFamily: "Spectral",
                        fontWeight: "500",
                        textAlign: "justify",
                        paddingBottom:
                          index == resumeSummary.split("\n").length - 1
                            ? "0px"
                            : "12px",
                        letterSpacing: "-0.8px",
                        wordBreak: "break-word",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: line
                          .replaceAll(
                            "{total_years}",
                            yearExprience.toString() + "+ "
                          )
                          .replaceAll("{front_end}", frontEnd)
                          .replaceAll("{industry}", industry)
                          .replaceAll("{version_control}", versionControl)
                          .replaceAll("{version-control}", versionControl)
                          .replaceAll("{platforms}", platforms)
                          .replaceAll("{all_stacks}", allStacks),
                      }}
                    ></div>
                  );
                })}
              </div>
            </span>
          </div>
          <div>
            <span
              className="position"
              style={{
                display: "inline-block",
                fontWeight: "bold",
                marginRight: "10px",
                color: "#DB9291",
                letterSpacing: "2px",
                fontFamily: "Lato",
                textTransform: "uppercase",
              }}
            >
              Experience
            </span>
            <div>
              {ResumeDetails.projectDetails.map((data: any, index: any) => {
                return (
                  <div style={{ marginTop: "20px" }}>
                    <div>
                      <span
                        style={{
                          marginTop: "10px",
                          fontSize: "20px",
                          fontStyle: "italic",
                          color: "#2D3E5B",
                          fontWeight: "500",
                          fontFamily: "Spectral",
                          letterSpacing: "-0.8px",
                        }}
                      >
                        {" "}
                        {data.projectName}
                      </span>
                      <div
                        style={{
                          marginBottom: "20px",
                          float: "right",
                          display: "block",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "300",
                            color: "#242424",
                            fontSize: "13px",
                            fontFamily: "Lato",
                            float: "right",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <Icon
                            type={"calendar"}
                            style={{
                              fill: "#FFFFFF",
                              paddingRight: "5px",
                            }}
                          />
                          {moment(data.startDate).format("MMM, YYYY") +
                            " – " +
                            moment(data.endDate).format("MMM, YYYY")}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span
                        style={{
                          fontWeight: "300",
                          color: "#242424",
                          fontSize: "13px",
                          fontFamily: "Lato",
                        }}
                      >
                        {data.role}
                      </span>
                    </div>
                    <span
                      onDoubleClick={() => {
                        setselectedProjectIndex(null);
                      }}
                      style={{
                        display: selectedProjectIndex == index ? "" : "none",
                      }}
                      className="project-text"
                    >
                      <div
                        style={{
                          marginLeft: "20px",
                          marginRight: "10px",
                          marginTop: "15px",
                          cursor: "pointer",
                        }}
                      >
                        <ReactQuill
                          theme="snow"
                          value={EditorprojectSummary}
                          onChange={handleProjectSummaryChange}
                          modules={modules}
                          style={{
                            fontFamily: "Spectral",
                            fontWeight: "500",
                            textAlign: "justify",
                            letterSpacing: "-0.8px",
                            wordBreak: "break-word",
                          }}
                        />
                      </div>
                    </span>
                    <span
                      onDoubleClick={() => {
                        setselectedProjectIndex(index);
                        setEditorprojectSummary(
                          () => project_Summary[index].Description
                        );
                      }}
                      style={{
                        display: selectedProjectIndex == index ? "none" : "",
                      }}
                    >
                      <div
                        style={{
                          marginLeft: "20px",
                          marginRight: "10px",
                          marginTop: "15px",
                          cursor: "pointer",
                        }}
                      >
                        <ul>{getProjectSummary(index)}</ul>
                      </div>
                    </span>
                    <Divider
                      style={{
                        margin: "20px",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            <div>
              <div style={{ width: "50%", float: "left" }}>
                <div>
                  <span
                    className="position"
                    style={{
                      display: "inline-block",
                      fontWeight: "bold",
                      marginRight: "10px",
                      color: "#DB9291",
                      letterSpacing: "2px",
                      fontFamily: "Lato",
                      textTransform: "uppercase",
                    }}
                  >
                    Skills
                  </span>
                </div>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <div
                    style={{
                      fontStyle: "italic",
                      color: "#2D3E5B",
                      fontSize: "17px",
                      fontWeight: "500",
                      fontFamily: "Spectral",
                      letterSpacing: "-0.8px",
                    }}
                  >
                    Technologies{" "}
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#242424",
                        fontFamily: "Lato",
                      }}
                    >
                      {stackList}
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <div
                    style={{
                      fontStyle: "italic",
                      color: "#2D3E5B",
                      fontSize: "17px",
                      fontWeight: "500",
                      fontFamily: "Spectral",
                      letterSpacing: "-0.8px",
                    }}
                  >
                    Code versioning tool{" "}
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#242424",
                        fontFamily: "Lato",
                      }}
                    >
                      {versionControl}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ width: "50%", float: "right" }}>
                <div>
                  <span
                    className="position"
                    style={{
                      display: "inline-block",
                      fontWeight: "bold",
                      marginRight: "10px",
                      color: "#DB9291",
                      letterSpacing: "2px",
                      fontFamily: "Lato",
                      textTransform: "uppercase",
                    }}
                  >
                    Education
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <div style={{ width: "70%" }}>
                    <span
                      style={{
                        fontStyle: "italic",
                        color: "#2D3E5B",
                        fontSize: "17px",
                        fontWeight: "500",
                        fontFamily: "Spectral",
                        letterSpacing: "-0.8px",
                        width: "80%",
                      }}
                    >
                      {ResumeDetails.educationalDetails.course +
                        ", at " +
                        ResumeDetails.educationalDetails.institutionName}{" "}
                    </span>
                  </div>
                  <span
                    style={{
                      float: "right",
                      fontStyle: "italic",
                      color: "#2D3E5B",
                      fontSize: "17px",
                      fontWeight: "500",
                      fontFamily: "Spectral",
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "30%",
                      letterSpacing: "-0.8px",
                    }}
                  >
                    {ResumeDetails.educationalDetails.startYear +
                      " - " +
                      ResumeDetails.educationalDetails.endYear}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "none" }}>
          <div id="source-html">
            <div className="page" ref={componentRef}>
              <div
                style={{
                  marginLeft: "6%",
                  marginRight: "6%",
                }}
              >
                <div>
                  <div className="header" style={{ marginBottom: "30px" }}>
                    <span
                      className="full-name"
                      style={{
                        fontSize: "30px",
                        marginBottom: "10px",
                        width: "50%",
                        fontFamily: "Spectral",
                        fontWeight: "700",
                        color: "#2D3E5B",
                      }}
                    >
                      {ResumeDetails.personalDetails.name}
                    </span>
                    <div
                      className="contact-info"
                      style={{
                        marginBottom: "20px",
                        float: "right",
                        display: "block",
                      }}
                    >
                      <div>
                        <span
                          className="email"
                          style={{
                            color: "#242424",
                            fontWeight: "300",
                            fontFamily: "Lato",
                            display: "flex",
                          }}
                        >
                          <Icon
                            type={"mail"}
                            style={{
                              fill: "#FFFFFF",
                              paddingRight: "5px",
                            }}
                          />{" "}
                          {ResumeDetails.personalDetails.emailID}
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <span
                          className="email"
                          style={{
                            color: "#242424",
                            fontWeight: "300",
                            fontFamily: "Lato",
                            display: "flex",
                          }}
                        >
                          <Icon
                            type={"phone"}
                            style={{
                              fill: "#FFFFFF",
                              paddingRight: "5px",
                            }}
                          />
                          {ResumeDetails.personalDetails.phoneNumber}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span
                        className="position"
                        style={{
                          display: "inline-block",
                          fontWeight: "bold",
                          marginRight: "10px",
                          color: "#DB9291",
                          fontFamily: "Lato",
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                        }}
                      >
                        {ResumeDetails.personalDetails.jobTitle}
                      </span>
                    </div>
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <div
                      style={{
                        padding: "20px",
                        backgroundColor: "#F7F8F8",
                        borderRadius: "10px",
                      }}
                    >
                      {resumeSummary.split("\n").map((line, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              fontFamily: "Spectral",
                              fontWeight: "500",
                              textAlign: "justify",
                              paddingBottom:
                                index == resumeSummary.split("\n").length - 1
                                  ? "0px"
                                  : "12px",
                              letterSpacing: "-0.8px",
                              wordBreak: "break-word",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: line
                                .replaceAll(
                                  "{total_years}",
                                  yearExprience.toString() + "+ "
                                )
                                .replaceAll("{front_end}", frontEnd)
                                .replaceAll("{industry}", industry)
                                .replaceAll("{version_control}", versionControl)
                                .replaceAll("{version-control}", versionControl)
                                .replaceAll("{platforms}", platforms)
                                .replaceAll("{all_stacks}", allStacks),
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <span
                      className="position"
                      style={{
                        display: "inline-block",
                        fontWeight: "bold",
                        marginRight: "10px",
                        color: "#DB9291",
                        letterSpacing: "2px",
                        fontFamily: "Lato",
                        textTransform: "uppercase",
                      }}
                    >
                      Experience
                    </span>
                    <div>
                      {ResumeDetails.projectDetails.map(
                        (data: any, index: any) => {
                          return (
                            <div style={{ marginTop: "20px" }}>
                              <div>
                                <span
                                  style={{
                                    marginTop: "10px",
                                    fontSize: "20px",
                                    fontStyle: "italic",
                                    color: "#2D3E5B",
                                    fontWeight: "500",
                                    fontFamily: "Spectral",
                                    letterSpacing: "-0.8px",
                                  }}
                                >
                                  {" "}
                                  {data.projectName}
                                </span>
                                <div
                                  style={{
                                    marginBottom: "20px",
                                    float: "right",
                                    display: "block",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: "300",
                                      color: "#242424",
                                      fontSize: "13px",
                                      fontFamily: "Lato",
                                      float: "right",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {" "}
                                    <Icon
                                      type={"calendar"}
                                      style={{
                                        fill: "#FFFFFF",
                                        paddingRight: "5px",
                                      }}
                                    />
                                    {moment(data.startDate).format(
                                      "MMM, YYYY"
                                    ) +
                                      " – " +
                                      moment(data.endDate).format("MMM, YYYY")}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span
                                  style={{
                                    fontWeight: "300",
                                    color: "#242424",
                                    fontSize: "13px",
                                    fontFamily: "Lato",
                                  }}
                                >
                                  {data.role}
                                </span>
                              </div>
                              <div
                                style={{
                                  marginLeft: "20px",
                                  marginRight: "10px",
                                  marginTop: "15px",
                                }}
                              >
                                <ul>{getProjectSummary(index)}</ul>
                              </div>
                              <Divider
                                style={{
                                  margin: "20px",
                                }}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <div>
                      <div style={{ width: "50%", float: "left" }}>
                        <div>
                          <span
                            className="position"
                            style={{
                              display: "inline-block",
                              fontWeight: "bold",
                              marginRight: "10px",
                              color: "#DB9291",
                              letterSpacing: "2px",
                              fontFamily: "Lato",
                              textTransform: "uppercase",
                            }}
                          >
                            Skills
                          </span>
                        </div>
                        <div
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <div
                            style={{
                              fontStyle: "italic",
                              color: "#2D3E5B",
                              fontSize: "17px",
                              fontWeight: "500",
                              fontFamily: "Spectral",
                              letterSpacing: "-0.8px",
                            }}
                          >
                            Technologies{" "}
                          </div>
                          <div>
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: "400",
                                color: "#242424",
                                fontFamily: "Lato",
                              }}
                            >
                              {stackList}
                            </span>
                          </div>
                        </div>
                        <div
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <div
                            style={{
                              fontStyle: "italic",
                              color: "#2D3E5B",
                              fontSize: "17px",
                              fontWeight: "500",
                              fontFamily: "Spectral",
                              letterSpacing: "-0.8px",
                            }}
                          >
                            Code versioning tool{" "}
                          </div>
                          <div>
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: "400",
                                color: "#242424",
                                fontFamily: "Lato",
                              }}
                            >
                              {versionControl}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{ width: "50%", float: "right" }}>
                        <div>
                          <span
                            className="position"
                            style={{
                              display: "inline-block",
                              fontWeight: "bold",
                              marginRight: "10px",
                              color: "#DB9291",
                              letterSpacing: "2px",
                              fontFamily: "Lato",
                              textTransform: "uppercase",
                            }}
                          >
                            Education
                          </span>
                        </div>
                        <div
                          style={{
                            marginTop: "20px",
                            marginBottom: "20px",
                            width: "100%",
                            display: "flex",
                          }}
                        >
                          <div style={{ width: "70%" }}>
                            <span
                              style={{
                                fontStyle: "italic",
                                color: "#2D3E5B",
                                fontSize: "17px",
                                fontWeight: "500",
                                fontFamily: "Spectral",
                                letterSpacing: "-0.8px",
                                width: "80%",
                              }}
                            >
                              {ResumeDetails.educationalDetails.course +
                                ", at " +
                                ResumeDetails.educationalDetails
                                  .institutionName}{" "}
                            </span>
                          </div>
                          <span
                            style={{
                              float: "right",
                              fontStyle: "italic",
                              color: "#2D3E5B",
                              fontSize: "17px",
                              fontWeight: "500",
                              fontFamily: "Spectral",
                              display: "flex",
                              justifyContent: "flex-end",
                              width: "30%",
                              letterSpacing: "-0.8px",
                            }}
                          >
                            {ResumeDetails.educationalDetails.startYear +
                              " - " +
                              ResumeDetails.educationalDetails.endYear}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default DownloadResume;
