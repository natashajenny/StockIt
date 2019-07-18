import { createStyles } from '@material-ui/core/styles';

const baseButton = {
    width: 160,
};

export const styles = createStyles({
    darkBackdrop: {
        zIndex: 1110,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'black',
        opacity: 0.7,
    },
    modal: {
        zIndex: 1111,
        width: 350,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '40px 40px 24px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        padding: 8,
        borderRadius: 4,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '55%',
        paddingTop: '20px',
    },
    textField: {
        width: '90%',
        marginBottom: 16,
    },
    submitButton: {
        ...baseButton,
        marginTop: 16,
        marginBottom: 8,
    },
    submitText: {
        fontSize: 16,
    },
});
