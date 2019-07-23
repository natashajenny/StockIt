import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

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
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
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

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool.isRequired,
  removeProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
  }).isRequired,
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
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

export function SearchAutoFill() {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState(null);
  const [multi, setMulti] = React.useState(null);

  function handleChangeSingle(value) {
    setSingle(value);
  }

  function handleChangeMulti(value) {
    setMulti(value);
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
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            label: 'Stock',
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true,
            },
          }}
          placeholder="Search a Stock(start with a)"
          options={suggestions}
          components={components}
          value={single}
          onChange={handleChangeSingle}
        />
        <div className={classes.divider} />
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-multiple"
          TextFieldProps={{
            label: 'Multiple Stocks',
            InputLabelProps: {
              htmlFor: 'react-select-multiple',
              shrink: true,
            },
          }}
          placeholder="Select multiple Stocks"
          options={suggestions}
          components={components}
          value={multi}
          onChange={handleChangeMulti}
          isMulti
        />
      </NoSsr>
    </div>
  );
}