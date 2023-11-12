import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserHome() {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState('')

  const checkCustomer = () => {
    navigate(`/customer-info/${customerId}`)
  }

  const checkOrder = () => {
    navigate(`/orders/${customerId}`)
  }

  return (
    <>
      <p>who are you?</p>
      <input name="customerid" placeholder="1000" onChange={(event) => setCustomerId(event.target.value)} />
      <br />
      <button
        type="button"
        id="check_tier_status"
        onClick={checkCustomer}
        disabled={customerId == null || customerId.length === 0}
      >check_tier_status</button>
      <br />
      <button
        type="button"
        id="check_order"
        onClick={checkOrder}
        disabled={customerId == null || customerId.length === 0}
      >check_order</button>
    </>
  )
}
