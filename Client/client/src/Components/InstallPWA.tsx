import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";


const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false);
	const [promptInstall, setPromptInstall] = useState<any>(null);

	useEffect(() => {
		const handler = (e:any) => {
			e.preventDefault();
			setSupportsPWA(true);
			setPromptInstall(e);
		};
		window.addEventListener("beforeinstallprompt", handler);

		return () => window.removeEventListener("transitionend", handler);
	}, []);

  	const onClick = (evt:any) => {
    	evt.preventDefault();
    	if (!promptInstall) {
     	 	return;
    	}
    	promptInstall.prompt();
  	}

  	if (!supportsPWA) {
		return null;
  	}

  	return (
		<Button
			className="link-button"
			id="setup_button"
			aria-label="Install app"
			title="Install app"
			onClick={onClick}
		>
			Installera appen
		</Button>
  	);
};

export default InstallPWA;