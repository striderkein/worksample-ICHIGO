import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';

import '../styles/style.css';

export default function CustomerInfo() {
  // const navigate = useNavigate();
  const [customer, setCustomer] = useState({ customerId: '', name: '',  currentRank: '', totalSpent: 0, lastCalculationDate: ''})
  const { customerId } = useParams()

  useEffect(() => {
    // エンドポイント `/customers` に対して `GET` リクエストを送信する
    const fetchCustomers = async () => {
      const response = await fetch(`/customers/${ customerId }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const responseData = await response.json()
      console.log(responseData)
      setCustomer(responseData)
    }
    fetchCustomers()
  }, [setCustomer, customerId])

  const data = useMemo(
    () => [
      {
        'Customer ID': customer.customerId,
        'Name': customer.name,
        'Current Rank': customer.currentRank,
        'Total Spent': customer.totalSpent,
        'Last Calculation Date': customer.lastCalculationDate,
      },
    ],
    [customer]
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Customer ID',
        accessor: 'Customer ID',
      },
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Current Rank',
        accessor: 'Current Rank',
      },
      {
        Header: 'Total Spent',
        accessor: 'Total Spent',
      },
      {
        Header: 'Last Calculation Date',
        accessor: 'Last Calculation Date',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <>
      <h1>customer info</h1>
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
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <Link to="/">Back to home</Link>
    </>
  )
}
