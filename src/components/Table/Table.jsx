import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function createData(Code, Company, Price, Chg, High, Low, Vol, Mkt_Cap, Year) {
  return { Code, Company, Price, Chg, High, Low, Vol, Mkt_Cap, Year };
}
//A2M	The a2 Milk Company	$13.22	-0.32	-2.36%	$13.48	$13.16	3,716,440	$9,715,342,266	+17.62%
const rows = [
  createData('A2M','The a2 Milk Company', '13.22', '-0.32', '13.48' , '13.16', '3,716,440', '9,715,342,266', 17.62),
  createData('ABC', 'Adelaide Brighton', '13.22', '-0.32', '13.48' , '13.16', '3,716,440', '9,715,342,266', 17.62),
  createData('AGL','AGL Energy Ltd', '13.22', '-0.32', '13.48' , '13.16', '3,716,440', '9,715,342,266', 17.62),
  createData('ANZ','ANZ Banking Group Ltd', '13.22', '-0.32', '13.48' , '13.16', '3,716,440', '9,715,342,266', 17.62),
  createData('BHP','BHP Group Ltd', '13.22', '-0.32', '13.48' , '13.16', '3,716,440', '9,715,342,266', 17.62),
];

export function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Code </TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">Price&nbsp;($)</TableCell>
            <TableCell align="right">Change&nbsp;(%)</TableCell>
            <TableCell align="right">High&nbsp;</TableCell>
            <TableCell align="right">Low&nbsp;</TableCell>
            <TableCell align="right">Volume&nbsp;</TableCell>
            <TableCell align="right">Mkt Cap&nbsp;($)</TableCell>
            <TableCell align="right">1 Year&nbsp;(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.Code}</TableCell>
              <TableCell align="right">{row.Company}</TableCell>
              <TableCell align="right">{row.Price}</TableCell>
              <TableCell align="right">{row.Chg}</TableCell>
              <TableCell align="right">{row.High}</TableCell>
              <TableCell align="right">{row.Low}</TableCell>
              <TableCell align="right">{row.Mkt_Cap}</TableCell>
              <TableCell align="right">{row.Year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
export const MyTable = SimpleTable;
