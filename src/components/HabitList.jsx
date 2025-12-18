import { deleteHabit } from "../api/habit.api";

export default function HabitList({ habits, onDelete }) {
  return (
    <ul>
      {habits.map((habit) => (
        <li key={habit._id}>
          {habit.title} ({habit.frequency})
          <button onClick={() => onDelete(habit._id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}
