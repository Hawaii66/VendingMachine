import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { IMachine } from '../../Interfaces/MachineInterface';
import Loading from '../Utils/Loading';
import { useQuery } from '../Utils/UseQuery';
import CandyCard from './CandyCard';
import Map from "../Map/Map"
import { Link } from 'react-router-dom';

function Machine() {
    const [machine,setMachine] = useState<IMachine|null>(null);
    const [loading,setLoading] = useState(false);

    const query = useQuery();

    const id = query.get("id");

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/machines/get/${id}`,{
            method:"GET"
        }).then(res=>res.json().then(defMachine=>setMachine(defMachine)))
    },[id])

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
            </Row>
            <Row style={{width:"80%",margin:"auto"}} className="justify-content-md-center">
                <Col>
                    <h5>{machine.location.name}</h5>
                </Col>
                <Col xs={7}>
                    <Button variant="info" style={{marginRight:"0.5rem",marginBottom:"1rem"}}>
                        <AnchorLink href="#karta">
                            Karta
                        </AnchorLink>
                    </Button>
                    <Button variant="info" style={{marginBottom:"1rem"}}>
                        <Link to="/">
                            Tillbaka
                        </Link>
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
                <Map single={true} locations={[machine.location]}/>
            </div>
        </div>
    )
}

export default Machine