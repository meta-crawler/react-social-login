import React from 'react'
import classes from './Login.module.css'

import Box from '../../UI/Box'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import InstagramLogin from 'react-instagram-login';
import TwitterLogin from "react-twitter-login";

//redux
import { useDispatch } from 'react-redux'
import { login } from '../../store/features/auth'

const Login = () => {

    const dispatch = useDispatch()

    const thirdPartyLoginHandler = ({ response, provider, error }) => {
        // console.log(" response>>", response)
        // console.log(" provider>>", provider)
        // console.log(" error>>", error)
        dispatch(login({ user: response, provider, error }))

    }

    const responseTwitter = (err, data) => {
        // console.log(err, data);
        if (err) return thirdPartyLoginHandler({ error: true, provider: 'twitter', response: {} })

        thirdPartyLoginHandler({ error: false, provider: 'twitter', response: data })
    };

    const responseFacebook = (response) => {
        // console.log('response >>>', response);
        if (response.status === 'unknown' || response.status === undefined || response.error)
            return thirdPartyLoginHandler({ error: true, provider: 'facebook', response: {} })

        thirdPartyLoginHandler({ error: false, provider: 'facebook', response })
    }

    const successResponseInstagram = (response) => thirdPartyLoginHandler({ error: false, provider: 'instagram', response })
    const failResponseInstagram = (err) => thirdPartyLoginHandler({ error: true, provider: 'instagram', responce: {} })

    const successResponseGoogle = (response) => { thirdPartyLoginHandler({ error: false, provider: 'google', response: response.profileObj }) }
    const failResponseGoogle = (response) => thirdPartyLoginHandler({ error: true, provider: 'google', response: {} })

    return (
        <Box className={classes.login}>
            <h1>Login</h1>
            <FacebookLogin
                appId="1082534248908784"
                // autoLoad={true}
                fields="name,email,picture"
                cssClass={classes.login__btn}
                callback={responseFacebook}
                textButton="Login with Facebook"
            />
            <GoogleLogin
                clientId="905703355143-hbpbqk2bmpnjocs9j3h4r4537qmru1ma.apps.googleusercontent.com"
                className={classes.login__btn}
                onSuccess={successResponseGoogle}
                onFailure={failResponseGoogle}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (<button className={classes.login__btn} onClick={renderProps.onClick}>Login with Google</button>)}
            />
            <InstagramLogin
                clientId="ad6d0ba2753ddfe70dd3a33522df5e7a"
                onSuccess={successResponseInstagram}
                onFailure={failResponseInstagram}
                cssClass={classes.login__btn}
            >Login with Instagram</InstagramLogin>
            <TwitterLogin
                authCallback={responseTwitter}
                className={classes.login__btn}
                // consumerKey={CONSUMER_KEY}
                consumerSecret={'L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg'}
            // children={<button>Login with Twitter</button>}
            >Login with Twitter</TwitterLogin>
        </Box>
    )
}

export default Login
