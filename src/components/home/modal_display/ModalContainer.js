import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../../features/modals/modalSlice';
import ReactDom from "react-dom";
//Components
import NewLeagueModal from "./NewLeagueModal";
import EditSettingsModal from './EditSettingsModal';



function ModalContainer() {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.modal)

    const close = () => {
        dispatch(closeModal());
    }

    if (status === "new-league") {
        return ReactDom.createPortal(
            <>  
                <div className="modal-overlay" onClick={close}></div>
                <box></box>
                <NewLeagueModal/>
            </>,
            document.getElementById("modal-portal")
        );

    } else if (status === "edit-settings") {
        return ReactDom.createPortal(
            <>  
                <div className="modal-overlay" onClick={close}></div>
                <EditSettingsModal />
                {/* <p>Settings</p> */}
            </>,
            document.getElementById("modal-portal")
        );

    } else {
        return null;
    }

}

export default ModalContainer;