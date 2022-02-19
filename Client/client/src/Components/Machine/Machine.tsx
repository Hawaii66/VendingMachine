import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { IMachine } from '../../Interfaces/MachineInterface';
import Loading from '../Utils/Loading';
import { useQuery } from '../Utils/UseQuery';
import CandyCard from './CandyCard';
import Map from "../Map"

function Machine() {
    const [machine,setMachine] = useState<IMachine|null>(null);

    const query = useQuery();

    const id = query.get("id");

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/machines/get/${id}`,{
            method:"GET"
        }).then(res=>res.json().then(defMachine=>setMachine(defMachine)))
    })

    if(machine === null){
        return(
            <Loading/>
        )
    }

    return (
        <div>
            <h1 style={{textAlign:"center"}}>{machine.name}</h1>
            <Map locations={[machine.location]}/>
            <Row lg={1}>
                <Col>
                    {machine.slots.map((slot,index)=>{
                        return(
                            <CandyCard slot={slot} key={index}/>
                        )
                    })}
                </Col>
            </Row>
        </div>
    )
}

export default Machine