import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@material-ui/core";
import ContentLoader from "react-content-loader";

function Userslist({ users, isLoading }) {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#1168ca",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const useStyles = makeStyles({
    table: {},
    container: {
      width: 1100,
      margin: 20,
      overflow: "auto",
    },
    progressContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop:20
    
    },
  });

  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Full name</StyledTableCell>
            <StyledTableCell align="">Email address</StyledTableCell>
            <StyledTableCell align="">Phone number</StyledTableCell>
            <StyledTableCell align="">User role</StyledTableCell>
            <StyledTableCell align="center">Option 1</StyledTableCell>
            <StyledTableCell align="center">Option 2</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length !== 0 ? (
            users.map((user, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell component="th" scope="row">
                  {user.names}
                </StyledTableCell>
                <StyledTableCell align="">{user.email}</StyledTableCell>
                <StyledTableCell align="">{user.phonenumber}</StyledTableCell>
                <StyledTableCell align="">{user.role}</StyledTableCell>
                <StyledTableCell align="">
                  <Button>Update user</Button>
                </StyledTableCell>
                <StyledTableCell align="">
                  <Button color="primary">Remove user</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow className={classes.progressContainer}>
              <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
              <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
              <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Userslist;
