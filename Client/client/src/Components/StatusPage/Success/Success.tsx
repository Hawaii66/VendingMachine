import React, { useEffect, useState } from 'react'
import "../StatusPage.css"
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../Utils/UseQuery';
import { IOrder } from '../../../Interfaces/Order';
import { IMachine, ICandy } from '../../../Interfaces/MachineInterface';
import SuccessCard from './SuccessCard';
import SuccessCardLoading from './SuccessCardLoading';
import ErrorModal from "./ErrorModal"
import SuccessSVGComponent from "./SuccessSVGComponent"
import SuccessError from './SuccessError';

function Success() {
    const [error,setError] = useState<{code:number,text:string}|null>(null);
    const [order,setOrder] = useState<IOrder|null>(null);
    const [machine, setMachine] = useState<IMachine|null>(null);
    const [candys, setCandys] = useState<ICandy[]|null>(null);
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
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/v2/orders/get/${purchaseID}`,{
                method:"GET"
            });
            
            if(response.status === 200)
            {
                const data = await response.json();
                const machine = await fetch(`${process.env.REACT_APP_SERVER_URL}/v2/machines/get/${data.machineID}`,{
                    method:"GET"
                }).then(res=>res.json());
                setMachine(machine.machine);
                setCandys(machine.candys);
                setOrder(data);
            }else{
                setError({text:await response.text(),code:response.status});
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
            {error !== null && <SuccessError code={error.code} text={error.text}/>}
            {(loading === true || order === null || machine === null) ? <></> : <SuccessCard machine={machine} candys={candys} order={order}/>}
            <div style={{display:"flex",alignItems:"center"}}>
                <Button style={{margin:"auto",marginTop:"15%",marginBottom:"4rem"}} onClick={()=>home()}>Fortsätt handla</Button>
            </div>
            <Button onClick={()=>setShowModal(true)} className="ErrorButton" variant="danger">Funkar inte?</Button>

            <ErrorModal show={showModal} setShow={(state)=>setShowModal(state)}/>
        </div>
    )
}

export default Success