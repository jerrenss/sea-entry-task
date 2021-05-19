import csv
with open('./seed/seed-users.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["first_name", "last_name", "username", "password_hash", "is_admin"])
    for i in range(500000):
        writer.writerow(["Dummy User", str(i), "dummyuser" + str(i), "$2a$10$MaET5FoIqu1pr3MJsD6sU.4BKPVrys/qrVBfTi.UxfZCvl7oyQ7Qm", "0"])
    for i in range(500000):
        writer.writerow(["Dummy Admin", str(i), "dummyadmin" + str(i), "$2a$10$6..m.pMmgjAX3/soflCdeuiW1jWRU6GF1/MXfKkyrLqj1oglhmB22", "1"])
