import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] =  useState([]);

    const [logInUser, setLogInUser] =useContext (userContext);
        

   useEffect(()=>{
    fetch("http://localhost:5000/bookings?email="+logInUser.email,{
        method:"GET",
        headers:{
            'Content-type': 'application/json',
           authorization:` Bearer ${sessionStorage.getItem('token') 
        }`
    }
    })
       .then(res=>res.json())
       .then(data=> setBookings(data))
   },[])
    return (
        <div>
            <h1> this is length {bookings.length} </h1>
            {
                bookings.map(x=> <li> name: {x.name} email: {x.email}  from:{(new Date (x.checkIn).toDateString ('dd/MM/yyyy'))} to {(new Date (x.checkOut).toDateString ('dd/MM/yyyy'))} </li>)
            }
        </div> 
    );
};

export default Bookings;