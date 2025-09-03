"use client";
import React, { useState, useEffect } from 'react';

// Định nghĩa interface cho kiểu dữ liệu của một bài viết
interface Post {
  title: string;
  content: string;
  author: string;
  date: string;
}

// Component chính
const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Dữ liệu mẫu ban đầu
  const initialPosts: Post[] = [
    {
      title: 'Bí quyết học lập trình hiệu quả',
      content: 'Mình đã học lập trình trong 2 năm và thấy rằng việc thực hành mỗi ngày rất quan trọng. Mọi người có bí quyết gì khác không?',
      author: 'Nguyễn Văn A',
      date: '15/10/2023'
    },
    {
      title: 'Những cuốn sách hay về phát triển bản thân',
      content: 'Chào cả nhà, mình muốn tìm một vài cuốn sách hay để phát triển kỹ năng mềm. Có ai giới thiệu cho mình không?',
      author: 'Lê Thị B',
      date: '14/10/2023'
    },
    {
      title: 'Review khóa học online',
      content: 'Mình vừa hoàn thành một khóa học về thiết kế UI/UX và thấy rất hữu ích. Có bạn nào muốn biết thêm chi tiết không?',
      author: 'Trần C',
      date: '13/10/2023'
    }
  ];

  // Giả lập việc tải dữ liệu ban đầu
  useEffect(() => {
    setTimeout(() => {
      setPosts(initialPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Xử lý khi người dùng đăng bài
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() === '' || newContent.trim() === '') {
      setModalMessage('Vui lòng nhập đầy đủ tiêu đề và nội dung!');
      setShowModal(true);
      return;
    }

    const newPost: Post = {
      title: newTitle,
      content: newContent,
      author: 'Bạn', // Tên cố định cho ví dụ
      date: new Date().toLocaleDateString('vi-VN'),
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');

    setModalMessage('Bài viết của bạn đã được đăng thành công!');
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 md:p-8">
      {/* Thêm script Tailwind CSS */}
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="container mx-auto">
        {/* Tiêu đề trang Cộng đồng */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">Cộng Đồng Cùng Nhau Phát Triển</h1>
          <p className="mt-2 text-lg text-gray-600">Nơi chia sẻ, học hỏi và kết nối.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Khu vực tạo bài viết mới */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tạo Bài Viết Mới</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="post-title" className="block text-gray-700 font-medium mb-1">Tiêu đề</label>
                  <input
                    type="text"
                    id="post-title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Nhập tiêu đề bài viết..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="post-content" className="block text-gray-700 font-medium mb-1">Nội dung</label>
                  <textarea
                    id="post-content"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Chia sẻ suy nghĩ của bạn..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-300"
                >
                  Đăng Bài
                </button>
              </form>
            </div>
          </div>

          {/* Khu vực hiển thị các bài viết */}
          <div className="md:col-span-2 space-y-6">
            {isLoading ? (
              <div className="text-center text-gray-500 mt-10">Đang tải bài viết...</div>
            ) : posts.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">Chưa có bài viết nào. Hãy là người đầu tiên đăng bài!</div>
            ) : (
              posts.map((post, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="text-sm text-gray-500">
                    <span className="mr-4">Đăng bởi: {post.author}</span>
                    <span>Ngày: {post.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <p className="mb-4 font-semibold text-gray-800">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
