-- Seed data for autism detection system

-- Insert assessment questions
INSERT INTO assessment_questions (category, question, question_order) VALUES
('Giao tiếp xã hội', 'Trẻ có nhìn vào mắt bạn khi bạn nói chuyện không?', 1),
('Giao tiếp xã hội', 'Trẻ có phản ứng khi được gọi tên không?', 2),
('Hành vi lặp lại', 'Trẻ có thực hiện các động tác lặp lại (vỗ tay, lắc người) không?', 3),
('Tương tác xã hội', 'Trẻ có chơi cùng với trẻ khác không?', 4),
('Ngôn ngữ', 'Trẻ có sử dụng cử chỉ để giao tiếp (chỉ tay, vẫy tay) không?', 5),
('Giao tiếp xã hội', 'Trẻ có chia sẻ sự quan tâm với người khác không?', 6),
('Hành vi lặp lại', 'Trẻ có bị ám ảnh với các vật thể cụ thể không?', 7),
('Tương tác xã hội', 'Trẻ có tìm kiếm sự an ủi khi buồn không?', 8),
('Ngôn ngữ', 'Trẻ có hiểu các chỉ dẫn đơn giản không?', 9),
('Giao tiếp xã hội', 'Trẻ có bắt chước hành động của người khác không?', 10);

-- Insert assessment options for question 1
INSERT INTO assessment_options (question_id, option_text, option_value, score, option_order) VALUES
(1, 'Không bao giờ', '0', 0, 1),
(1, 'Hiếm khi', '1', 1, 2),
(1, 'Thỉnh thoảng', '2', 2, 3),
(1, 'Thường xuyên', '3', 3, 4);

-- Insert assessment options for question 2
INSERT INTO assessment_options (question_id, option_text, option_value, score, option_order) VALUES
(2, 'Không phản ứng', '0', 0, 1),
(2, 'Hiếm khi phản ứng', '1', 1, 2),
(2, 'Thỉnh thoảng phản ứng', '2', 2, 3),
(2, 'Luôn phản ứng', '3', 3, 4);

-- Insert assessment options for question 3 (reverse scoring)
INSERT INTO assessment_options (question_id, option_text, option_value, score, option_order) VALUES
(3, 'Không bao giờ', '3', 3, 1),
(3, 'Hiếm khi', '2', 2, 2),
(3, 'Thỉnh thoảng', '1', 1, 3),
(3, 'Thường xuyên', '0', 0, 4);

-- Insert assessment options for question 4
INSERT INTO assessment_options (question_id, option_text, option_value, score, option_order) VALUES
(4, 'Không bao giờ', '0', 0, 1),
(4, 'Hiếm khi', '1', 1, 2),
(4, 'Thỉnh thoảng', '2', 2, 3),
(4, 'Thường xuyên', '3', 3, 4);

-- Insert assessment options for question 5
INSERT INTO assessment_options (question_id, option_text, option_value, score, option_order) VALUES
(5, 'Không bao giờ', '0', 0, 1),
(5, 'Hiếm khi', '1', 1, 2),
(5, 'Thỉnh thoảng', '2', 2, 3),
(5, 'Thường xuyên', '3', 3, 4);

-- Continue with remaining questions (6-10) with similar pattern
INSERT INTO assessment_options (question_id, option_text, option_value, score, option_order) VALUES
(6, 'Không bao giờ', '0', 0, 1),
(6, 'Hiếm khi', '1', 1, 2),
(6, 'Thỉnh thoảng', '2', 2, 3),
(6, 'Thường xuyên', '3', 3, 4),

(7, 'Không bao giờ', '3', 3, 1),
(7, 'Hiếm khi', '2', 2, 2),
(7, 'Thỉnh thoảng', '1', 1, 3),
(7, 'Thường xuyên', '0', 0, 4),

(8, 'Không bao giờ', '0', 0, 1),
(8, 'Hiếm khi', '1', 1, 2),
(8, 'Thỉnh thoảng', '2', 2, 3),
(8, 'Thường xuyên', '3', 3, 4),

(9, 'Không bao giờ', '0', 0, 1),
(9, 'Hiếm khi', '1', 1, 2),
(9, 'Thỉnh thoảng', '2', 2, 3),
(9, 'Thường xuyên', '3', 3, 4),

(10, 'Không bao giờ', '0', 0, 1),
(10, 'Hiếm khi', '1', 1, 2),
(10, 'Thỉnh thoảng', '2', 2, 3),
(10, 'Thường xuyên', '3', 3, 4);

-- Insert emergency contacts
INSERT INTO emergency_contacts (name, specialty, phone, address, hours, contact_type) VALUES
('Bệnh viện Nhi Trung ương', 'Tâm lý trẻ em & Phát triển', '024 3974 3556', '18/879 La Thành, Đống Đa, Hà Nội', '24/7', 'hospital'),
('BS. Nguyễn Thị Lan Anh', 'Chuyên khoa Tâm lý phát triển', '0912 345 678', 'Phòng khám ABC, Cầu Giấy, Hà Nội', '8:00 - 17:00 (T2-T6)', 'doctor'),
('Trung tâm Can thiệp sớm', 'Can thiệp tự kỷ & Phát triển', '024 3555 1234', '123 Nguyễn Trãi, Thanh Xuân, Hà Nội', '8:00 - 18:00 (T2-T7)', 'center'),
('Hotline Hỗ trợ Tâm lý', 'Tư vấn tâm lý 24/7', '1900 1234', 'Tư vấn qua điện thoại', '24/7', 'hotline'),
('Bệnh viện Bạch Mai', 'Khoa Nhi - Tâm lý', '024 3869 3731', '78 Giải Phóng, Đống Đa, Hà Nội', '24/7', 'hospital'),
('BS. Trần Văn Minh', 'Bác sĩ Nhi khoa', '0987 654 321', 'Phòng khám XYZ, Ba Đình, Hà Nội', '8:00 - 18:00 (T2-T7)', 'doctor');
