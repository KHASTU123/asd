'use client';
import { BarChart, Bar } from "recharts";
import React, { useEffect, useState } from 'react';
import { Bell, User, BriefcaseMedical, ChevronDown, ChevronUp, SendHorizontal, Bot, BarChart2, MessageSquare, Newspaper } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from "recharts";
// Mock component thay thế cho shadcn/ui
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-3xl shadow-lg border-none bg-white dark:bg-gray-800 p-6 ${className}`}>
        {children}
    </div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4">{children}</div>
);
const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
);
const CardContent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);
const CardDescription = ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-600 dark:text-gray-400 mt-1">{children}</p>
);
const Button = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string;[key: string]: any }) => (
    <button
        className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 ${className}`}
        {...props}
    >
        {children}
    </button>
);
const Textarea = ({ className = "", ...props }: { className?: string;[key: string]: any }) => (
    <textarea
        className={`w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-y ${className}`}
        {...props}
    />
);
const Label = ({ children, ...props }: { children: React.ReactNode;[key: string]: any }) => (
    <label className="text-base font-semibold" {...props}>
        {children}
    </label>
);

// Mock Select component đã được sửa lỗi
const Select = ({ children, onValueChange, value, ...props }: { children: React.ReactNode; onValueChange: (value: string) => void; value: string;[key: string]: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleItemClick = (itemValue: string) => {
        onValueChange(itemValue);
        setIsOpen(false);
    };
    const selectedItem = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.props.value === value
    );

    return (
        <div className="relative">
            <div
                className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>
                    {selectedItem ? (selectedItem as React.ReactElement).props.children : "Chọn tâm trạng"}
                </span>
                <ChevronDown size={20} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-700 border rounded-xl shadow-lg z-10">
                    {React.Children.map(children, child =>
                        React.isValidElement(child) &&
                        <div
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleItemClick(child.props.value)}
                        >
                            {child.props.children}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
// SelectValue, SelectTrigger, SelectContent, SelectItem không cần thiết
// khi bạn đã mock component Select. Đã xóa các mock thừa để tránh lỗi.

// Mock toast hook
const useToast = () => ({
    toast: (options: { title: string; description: string; variant?: string }) => {
        console.log("Toast:", options.title, options.description);
    },
});

// Mock Navbar component
const Navbar = () => (
    <nav className="flex justify-end items-center mb-8">
        <a href="#" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Bell size={24} />
        </a>
    </nav>
);

// Mock WelcomeToast component
const WelcomeToast = ({ name }: { name: string }) => (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl shadow-lg">
        <h3 className="text-xl font-semibold mb-1">Chào mừng, {name || "Khách"}!</h3>
        <p>Hãy cùng theo dõi sự phát triển của trẻ ngày hôm nay.</p>
    </div>
);

// Mock SummaryCharts component
// const SummaryCharts = ({ childId }: { childId: string }) => (
//     <Card className="col-span-1 md:col-span-2">
//         <CardHeader>
//             <CardTitle>Biểu đồ tổng quan</CardTitle>
//             <CardDescription>
//                 Tổng hợp các chỉ số quan trọng về sức khỏe và tâm trạng.
//             </CardDescription>
//         </CardHeader>
//         <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Biểu đồ giả lập */}
//                 <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 h-48 flex items-center justify-center">
//                     <p>Biểu đồ tâm trạng</p>
//                 </div>
//                 <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 h-48 flex items-center justify-center">
//                     <p>Biểu đồ hoạt động</p>
//                 </div>
//             </div>
//         </CardContent>
//     </Card>
// );

interface Notification {
    _id: string;
    title: string;
    content: string;
    source: string;
    link: string;
    date: string;
    image?: string;
}

// Component DailyLogForm
// function DailyLogForm({ childId }: { childId: string }) {
//     const [sleepHours, setSleepHours] = useState<number | ''>("");
//     const [mood, setMood] = useState<string>("");
//     const [notes, setNotes] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const { toast } = useToast();

//     const moodOptions = [
//         { label: "Hạnh phúc", value: "Happy" },
//         { label: "Bình tĩnh", value: "Calm" },
//         { label: "Vui vẻ", value: "Joyful" },
//         { label: "Mệt mỏi", value: "Tired" },
//         { label: "Buồn bã", value: "Sad" },
//         { label: "Tức giận", value: "Angry" },
//         { label: "Lo lắng", value: "Anxious" },
//     ];

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         const logData = {
//             childId,
//             date: new Date().toISOString(),
//             sleepHours: typeof sleepHours === 'number' ? sleepHours : 0,
//             mood,
//             notes,
//         };

//         try {
//             const res = await fetch("/api/daily-log", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(logData),
//             });

//             if (res.ok) {
//                 toast({
//                     title: "Lưu nhật ký thành công!",
//                     description: "Dữ liệu của bạn đã được ghi lại.",
//                 });
//                 setSleepHours("");
//                 setMood("");
//                 setNotes("");
//             } else {
//                 const errorData = await res.json();
//                 toast({
//                     title: "Có lỗi xảy ra",
//                     description: errorData.message || "Không thể lưu nhật ký.",
//                     variant: "destructive",
//                 });
//                 console.error("Failed to save daily log:", errorData);
//             }
//         } catch (err) {
//             console.error("Network error:", err);
//             toast({
//                 title: "Lỗi kết nối",
//                 description: "Không thể kết nối tới máy chủ.",
//                 variant: "destructive",
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <Card className="rounded-3xl shadow-xl border-none">
//             <CardHeader>
//                 <CardTitle>Ghi chép hàng ngày</CardTitle>
//                 <CardDescription>Ghi lại các hoạt động và tâm trạng của trẻ.</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <Label htmlFor="sleep-hours">Giờ ngủ (trong 24 giờ)</Label>
//                         <input
//                             id="sleep-hours"
//                             type="number"
//                             value={sleepHours}
//                             onChange={(e) => setSleepHours(parseFloat(e.target.value))}
//                             className="mt-2 w-full px-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                             placeholder="Nhập số giờ ngủ"
//                             min="0"
//                             max="24"
//                             step="0.5"
//                             required
//                         />
//                     </div>
//                     <div className="space-y-2">
//                         <Label htmlFor="mood-select">Tâm trạng của trẻ</Label>
//                         <Select onValueChange={(value) => setMood(value)} value={mood} required>
//                             {moodOptions.map((option) => (
//                                 <div key={option.value} value={option.value}>
//                                     {option.label}
//                                 </div>
//                             ))}
//                         </Select>

//                     </div>
//                     <div className="space-y-2">
//                         <Label htmlFor="notes">Ghi chú khác</Label>
//                         <Textarea
//                             id="notes"
//                             value={notes}
//                             onChange={(e) => setNotes(e.target.value)}
//                             placeholder="Nhập các ghi chú bổ sung về ngày hôm nay..."
//                             rows={4}
//                             className="mt-2"
//                         />
//                     </div>
//                     <Button type="submit" className="w-full" disabled={isSubmitting}>
//                         {isSubmitting ? "Đang lưu..." : "Lưu Nhật ký"}
//                     </Button>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// }
// Component DailyLogForm
function DailyLogForm({ childId }: { childId: string }) {
    const [sleepHours, setSleepHours] = useState<number | ''>("");
    const [mood, setMood] = useState<string>("");
    const [eating, setEating] = useState<string>("");
    const [behaviorNotes, setBehaviorNotes] = useState("");
    const [communication, setCommunication] = useState<string>("");
    const [socialSkills, setSocialSkills] = useState<string[]>([]);
    const [independence, setIndependence] = useState<string[]>([]);
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const moodOptions = [
        { label: "Hạnh phúc", value: "Happy" },
        { label: "Bình tĩnh", value: "Calm" },
        { label: "Vui vẻ", value: "Joyful" },
        { label: "Mệt mỏi", value: "Tired" },
        { label: "Buồn bã", value: "Sad" },
        { label: "Tức giận", value: "Angry" },
        { label: "Lo lắng", value: "Anxious" },
    ];

    const fiveScaleOptions = [
        { label: "Rất tốt", value: "VeryGood" },
        { label: "Tốt", value: "Good" },
        { label: "Bình thường", value: "Normal" },
        { label: "Không tốt", value: "Bad" },
        { label: "Rất kém", value: "VeryBad" },
    ];

    const socialOptions = [
        "Phản ứng khi được gọi tên",
        "Eye contact",
        "Tương tác với bạn bè, người thân",
        "Tham gia trò chơi chung, hoạt động nhóm",
        "Tương tác với phụ huynh",
        "Kiểm soát hành vi bản thân",
        "Khả năng chú ý đối tượng",
    ];

    const independenceOptions = [
        "Tự ăn uống",
        "Đi vệ sinh",
        "Tự mặc/ cởi quần áo",
        "Vệ sinh cá nhân (rửa tay, đánh răng)",
    ];

    const toggleCheckbox = (value: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (list.includes(value)) {
            setList(list.filter(item => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const logData = {
            childId,
            date: new Date().toISOString(),
            sleepHours: typeof sleepHours === 'number' ? sleepHours : 0,
            mood,
            eating,
            behaviorNotes,
            communication,
            socialSkills,
            independence,
            notes,
        };

        try {
            const res = await fetch("/api/daily-log", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logData),
            });

            if (res.ok) {
                toast({
                    title: "Lưu nhật ký thành công!",
                    description: "Dữ liệu của bạn đã được ghi lại.",
                });
                setSleepHours("");
                setMood("");
                setEating("");
                setBehaviorNotes("");
                setCommunication("");
                setSocialSkills([]);
                setIndependence([]);
                setNotes("");
            } else {
                const errorData = await res.json();
                toast({
                    title: "Có lỗi xảy ra",
                    description: errorData.message || "Không thể lưu nhật ký.",
                    variant: "destructive",
                });
            }
        } catch (err) {
            console.error("Network error:", err);
            toast({
                title: "Lỗi kết nối",
                description: "Không thể kết nối tới máy chủ.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="rounded-3xl shadow-xl border-none">
            <CardHeader>
                <CardTitle>Ghi chép hàng ngày</CardTitle>
                <CardDescription>Ghi lại các hoạt động và tâm trạng của trẻ.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Giờ ngủ */}
                    <div>
                        <Label htmlFor="sleep-hours">Giờ ngủ (trong 24 giờ)</Label>
                        <input
                            id="sleep-hours"
                            type="number"
                            value={sleepHours}
                            onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                            className="mt-2 w-full px-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600"
                            placeholder="Nhập số giờ ngủ"
                            min="0"
                            max="24"
                            step="0.5"
                            required
                        />
                    </div>

                    {/* Tâm trạng */}
                    <div>
                        <Label>Tâm trạng của trẻ</Label>
                        <Select onValueChange={(value) => setMood(value)} value={mood} required>
                            {moodOptions.map((option) => (
                                <div key={option.value} value={option.value}>
                                    {option.label}
                                </div>
                            ))}
                        </Select>
                    </div>

                    {/* Ăn uống */}
                    <div>
                        <Label>Ăn uống</Label>
                        <Select onValueChange={(value) => setEating(value)} value={eating} required>
                            {fiveScaleOptions.map((option) => (
                                <div key={option.value} value={option.value}>
                                    {option.label}
                                </div>
                            ))}
                        </Select>
                    </div>

                    {/* Hành vi bất thường */}
                    <div>
                        <Label>Hành vi bất thường trong ngày</Label>
                        <Textarea
                            value={behaviorNotes}
                            onChange={(e) => setBehaviorNotes(e.target.value)}
                            placeholder="Mô tả các hành vi bất thường..."
                            rows={3}
                        />
                    </div>

                    {/* Giao tiếp */}
                    <div>
                        <Label>Giao tiếp</Label>
                        <Select onValueChange={(value) => setCommunication(value)} value={communication} required>
                            {fiveScaleOptions.map((option) => (
                                <div key={option.value} value={option.value}>
                                    {option.label}
                                </div>
                            ))}
                        </Select>
                    </div>

                    {/* Tương tác xã hội & bản thân */}
                    <div>
                        <Label>Tương tác xã hội & bản thân</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            {socialOptions.map((item) => (
                                <label key={item} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={socialSkills.includes(item)}
                                        onChange={() => toggleCheckbox(item, socialSkills, setSocialSkills)}
                                    />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Khả năng tự lập */}
                    <div>
                        <Label>Khả năng tự lập</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            {independenceOptions.map((item) => (
                                <label key={item} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={independence.includes(item)}
                                        onChange={() => toggleCheckbox(item, independence, setIndependence)}
                                    />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Ghi chú khác */}
                    <div>
                        <Label>Ghi chú khác</Label>
                        <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Nhập các ghi chú bổ sung..."
                            rows={3}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Đang lưu..." : "Lưu Nhật ký"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

function MoodChart({ childId }: { childId: string }) {
    const [data, setData] = useState<{ name: string; value: number }[]>([]);

    useEffect(() => {
        if (!childId) return;
        (async () => {
            const res = await fetch(`/api/daily-log/summary?childId=${childId}`);
            if (!res.ok) return;
            const js = await res.json();
            const moods = Object.entries(js.moods || {}).map(([k, v]) => ({
                name: k,
                value: v as number,
            }));
            setData(moods);
        })();
    }, [childId]);

    const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0", "#00BCD4"];
    return (
        <Card>
            <CardHeader>
                <CardTitle>Biểu đồ tâm trạng</CardTitle>
                <CardDescription>Tần suất các tâm trạng được ghi nhận.</CardDescription>
            </CardHeader>
            <CardContent>
                <div style={{ width: "100%", height: 260 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
                                {data.map((_, idx) => (
                                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
// Component DailyLogChart
function DailyLogChart({ childId }: { childId: string }) {
    const [data, setData] = useState<{ date: string, sleep: number }[]>([]);

    useEffect(() => {
        if (!childId) return;
        (async () => {
            const res = await fetch(`/api/daily-log?childId=${childId}`);
            if (!res.ok) {
                console.error("Failed to fetch daily logs:", await res.text());
                return;
            }
            const js = await res.json();
            const items = (js.logs || []).map((l: any) => ({ date: new Date(l.date).toLocaleDateString("vi-VN"), sleep: l.sleepHours || 0 })).reverse();
            setData(items);
        })();
    }, [childId]);
    // Component 2 bieu do tiep theo
    return (
        <Card className="rounded-3xl shadow-xl border-none">
            <CardHeader>
                <CardTitle>Biểu đồ giấc ngủ hàng ngày</CardTitle>
                <CardDescription>Theo dõi số giờ ngủ của trẻ theo từng ngày.</CardDescription>
            </CardHeader>
            <CardContent>
                <div style={{ width: "100%", height: 260 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sleep" strokeWidth={2} className="stroke-blue-500" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

    );
}
function ActivityChart({ childId }: { childId: string }) {
    const [data, setData] = useState<{ name: string; value: number }[]>([]);

    useEffect(() => {
        if (!childId) return;
        (async () => {
            const res = await fetch(`/api/daily-log/summary?childId=${childId}`);
            if (!res.ok) return;
            const js = await res.json();
            const activities = Object.entries(js.activities || {}).map(([k, v]) => ({
                name: k,
                value: v as number,
            }));
            setData(activities);
        })();
    }, [childId]);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Biểu đồ hoạt động</CardTitle>
                <CardDescription>Các hoạt động được ghi chú nhiều nhất.</CardDescription>
            </CardHeader>
            <CardContent>
                <div style={{ width: "100%", height: 260 }}>
                    <ResponsiveContainer>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
// New component for AI Chatbot
// Thay thế toàn bộ component AIChatbot hiện tại bằng component dưới
function AIChatbot({ childId }: { childId?: string }) {
    const [messages, setMessages] = useState<
        { role: "user" | "assistant", content: string, sources?: Array<{ label: string; docId: string; chunkIndex: number; preview?: string }> }[]
    >([
        { role: "assistant", content: "Xin chào! Tôi là trợ lý AI dựa trên dữ liệu riêng của bạn. Bạn cần hỗ trợ gì?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function send(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { role: "user" as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const resp = await fetch("/api/rag/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg.content,
                    conversation: messages.map(m => ({ role: m.role, content: m.content })),
                    childId,  // phải là childId thực của user
                    userId: User?._id, // nên gửi thêm userId
                }),

            });
            const js = await resp.json();
            const assistantMsg = {
                role: "assistant" as const,
                content: js.answer ?? "Xin lỗi, tôi chưa có câu trả lời.",
                sources: js.sources ?? [],
            };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: "assistant", content: "Đã xảy ra lỗi, vui lòng thử lại." }]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="rounded-3xl shadow-xl border-none">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Bot size={24} className="text-purple-500" />
                    <span>Trợ lý AI (RAG)</span>
                </CardTitle>
                <CardDescription>Trả lời dựa trên dữ liệu riêng (hồ sơ, nhật ký, y tế...)</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col h-96 overflow-y-auto pr-2 mb-4 space-y-4">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${m.role === "user"
                                ? "bg-blue-500 text-white rounded-br-none"
                                : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-bl-none"
                                }`}>
                                <div className="whitespace-pre-wrap">{m.content}</div>
                                {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                                    <div className="mt-3 text-xs opacity-90">
                                        <div className="font-semibold mb-1">Nguồn:</div>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {m.sources.map((s, idx) => (
                                                <li key={idx}>
                                                    <span className="font-medium">{s.label}</span>
                                                    {": "}
                                                    <span>{s.docId} (chunk {s.chunkIndex})</span>
                                                    {s.preview ? <> — <em>{s.preview}</em></> : null}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={send} className="flex space-x-2">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập câu hỏi…"
                        rows={1}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading} className="rounded-xl px-4">
                        {isLoading ? "..." : <SendHorizontal size={20} />}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
function IngestButton() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    async function handleIngest() {
        setLoading(true);
        try {
            const res = await fetch("/api/rag/ingest-all", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}), // có thể thêm { userId, childId }
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error("❌ Error ingest:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mb-4">
            <button
                onClick={handleIngest}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
            >
                {loading ? "Đang ingest..." : "Ingest dữ liệu vào Pinecone"}
            </button>

            {result && (
                <pre className="mt-2 p-2 bg-gray-100 rounded text-sm">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
}


// Main Dashboard component
export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [childId, setChildId] = useState<string | null>("66a8779b1248c8949c81c4e7");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleToggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    useEffect(() => {
        const u = sessionStorage.getItem("user");
        if (u) setUser(JSON.parse(u));

        const fetchNotifications = async () => {
            try {
                const response = await fetch('/api/notifications');
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const data = await response.json();
                setNotifications(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col lg:flex-row font-sans">
            {/* Sidebar - Hiệu ứng Glassmorphism */}
            <aside className="w-full lg:w-64 fixed lg:relative z-50 bottom-0 left-0 lg:h-auto h-20 bg-white/20 backdrop-blur-md border-t lg:border-r border-white/30 rounded-t-3xl lg:rounded-3xl p-4 lg:p-6 shadow-xl lg:flex-shrink-0 transition-all duration-300 flex justify-around lg:justify-start lg:block">
                <div className="lg:block hidden">
                    <h2 className="text-2xl font-extrabold mb-8 text-gray-800 dark:text-gray-100">AutismCare</h2>
                    <nav className="space-y-3">
                        <a href="#" className="flex items-center space-x-3 py-3 px-4 rounded-xl text-white bg-blue-600 shadow-md font-semibold transition-all duration-200 hover:bg-blue-700">
                            <BarChart2 size={20} />
                            <span className="lg:inline">Tổng quan</span>
                        </a>
                        <a href="/mycv" className="flex items-center space-x-3 py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <User size={20} />
                            <span className="lg:inline">Thông tin trẻ</span>
                        </a>
                        <a href="/medical" className="flex items-center space-x-3 py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <BriefcaseMedical size={20} />
                            <span className="lg:inline">Thông tin y tế</span>
                        </a>
                        <a href="/community" className="flex items-center space-x-3 py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <MessageSquare size={20} />
                            <span className="lg:inline">Cộng đồng</span>
                        </a>
                    </nav>
                </div>
                <div className="lg:hidden flex justify-around w-full">
                    <a href="#" className="flex flex-col items-center text-blue-600">
                        <BarChart2 size={20} />
                        <span className="text-xs">Tổng quan</span>
                    </a>
                    <a href="/mycv" className="flex flex-col items-center text-gray-700 dark:text-gray-300">
                        <User size={20} />
                        <span className="text-xs">Trẻ</span>
                    </a>
                    <a href="/medical" className="flex flex-col items-center text-gray-700 dark:text-gray-300">
                        <BriefcaseMedical size={20} />
                        <span className="text-xs">Y tế</span>
                    </a>
                    <a href="/community" className="flex flex-col items-center text-gray-700 dark:text-gray-300">
                        <MessageSquare size={20} />
                        <span className="text-xs">CĐ</span>
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-8 mt-16 lg:mt-0">
                <Navbar />
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">Tổng quan</h1>
                </header>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <WelcomeToast name={user?.name} />

                        <DailyLogForm childId={childId || ""} />
                        <IngestButton />
                        <DailyLogChart childId={childId || ""} />
                        {/* SummaryCharts được giữ nguyên */}
                        {/* <SummaryCharts childId={childId || ""} /> */}
                        <MoodChart childId={childId || ""} />
                        <ActivityChart childId={childId || ""} />
                        <AIChatbot />
                    </div>

                    <div className="space-y-8">
                        <Card className="rounded-3xl shadow-xl border-none">
                            <CardHeader>
                                <CardTitle>Tin tức & Thông báo</CardTitle>
                                <CardDescription>Cập nhật các thông tin mới nhất từ AutismCare.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="text-center text-gray-500 dark:text-gray-400">Đang tải...</div>
                                ) : error ? (
                                    <div className="text-center text-red-500 dark:text-red-400">Lỗi: {error}</div>
                                ) : (
                                    <ul className="space-y-4">
                                        {notifications.map((notification) => (
                                            <li
                                                key={notification._id}
                                                className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                                            >
                                                <div
                                                    className="flex items-center justify-between cursor-pointer"
                                                    onClick={() => handleToggleExpand(notification._id)}
                                                >
                                                    <div className="flex items-center space-x-3 text-sm mb-2">
                                                        <Bell size={18} className="text-blue-500 flex-shrink-0" />
                                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                                                            {notification.title}
                                                        </h3>
                                                    </div>
                                                    {expandedId === notification._id ? (
                                                        <ChevronUp size={24} className="text-gray-500 transition-transform duration-300" />
                                                    ) : (
                                                        <ChevronDown size={24} className="text-gray-500 transition-transform duration-300" />
                                                    )}
                                                </div>
                                                <div
                                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedId === notification._id ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                                                >
                                                    <div className="pl-6 text-sm text-gray-600 dark:text-gray-400 space-y-2 max-h-72 overflow-y-auto pr-2">
                                                        {notification.image && (
                                                            <img
                                                                src={notification.image}
                                                                alt={notification.title}
                                                                className="w-full max-h-40 object-cover rounded-xl mb-2 shadow-md"
                                                            />
                                                        )}
                                                        <p>
                                                            <span className="font-medium">Nội dung:</span> {notification.content}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Nguồn:</span> {notification.source}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Ngày:</span> {new Date(notification.date).toLocaleDateString("vi-VN")}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Đường dẫn:</span> <a href={notification.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500 break-words">{notification.link}</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
        </div>
    );
}