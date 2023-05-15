import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import Icon from './icon.js'
import useStyles from './styles.js'
import Input from './Input'
import { signUp, signIn } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [ isSignUp, setIsSignUp ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ formData, setFormData ] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignUp){
            dispatch(signUp(formData, history))
        }else{
            dispatch(signIn(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: {result, token } });

            history.push('/')
        } catch (error) {
            
        }
    }
    const googleFailure = (error) => {
        console.log(error)
        console.log("Ocorreu um erro em Google Sign In")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} autoFocus xs={6}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} />
                                    <Input lastName="lastName" label="Last Name" handleChange={handleChange} />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin 
                        clientId='175490152882-csv07bg6t6rsdbvnkkd3au04n78psifp.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton}
                                color='primary'
                                fullWidth 
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon/>}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? "Já tem uma conta cadastrada? Entrar" : "Não tenho uma conta, quero me cadastrar"}
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Paper>

        </Container>
    );
}

export default Auth