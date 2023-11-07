import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "../components/Calendar";
import EventForm from "../components/EventForm";
import EventDetails from "../components/EventDetails";
import Navbar from "../components/Navbar";

const Event = () => {
	return (
		<div className="events_page">
		<Navbar />
		<div className='App'>
			<Routes>
				<Route path='/' element={<Calendar/>} />
				<Route path='/event/add' element={<EventForm/>} />
				<Route path='/event/:id' element={<EventDetails/>} />
			</Routes>
		</div>
		</div>
	);
};

export default Event;
