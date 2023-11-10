import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SantaForm() {
  const navigate = useNavigate();

  const [wish, setWish] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = event.currentTarget.userid.value;
    const wish = event.currentTarget.wish.value;
    console.log(`userId: ${ userId }`)

    try {
      // TODO: implement the submit logic
      // example
      // const submitResponse = await fetch('/submit', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     username: userId,
      //     address: validationResponse.address,
      //     wish: wish,
      //   })
      // });
      // const submitResponseData = await submitResponse.json()
      // if (!submitResponse.ok) {
      //   throw new Error(submitResponseData.message || 'something went wrong');
      // }

      // FIXME: remove this alert
      alert('not impolemented yet')

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
        <input name="userid" placeholder="charlie.brown" />
        what do you want for christmas?
        <textarea
          name="wish"
          rows={10}
          cols={45}
          maxLength={100}
          placeholder={'Gifts!'}
          onChange={(event) => setWish(event.target.value)}
        ></textarea>
        <br />
        <button type="submit" id="submit-letter" disabled={wish.length == 0}>Send</button>
      </form>
    </>
  )
}
