import React,{useState,useEffect} from 'react';
import { Button, Card } from 'react-bootstrap';
import { ICandy, ISlot } from '../../Interfaces/MachineInterface';
import StripePayment from "../StripePayment";

interface Props{
    slot:ISlot,
    candyID:string,
    candys:ICandy[],
    setLoading:(state:boolean)=>void
}

function CandyCard({slot,candyID,candys,setLoading}:Props) {
    const [candy,setCandy] = useState<ICandy|null>(null);

    useEffect(()=>{
        for(var i = 0; i < candys.length; i ++){
            if(candys[i].id === candyID){
                setCandy(candys[i]);
                break;
            }
        }
    });

    if(candy === null){
        return <p>Error</p>
    }

    return (
      <Card border="secondary" style={{width:"80%",margin:"auto",marginBottom:"5%"}}>
          <Card.Img src={candy.img} alt={candy.name}/>
          <Card.Body>
              <Card.Title>{candy.name}: {candy.price} kr</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{slot.amount > 0 ? `Bara ${slot.amount} st kvar` : "Slut"}</Card.Subtitle>
              <Card.Text style={{textAlign:"center"}}>
                  {candy.info}
              </Card.Text>
          </Card.Body>
          <Card.Footer style={{display:"flex",justifyContent:"center"}}>
              {slot.amount > 0 ? 
                <div>
                    <StripePayment candy={candy} slot={slot} setLoading={setLoading}/>
                </div>
                :
                <Button disabled variant="danger">Slut</Button>  
            }
              
          </Card.Footer>
      </Card>
  )
}

export default CandyCard