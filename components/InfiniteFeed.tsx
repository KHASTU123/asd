"use client";

import useSWR from "swr";
import PostCard from "./PostCard";

export type Post = {
    _id: string;
    author: { name: string; avatar?: string };
    content: string;
    media?: { url: string; kind: "image" | "video" }[];
    likes: string[];
    commentsCount: number;
    createdAt: string;
};

const fetcher = (url: string) =>
    fetch(url).then(async (res) => {
        const json = await res.json();
        return json.data ?? json; // nếu API bọc trong {data: [...]}
    });


export default function InfiniteFeed() {
    const { data, error, mutate } = useSWR<Post[]>("/api/posts", fetcher);

    if (error) return <p className="text-red-500">Lỗi tải feed</p>;
    if (!data) return <p>Đang tải...</p>;

    return (
        <div className="space-y-4">
            {Array.isArray(data) &&
                data.map((post) => (
                    <PostCard key={post._id} post={post} onMutateFeed={mutate} />
                ))}
        </div>
    );
}
