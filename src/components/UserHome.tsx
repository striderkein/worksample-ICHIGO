import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserHome() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('')

  const checkCustomer = () => {
    navigate(`/customer-info/${customerName}`)
  }

  const checkOrder = () => {
    navigate(`/orders/${customerName}`)
  }

  return (
    <>
      <p>who are you?</p>
      <input name="customername" placeholder="peter.parker" onChange={(event) => setCustomerName(event.target.value)} />
      <br />
      <button
        type="button"
        id="check_customer"
        onClick={checkCustomer}
        disabled={customerName == null || customerName.length === 0}
      >check_customer</button>
      <br />
      <button
        type="button"
        id="check_order"
        onClick={checkOrder}
        disabled={customerName == null || customerName.length === 0}
      >check_order</button>
    </>
  )
}
