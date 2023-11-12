import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../styles/style.css';
import AwesomeTable from './AwesomeTable';

export default function OrderInfo() {
  const [orders, setOrders] = useState([])
  const { customerId } = useParams()

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`/orders/${ customerId }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const responseData = await response.json()
      console.log(responseData)
      setOrders(responseData)
    }
    fetchOrders()
  }, [setOrders, customerId])

  // orders 配列の各要素をマッピング
  const data = orders.map(order => ({
    'Customer ID': order.customerId,
    'Order ID': order.orderId,
    'Total in Cents': order.totalInCents,
    'Date': order.date,
  }));

  const columns = [
    {
      Header: 'Customer ID',
      accessor: 'Customer ID',
    },
    {
      Header: 'Order ID',
      accessor: 'Order ID',
    },
    {
      Header: 'Total in Cents',
      accessor: 'Total in Cents',
    },
    {
      Header: 'Date',
      accessor: 'Date',
    },
  ]

  return (
    <>
      <h1>order info</h1>
      <AwesomeTable columns={columns} data={data} />
      <Link to="/">Back to home</Link>
    </>
  )
}
