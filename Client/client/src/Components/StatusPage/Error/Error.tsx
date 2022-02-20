import React from 'react'
import "../StatusPage.css"
import { Alert, Button } from 'react-bootstrap'
import { useQuery } from '../../Utils/UseQuery';
import ErrorSVGComponent from './ErrrorSVGComponent';
import { useNavigate } from 'react-router-dom';

function Error() {
	const query = useQuery();
	const code = query.get("code");
	const text = query.get("text");

	const navigate = useNavigate();

	const back = () => {
		navigate(-1);
	}

    return (
		<div className="Success">
			<div className="svgParent" style={{marginBottom:"3rem"}}>
				<ErrorSVGComponent/>
			</div>
			<Alert style={{width:"90%",margin:"auto",marginBottom:"1rem",textAlign:"center"}} variant="danger">
				<p style={{marginBottom:"0rem",fontSize:"1.5rem"}}>
					Din order misslyckades!
				</p>
				<p style={{marginBottom:"0.5rem",fontSize:"1rem"}}>
					Antagligen har du inte skrivit in ett korrekt kort eller så gick något fel på servern med vertifieringen
				</p>
				<p style={{marginBottom:"0.5rem",fontSize:"0.9rem"}}>
					Ditt kort ska inte ha blivit draget några pengar, om det har blivit det. Kontakta oss här: hawaiilive@outlook.com
				</p>
				<p style={{marginBottom:"0rem",fontSize:"0.8rem"}}>
					Status kod: {code}
					<br/>
					Fel meddelande: {text}
				</p>
			</Alert>
			<div style={{display:"flex",justifyContent:"center"}}>
				<Button onClick={()=>back()}>Tillbaka</Button>
			</div>
		</div>
    )
}

export default Error