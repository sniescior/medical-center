import React, { useState } from "react"
import ErrorPage from "../components/utility/ErrorPage";
import LoaderPage from "../components/utility/LoaderPage";
import ExaminationModal from "../components/examinations/ExaminationModal";
import Examinations from "../components/examinations/Examinations";
import { getExaminations, getExaminationsCount } from "../database/examinationsQuery";

export default function ExaminationsView(props) {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({});

    const defaultModalData = { examination_id: '', examination_title: '' }
    const [modalData, setModalData] = useState( defaultModalData );
    const [modalOpened, setModalOpened] = useState(false);

    const openModal = (element) => {
        setModalData(element);
        setModalOpened(true);
    }

    const refreshExaminations = (searchParams, setExaminations) => { getExaminations(searchParams, setExaminations, setLoader, setError); }
    const countAction = (searchParams, setExaminationsCount) => { getExaminationsCount(searchParams, setExaminationsCount, setLoader, setError); }

    if(error.statusCode) {
        return ( <ErrorPage error={error} /> );
    } else {
        return (
            <div className="content">
                <LoaderPage loader={loader} />
                <div className="content-header">
                    <h2>Badania</h2>
                    <button 
                        className="button-secondary" 
                        onClick={() => { 
                            setModalData(defaultModalData);
                            setModalOpened(true);
                        }}>
                        Dodaj badanie
                    </button>
                </div>

                <Examinations
                    countAction={countAction}
                    onClickAction={openModal}
                    refreshAction={refreshExaminations} />

                <ExaminationModal setModalOpened={setModalOpened} modalOpened={modalOpened} />
            </div>
        );
    }
}