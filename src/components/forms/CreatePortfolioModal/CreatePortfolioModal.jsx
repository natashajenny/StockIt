import React from 'react';
import { Button, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';

class PureCreatePortfolioModal extends React.Component {
    constructor(props) {
        super(props)
        const emptyData = { data: '' };
        this.state = {
            formData: {
                title: emptyData,
                description: emptyData,
            }
        }; 
        this.formConfig =  {
            title: { label: 'Title' },
            description: { label: 'Description' },
        };
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
     
    render() {
        const { onClose, onSubmit, classes } = this.props;
        const { formData } = this.state;
        const { formConfig } = this;
        console.log(formData)
        return (
            <React.Fragment>
                <div className={classes.darkBackdrop} onClick={onClose}/>
                <form onSubmit={(e) => onSubmit(e, formData)}>
                    <Paper className={classes.modal}>
                        <IconButton className={classes.closeButton} onClick={onClose}>
                            <Close />
                        </IconButton>
                        <Typography variant='h4'>
                           Create New Portfolio
                        </Typography>
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
                            autoComplete='off'
                            />
                        ))}
                        <div className={classes.buttons}>
                            <Button color='secondary' variant='contained' onClick={onClose}>
                                <Typography variant='button'>
                                    Cancel
                                </Typography>
                            </Button>
                            <Button type='submit' color='primary' variant='contained'>
                                <Typography variant='button'>
                                    Submit
                                </Typography>
                            </Button>
                        </div>
                    </Paper>
                </form>
            </React.Fragment>
        );
    }
}

export const CreatePortfolioModal = withStyles(styles)(PureCreatePortfolioModal);
