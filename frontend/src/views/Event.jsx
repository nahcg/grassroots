import React from "react";
import { Route, Routes, useParams, Link } from "react-router-dom";
import Calendar from "../components/Calendar";
import EventForm from "../components/EventForm";
import EventDetails from "../components/EventDetails";
import Navbar from '../components/Navbar'
import '../App.css'
import { useAuth0 } from "@auth0/auth0-react";

const Event = () => {

	const { user, isLoading } = useAuth0();

	const { community_id } = useParams();

	const routes = [
    { path: `/communities/community/${community_id}`, label: 'About' },
    { path: `/posts/${community_id}`, label: 'Forum' },
    { path: `/events/${community_id}`, label: 'Events' },
  ];
	
  if (isLoading || !user) {
		return null;
	}

	return (
		<div className='App'>
			<Navbar style={{ margin: '-100' }} />
			{routes.map((route, index) => (
				<Link key={index} to={route.path}>
					<button className='button'>{route.label}</button>
				</Link>
			))}
			<Calendar />
			<Routes>
				<Route path='/' exact component={Calendar} />
				<Route path='/event/add' component={EventForm} />
				<Route path='/event/:id' component={EventDetails} />
			</Routes>
		</div>
	);
};

export default Event;
