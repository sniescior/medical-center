import React, { useEffect, useState } from "react";
import { getParticipants, getProjectDetails, getParticipantsCount } from "../../database/projectsQuery";
import ErrorPage from "../utility/ErrorPage";
import LoaderPage from "../utility/LoaderPage";
import ProjectModal from "./ProjectModal";
import ParticipantModal from "./ParticipantModal";
import { useParams } from "react-router-dom";
import TabsHeader from "../utility/TabsHeader";
import Patients from "../patients/Patients";

const tabs = [
    {
        id: 0,
        title: 'Uczestnicy',
        icon: 'bi bi-people',
    },
    {
        id: 1,
        title: 'Dodawanie pacjenów',
        icon: 'bi bi-person-plus',
    },
    {
        id: 2,
        title: 'Badania',
        icon: 'bi bi-activity',
    },
];

function ParticipantsTab(props) {
    const headerData = [{
        title: 'Zgoda',
        placeholder: '',
        key: 'id',
        sort: false
    }];
    
    const { projectID, active, setLoader, setModalOpened, setModalData, setError } = props;

    const fetchParticipants = (searchParams, setPatients) => {
        searchParams.append('projectID', projectID);
        getParticipants(projectID, searchParams, setPatients, setLoader, setError);
    }
    
    const countAction = (searchParams, setParticipantsCount) => {
        searchParams.append('projectID', projectID);
        getParticipantsCount(searchParams, setParticipantsCount, setError);
    }

    const sayHello = (element) => {
        setModalData(element);
        setModalOpened(true);
    }

    return (
        <div className={active === 0 ? "tab-wrapper active" : "tab-wrapper"}>
            <h2>Pacjenci zarejestrowani do udziału w projekcie</h2>
            <Patients 
                headerData={headerData}
                refreshAction={fetchParticipants}
                countAction={countAction}
                participants={true}

                onClickAction={sayHello}
            />
        </div>
    );
}

function PatientsTab(props) {
    const { active } = props;
    return (
        <div className={active === 1 ? "tab-wrapper active" : "tab-wrapper"}>
            <h2>Pacjenci</h2>
        </div>
    );
}

function TestsTab(props) {
    const { active } = props;
    return (
        <div className={active === 2 ? "tab-wrapper active" : "tab-wrapper"}>
            <h2>Testy</h2>
        </div>
    );
}

export default function ProjectDetail(props) {

    const params = useParams();
    
    const [activeTab, setActiveTab] = useState(0);

    const [loader, setLoader] = useState(true);
    const [error, setError] = useState({});

    const [modalOpened, setModalOpened] = useState(false);
    const defaultModalData = { id: '', name: '' }
    const [modalData, setModalData] = useState(defaultModalData);
    
    const [participantModalOpened, setParticipantModalOpened] = useState(false);
    const defaultParticiantModalData = { patient_id: '', first_name: '', last_name: '', consent: '', project_id: '' }
    const [participantModalData, setParticipantModalData] = useState(defaultModalData);
    
    const [project, setProject] = useState({});
    const [patients, setPatients] = useState([]);

    const [order, setOrder] = useState('ASC');
    const [orderByColumn, setOrderByColumn] = useState('id');

    const queryParams = new URLSearchParams({
        id: params.projectID,
    });
    
    const refreshPage = () => {
        getProjectDetails(params.projectID, setProject, setLoader, setError)
        getParticipants(params.projectID, queryParams, setPatients, setLoader, setError);
    }

    const openModal = () => {
        setModalData({ id: project.id, name: project.name });
        setModalOpened(true);
    };

    useEffect(() => {
        refreshPage();
    }, []);

    if(error.statusCode) {
        return ( <ErrorPage error={error} /> );
    } else {
        return (
            <div className="content">
                <LoaderPage loader={loader} />
                <div className="content-header">
                    <h2>{project.name}</h2>
                    <button className="action-button" onClick={() => {
                        openModal();
                    }}>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </button>
                </div>

                <TabsHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                <ParticipantsTab 
                    projectID={params.projectID}
                    active={activeTab}
                    setLoader={setLoader}
                    setError={setError}
                    setModalData={setParticipantModalData}
                    setModalOpened={setParticipantModalOpened} />

                <PatientsTab active={activeTab} />
                <TestsTab active={activeTab} />

                <ParticipantModal refreshPage={refreshPage} modalOpened={participantModalOpened} setModalOpened={setParticipantModalOpened} modalData={participantModalData} setModalData={setParticipantModalData} setToastMessage={props.setToastMessage} />
                <ProjectModal refreshPage={refreshPage} setProjectID={props.setProjectID} modalOpened={modalOpened} setModalOpened={setModalOpened} modalData={modalData} setModalData={setModalData} setToastMessage={props.setToastMessage} />
            </div>
        );
    }
};
