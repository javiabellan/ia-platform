import React          from 'react';
import Table          from '@material-ui/core/Table';
import TableBody      from '@material-ui/core/TableBody';
import TableCell      from '@material-ui/core/TableCell';
import TableHead      from '@material-ui/core/TableHead';
import TableRow       from '@material-ui/core/TableRow';
import Button         from '@material-ui/core/Button';


export default function DataTable({table}) {
  console.log(table);
  return (
      <Table size="small">

        {/*TABLE HEADER: Variable names*/}
        <TableHead>
          <TableRow>
            {table.columns.map(colName => (
              <TableCell align="center" key={colName}>
                <Button color="primary">{colName}</Button>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/*TABLE BODY: Data*/}
        <TableBody>
          {table.data.map((row, idx) => (
            <TableRow key={idx}>
              {row.map((cell, idx) => (
                <TableCell align="center" key={idx}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}