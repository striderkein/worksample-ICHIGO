import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';

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
        col1: 'Customer ID',
        col2: customer.customerId,
      },
      {
        col1: 'Name',
        col2: customer.name,
      },
      {
        col1: 'Current Rank',
        col2: customer.currentRank,
      },
      {
        col1: 'Total Spent',
        col2: customer.totalSpent,
      },
      {
        col1: 'Last Calculation Date',
        col2: customer.lastCalculationDate,
      },
    ],
    [customer]
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Property',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Value',
        accessor: 'col2',
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
      {/* <div>{ JSON.stringify(customer, null, 2) }</div> */}
      {/* <div>{ customer.name }</div> */}
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
