import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function SantaForm() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const customerId = event.currentTarget.customerid.value;
    // const customerName = event.currentTarget.customername.value;
    // const orderId = event.currentTarget.orderid.value;
    // const totalInCents = /* get total from somewhere */;
    // const dateString = event.currentTarget.date.value;
    console.log(`customerId: ${ customerId }`)

    try {
      // TODO: エンドポイント `/orders` に対して `POST` リクエストを送信する
      // -> いったん放置！
      const submitResponse = await fetch('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: customerId,
          // customerName: customerName,
          // orderId: orderId,
          // totalInCents: totalInCents,
          // date: dayjs(dateString).toISOString(),
        })
      });
      const submitResponseData = await submitResponse.json()
      if (!submitResponse.ok) {
        throw new Error(submitResponseData.message || 'something went wrong');
      }

      navigate('/success', {
        state: { message: 'Success!' }
      });
    } catch (error: any) {
      console.error(error);
      // If so, navigate to a error page
      navigate('/error', {
        state: { message: error.message }
      });
    }
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        who are you?
        <input name="customerid" placeholder="1000" />
        {/* what do you want for christmas? */}
        {/*
        <textarea
          name="wish"
          rows={10}
          cols={45}
          maxLength={100}
          placeholder={'Gifts!'}
          // onChange={(event) => setWish(event.target.value)}
        ></textarea>
        */}
        <br />
        <button type="submit" id="submit-letter">Send Order</button>
      </form>
    </>
  )
}
