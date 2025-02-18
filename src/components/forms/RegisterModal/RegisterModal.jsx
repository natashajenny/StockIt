import React from 'react';
import { Paper, Typography, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import APIClient from '../../../api/apiClient.js';
import history from '../../../history';

export class UserRegister extends React.Component {  
    constructor(props) {
        super(props)
        const emptyData = { data: '' };
        this.state = {
            formData: {
                username: emptyData,
                name: emptyData,
                email: emptyData,
                password: emptyData,
                confirmPassword: emptyData,
                address: emptyData,
                phone: emptyData,
            },
        };
        this.passwordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();
        this.formConfig =  {
            username: { label: 'Username' },
            name: {label: 'Name'},
            email: { label: 'Email', type: 'email', autoComplete: 'email' },
            password: { label: 'Password', type: 'password', onBlur: this.handlePasswordBlur, ref: this.passwordRef },
            confirmPassword: { label: 'Confirm Password', type: 'password', onBlur: this.handleConfirmPasswordBlur, ref: this.confirmPasswordRef },
            address: { label: 'Address', autoComplete: 'address-line1' },
            phone: { label: 'Phone Number' },
        };
    }

    handleSubmit = (e, formData, onSubmit, onClose) => {
        e.preventDefault();
        this.apiClient = new APIClient();
        this.apiClient.registerUser(formData).then((data) => {
            onSubmit(data.user)
        }).then(history.push('/Home')).then(onClose())
    }

    render() {
        const { classes, onClose, onSubmit } = this.props;
        const { formData } = this.state;
        const { formConfig } = this;
        return (
            <React.Fragment>
                <div className={classes.darkBackdrop} onClick={onClose}/>
                <form className={classes.container} noValidate autoComplete="off" 
                    onSubmit={(e) => this.handleSubmit(e, formData, onSubmit, onClose)}>
                    <Paper className={classes.modal}>
                        <IconButton className={classes.closeButton} onClick={onClose}>
                            <Close />
                        </IconButton>
                        { Object.keys(formConfig).map((fieldName, i) => (
                            <TextField
                                required
                                key={i}
                                className={classes.textField}
                                onChange={this.handleInputChange}
                                name={fieldName}
                                error={formData[fieldName].error !== undefined}
                                helperText={formData[fieldName].error}
                                inputRef={formConfig[fieldName].ref}
                                onBlur={formConfig[fieldName].onBlur}
                                label={formConfig[fieldName].label}
                                type={formConfig[fieldName].type}
                                autoComplete={formConfig[fieldName].autoComplete}
                                />
                        ))}
                        <Button type='submit' className={classes.loginButton} color='secondary' variant='contained'>
                            <Typography className={classes.loginText} variant='button'>
                                Register
                            </Typography>
                        </Button>
                    </Paper>
                </form>
            </React.Fragment>
        );
    }
    componentDidMount() {
        const PasswordField = this.passwordRef.current;
        const ConfirmPasswordField = this.confirmPasswordRef.current;
        PasswordField.oninput = this.validatePassword;
        ConfirmPasswordField.oninput = this.validateConfirmPassword;
    }

    passwordsMatch = (password, confirmPassword) => {
        return password === confirmPassword
            ? true
            : false;
    }

    isStrongPassword = (password) => {
        if (password.length > 8
            && password.match(/[A-Z]/)
            && password.match(/[a-z]/)
            && password.match(/\d/)) {
            return true;
        } else {
            return false;
        }
    }

    validatePassword = () => {
        const PasswordField = this.passwordRef.current;
        if (this.isStrongPassword(PasswordField.value)) {
            PasswordField.setCustomValidity('');
        } else {
            PasswordField.setCustomValidity('Please enter a stronger password');
        }
    }

    validateConfirmPassword = () => {
        const ConfirmPasswordField = this.confirmPasswordRef.current;
        const PasswordField = this.passwordRef.current;
        if (this.passwordsMatch(ConfirmPasswordField.value, PasswordField.value)) {
            ConfirmPasswordField.setCustomValidity('');
        } else {
            ConfirmPasswordField.setCustomValidity('Please ensure passwords match.');
        }
    }

    handlePasswordBlur = () => {
        const { formData } = this.state;
        this.setState({ formData: {
            ...formData,
            password: {
                ...formData.password,
                error: this.isStrongPassword(formData.password.data)
                    ? undefined
                    : 'Password must be at least 8 characters long and contain at least an lowercase letter, uppercase letter and a number.',
            },
        }});
    }

    handleConfirmPasswordBlur = () => {
        const { formData } = this.state;
        this.setState({ formData: {
            ...formData,
            confirmPassword: {
                ...formData.confirmPassword,
                error: this.passwordsMatch(formData.password.data, formData.confirmPassword.data)
                    ? undefined
                    : 'Password mismatch',
            },
        }});
    }

    handleInputChange = (e) => {
        const { formData } = this.state;
        this.setState({
            formData: {
                ...formData,
                [e.target.name]: {
                    ...formData[e.target.name],
                    data: e.target.value,
                },
            },
        });
    }

    handleRegister = (event) => {
        event.preventDefault();
    }
}

export const RegisterModal = withStyles(styles)(UserRegister);