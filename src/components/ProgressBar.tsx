import '../styles/style.css';

interface Props {
  totalSpent: number,
  requiredForNextRank: number, 
}

export default function ProgressBar({
  totalSpent,
  requiredForNextRank
}: Props) {
  const progress = (totalSpent / requiredForNextRank) * 100;

  return (
    <div className={'progress-bar'}>
      <label htmlFor="progress">Progress to Next Rank:</label>
      <progress id="progress" value={progress} max="100" />
    </div>
  );
}
