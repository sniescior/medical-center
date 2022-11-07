import React, { useEffect, useState } from "react";
import { getParticipants, getProjectDetails } from "../../database/projectsQuery";
import { fetchAllPatients } from "../../database/patientsQuery";
import ErrorPage from "../utility/ErrorPage";
import LoaderPage from "../utility/LoaderPage";
import PatientsTable from "../patients/PatientsTable";
import ProjectModal from "./ProjectModal";
import { useParams } from "react-router-dom";
import TabsHeader from "../utility/TabsHeader";

const headerData = [
    {
        key: 'id',
        title: 'ID',
        class: ''
    },
    {
        key: 'name',
        title: 'Imię',
        class: ''
    },
    {
        key: 'last_name',
        title: 'Nazwisko',
        class: ''
    },
    {
        key: 'consent',
        title: 'Zgoda',
        class: 'short'
    },
    {
        key: 'more_actions',
        title: '',
        class: 'short'
    },
];

const tabs = [
    {
        id: 0,
        title: 'Uczestnicy',
        icon: 'bi bi-people',
    },
    {
        id: 1,
        title: 'Pacjenci',
        icon: 'bi bi-person-plus',
    },
    {
        id: 2,
        title: 'Badania',
        icon: 'bi bi-activity',
    },
];

function ParticipantsTab(props) {
    const { active, consentOnly, setConsentOnly, setLoader, setToastMessage, refreshPage, order, setOrder, orderByColumn, setOrderByColumn, items, headerData } = props;
    return (
        <div className={active == 0 ? "tab-wrapper active" : "tab-wrapper"}>
            <div className="button-wrapper">
                <button
                    onClick={() => { setConsentOnly(!consentOnly); console.log(consentOnly); }} 
                    className={consentOnly ? "button-filter active" : "button-filter"}>
                    <i className="bi bi-check-circle"></i>
                    Tylko ze zgodą
                </button>
            </div>

            <PatientsTable setLoader={setLoader} setToastMessage={setToastMessage} refreshPage={refreshPage} noSort={true} participants={true} order={order} setOrder={setOrder} orderByColumn={orderByColumn} setOrderByColumn={setOrderByColumn} items={items} headerData={headerData} />

        </div>
    );
}

function PatientsTab(props) {
    const { active } = props;
    return (
        <div className={active == 1 ? "tab-wrapper active" : "tab-wrapper"}>
            <h2>Pacjenci</h2>
        </div>
    );
}

function TestsTab(props) {
    const { active } = props;
    return (
        <div className={active == 2 ? "tab-wrapper active" : "tab-wrapper"}>
            <h2>Testy</h2>
        </div>
    );
}

export default function ProjectDetail(props) {

    const params = useParams();
    
    const [activeTab, setActiveTab] = useState(0);

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({});

    const [modalOpened, setModalOpened] = useState(false);
    
    const [project, setProject] = useState({});
    const [patients, setPatients] = useState([]);

    const [order, setOrder] = useState('ASC');
    const [orderByColumn, setOrderByColumn] = useState('id');

    // filtering states
    const [consentOnly, setConsentOnly] = useState(false);

    const defaultModalData = { id: '', name: '' }
    const [modalData, setModalData] = useState(defaultModalData);

    const queryParams = new URLSearchParams({
        id: params.projectID,
        consentOnly: consentOnly ? 1 : 0
    });
    
    const refreshPage = () => {
        getProjectDetails(params.projectID, setProject, setLoader, setError)
        getParticipants(params.projectID, queryParams, setPatients, setLoader, setError);
    }

    useEffect(() => {
        refreshPage();
    }, [consentOnly]);

    const openModal = () => {
        setModalData({ id: project.id, name: project.name });
        setModalOpened(true);
    };

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
                {/* <div className="content-info"> */}
                {/* </div> */}

                <TabsHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                <ParticipantsTab
                    active={activeTab}
                    setToastMessage={props.setToastMessage} 
                    setConsentOnly={setConsentOnly} 
                    consentOnly={consentOnly} 
                    setLoader={setLoader} 
                    refreshPage={refreshPage} 
                    noSort={true} 
                    participants={true} 
                    order={order} 
                    setOrder={setOrder} 
                    orderByColumn={orderByColumn} 
                    setOrderByColumn={setOrderByColumn} 
                    items={patients}
                    headerData={headerData} />

                <PatientsTab active={activeTab} />
                <TestsTab active={activeTab} />

                <ProjectModal refreshPage={refreshPage} setProjectID={props.setProjectID} modalOpened={modalOpened} setModalOpened={setModalOpened} modalData={modalData} setModalData={setModalData} setToastMessage={props.setToastMessage} />
            </div>
        );
    }
};
