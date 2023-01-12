import { useState, useEffect } from "react";
import AccordionItem from "./AccordionItem";
import { v4 as uuidv4 } from "uuid";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { setProjectDetails } from "../../../../Global_states/ResumeDetails";

const Accordion = ({ projectList, AddNewProject, currentStep,dragEnabled }) => {
  const [project_List, setprojectList] = useState(
    projectList != undefined || projectList.length == 0
      ? [
        {
          id: uuidv4(),
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
          projectMonth: ""
        },
      ]
      : projectList
  );

  const [clicked, setClicked] = useState("0");

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  useEffect(() => {
    setClicked(project_List.length - 1);
  }, [project_List.length]);

  const AddProject = () => {
    const project = {
      id: uuidv4(),
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
      projectMonth: ""
    };
    setprojectList([...project_List, project]);
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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    const reOrderedProjectDetails = reorder(
      project_List, result.source.index, result.destination.index
    );
    setprojectList(reOrderedProjectDetails);
    AddNewProject(reOrderedProjectDetails);
  }

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
      {
        dragEnabled ? (
          <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list-container">
            {(provided) => (
              <ul className="accordion list-container" style={{}} {...provided.droppableProps} ref={provided.innerRef}>
                {project_List.map((faq, index) => (
                  <Draggable key={faq.id} draggableId={faq.id} index={index}>
                    {(provided) => (
                      <div className="item-container"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}>
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
                      </div>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        ) : (
          <ul className="accordion list-container" style={{}}>
             {project_List.map((faq, index) => (
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
             ))}
          </ul>
        )
      }

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
