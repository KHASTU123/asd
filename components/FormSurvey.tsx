"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
// Component để hiển thị điểm số
const ScoreBadge = ({ v }) => {
    const getRiskColor = (value: number) => {
        if (value >= 0.6) return "bg-red-500";
        if (value >= 0.4) return "bg-yellow-500";
        return "bg-green-500";
    };
    return (
        <div
            className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getRiskColor(
                v
            )}`}
        >
            {v.toFixed(2)}
        </div>
    );
};

// Component Biểu đồ kết quả
const ResultChart = ({
    domainScores,
    overallRisk,
}: {
    domainScores: { domain: string; value: number }[];
    overallRisk: number;
}) => {
    const getRiskColor = (value: number) => {
        if (value >= 0.6) return "bg-red-500";
        if (value >= 0.4) return "bg-yellow-500";
        return "bg-green-500";
    };
    const getRiskLabel = (value: number) => {
        if (value >= 0.6) return "Cao";
        if (value >= 0.4) return "Trung bình";
        return "Thấp";
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-200 w-full max-w-lg mx-auto font-sans">
            <h2 className="text-2xl font-bold text-center text-emerald-800 mb-6">
                Kết quả Phân tích
            </h2>
            <div className="flex items-center justify-between p-4 mb-4 rounded-xl border border-gray-200">
                <span className="text-lg font-semibold">Tổng rủi ro:</span>
                <div
                    className={`px-4 py-2 rounded-full font-bold text-white ${getRiskColor(
                        overallRisk
                    )}`}
                >
                    {getRiskLabel(overallRisk)}
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-2">
                    Điểm rủi ro theo lĩnh vực
                </h3>
                {domainScores.map((score, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <span className="w-16 font-medium text-right text-gray-600">
                            {score.domain}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ease-out ${getRiskColor(
                                    score.value
                                )}`}
                                style={{ width: `${(score.value * 100).toFixed(0)}%` }}
                            ></div>
                        </div>
                        <span className="w-8 text-sm font-semibold text-gray-800">
                            {(score.value * 100).toFixed(0)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Modal thông báo
const Modal = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="relative p-8 border w-96 shadow-lg rounded-xl bg-white text-center">
            <div className="text-xl font-semibold mb-4 text-gray-800">Thông báo</div>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
                onClick={onClose}
                className="px-6 py-2 bg-emerald-600 text-white text-base font-semibold rounded-lg hover:bg-emerald-700"
            >
                Đóng
            </button>
        </div>
    </div>
);

// Spinner loading
const LoadingSpinner = () => (
    <svg
        className="animate-spin h-5 w-5 text-white inline"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

// Thang đo Likert
const LIKERT = [
    { value: 0, label: "0 — Không bao giờ" },
    { value: 1, label: "1 — Hiếm khi" },
    { value: 2, label: "2 — Thỉnh thoảng" },
    { value: 3, label: "3 — Thường xuyên" },
    { value: 4, label: "4 — Luôn luôn" },
];

// Nhóm tuổi
const groups = [
    { key: "12_24", label: "12–24 tháng" },
    { key: "24_48", label: "24–48 tháng" },
    { key: "48_plus", label: "48 tháng trở lên" },
];

// Bộ câu hỏi đầy đủ
const BANK = {
    "12_24": {
        items: [
            { code: "12_24_Q01", domain: "A1", text: "Bé phản ứng (quay đầu/nhìn) khi được gọi tên.", reverse: true },
            { code: "12_24_Q02", domain: "A2", text: "Bé chỉ tay để chia sẻ điều bé thích.", reverse: true },
            { code: "12_24_Q03", domain: "A2", text: "Bé nhìn theo hướng bạn chỉ.", reverse: true },
            { code: "12_24_Q04", domain: "A2", text: "Bé giao tiếp bằng mắt khi tương tác.", reverse: true },
            { code: "12_24_Q05", domain: "A1", text: "Bé bắt chước cử chỉ đơn giản (vỗ tay, vẫy tay).", reverse: true },
            { code: "12_24_Q06", domain: "A1", text: "Bé tham gia trò chơi qua lại (ú òa, đưa–nhận đồ).", reverse: true },
            { code: "12_24_Q07", domain: "A3", text: "Bé có hành vi chơi giả vờ đơn giản.", reverse: true },
            { code: "12_24_Q08", domain: "A1", text: "Bé chủ động tìm người lớn để chia sẻ.", reverse: true },
            { code: "12_24_Q09", domain: "A1", text: "Bé nhìn cha mẹ để tham khảo khi gặp tình huống lạ.", reverse: true },
            { code: "12_24_Q10", domain: "A1", text: "Bé làm theo yêu cầu đơn giản không kèm cử chỉ.", reverse: true },
            { code: "12_24_Q11", domain: "B1", text: "Bé có cử động lặp lại (lắc người, vẫy tay)." },
            { code: "12_24_Q12", domain: "B3", text: "Bé nhìn chằm chằm vào vật quay/ánh sáng." },
            { code: "12_24_Q13", domain: "B1", text: "Bé xếp đồ vật theo hàng." },
            { code: "12_24_Q14", domain: "B2", text: "Bé khó chịu khi thay đổi thói quen." },
            { code: "12_24_Q15", domain: "B4", text: "Bé nhạy cảm với âm thanh (bịt tai, sợ tiếng ồn)." },
            { code: "12_24_Q16", domain: "B4", text: "Bé khó chịu khi thay quần áo/chạm vào vải." },
            { code: "12_24_Q17", domain: "B4", text: "Bé thích được đung đưa, xoay." },
            { code: "12_24_Q18", domain: "B1", text: "Bé đưa tay gần mắt, nhìn tay bất thường." },
            { code: "12_24_Q19", domain: "B1", text: "Bé phát âm lặp lại không nhằm giao tiếp." },
            { code: "12_24_Q20", domain: "B3", text: "Bé ít quan tâm chơi đúng chức năng đồ chơi." },
            { code: "12_24_Q21", domain: "A1", text: "Bé cười hoặc tỏ cảm xúc khi chơi với cha mẹ.", reverse: true },
            { code: "12_24_Q22", domain: "A2", text: "Bé biết giơ tay để được bế.", reverse: true },
            { code: "12_24_Q23", domain: "B2", text: "Bé lặp lại cùng một hành vi nhiều lần mỗi ngày." },
            { code: "12_24_Q24", domain: "B4", text: "Bé rất nhạy cảm với nhiệt độ (nóng/lạnh)." },
            { code: "12_24_Q25", domain: "A3", text: "Bé cố gắng tham gia khi thấy người khác chơi.", reverse: true },
        ],
        essay: [
            { code: "12_24_E01", text: "Mô tả một tình huống gần đây bé phản ứng khi bạn gọi tên." },
            { code: "12_24_E02", text: "Kể về hành vi lặp lại bạn thấy nổi bật ở bé." },
            { code: "12_24_E03", text: "Điều khiến bạn lo lắng nhất về phát triển của bé hiện nay." },
            { code: "12_24_E04", text: "Mô tả một thói quen hàng ngày mà bé thực hiện giống hệt nhau." },
            { code: "12_24_E05", text: "Bạn có nhận thấy bé có phản ứng đặc biệt với âm thanh/ánh sáng không?" },
        ],
        domainFactors: { A1: 0.2, A2: 0.3, A3: 0.5, B1: 0.8 },
    },
    "24_48": {
        items: [
            { code: "24_48_Q01", domain: "A1", text: "Bé ghép 2–3 từ để diễn đạt nhu cầu.", reverse: true },
            { code: "24_48_Q02", domain: "A1", text: "Bé hiểu yêu cầu 2 bước.", reverse: true },
            { code: "24_48_Q03", domain: "A2", text: "Bé duy trì giao tiếp mắt khi nói/chơi.", reverse: true },
            { code: "24_48_Q04", domain: "A3", text: "Bé chơi giả vờ (đóng vai).", reverse: true },
            { code: "24_48_Q05", domain: "A3", text: "Bé chủ động chơi cùng bạn.", reverse: true },
            { code: "24_48_Q06", domain: "A1", text: "Bé chia sẻ để thu hút chú ý.", reverse: true },
            { code: "24_48_Q07", domain: "A2", text: "Bé dùng cử chỉ kèm lời nói khi giao tiếp.", reverse: true },
            { code: "24_48_Q08", domain: "A3", text: "Bé biết chờ đến lượt trong chơi.", reverse: true },
            { code: "24_48_Q09", domain: "A1", text: "Bé gọi tên để thu hút tương tác.", reverse: true },
            { code: "24_48_Q10", domain: "A2", text: "Bé phản ứng với cảm xúc người khác.", reverse: true },
            { code: "24_48_Q11", domain: "B1", text: "Bé lặp lại lời người khác (echolalia)." },
            { code: "24_48_Q12", domain: "B1", text: "Bé lặp lại đoạn thoại cố định." },
            { code: "24_48_Q13", domain: "B3", text: "Bé gắn bó quá mức với một đồ vật." },
            { code: "24_48_Q14", domain: "B1", text: "Bé xếp hàng đồ vật theo trật tự cứng nhắc." },
            { code: "24_48_Q15", domain: "B2", text: "Bé khó chịu khi thay đổi lịch trình." },
            { code: "24_48_Q16", domain: "B2", text: "Bé có nghi thức cứng nhắc." },
            { code: "24_48_Q17", domain: "B3", text: "Bé quan tâm mạnh đến một chủ đề hẹp." },
            { code: "24_48_Q18", domain: "B4", text: "Bé nhạy cảm với âm thanh." },
            { code: "24_48_Q19", domain: "B4", text: "Bé kén ăn mạnh." },
            { code: "24_48_Q20", domain: "B1", text: "Bé có cử động lặp lại (vẫy tay, nhảy tại chỗ)." },
            { code: "24_48_Q21", domain: "A1", text: "Bé dùng câu ngắn để kể chuyện.", reverse: true },
            { code: "24_48_Q22", domain: "A2", text: "Bé hiểu cử chỉ chỉ trỏ hoặc gật lắc của người khác.", reverse: true },
            { code: "24_48_Q23", domain: "A3", text: "Bé mời bạn tham gia khi chơi.", reverse: true },
            { code: "24_48_Q24", domain: "B2", text: "Bé phản ứng mạnh nếu đồ vật bị di chuyển." },
            { code: "24_48_Q25", domain: "B4", text: "Bé thích chạm hoặc ngửi đồ vật bất thường." },
        ],
        essay: [
            { code: "24_48_E01", text: "Mô tả một lần gần đây bé chơi với bạn/anh chị." },
            { code: "24_48_E02", text: "Kể về phản ứng của bé khi lịch trình thay đổi." },
            { code: "24_48_E03", text: "Mô tả một hành vi lặp lại bạn thấy rõ." },
            { code: "24_48_E04", text: "Bạn có nhận thấy bé dễ kết bạn hay thường chơi một mình?" },
            { code: "24_48_E05", text: "Mô tả phản ứng của bé với tiếng ồn lớn hoặc nơi đông người." },],
        domainFactors: { A1: 0.3, A2: 0.4, A3: 0.5, B1: 0.7 },
    },
    "48_plus": {
        items: [
            { code: "48_plus_Q01", domain: "A1", text: "Bé có thể kể chuyện có mở–giữa–kết.", reverse: true },
            { code: "48_plus_Q02", domain: "A1", text: "Bé duy trì hội thoại luân phiên.", reverse: true },
            { code: "48_plus_Q03", domain: "A1", text: "Bé hiểu câu hỏi 'vì sao'/'như thế nào'.", reverse: true },
            { code: "48_plus_Q04", domain: "A2", text: "Bé sử dụng ánh mắt, nét mặt khi nói.", reverse: true },
            { code: "48_plus_Q05", domain: "A2", text: "Bé hiểu và phản ứng với biểu cảm người khác.", reverse: true },
            { code: "48_plus_Q06", domain: "A3", text: "Bé có bạn thân và duy trì mối quan hệ.", reverse: true },
            { code: "48_plus_Q07", domain: "A3", text: "Bé tham gia chơi theo nhóm có luật.", reverse: true },
            { code: "48_plus_Q08", domain: "A3", text: "Bé chuyển hoạt động theo yêu cầu mà không khó chịu.", reverse: true },
            { code: "48_plus_Q09", domain: "ADL", text: "Bé tự lập cơ bản (mặc đồ, vệ sinh).", reverse: true },
            { code: "48_plus_Q10", domain: "ADL", text: "Bé chú ý và làm việc theo hướng dẫn trong lớp.", reverse: true },
            { code: "48_plus_Q11", domain: "B1", text: "Bé dùng ngôn ngữ/cử chỉ lặp lại." },
            { code: "48_plus_Q12", domain: "B3", text: "Bé có sở thích hẹp, nói nhiều về 1 chủ đề." },
            { code: "48_plus_Q13", domain: "B2", text: "Bé cần tuân thủ nghi thức cứng nhắc." },
            { code: "48_plus_Q14", domain: "B2", text: "Bé khó chịu mạnh khi lịch trình thay đổi." },
            { code: "48_plus_Q15", domain: "B4", text: "Bé nhạy cảm với âm thanh/ánh sáng/đám đông." },
            { code: "48_plus_Q16", domain: "B4", text: "Bé tìm kiếm cảm giác mạnh." },
            { code: "48_plus_Q17", domain: "B1", text: "Bé có cử động/tư thế cơ thể lặp lại." },
            { code: "48_plus_Q18", domain: "B3", text: "Bé chú ý quá mức vào chi tiết." },
            { code: "48_plus_Q19", domain: "B1", text: "Bé thích sắp xếp đồ vật theo quy tắc riêng." },
            { code: "48_plus_Q20", domain: "A3", text: "Bé gặp khó khăn trong trò chơi tưởng tượng nhóm." },
            { code: "48_plus_Q21", domain: "A1", text: "Bé kể lại sự việc trong ngày theo trình tự.", reverse: true },
            { code: "48_plus_Q22", domain: "A2", text: "Bé hiểu quy tắc ngầm (chờ lượt, chia sẻ).", reverse: true },
            { code: "48_plus_Q23", domain: "A3", text: "Bé thể hiện sự đồng cảm (an ủi bạn).", reverse: true },
            { code: "48_plus_Q24", domain: "B2", text: "Bé có thói quen phải lặp lại theo cùng cách." },
            { code: "48_plus_Q25", domain: "B4", text: "Bé nhạy cảm bất thường với mùi hoặc vị." },
        ],
        essay: [
            { code: "48_plus_E01", text: "Mô tả cách bé giao tiếp trong lớp/nhóm bạn." },
            { code: "48_plus_E02", text: "Kể về tình huống bé phản ứng khi lịch trình thay đổi." },
            { code: "48_plus_E03", text: "Mô tả thói quen đặc biệt trong sinh hoạt hàng ngày." },
            { code: "48_plus_E04", text: "Bé có thể hiện sự đồng cảm hay chia sẻ cảm xúc không?" },
            { code: "48_plus_E05", text: "Bé gặp khó khăn nào trong việc tuân thủ quy tắc lớp học?" },
        ],
        domainFactors: { A1: 0.2, A2: 0.4, A3: 0.6, B1: 0.3, B2: 0.8 },
    },
};

// Hàm tính điểm
const calculateScores = (answers, ageGroup) => {
    const currentBank = BANK[ageGroup];
    if (!currentBank) return { domainScores: [], overallRisk: 0 };

    const domainScores = {};
    const totalItems = {};

    currentBank.items.forEach((item) => {
        const value = answers[item.code] || 0;
        const score = item.reverse ? 4 - value : value;

        if (!domainScores[item.domain]) {
            domainScores[item.domain] = 0;
            totalItems[item.domain] = 0;
        }
        domainScores[item.domain] += score;
        totalItems[item.domain] += 1;
    });

    const finalDomainScores = Object.keys(domainScores).map((domain) => {
        const avg = domainScores[domain] / totalItems[domain];
        const riskFactor = currentBank.domainFactors[domain] || 1;
        const normalized = (avg / 4) * riskFactor;
        return { domain, value: normalized };
    });

    const overall =
        finalDomainScores.reduce((s, sc) => s + sc.value, 0) /
        finalDomainScores.length;

    return { domainScores: finalDomainScores, overallRisk: overall };
};

// Main component
export default function FormSurvey() {
    const { data: session } = useSession();
    const [parentName, setParentName] = useState("");
    const [childName, setChildName] = useState("");
    const [childAge, setChildAge] = useState("");
    const [ageGroup, setAgeGroup] = useState("");
    const [answers, setAnswers] = useState({});
    const [essays, setEssays] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [domainScores, setDomainScores] = useState([]);
    const [overall, setOverall] = useState(0);

    const currentBank = ageGroup ? BANK[ageGroup] : null;

    const handleAgeChange = (e) => {
        const age = parseInt(e.target.value);
        setChildAge(age);
        if (age >= 12 && age <= 24) setAgeGroup("12_24");
        else if (age > 24 && age <= 48) setAgeGroup("24_48");
        else if (age > 48) setAgeGroup("48_plus");
        else setAgeGroup("");
    };

    const handleAnswerChange = (code, value) => {
        setAnswers({ ...answers, [code]: parseInt(value) });
    };

    const canSubmit =
        parentName &&
        childName &&
        childAge &&
        currentBank &&
        Object.keys(answers).length === currentBank.items.length;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setIsLoading(true);
        const { domainScores, overallRisk } = calculateScores(answers, ageGroup);
        setDomainScores(domainScores);
        setOverall(overallRisk);

        const submissionData = {
            serId: session?.user?.id || session?.user?.email, // sau này thay bằng user thực
            parentName,
            childName,
            childAge,
            ageGroup,
            answers,
            essays,
            domainScores,
            overallRisk,
            timestamp: new Date().toISOString(),
        };

        try {
            const res = await fetch("/api/save-submission", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });

            const data = await res.json();
            if (data.success) {
                setModalMessage("✅ Dữ liệu đã được lưu thành công!");
                setShowModal(true);
                setShowResults(true);

                setParentName("");
                setChildName("");
                setChildAge("");
                setAgeGroup("");
                setAnswers({});
                setEssays({});
            } else {
                setModalMessage("❌ " + data.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            setModalMessage("⚠️ Không thể kết nối server.");
            setShowModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center font-sans">
            <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-2xl border border-emerald-200">
                <h1 className="text-3xl font-bold text-center text-emerald-800 mb-2">
                    Hệ thống Đánh giá Rủi ro
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Vui lòng điền thông tin và trả lời các câu hỏi bên dưới.
                </p>

                {showResults ? (
                    <div className="space-y-6">
                        <ResultChart domainScores={domainScores} overallRisk={overall} />
                        <button
                            onClick={() => setShowResults(false)}
                            className="w-full px-6 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700"
                        >
                            Quay lại
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Họ tên phụ huynh
                                </label>
                                <input
                                    type="text"
                                    value={parentName}
                                    onChange={(e) => setParentName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Tên của bé
                                </label>
                                <input
                                    type="text"
                                    value={childName}
                                    onChange={(e) => setChildName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Tuổi của bé (tháng)
                            </label>
                            <input
                                type="number"
                                value={childAge}
                                onChange={handleAgeChange}
                                className="w-full p-3 border border-gray-300 rounded-xl"
                                required
                                min="12"
                            />
                        </div>

                        {ageGroup && (
                            <>
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                    <h3 className="text-xl font-bold text-emerald-700 mb-4 text-center">
                                        Bộ câu hỏi cho nhóm tuổi: {groups.find((g) => g.key === ageGroup)?.label}
                                    </h3>
                                    <div className="space-y-4">
                                        {currentBank.items.map((item) => (
                                            <div key={item.code} className="bg-white p-4 rounded-xl shadow border border-gray-100">
                                                <p className="text-gray-800 font-medium mb-3">{item.text}</p>
                                                <div className="flex flex-wrap gap-2 justify-between">
                                                    {LIKERT.map((option) => (
                                                        <label key={option.value} className="flex items-center gap-1 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name={item.code}
                                                                value={option.value}
                                                                checked={answers[item.code] === option.value}
                                                                onChange={() => handleAnswerChange(item.code, option.value)}
                                                                className="form-radio text-emerald-600 focus:ring-emerald-500"
                                                                required
                                                            />
                                                            <span className="text-sm text-gray-600">
                                                                {option.label.split("—")[1].trim()}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                    <h3 className="text-xl font-bold text-emerald-700 mb-4 text-center">
                                        Câu hỏi tự luận
                                    </h3>
                                    <p className="text-gray-800 mb-3">{currentBank.essay.text}</p>
                                    <textarea
                                        value={essays[currentBank.essay.code] || ""}
                                        onChange={(e) =>
                                            setEssays({ ...essays, [currentBank.essay.code]: e.target.value })
                                        }
                                        className="w-full h-24 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Nhập câu trả lời của bạn..."
                                    />
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center">
                                    <h2 className="text-xl font-bold text-emerald-700 mb-4">
                                        Kết quả ước tính
                                    </h2>
                                    <p className="text-gray-600 mb-2">
                                        Điểm số sẽ được cập nhật khi bạn trả lời các câu hỏi.
                                    </p>
                                    <div className="flex flex-wrap items-center justify-center gap-4">
                                        <span className="font-semibold text-gray-700">Tổng rủi ro:</span>
                                        <ScoreBadge v={calculateScores(answers, ageGroup).overallRisk} />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!canSubmit || isLoading}
                                    className={`w-full px-6 py-3 rounded-xl font-semibold text-white ${canSubmit && !isLoading
                                        ? "bg-emerald-600 hover:bg-emerald-700"
                                        : "bg-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    {isLoading ? <LoadingSpinner /> : "Lưu Dữ liệu"}
                                </button>
                            </>
                        )}
                    </form>
                )}

                {showModal && (
                    <Modal message={modalMessage} onClose={() => setShowModal(false)} />
                )}
            </div>
        </div>
    );
}
