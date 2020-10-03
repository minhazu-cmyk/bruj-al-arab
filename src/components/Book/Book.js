import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
 
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const[logInUser, setLogInUser] = useContext(userContext);
    const [selectedDate, setSelectedDate] = useState({
      checkIn:new Date(),
      checkOut: new Date(),
    });

  const handleCheckIn = (date) => {
    const newDate = {...selectedDate}
    newDate.checkIn=date;
    setSelectedDate(newDate);
  };
  const handleCheckOut = (date) => {
    const newDate = {...selectedDate}
    newDate.checkOut=date;
    setSelectedDate(newDate);
  };
  const handleBooking=()=>{
     const newBooking= {...logInUser, ...selectedDate};
     fetch("http://localhost:5000/addBooking",{
       method:"POST",
       headers: {'content-Type': 'application/json'},
       body:JSON.stringify(newBooking)
    })
  .then(res=>res.json)
  .then(data=>{
    console.log(data)
  })
  

  }
    const {bedType} = useParams();
    return (
        <div style={{textAlign: 'center'}}>
            <h1> hello{logInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="checkIn picker inline"
          value={selectedDate.checkIn}
          onChange={handleCheckIn}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="checkout picker dialog"
          format="dd/MM/yyyy"
          value={selectedDate.checkOut}
          onChange={handleCheckOut}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
      </Grid>
      <Button onClick={handleBooking} variant="contained" color="primary">
       Book now
      </Button>
    </MuiPickersUtilsProvider>
    <Bookings></Bookings>
        </div>
    );
};

export default Book;