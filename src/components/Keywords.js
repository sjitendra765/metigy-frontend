import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles/";
//FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTag,
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
	word: {
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

export default function Keywords() {
	const [state, setState] = useState({
		newKeyword: "",
		keywords: []
	});
	useEffect(() => {
		axios
			.get("http://localhost:8081/api/keywords")
			.then(res => {
				console.log(res.data)
				setState({newKeyword:'',
						keywords:res.data
				})
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	//Keywords input field
	const handleChange = input => event => {
		setState({...state,
			newKeyword: event.target.value
		});
	};

	const addKeyWord = () => {
		if (state.newKeyword === "") {
			alert("Please Enter A New Keyword");
		} else {
			axios.post("http://localhost:8081/api/keywords",{word:state.newKeyword})
			.then(res=>{
				setState({
					keywords: [...state.keywords, res.data],
					newKeyword: ""
				});
			})
			
		}
	};

	const clearKeyword = (index,id)=> {
		axios.delete("http://localhost:8081/api/keywords/"+id)
			.then(res=>{
				console.log(res)
			})
			.catch(err=>{
				console.log(err)
			})
		setState(({ keywords }) => {
			const newKeywords = [...keywords];
			newKeywords.splice(index, 1);
			return { keywords: newKeywords };
		});
	}
	const classes = useStyles();
		return (
			<Grid container direction='column' justify='center' alignItems='center'>
				<div>
					<Typography variant='h5'>
						<FontAwesomeIcon color='#387de5' icon={faTag} /> KeyWords
					</Typography>
				</div>
				<br />
				<Card className={classes.card}>
					<Paper className={classes.paper}>
						<InputBase
							className={classes.input}
							placeholder='Add Keyword'
							value={state.newKeyword}
							onChange={handleChange("newKeyword")}
							inputProps={{ "aria-label": "add keywords" }}
						/>
						<Button
							variant='contained'
							color='primary'
							onClick={addKeyWord}
						>
							<FontAwesomeIcon icon={faPlusCircle} />add
						</Button>
					</Paper>
				</Card>
				<Grid container direction='column' justify='center' alignItems='center'>
					{state.keywords.map((word, index) => (
						<Card className={classes.word} key={index}>
							{word.word}
							<Button
								variant='outlined'
								className={classes.button}
								onClick={() => clearKeyword(index,word.id)}
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

