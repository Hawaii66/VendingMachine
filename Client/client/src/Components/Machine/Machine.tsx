import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { IMachine } from '../../Interfaces/MachineInterface';
import Loading from '../Utils/Loading';
import { useQuery } from '../Utils/UseQuery';
import CandyCard from './CandyCard';
import Map from "../Map/Map"

function Machine() {
    const [machine,setMachine] = useState<IMachine|null>(null);
    const [loading,setLoading] = useState(false);

    const query = useQuery();

    const id = query.get("id");

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/machines/get/${id}`,{
            method:"GET"
        }).then(res=>res.json().then(defMachine=>setMachine(defMachine)))
    },[])

    if(machine === null ||loading){
        return(
            <Loading/>
        )
    }

    return (
        <div style={{marginBottom:"1rem",marginTop:"1rem"}}>
            <Row style={{width:"80%",margin:"auto"}}>
                <Col>
                    <h1 style={{textAlign:"center"}}>{machine.name}</h1>
                </Col>
                <Col xs={3}>
                    <Button variant="info">
                        <AnchorLink href="#karta">
                            Karta
                        </AnchorLink>
                    </Button>
                </Col>
            </Row>
            <Row lg={1}>
                <Col>
                    {machine.slots.map((slot,index)=>{
                        return(
                            <CandyCard setLoading={setLoading} slot={slot} key={index}/>
                        )
                    })}
                </Col>
            </Row>
            <div id="karta">
                <Map locations={[machine.location]}/>
            </div>
        </div>
    )
}

export default Machine