# Soal 1
Add a employee, name: albert, postion: engineer, join date: 24-Jan-24, year of experience: 2.5, salary: 50

```sql
INSERT INTO employee (name, position, join_date, release_date, year_of_experience, salary)
VALUES ('Albert', 'Engineer', '2024-01-24', NULL, 2.5, 50);
```

# Soal 2
Update table, position: engineer -> salary: 85

```sql
UPDATE employee
SET salary = 85
WHERE position = 'Engineer';
```

# Soal 3
Calculate total salary expenses in 2021

```sql
SELECT SUM(salary) AS total_salary
FROM employee
WHERE join_date <= '2021-12-31' AND (release_date IS NULL OR release_date >= '2021-01-01');
```

# Soal 4
Sorting 3 employees with the most years of experience

```sql
SELECT *
FROM employee
ORDER BY year_of_experience DESC
LIMIT 3;
```

# Soal 5
Subquery for employee with position: engineer who have experience <= 3 years

```sql
SELECT *
FROM employee
WHERE year_of_experience <= (
    SELECT 3
) AND position = 'Engineer';
```