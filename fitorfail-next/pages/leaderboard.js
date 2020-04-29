import Layout from "../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Badge,ListGroup, ListGroupItem, Button} from 'reactstrap';
import styled from "styled-components";

const MediaContainer = styled(Container)`
width: 100vw;
height: 100vh;
@media screen and (max-width: 50rem) {
	font-size: 3rem;
	margin-bottom: 200px;
}
`;

const BoardStyle = styled(Container)`
background-color: white;
border: 2px solid black;
background-color: rgba(255, 0, 0, 0.5);
@media screen and (max-width: 50rem) {
	font-size: 2.5rem;
}
`;

const RowStyle=styled(Row)`
background-color: colorGenerator;
border: 1px solid black;
margin: 2px;
border-radius: 30% 75% 75% 30% ;
background-color:#fd943f; 
@media screen and (max-width: 50rem) {
	font-size: 2rem;
	
}
`;

const BadgeStyle = styled(Badge)`
border: 1px solid purple;
margin-bottom: 2px;
padding: 5px;
color: purple;
@media screen and (max-width: 50rem) {
	font-size: 1.5rem;
	Background-color: rgba(249,208,129,1);
`;

const StyledButton = styled(Button)`
	border: 5px solid;
	position: absolute;
	bottom: -250px;
	z-index: 1;
	display: block;
	top: calc(50% - 2.5rem - 5px);
	left: calc(50% - 6rem - 5px);
	  height: 5rem;
	  width: 12rem;
	margin: auto;
	  background: transparent linear-gradient(to top left, rgba(249,208,129,.2) 0%, rgba(227,2,62,.2) 40%, rgba(49,128,135,.2) 100%);
	  border-image-source: linear-gradient(to top left, rgba(249,208,129,1) 0%, rgba(227,2,62,1) 40%, rgba(49,128,135,1) 100%);
	  border-image-slice: 1;
	transition: transform .25s;
	letter-spacing: .2rem;
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-size: 1.25rem;
	font-weight: 300;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	color: #333;
	
	  &::after {
	  z-index: -1;
		background: transparent linear-gradient(to bottom left, rgba(249,208,129,.25) 10%, rgba(227,2,62,.25) 30%, rgba(49,128,135,.25) 90%);
	  border-image-source: 3px linear-gradient(to bottom left, rgba(249,208,129,1) 10%, rgba(227,2,62,1) 30%, rgba(49,128,135,1) 90%);
	  transition: opacity 1s;
	}
  
	&:active {
	  transform: scale(.96);
  
	  &::before {
		opacity: 1;
	  }
	}
  
	&::before {
	  z-index: 0;
	  border-image-source: 3px linear-gradient(to bottom left, rgba(249,208,129,1) 20%, rgba(227,2,62,1) 40%, rgba(49,128,135,1) 70%);
	  transition: opacity .5s;
	}
  
	&:hover::after {
	  opacity: 1;
	}
  
	@media screen and (max-width: 43rem) {
		
		position: absolute; 
		bottom: -1050px;
		
	}
	
`;

const HeaderStyle = styled.h1`
border: 2px solid;
margin-bottom: 3px;
font-weight: 600;
color: purple;
width: 25vw;
background: linear-gradient(70deg, #5ac8fa 70%, #ff6464 70%);
@media screen and (max-width: 50rem) {
	font-size: 1.7rem;
}
`;
const Leaderboard = () =>  {
	const [users, setUsers] = useState([]);
	const getUsers = () => {
		axios 
		.get(`${process.env.BASE_URL}/api/topUsers`)
		.then (({data}) =>{
			setUsers(data);
		})
	}
	useEffect(()=>{ 
		getUsers();
},
	[]);

	return (
		<Layout title="Leaderboard" color="  background: -webkit-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
		background: -o-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
		background: -moz-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
		background: linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%);
	  }">
		<MediaContainer style={{width: '100%',
						  height:'100%', 
						  justifyContent:'center',
						  alignItems: 'center'
						  }}>
							  <HeaderStyle>Leaderboard<BadgeStyle href='/leaderboard' color="">Refresh</BadgeStyle></HeaderStyle>
					<ListGroup style={{background: 'opacity 1'}}>
					
					<BoardStyle>
						<Row>
							<Col>Name</Col>
							<Col>Points</Col>
							<Col>team</Col>
						</Row>
						
						{users.map((data)=>(
						
						<ul>
							<li>
								<RowStyle >
									
									<Col>{data.username}</Col> 
									<Col>{data.points} </Col>
									<Col>{data.team}</Col>
								
								</RowStyle>
							</li>
						</ul>
						))}
					</BoardStyle>
					
					
					<a href="/game">
							<StyledButton>PLAY</StyledButton>
						</a>
						
					</ListGroup>
		</MediaContainer>
		</Layout>
	);
}

export default Leaderboard;
