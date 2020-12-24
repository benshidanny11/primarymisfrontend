import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const StyledButton = withStyles({
  root: {
    background: "#1168ca",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "0 30px",
    width: "40%",
    height: "35px",
    boxShadow: "0 1px 1px 1px #fcfcfc",
    "&:hover": {
      background: "#2579da",
      color: "#fff",
    },
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export const CustomButton = ({ type, label, className }) => {
  return (
    <StyledButton size="medium" type={type} className={className}>
      {label}
    </StyledButton>
  );
};
export const CustomCancelButton = ({ type, label, className, handleHide }) => {
  return (
    <StyledButton
      size="medium"
      type={type}
      className={className}
      onClick={handleHide}
    >
      {label}
    </StyledButton>
  );
};
