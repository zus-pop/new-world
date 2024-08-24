CREATE TABLE Category (
	category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
);

CREATE TABLE Product (
	product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    category_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category (category_id)
);

INSERT INTO Category (category_name)
VALUES 	('Đồ gia dụng'),
		('Linh kiện điện tử'),
        ('Quần áo'),
        ('Sách');
        
INSERT INTO Product (product_name, category_id, quantity)
VALUES 	('Nồi chiên không dầu', 2, 30),
		('Nồi cơm điện', 2, 15),
        ('Chảo chống dính Sunhouse', 1, 18),
        ('Áo thun dày vl', 3, 30),
        ('Quần baggy kaki', 3, 25),
        ('Journey To The West', 4, 250),
        ('Atomic Habits', 4, 300),
        ('Thớt gỗ siêu to khổng lồ', 1, 180),
        ('Bộ dụng cụ dao bén vl', 1, 150),
        ('Lò vi sóng', 2, 200),
        ('Bộ bát, đĩa đẹp vl', 1, 280),
        ('Dụng cụ gọt vỏ trái cây', 1, 100),
        ('Máy xay sinh tố', 2, 300),
        ('Bếp điện từ', 2, 280),
        ('Áo sơ mi oversize', 3, 150),
        ('Áo khoác kaki hàn quốc oversize', 3, 300),
        ('Body suit', 3, 80),
        ('How to read a book', 4, 150),
        ('Harry Potter', 4, 200),
        ('Moby-Dick', 4, 250)