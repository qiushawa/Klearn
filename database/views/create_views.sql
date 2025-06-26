-- view: 學生提交總覽
CREATE VIEW student_submission_overview AS
SELECT
    s.id AS student_id,
    s.student_number,
    s.name AS student_name,
    c.class_name,
    COUNT(DISTINCT sub.question_id) AS total_questions_attempted,
    COUNT(DISTINCT CASE WHEN sub.status = 'Accepted' THEN sub.question_id END) AS total_questions_solved,
    COALESCE(SUM(CASE WHEN sub.status = 'Accepted' THEN q.difficulty * 100 ELSE 0 END), 0) AS total_points
FROM
    students s
    LEFT JOIN classes c ON s.class_id = c.id
    LEFT JOIN submissions sub ON s.id = sub.student_id
    LEFT JOIN questions q ON sub.question_id = q.id
GROUP BY
    s.id, s.student_number, s.name, c.class_name;

-- view: 學生排名
CREATE VIEW student_ranking AS
SELECT
    sso.student_id,
    sso.student_number,
    sso.student_name,
    sso.class_name,
    sso.total_questions_attempted,
    sso.total_questions_solved,
    sso.total_points,
    RANK() OVER (PARTITION BY sso.class_name ORDER BY sso.total_points DESC, sso.total_questions_solved DESC) AS class_rank,
    RANK() OVER (ORDER BY sso.total_points DESC, sso.total_questions_solved DESC) AS school_rank
FROM
    student_submission_overview sso
ORDER BY
    sso.total_points DESC, sso.total_questions_solved DESC;
