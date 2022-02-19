import React from 'react'
import { Button, Modal } from 'react-bootstrap'

interface Props{
    show:boolean,
    setShow:(state:boolean)=>void
}

function ErrorModal({show,setShow}:Props) {
    return (
        <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={()=>setShow(false)}
        >
            <Modal.Header>
                <Modal.Title>
                    <b>Kommer det ingen godis?</b>
                </Modal.Title>        
            </Modal.Header>
            <Modal.Body>
                <p><b>Tänk på:</b></p>
                <ol>
                    <li>Maskinen kan i värsta fall ta upp till 2 minuter att svara på en beställning</li>
                    <li>Skynda på maskinen genom att trycka på den gröna knappen</li>
                    <li>Om godisen fastnat, testa att skaka maskinen eller knacka på rutan</li>
                    <li>Om inget händer kontakta oss nedan för mera information</li>
                </ol>
                <p>
                    <b>Kontakt:</b>
                    <br />
                    Email: hawaiilive@outlook.com
                    <br />
                    Telefon: 070 545 3110
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" onClick={()=>setShow(false)}>Stäng</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorModal