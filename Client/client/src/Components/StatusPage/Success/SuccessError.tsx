import React from 'react'
import { Alert } from 'react-bootstrap'

interface Props
{
    text:string,
    code:number
}

function SuccessError({text,code}:Props) {
    return (
        <div>
            <Alert style={{width:"90%",margin:"auto",marginBottom:"1rem",textAlign:"center"}} variant="danger">
                <p style={{marginBottom:"0rem",fontSize:"0.9rem"}}>
                    Vi har problem med att visa din order!
                </p>
                <p style={{marginBottom:"0rem",fontSize:"0.9rem"}}>
                    OBS: Din order har fortfarande gått igenom. Förvänta dig en godis snart!
                </p>
                <p style={{marginBottom:"0rem",fontSize:"0.8rem"}}>
                    Status kod: {code}
                    <br/>
                    Fel meddelande: {text}
                </p>
            </Alert>
        </div>
    )
}

export default SuccessError