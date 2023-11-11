import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';

import '../styles/style.css';

interface Props {
  columns: { Header: string; accessor: string }[];
  data: any;
}

export default function AwesomeTable({
  columns,
  data,
}: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <>
      <table {...getTableProps()} style={{margin: '0 auto'}}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
