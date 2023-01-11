import React from "react";
import { Steps } from "antd";

const description = "This is a description.";

interface StepsPageProps {
  currentStep: any;
  handleStepsChange: any;
}

const StepComponent: React.FC<StepsPageProps> = (props) => {
  const { Step } = Steps;
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Steps
          direction="vertical"
          current={props.currentStep}
          onChange={props.handleStepsChange}
          percent={60}
          style={{ height: "50vh" }}
          items={[
            { title: "Personal Details" },
            {
              title: "Education",
            },
            {
              title: "Project Experience",
            },
            {
              title: "Download Resume",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default StepComponent;
