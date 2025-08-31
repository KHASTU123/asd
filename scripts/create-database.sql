-- Create database schema for autism detection system

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Children table
CREATE TABLE IF NOT EXISTS children (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    current_concerns TEXT,
    previous_assessments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessment questions table
CREATE TABLE IF NOT EXISTS assessment_questions (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    question_order INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessment options table
CREATE TABLE IF NOT EXISTS assessment_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES assessment_questions(id) ON DELETE CASCADE,
    option_text VARCHAR(255) NOT NULL,
    option_value VARCHAR(10) NOT NULL,
    score INTEGER NOT NULL,
    option_order INTEGER NOT NULL
);

-- Daily assessments table
CREATE TABLE IF NOT EXISTS daily_assessments (
    id SERIAL PRIMARY KEY,
    child_id INTEGER REFERENCES children(id) ON DELETE CASCADE,
    assessment_date DATE NOT NULL,
    total_score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(child_id, assessment_date)
);

-- Assessment answers table
CREATE TABLE IF NOT EXISTS assessment_answers (
    id SERIAL PRIMARY KEY,
    assessment_id INTEGER REFERENCES daily_assessments(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES assessment_questions(id) ON DELETE CASCADE,
    option_id INTEGER REFERENCES assessment_options(id) ON DELETE CASCADE,
    answer_value VARCHAR(10) NOT NULL,
    score INTEGER NOT NULL
);

-- AI analysis results table
CREATE TABLE IF NOT EXISTS ai_analysis_results (
    id SERIAL PRIMARY KEY,
    child_id INTEGER REFERENCES children(id) ON DELETE CASCADE,
    analysis_date DATE NOT NULL,
    average_score DECIMAL(5,2) NOT NULL,
    trend_score DECIMAL(5,2) NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    strengths TEXT[],
    concerns TEXT[],
    recommendations TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Emergency contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    hours VARCHAR(100) NOT NULL,
    contact_type VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_children_user_id ON children(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_assessments_child_id ON daily_assessments(child_id);
CREATE INDEX IF NOT EXISTS idx_daily_assessments_date ON daily_assessments(assessment_date);
CREATE INDEX IF NOT EXISTS idx_assessment_answers_assessment_id ON assessment_answers(assessment_id);
CREATE INDEX IF NOT EXISTS idx_ai_analysis_child_id ON ai_analysis_results(child_id);
