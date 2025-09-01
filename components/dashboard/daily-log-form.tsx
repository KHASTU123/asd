"use client";
import React, { useState } from "react";

export function DailyLogForm({ childId, onSaved }: { childId: string, onSaved?: () => void }) {
  const [form, setForm] = useState({ mood: "neutral", sleepHours: 8, meals: "", communication: "", activities: "", therapyNotes: "", behaviorNotes: "" });
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!childId) return alert("Chưa chọn bé");
    setSaving(true);
    try {
      const res = await fetch("/api/daily-log", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ childId, ...form }) });
      if (!res.ok) throw new Error("Fail");
      onSaved?.();
    } catch (err) {
      console.error(err);
      alert("Lưu nhật ký thất bại");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-3 p-4 bg-white rounded-2xl shadow">
      <label>Tâm trạng
        <select value={form.mood} onChange={e=>setForm({...form,mood:e.target.value})}>
          <option value="very_happy">Rất vui</option>
          <option value="happy">Vui</option>
          <option value="neutral">Bình thường</option>
          <option value="anxious">Lo lắng</option>
          <option value="irritable">Khó chịu</option>
        </select>
      </label>
      <label>Giờ ngủ <input type="number" min={0} max={24} value={form.sleepHours} onChange={e=>setForm({...form,sleepHours: Number(e.target.value)})} /></label>
      <input placeholder="Ăn uống" value={form.meals} onChange={e=>setForm({...form,meals:e.target.value})} />
      <input placeholder="Giao tiếp" value={form.communication} onChange={e=>setForm({...form,communication:e.target.value})} />
      <textarea placeholder="Hoạt động" value={form.activities} onChange={e=>setForm({...form,activities:e.target.value})} />
      <textarea placeholder="Ghi chú trị liệu" value={form.therapyNotes} onChange={e=>setForm({...form,therapyNotes:e.target.value})} />
      <textarea placeholder="Hành vi đặc biệt" value={form.behaviorNotes} onChange={e=>setForm({...form,behaviorNotes:e.target.value})} />
      <button type="submit" disabled={saving}>{saving ? "Đang lưu..." : "Lưu nhật ký"}</button>
    </form>
  );
}
