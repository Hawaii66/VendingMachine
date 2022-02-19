import React from 'react'
import { Card } from 'react-bootstrap'
import { IMachine } from '../../Interfaces/MachineInterface'
import { IOrderPublic } from '../../Interfaces/Order'

interface Props
{
    order:IOrderPublic,
    machine:IMachine
}

function SuccessCard({order,machine}:Props) {
    return (
        <Card style={{margin:"auto",width:"80%"}}>
            <Card.Body>
                <Card.Title style={{textAlign:"center"}}>{order.name}</Card.Title>
                <Card.Subtitle style={{textAlign:"center"}}>{order.cost} kr</Card.Subtitle>
                <Card.Text style={{textAlign:"center"}}>{order.info}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Text><b>Maskin:</b> {machine.name}</Card.Text>
                <Card.Text><b>Plats:</b> {machine.location.name}</Card.Text>
                <Card.Text><b>Status:</b> <div style={{color:"#05c46b"}}>Skickar ut godis ...</div></Card.Text>
            </Card.Footer>
        </Card>
    )
}

export default SuccessCard