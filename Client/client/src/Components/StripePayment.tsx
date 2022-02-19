import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout"

function StripePayment() {
    const onToken = (token:any) => {
        const body = {
            token,
            product:{
                price:15,
                name:"Test from client"
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
        }).then(res=>res.json().then(r=>console.log(r)))
    }

    return(
        <StripeCheckout
        token={onToken}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY || ""}
        name="VenDev"
        description="Candy bar 1"
        panelLabel="test"
        amount={1500}
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