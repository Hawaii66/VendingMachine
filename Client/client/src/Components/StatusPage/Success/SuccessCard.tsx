import React,{useState,useEffect} from 'react'
import { Card } from 'react-bootstrap'
import { ICandy, IMachine } from '../../../Interfaces/MachineInterface'
import { IOrder } from '../../../Interfaces/Order'

interface Props
{
    order:IOrder,
    machine:IMachine,
    candys:ICandy[]|null
}

function SuccessCard({order,machine,candys}:Props) {
    const [candy,setCandy] = useState<ICandy|null>(null);

    useEffect(()=>{
        if(candys === null){return;}

        console.log(order,candys);

        for(var i = 0; i < candys.length; i ++){
            if(candys[i].id === order.candyID){
                setCandy(candys[i]);
                console.log("Set");
                break;
            }
            console.log("FAIL");
        }
    },[candys,order,machine]);

    if(candy === null){return<></>}

    return (
        <Card style={{margin:"auto",width:"80%"}}>
            <Card.Body>
                <Card.Title style={{textAlign:"center"}}>{candy.name}</Card.Title>
                <Card.Subtitle style={{textAlign:"center"}}>{candy.price} kr</Card.Subtitle>
                <Card.Text style={{textAlign:"center"}}>{candy.info}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Text><b>Maskin:</b> {machine.name}</Card.Text>
                <Card.Text><b>Plats:</b> {machine.location.name}</Card.Text>
                <Card.Text><b>Status:</b> <span style={{color:"#05c46b"}}>Skickar ut godis ...</span></Card.Text>
            </Card.Footer>
        </Card>
    )
}

export default SuccessCard