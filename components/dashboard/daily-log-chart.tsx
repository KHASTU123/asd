"use client";
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function DailyLogChart({ childId }: { childId: string }) {
  const [data, setData] = useState<{date:string, sleep:number}[]>([]);

  useEffect(()=>{
    if (!childId) return;
    (async()=>{
      const res = await fetch(`/api/daily-log?childId=${childId}`);
      if (!res.ok) return;
      const js = await res.json();
      const items = (js.logs || []).map((l:any)=>({ date: new Date(l.date).toLocaleDateString(), sleep: l.sleepHours || 0 })).reverse();
      setData(items);
    })();
  },[childId]);

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sleep" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
