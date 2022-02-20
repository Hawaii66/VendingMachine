import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout"
import { ISlot } from "../Interfaces/MachineInterface";
import { useNavigate } from "react-router-dom";
import { useQuery } from "./Utils/UseQuery";

interface Props{
    info:ISlot|null,
    setLoading:(state:boolean)=>void
}

function StripePayment({info,setLoading}:Props) {
    const navigate = useNavigate();
    const query = useQuery();

    const onToken = (token:any) => {
        if(info === null){return;}
        
        const machineID = query.get("id");
        if(machineID === null){return;}

        const body = {
            token,
            product:{
                price:info.cost,
                name:info.name
            },
            data:{
                machineID:machineID,
                slotIndex:info.index
            }
        }

        const serverUrl = process.env.REACT_APP_SERVER_URL;
        if(serverUrl === undefined){return;}

        fetch(`${serverUrl}/payment`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        }).then(res=>{
            if(res.status === 200){
                res.json().then(data=>{
                    navigate(`/success?id=${data.order.orderID}`);
                });
            }else{
                res.text().then(text=>{
                    navigate(`/error?code=${res.status}&text=${text}`)
                })
            }})

        setLoading(true);
    }

    if(info === null){
        return(
            <Button variant="danger">Error</Button>
        )
    }

    return(
        <StripeCheckout
        token={onToken}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY || ""}
        name={info.name}
        description={info.info}
        panelLabel={info.name}
        amount={info.cost * 100}
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