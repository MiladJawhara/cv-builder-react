import React from 'react'
import { Button, Modal } from 'react-bootstrap';


export interface SettingsDialogProps {
    id: string,
    title: string,
    show: boolean,
    onClose: () => void
}


const SettingsDialog: React.FC<SettingsDialogProps> = (props) => {


    return (
        <>
            <Modal show={props.show} onHide={props.onClose}>
                <Modal.Header>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SettingsDialog;