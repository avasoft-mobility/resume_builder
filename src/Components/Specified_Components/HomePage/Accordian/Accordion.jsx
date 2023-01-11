import { useState, useEffect } from "react";
import AccordionItem from "./AccordionItem";
import { v4 as uuidv4 } from "uuid";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useErrorSnackbar from "../../../../Hooks/useErrorSnackbar.hook";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

const Accordion = ({
  projectList,
  AddNewProject,
  currentStep,
  dragEnabled,
}) => {
  const showErrorSnackBar = useErrorSnackbar();
  const [project_List, setprojectList] = useState(
    projectList != undefined || projectList.length == 0
      ? [
          {
            id: 0,
            projectName: "",
            industry: "",
            platform: "",
            role: "",
            hasadminpanel: false,
            apFrontEnd: "",
            apBackEnd: "",
            frontEnd: "",
            backEnd: "",
            database: "",
            versionControl: "",
            startDate: "",
            endDate: "",
            description: "",
            projectTimeline: "",
            projectYear: "",
            projectMonth: "",
          },
        ]
      : projectList
  );

  
  useEffect(() => {
    if(dragEnabled == true){
      setClicked("");
    }
  }, [dragEnabled])
  

  const [clicked, setClicked] = useState("0");

  const handleToggle = (index) => {
    if(dragEnabled != true){
      if (clicked === index) {
        return setClicked("0");
      }
      setClicked(index);
    }
  };

  useEffect(() => {
    setClicked(project_List.length - 1);
  }, [project_List.length]);

  const AddProject = () => {
    let Projects = project_List[project_List.length - 1];

    if (Projects.projectYear.length > 0 || Projects.projectMonth.length > 0) {
      const project = {
        id: project_List.length,
        projectName: "",
        industry: "",
        platform: "",
        role: "",
        hasadminpanel: false,
        apFrontEnd: "",
        apBackEnd: "",
        frontEnd: "",
        backEnd: "",
        database: "",
        versionControl: "",
        startDate: "",
        endDate: "",
        description: "",
        projectTimeline: "",
        projectYear: "",
        projectMonth: "",
      };
      setprojectList([...project_List, project]);
    } else {
      showErrorSnackBar("Please enter valid project details...");
    }
  };

  const DeleteProject = (id) => {
    if (project_List.length === 1) {
      return;
    }
    const currentProjects = project_List.filter((value) => value.id !== id);
    setprojectList(currentProjects);
    AddNewProject(currentProjects);
  };

  const updateValueChage = (index, current_Project) => {
    let projects = [...project_List];
    projects[index] = current_Project;
    setprojectList(projects);
    AddNewProject(projects);
  };

  const handleRLDDChange = (newItems) => {
    console.log("Ordered List", newItems);
    setprojectList(newItems);
    AddNewProject(newItems);
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "10px 10px 10px 30px",
        height: "65vh",
        overflow: "scroll",
      }}
      className={"hide_scroll"}
    >
      <ul className="accordion" style={{}}>
        {dragEnabled ? (
          <RLDD
            items={project_List}
            itemRenderer={(faq, index) => {
              return (
                <AccordionItem
                  onToggle={() => handleToggle(index)}
                  active={clicked === index}
                  key={index}
                  dragEnabled={dragEnabled}
                  allProjects={project_List}
                  projectList={faq}
                  index={index}
                  DeleteProject={DeleteProject}
                  updateValueChage={updateValueChage}
                />
              );
            }}
            onChange={handleRLDDChange}
          />
        ) : (
          project_List.map((faq, index) => (
            <AccordionItem
              onToggle={() => handleToggle(index)}
              active={clicked === index}
              key={index}
              dragEnabled={dragEnabled}
              allProjects ={project_List}
              projectList={faq}
              index={index}
              DeleteProject={DeleteProject}
              updateValueChage={updateValueChage}
            />
          ))
        )
        
        }

        {/* {project_List.map((faq, index) => (
          <AccordionItem
            onToggle={() => handleToggle(index)}
            active={clicked === index}
            key={index}
            allProjects ={project_List}
            projectList={faq}
            index={index}
            DeleteProject={DeleteProject}
            updateValueChage={updateValueChage}
          />
        ))} */}
      </ul>
      <div style={{ display: dragEnabled ? "none" : "flex", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: "Urbanist",
            color: "#2377C3",
            padding: "10px 30px",
            borderRadius: "10px",
            marginTop: "10px",
            border: "0.1rem solid #2377C3",
            fontWeight: "700",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={AddProject}
        >
          + Add Project
        </div>
      </div>
    </div>
  );
};

export default Accordion;
