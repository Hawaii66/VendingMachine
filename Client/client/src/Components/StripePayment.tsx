import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout"
import { ICandy, ISlot } from "../Interfaces/MachineInterface";
import { useNavigate } from "react-router-dom";
import { useQuery } from "./Utils/UseQuery";

interface Props{
    slot:ISlot|null,
    candy:ICandy|null,
    setLoading:(state:boolean)=>void
}

function StripePayment({slot,candy,setLoading}:Props) {
    const navigate = useNavigate();
    const query = useQuery();

    const onToken = (token:any) => {
        if(slot === null || candy === null){return;}
        
        const machineID = query.get("id");
        if(machineID === null){return;}

        const body = {
            token,
            data:{
                machineID:machineID,
                slotID:slot.id
            }
        }

        const serverUrl = process.env.REACT_APP_SERVER_URL;
        if(serverUrl === undefined){return;}

        fetch(`${serverUrl}/v2/payment/stripe`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        }).then(res=>{
            if(res.status === 200){
                res.json().then(data=>{
                    navigate(`/success?id=${data.order.id}`);
                });
            }else{
                res.text().then(text=>{
                    navigate(`/error?code=${res.status}&text=${text}`)
                })
            }})

        setLoading(true);
    }

    if(slot === null || candy === null){
        return(
            <Button variant="danger">Error</Button>
        )
    }

    return(
        <StripeCheckout
        token={onToken}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY || ""}
        name={candy.name}
        description={candy.info}
        panelLabel={candy.name}
        amount={candy.price * 100}
        currency="SEK"
        locale="sv"
        allowRememberMe
      >
          <Button variant="success">
              Köp
          </Button>
      </StripeCheckout>
    )
}

export default StripePayment