import { useParams } from 'react-router-dom';

export default function TripPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="main-content">
      <h1>Trip Details</h1>
      <p>Trip ID: {id}</p>
    </main>
  );
}
