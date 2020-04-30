import React from "react";
import "./App.css";

//Components
import Keywords from "./components/Keywords";
import Sites from "./components/Sites";
import Settings from "./components/Settings";

// MUI Imports
import Grid from "@material-ui/core/Grid";

function App() {
	return (
		<Grid container spacing={4} className='container'>
			<Grid item xs={3}>
				<Keywords />
			</Grid>
			<Grid item xs={3}>
				<Sites />
			</Grid>
			<Grid item xs={6}>
				<Settings />
			</Grid>
		</Grid>
	);
}

export default App;
