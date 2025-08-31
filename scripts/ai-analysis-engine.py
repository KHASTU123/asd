import json
import numpy as np
from datetime import datetime, timedelta
import random

class AutismDetectionAI:
    def __init__(self):
        self.risk_thresholds = {
            'low': 70,
            'medium': 50,
            'high': 0
        }
        
        self.categories = {
            'social_communication': ['Giao tiếp xã hội', 'Tương tác xã hội'],
            'repetitive_behavior': ['Hành vi lặp lại'],
            'language': ['Ngôn ngữ']
        }
        
        self.recommendations_pool = {
            'low_risk': [
                'Tiếp tục theo dõi hàng ngày',
                'Duy trì các hoạt động tương tác xã hội',
                'Khuyến khích giao tiếp bằng mắt',
                'Tham gia các hoạt động nhóm phù hợp'
            ],
            'medium_risk': [
                'Tăng cường hoạt động tương tác xã hội',
                'Tham khảo ý kiến bác sĩ chuyên khoa',
                'Thực hiện can thiệp sớm tại nhà',
                'Tham gia các lớp kỹ năng xã hội'
            ],
            'high_risk': [
                'Liên hệ ngay với bác sĩ chuyên khoa',
                'Đánh giá chuyên sâu về phát triển',
                'Bắt đầu can thiệp chuyên nghiệp',
                'Tham gia chương trình hỗ trợ gia đình'
            ]
        }
        
        self.strengths_pool = [
            'Khả năng giao tiếp bằng mắt tốt',
            'Phản ứng tích cực với âm thanh',
            'Khả năng tương tác xã hội ổn định',
            'Sử dụng cử chỉ giao tiếp hiệu quả',
            'Hiểu và thực hiện chỉ dẫn tốt',
            'Khả năng bắt chước hành động',
            'Tìm kiếm sự an ủi khi cần'
        ]
        
        self.concerns_pool = [
            'Cần cải thiện tương tác xã hội',
            'Giảm hành vi lặp lại',
            'Tăng cường giao tiếp bằng mắt',
            'Phát triển kỹ năng ngôn ngữ',
            'Cải thiện phản ứng với tên gọi',
            'Tăng khả năng chia sẻ quan tâm',
            'Giảm sự ám ảnh với vật thể'
        ]

    def analyze_assessments(self, assessments):
        """
        Analyze daily assessments and generate AI insights
        """
        if len(assessments) < 3:
            return {
                'error': 'Insufficient data',
                'message': 'Need at least 3 days of assessments'
            }
        
        # Calculate metrics
        scores = [assessment['percentage'] for assessment in assessments]
        average_score = np.mean(scores)
        trend = scores[-1] - scores[0] if len(scores) > 1 else 0
        
        # Determine risk level
        risk_level = self._determine_risk_level(average_score)
        
        # Generate insights
        strengths = self._generate_strengths(assessments, average_score)
        concerns = self._generate_concerns(assessments, average_score)
        recommendations = self._generate_recommendations(risk_level)
        
        # Calculate category scores
        category_analysis = self._analyze_categories(assessments)
        
        return {
            'average_score': round(average_score, 1),
            'trend': round(trend, 1),
            'risk_level': risk_level,
            'strengths': strengths,
            'concerns': concerns,
            'recommendations': recommendations,
            'category_analysis': category_analysis,
            'confidence_score': self._calculate_confidence(len(assessments)),
            'analysis_date': datetime.now().isoformat()
        }
    
    def _determine_risk_level(self, average_score):
        """Determine risk level based on average score"""
        if average_score >= self.risk_thresholds['low']:
            return 'low'
        elif average_score >= self.risk_thresholds['medium']:
            return 'medium'
        else:
            return 'high'
    
    def _generate_strengths(self, assessments, average_score):
        """Generate strengths based on assessment data"""
        strengths = []
        
        # Add strengths based on score
        if average_score >= 70:
            strengths.extend(random.sample(self.strengths_pool, 3))
        elif average_score >= 50:
            strengths.extend(random.sample(self.strengths_pool, 2))
        else:
            strengths.extend(random.sample(self.strengths_pool, 1))
        
        return strengths[:3]  # Limit to 3 strengths
    
    def _generate_concerns(self, assessments, average_score):
        """Generate concerns based on assessment data"""
        concerns = []
        
        # Add concerns based on score
        if average_score < 50:
            concerns.extend(random.sample(self.concerns_pool, 3))
        elif average_score < 70:
            concerns.extend(random.sample(self.concerns_pool, 2))
        else:
            concerns.extend(random.sample(self.concerns_pool, 1))
        
        return concerns[:3]  # Limit to 3 concerns
    
    def _generate_recommendations(self, risk_level):
        """Generate recommendations based on risk level"""
        return random.sample(self.recommendations_pool[f'{risk_level}_risk'], 4)
    
    def _analyze_categories(self, assessments):
        """Analyze performance by category"""
        # This would analyze specific question categories
        # For now, return mock data
        return {
            'social_communication': random.randint(60, 90),
            'repetitive_behavior': random.randint(50, 85),
            'language': random.randint(55, 88)
        }
    
    def _calculate_confidence(self, num_assessments):
        """Calculate confidence score based on data amount"""
        if num_assessments >= 7:
            return 95
        elif num_assessments >= 5:
            return 85
        elif num_assessments >= 3:
            return 75
        else:
            return 60

# Example usage
if __name__ == "__main__":
    # Mock assessment data
    mock_assessments = [
        {'date': '2024-01-13', 'percentage': 75, 'total_score': 22, 'max_score': 30},
        {'date': '2024-01-14', 'percentage': 78, 'total_score': 23, 'max_score': 30},
        {'date': '2024-01-15', 'percentage': 85, 'total_score': 25, 'max_score': 30}
    ]
    
    ai = AutismDetectionAI()
    result = ai.analyze_assessments(mock_assessments)
    
    print(json.dumps(result, indent=2, ensure_ascii=False))
