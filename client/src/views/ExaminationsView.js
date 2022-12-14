import React, { useState } from "react"
import ErrorPage from "../components/utility/ErrorPage";
import LoaderPage from "../components/utility/LoaderPage";
import ExaminationModal from "../components/examinations/ExaminationModal";
import Examinations from "../components/examinations/Examinations";
import { getArrayQuery, getItemsCount } from "../database/ordersQuery";

export default function ExaminationsView(props) {
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState({});

    const defaultModalData = { examination_id: '', examination_title: '' }
    const [modalData, setModalData] = useState( defaultModalData );
    const [modalOpened, setModalOpened] = useState(false);

    const [tableRefresh, setTableRefresh] = useState(false);

    const openModal = (element) => {
        setModalData({ examination_id: element.examination_id, examination_title: element.title, examination_description: element.description });
        setModalOpened(true);
    }

    const refreshExaminations = (searchParams, setExaminations) => { getArrayQuery('/api/examinations/get-examinations?', searchParams, setExaminations, setLoader, setError); }
    const countAction = (searchParams, setExaminationsCount) => { 
        getItemsCount('/api/examinations/count-examinations?', searchParams, setExaminationsCount, setError, setLoader)
    }

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
                    tableRefresh={tableRefresh}
                    setTableRefresh={setTableRefresh}
                    countAction={countAction}
                    onClickAction={openModal}
                    refreshAction={refreshExaminations} />

                <ExaminationModal
                    tableRefresh={tableRefresh}
                    setTableRefresh={setTableRefresh}
                    modalData={modalData}
                    setModalOpened={setModalOpened}
                    modalOpened={modalOpened}
                    setToastMessage={props.setToastMessage} />
            </div>
        );
    }
}