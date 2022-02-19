import React, { useEffect, useState } from 'react'
import "./StatusPage.css"
import SuccessSVGComponent from './SuccessSVGComponent';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '../Utils/UseQuery';
import { IOrderPublic } from '../../Interfaces/Order';
import SuccessCard from './SuccessCard';
import { IMachine } from '../../Interfaces/MachineInterface';
import Loading from '../Utils/Loading';
import SuccessCardLoading from './SuccessCardLoading';
import ErrorModal from './ErrorModal';

function Success() {
    const [error,setError] = useState("");
    const [order,setOrder] = useState<IOrderPublic|null>(null);
    const [machine, setMachine] = useState<IMachine|null>(null);
    const [loading,setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate()
    const query = useQuery();
    const purchaseID = query.get("id");
    
    const home = () => {
        navigate("/");
    }

    useEffect(()=>{
        const GetOrder = async () => {        
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/orders/${purchaseID}`,{
                method:"GET"
            });
            
            if(response.status === 200)
            {
                const data = await response.json();
                const machine = await fetch(`${process.env.REACT_APP_SERVER_URL}/machines/get/${data.machineID}`,{
                    method:"GET"
                }).then(res=>res.json());
                setMachine(machine);
                setOrder(data);
            }else{
                setError(await response.text());
            }

            setLoading(false);
        }

        GetOrder();
    },[purchaseID]);

    return (
        <div className="Success" >
            <div className="svgParent">
                <SuccessSVGComponent/>
            </div>
            <h1 style={{color:"#05c46b"}}>Köp genomfört!</h1>
            {loading && <SuccessCardLoading/>}
            {(loading === true || order === null || machine === null) ? <></> : <SuccessCard machine={machine} order={order}/>}
            <div style={{display:"flex",alignItems:"center"}}>
                <Button style={{margin:"auto",marginTop:"15%",marginBottom:"4rem"}} onClick={()=>home()}>Fortsätt handla</Button>
            </div>
            <Button onClick={()=>setShowModal(true)} className="ErrorButton" variant="danger">Funkar inte?</Button>

            <ErrorModal show={showModal} setShow={(state)=>setShowModal(state)}/>
        </div>
    )
}

export default Success