import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { ISlot } from '../../Interfaces/MachineInterface';
import StripePayment from "../StripePayment";

interface Props{
    slot:ISlot,
    setLoading:(state:boolean)=>void
}

function CandyCard({slot,setLoading}:Props) {

    return (
      <Card border="secondary" style={{width:"80%",margin:"auto",marginBottom:"5%"}}>
          <Card.Img src={slot.thumbnail.url} alt={slot.thumbnail.alt}/>
          <Card.Body>
              <Card.Title>{slot.name}: {slot.cost} kr</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{slot.amount > 0 ? `Bara ${slot.amount} st kvar` : "Slut"}</Card.Subtitle>
              <Card.Text style={{textAlign:"center"}}>
                  {slot.info}
              </Card.Text>
          </Card.Body>
          <Card.Footer style={{display:"flex",justifyContent:"center"}}>
              {slot.amount > 0 ? 
                <div>
                    <StripePayment info={slot} setLoading={setLoading}/>
                </div>
                :
                <Button disabled variant="danger">Slut</Button>  
            }
              
          </Card.Footer>
      </Card>
  )
}

export default CandyCard