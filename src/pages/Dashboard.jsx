import { useEffect, useState } from "react";
import { getHabits, deleteHabit } from "../api/habit.api";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    getHabits().then((res) => setHabits(res.data));
  }, []);

  const addHabit = (habit) => {
    setHabits([habit, ...habits]);
  };

  const removeHabit = async (id) => {
    await deleteHabit(id);
    setHabits(habits.filter((h) => h._id !== id));
  };

  return (
    <div>
      <h2>My Habits</h2>
      <HabitForm onAdd={addHabit} />
      <HabitList habits={habits} onDelete={removeHabit} />
    </div>
  );
}
