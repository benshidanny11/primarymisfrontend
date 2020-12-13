import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { TextField, Select } from "final-form-material-ui";
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
  LinearProgress,
} from "@material-ui/core";
import { createUserAction ,createRefresh} from "../../../redux/action";

import { $ } from "react-jquery-plugin";

import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button as BtnModal } from "react-bootstrap";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};

function CreactUSer(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let [showModal, setShowModal] = useState(false);
  const createUSerResponse = state.createUserReducer;
  useEffect(() => {
    console.log(createUSerResponse.type);

    if (createUSerResponse.type === "loading") {
      $("#progress").removeClass("progress");
    } else if (createUSerResponse.type === "error") {
      $("#progress").addClass("progress");
      if (!createUSerResponse.data) {
        console.log(createUSerResponse);
        handleLoginToastError(createUSerResponse.data.error.message[0]);
      } else if (createUSerResponse.data.error) {
        console.log(createUSerResponse);
        handleLoginToastError(createUSerResponse.data.error);
      } else if (createUSerResponse.data.Error) {
        console.log(createUSerResponse);
        handleLoginToastError(createUSerResponse.data.Error);
      } else {
        console.log(createUSerResponse);
        handleLoginToastError(createUSerResponse.message);
      }
    }
    if (createUSerResponse.type === "success") {
      console.log("User registration", createUSerResponse.message);
      $("#progress").addClass("progress");
      setShowModal(true);
    }
  }, [createUSerResponse.type]);

  const handleLoginToastError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };

  const onSubmit = async (values) => {
    console.log(values);
    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      role: values.role,
      password: values.password,
    };
    dispatch(createUserAction(userData));
  };

  const handleHideModal = () => {

    setShowModal(false);
    console.log(showModal);

  };

  const handleRedirect = () => {
    showModal=false;
    setShowModal(showModal);
    console.log(showModal);
    dispatch(createRefresh)
    window.location.href="/"
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Add user
      </Typography>

      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper>
              <div id="progress" className="progress">
                <LinearProgress />
              </div>
              <div className="separator" />
              <CssBaseline />
              <Grid
                container
                alignItems="flex-start"
                spacing={2}
                style={{
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingBottom: 16,
                }}
              >
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="firstName"
                    component={TextField}
                    type="text"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="lastName"
                    component={TextField}
                    type="text"
                    label="Last Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    fullWidth
                    required
                    component={TextField}
                    type="email"
                    label="Email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="phone"
                    fullWidth
                    required
                    component={TextField}
                    type="tel"
                    label="Phone number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="role"
                    component={Select}
                    label="Select a user lole"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="TEACHER">Teacher</MenuItem>
                    <MenuItem value="DOS">Director of study</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="password"
                    fullWidth
                    required
                    component={TextField}
                    type="password"
                    label="Password"
                  />
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
      <ToastContainer />
      <Modal show={showModal} onHide={handleHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>User registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`${
          showModal ? createUSerResponse.message : ""
        }`}</Modal.Body>
        <Modal.Footer>
          <BtnModal variant="primary" onClick={handleRedirect}>
            Okay
          </BtnModal>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default CreactUSer;
