import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "../components/Calendar";
import EventForm from "../components/EventForm";
import EventDetails from "../components/EventDetails";

const Event = () => {
	return (
		<div className='App'>
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
