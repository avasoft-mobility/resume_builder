import React, { useEffect, useState } from "react";
import Text from "../../Wrapper_Components/Text.wrapperComponent";
import { DatePicker, Input } from "antd";
import { Button, Space } from "antd";
import Accordion from "./Accordian/Accordion";
import { useDispatch } from "react-redux";
import { setProjectDetails } from "../../../Global_states/ResumeDetails";

interface ProjectDetailsProps {
  currentStep: any;
  dragEnabled:any;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = (props) => {
  const [projectList, setProjectList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProjectDetails(projectList));
  }, [projectList]);

  return (
    <div style={{ display: "flex", width: "100%", height: "65vh" }}>
      <Accordion
        projectList={projectList}
        AddNewProject={setProjectList}
        currentStep={props.currentStep}
        dragEnabled={props.dragEnabled}
      />
    </div>
  );
};

export default ProjectDetails;
