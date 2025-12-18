import { useState } from "react";
import { createHabit } from "../api/habit.api";

export default function HabitForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const submit = async (e) => {
    e.preventDefault();
    if (!title) return;

    const res = await createHabit({ title, frequency });
    onAdd(res.data);

    setTitle("");
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Habit name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>

      <button>Add Habit</button>
    </form>
  );
}
