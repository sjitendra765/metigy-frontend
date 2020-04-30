import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles/";

//FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTv,
	faMinusCircle,
	faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

//MUI Imports
import {
	Button,
	Card,
	Grid,
	InputBase,
	Paper,
	Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	card: {
		boxSizing: "border-box",
		textAlign: "center",
		backgroundColor: "#263044",
		margin: "0 auto",
		padding: 20,
		alignItems: "center",
		width: "100%"
	},
	paper: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center"
	},
	input: {
		marginLeft: 8,
		flex: 1
	},
	site: {
		boxSizing: "border-box",
		margin: "5px auto 0 auto",
		padding: 5,
		backgroundColor: "#263044",
		color: "white",
		width: "100%",
		height: 40,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between"
	},
	button: {
		color: "grey",
		border: "grey",
		textTransform: "lowercase"
	}
}));

export default function Sites() {
	const [state, setState] = useState({
		newSite: "",
		sites: []
	});
	useEffect(() => {
		axios
			.get("http://localhost:8081/api/sites")
			.then(res => {
				console.log(res.data)
				setState({newSite:'',
						sites:res.data
				})
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	//Handle add-site input field
	const handleChange = input => event => {
		setState({...state,
			[input]: event.target.value
		});
	};

	const addSite = () => {
		if (state.newSite === "") {
			alert("Please Enter A Web Address");
		} else {
			axios.post("http://localhost:8081/api/sites",{url:state.newSite})
			.then(res=>{
				setState({
					sites: [...state.sites, res.data],
					newSite: ""
				});
			})
			
		}
	};

	const clearSite=(index,id)=> {
		axios.delete("http://localhost:8081/api/sites/"+id)
			.then(res=>{
				console.log(res)
			})
			.catch(err=>{
				console.log(err)
			})
		setState(({ sites }) => {
			const newSites = [...sites];
			newSites.splice(index, 1);
			return { sites: newSites };
		});
	}
	const classes = useStyles();
		return (
			<Grid container direction='column' justify='center' alignItems='center'>
				<div>
					<Typography variant='h5'>
						<FontAwesomeIcon color='#4fbd60' icon={faTv} /> Sites
					</Typography>
				</div>
				<br />
				<Card className={classes.card}>
					<Paper className={classes.paper}>
						<InputBase
							className={classes.input}
							placeholder='Add Site'
							value={state.newSite}
							onChange={handleChange("newSite")}
							inputProps={{ "aria-label": "add sites" }}
						/>
						<Button variant='contained' color='green' onClick={addSite}>
							<FontAwesomeIcon icon={faPlusCircle} />add
						</Button>
					</Paper>
				</Card>
				<Grid container direction='column' justify='center' alignItems='center'>
					{state.sites.map((site, index) => (
						<Card className={classes.site} key={index}>
							{site.url}
							<Button
								variant='outlined'
								className={classes.button}
								onClick={() => clearSite(index, site.id)}
							>
								<p>
									<FontAwesomeIcon color='grey' icon={faMinusCircle} /> clear{" "}
								</p>
							</Button>
						</Card>
					))}
				</Grid>
			</Grid>
		);
}


