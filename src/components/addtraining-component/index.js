import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";

const Addtraining = ({ addTraining, customer, isCustomerHref }) => {
    const emptyTraining = {
        date: "",
        activity: "",
        duration: "",
        customer: customer.links.find(isCustomerHref).href
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = date => {
        setSelectedDate(date);
        setTraining({ ...training, date: date });
    };

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState(emptyTraining);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTraining(emptyTraining);
    };

    const handleInputChange = e => {
        setTraining({ ...training, [e.target.name]: e.target.value });
    };

    const addNewTraining = () => {
        addTraining(training);
        handleClose();
    };
    console.log(training);
    return (
        <div>
            <Button
                style={{ margin: 10 }}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Add training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Add new training to{" "}
                    {customer.firstname + " " + customer.lastname}
                </DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Training Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Training start time"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change time"
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        placeholder="Swimming"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration in minutes"
                        placeholder="45"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addNewTraining} color="primary">
                        Save Training
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Addtraining;
