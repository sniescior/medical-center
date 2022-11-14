import React, { useEffect, useState } from "react";
import { getParticipants, getProjectDetails, getParticipantsCount, addPatientToProject, getNotParticipants, getNotParticipantsCount } from "../../database/projectsQuery";
import ErrorPage from "../utility/ErrorPage";
import LoaderPage from "../utility/LoaderPage";
import ProjectModal from "./ProjectModal";
import { useNavigate, useParams } from "react-router-dom";
import TabsHeader from "../utility/TabsHeader";
import Patients from "../patients/Patients";
import AlertModal from "../utility/AlertModal";
import { getArrayQuery } from "../../database/ordersQuery";

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
    }
];

function ParticipantsTab(props) {
    const navigate = useNavigate();

    const headerData = [{
        title: 'Zgoda',
        placeholder: '',
        key: 'id',
        sort: false
    }];
    
    const { projectID, active, setLoader, setError } = props;

    const [tableLoader, setTableLoader] = useState(true);

    const fetchParticipants = (searchParams) => {
        return new Promise((resolve, reject) => {
            searchParams.append('projectID', projectID);
            getArrayQuery('/api/projects/get-participants?', searchParams, setError, setTableLoader)
            .then((data) => {
                searchParams.delete('projectID');
                resolve(data);
            });
        });
    }
    
    const countAction = (searchParams, setParticipantsCount) => {
        searchParams.append('projectID', projectID);
        getParticipantsCount(searchParams, setParticipantsCount, setError);
        searchParams.delete('projectID');
    }

    const openParticipantDetail = (element) => { navigate(`/projects/${projectID}/participant/${element.id}`); }

    return (
        <div className={active === 0 ? "tab-wrapper active" : "tab-wrapper"}>
            <h2>Pacjenci zarejestrowani do udziału w projekcie</h2>
            <Patients 
                tableLoader={tableLoader}
                headerData={headerData}
                refreshAction={fetchParticipants}
                countAction={countAction}
                participants={true}

                onClickAction={openParticipantDetail}
            />
        </div>
    );
}

function PatientsTab(props) {
    const { projectID, active, setLoader, setModalOpened, setModalData, setError } = props;

    const [tableLoader, setTableLoader] = useState(true);

    const fetchParticipants = (searchParams, setPatients) => {

        return new Promise((resolve, reject) => {
            searchParams.append('projectID', projectID);
            getArrayQuery('/api/projects/get-not-participants?', searchParams, setError, setTableLoader)
            .then((data) => {
                searchParams.delete('projectID');
                resolve(data);
            });
        });
    }
    
    const countAction = (searchParams, setParticipantsCount) => {
        searchParams.append('projectID', projectID);
        getNotParticipantsCount(searchParams, setParticipantsCount, setError);
        searchParams.delete('projectID');
    }

    const openModal = (element) => {
        setModalData({ patient_id: element.id, project_id: projectID, title: `Dodać pacjenta do projektu?`, subtitle: `${element.first_name} ${element.last_name}` });
        setModalOpened(true);
    }

    return (
        <div className={active === 1 ? "tab-wrapper active" : "tab-wrapper"}>
            <h2>Dodawanie pacjentów do projektu</h2>
            <Patients
                refreshAction={fetchParticipants}
                countAction={countAction}

                onClickAction={openModal}
            />
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

    const [candidateModalOpened, setCandidateModalOpened] = useState(false);
    const [candidateModalData, setCandidateModalData] = useState({ title: '', project_id: '', patient_id: '' });
    const [candidateModalLoader, setCandidateModalLoader] = useState(false);
    
    const [project, setProject] = useState({});
    const [patients, setPatients] = useState([]);

    const [order, setOrder] = useState('ASC');
    const [orderByColumn, setOrderByColumn] = useState('id');

    const [refreshState, setRefreshState] = useState(false);

    const queryParams = new URLSearchParams({
        id: params.projectID,
    });

    const openModal = () => {
        setModalData({ id: project.id, name: project.name });
        setModalOpened(true);
    };
    
    useEffect(() => {
        setModalData({ id: params.projectID, name: project.name });
    }, [refreshState]);

    useEffect(() => {
        getProjectDetails(params.projectID, setProject, setLoader, setError);
    }, [refreshState]);

    const addPatient = () => {
        addPatientToProject(candidateModalData, setCandidateModalLoader, props.setToastMessage);
        setActiveTab(0);
        setCandidateModalOpened(false);
    }

    if(error.statusCode) {
        return ( <ErrorPage error={error} /> );
    } else {
        return (
            <div className="content">
                <LoaderPage loader={loader} />
                <div className="content-header">
                    <h2>{project.name}</h2>
                    <button className="action-button" onClick={() => { openModal(); }}>
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
                    setError={setError} />

                <PatientsTab
                    projectID={params.projectID}
                    active={activeTab}
                    setLoader={setLoader}
                    setError={setError}
                    setModalData={setCandidateModalData}
                    setModalOpened={setCandidateModalOpened}
                    setModalLodader={setCandidateModalLoader} />

                <ProjectModal
                    refreshState={refreshState}
                    setRefreshState={setRefreshState}
                    modalOpened={modalOpened}
                    setModalOpened={setModalOpened}
                    modalData={modalData}
                    setModalData={setModalData}
                    setToastMessage={props.setToastMessage} />

                <AlertModal
                    loader={candidateModalLoader}
                    modalOpened={candidateModalOpened}
                    setModalOpened={setCandidateModalOpened}
                    action={addPatient}
                    modalData={candidateModalData} />
            </div>
        );
    }
};
