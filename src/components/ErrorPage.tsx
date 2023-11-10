import { useLocation } from 'react-router-dom';

export default function ErrorPage() {
  const location = useLocation();

  return (
    <div>{ location.state.message }</div>
  )
}
