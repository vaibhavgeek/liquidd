import axios from "axios";
import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter,
  Link
} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = withStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
      
const classes = useStyles;


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      formErrors: "",
      isLoading: false,
      message: "Reset Password Link will be sent to you on your registered mail"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const email = this.state.email;
    this.setState({isLoading: true});
    axios
      .post(
        "https://thawing-mesa-00717.herokuapp.com/password/forgot",
        {
          user: {
            email: email
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
        if(response.statusText == "OK")
        {
            this.setState({ message: "Check your mail for registered link!"});
            this.setState({isLoading: false});
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }


  render() {
    return (

      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField value={this.state.email}
            onChange={this.handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={this.state.isLoading}
          >
            Submit
          </Button>
        {this.state.isLoading && <CircularProgress size={30} className={classes.buttonProgress} />}

                <Alert severity="info">  {this.state.message}</Alert>

          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
    );
  }
}
