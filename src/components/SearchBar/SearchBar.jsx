import * as React from 'react';
import { NoSsr, Paper, MenuItem, Typography, TextField } from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';
// import { SearchAutoFill } from '../SearchAutoFill/SearchAutoFill';
import { styles } from './styles';

const suggestions = [
    { label: 'ABC' },
    { label: 'AGL' },
    { label: 'ALQ' },
    { label: 'ALU' },
    { label: 'AWC' },
    { label: 'AMC' },
    { label: 'AMP' },
    { label: 'ANN' },
    { label: 'ANZ' },
    { label: 'APA' },
    { label: 'ALL' },
    { label: 'ASX' },
    { label: 'ALX' },
    { label: 'AZJ' },
    { label: 'AST' },
    { label: 'BOQ' },
    { label: 'BEN' },
    { label: 'BHP' },
    { label: 'BSL' },
    { label: 'BLD' },
    { label: 'BXB' },
    { label: 'CTX' },
    { label: 'CAR' },
    { label: 'CGF' },
    { label: 'CHC' },
    { label: 'CIM' },
    { label: 'IAG' },
    { label: 'CWY' },
    { label: 'CCL' },
    { label: 'COH' },
    { label: 'CBA' },
    { label: 'CWN' },
    { label: 'CPU' },
    { label: 'CSL' },
    { label: 'DXS' },
    { label: 'DMP' },
    { label: 'DOW' },
    { label: 'EVN' },
    { label: 'FLT' },
    { label: 'FMG' },
    { label: 'GMG' },
    { label: 'GPT' },
    { label: 'ILU' },
    { label: 'IPL' },
    { label: 'JHX' },
    { label: 'JHG' },
    { label: 'JBH' },
    { label: 'MQG' },
    { label: 'MFG' },
    { label: 'MGR' },
    { label: 'NAB' },
    { label: 'NCM' },
    { label: 'NST' },
    { label: 'OSH' },
    { label: 'ORI' },
    { label: 'ORG' },
    { label: 'OZL' },
    { label: 'PDL' },
    { label: 'QAN' },
    { label: 'QBE' },
    { label: 'QUB' },
    { label: 'RHC' },
    { label: 'REA' },
    { label: 'RMD' },
    { label: 'RIO' },
    { label: 'STO' },
    { label: 'SEK' },
    { label: 'SHL' },
    { label: 'SOL' },
    { label: 'SGP' },
    { label: 'SYD' },
    { label: 'TAH' },
    { label: 'TLS' },
    { label: 'TPM' },
    { label: 'TCL' },
    { label: 'WES' },
    { label: 'WBC' },
    { label: 'WHC' },
    { label: 'WPL' },
    { label: 'WOW' },
    { label: 'WOR' },
  ].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
  }));
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    input: {
      display: 'flex',
      padding: 0,
      height: 'auto',
    },
    typographyRoot: {
      color: '#dddddd',
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2),
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      bottom: 6,
      fontSize: 16,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing(2),
    },
  }));
  
  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  NoOptionsMessage.propTypes = {
    /**
     * The children to be rendered.
     */
    children: PropTypes.node,
    /**
     * Props to be passed on to the wrapper.
     */
    innerProps: PropTypes.object.isRequired,
    selectProps: PropTypes.object.isRequired,
  };
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  inputComponent.propTypes = {
    inputRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        current: PropTypes.any.isRequired,
      }),
    ]),
  };
  
  function Control(props) {
    const {
      children,
      innerProps,
      innerRef,
      selectProps: { classes, TextFieldProps },
    } = props;
  
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: classes.input,
            ref: innerRef,
            children,
            ...innerProps,
          },
        }}
        {...TextFieldProps}
      />
    );
  }
  
  Control.propTypes = {
    /**
     * Children to render.
     */
    children: PropTypes.node,
    /**
     * The mouse down event and the innerRef to pass down to the controller element.
     */
    innerProps: PropTypes.shape({
      onMouseDown: PropTypes.func.isRequired,
    }).isRequired,
    innerRef: PropTypes.oneOfType([
      PropTypes.oneOf([null]),
      PropTypes.func,
      PropTypes.shape({
        current: PropTypes.any.isRequired,
      }),
    ]).isRequired,
    selectProps: PropTypes.object.isRequired,
  };
  
  function Option(props) {
    return (
      <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  Option.propTypes = {
    /**
     * The children to be rendered.
     */
    children: PropTypes.node,
    /**
     * props passed to the wrapping element for the group.
     */
    innerProps: PropTypes.shape({
      id: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      onMouseMove: PropTypes.func.isRequired,
      onMouseOver: PropTypes.func.isRequired,
      tabIndex: PropTypes.number.isRequired,
    }).isRequired,
    /**
     * Inner ref to DOM Node
     */
    innerRef: PropTypes.oneOfType([
      PropTypes.oneOf([null]),
      PropTypes.func,
      PropTypes.shape({
        current: PropTypes.any.isRequired,
      }),
    ]).isRequired,
    /**
     * Whether the option is focused.
     */
    isFocused: PropTypes.bool.isRequired,
    /**
     * Whether the option is selected.
     */
    isSelected: PropTypes.bool.isRequired,
  };
  
  function Placeholder(props) {
    const { selectProps, innerProps = {}, children } = props;
    return (
      <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
        {children}
      </Typography>
    );
  }
  
  Placeholder.propTypes = {
    /**
     * The children to be rendered.
     */
    children: PropTypes.node,
    /**
     * props passed to the wrapping element for the group.
     */
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired,
  };
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  SingleValue.propTypes = {
    /**
     * The children to be rendered.
     */
    children: PropTypes.node,
    /**
     * Props passed to the wrapping element for the group.
     */
    innerProps: PropTypes.any.isRequired,
    selectProps: PropTypes.object.isRequired,
  };
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  ValueContainer.propTypes = {
    /**
     * The children to be rendered.
     */
    children: PropTypes.node,
    selectProps: PropTypes.object.isRequired,
  };
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }
  
  Menu.propTypes = {
    /**
     * The children to be rendered.
     */
    children: PropTypes.element.isRequired,
    /**
     * Props to be passed to the menu wrapper.
     */
    innerProps: PropTypes.object.isRequired,
    selectProps: PropTypes.object.isRequired,
  };
  
  const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };
  
 function PureSearchBar() {
    const classes = useStyles();
    const theme = useTheme();
    const [single, setSingle] = React.useState(null);
  
    function handleChangeSingle(value) {
      setSingle(value);
    }
  
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };
  
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              inputId="react-select-single"
              TextFieldProps={{
                InputLabelProps: {
                  htmlFor: 'react-select-single',
                  shrink: true,
                },
              }}
              placeholder="Search..."
              options={suggestions}
              components={components}
              value={single}
              onChange={handleChangeSingle}
            />
          </NoSsr>
      </div>
    );
  }

  export const SearchBar = PureSearchBar