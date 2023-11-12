import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../styles/style.css';
import AwesomeTable from './AwesomeTable';

export default function CustomerInfo() {
  const [customer, setCustomer] = useState({ customerId: '', name: '',  currentRank: '', totalSpent: 0, lastCalculationDate: ''})
  const { customerId } = useParams()

  useEffect(() => {
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

  const data = [
    {
      'Customer ID': customer.customerId,
      'Name': customer.name,
      'Current Rank': customer.currentRank,
      'Total Spent': customer.totalSpent,
      'Last Calculation Date': customer.lastCalculationDate,
    },
  ]

  const columns = [
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
  ]

  return (
    <>
      <h1>customer info</h1>
      <AwesomeTable columns={columns} data={data} />
      <Link to="/">Back to home</Link>
    </>
  )
}
