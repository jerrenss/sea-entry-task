import csv
with open('./user-create-csv/user-create-all.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["first_name", "last_name", "username", "password", "is_admin"])
    for i in range(500):
        writer.writerow(["User", "" + str(i),  "user" + str(i), "password" + str(i), "false"])

with open('./user-create-csv/user-create-100.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["first_name", "last_name", "username", "password", "is_admin"])
    for i in range(0, 100):
        writer.writerow(["User", "" + str(i),  "user" + str(i), "password" + str(i), "false"])

with open('./user-create-csv/user-create-200.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["first_name", "last_name", "username", "password", "is_admin"])
    for i in range(100, 200):
        writer.writerow(["User", "" + str(i),  "user" + str(i), "password" + str(i), "false"])

with open('./user-create-csv/user-create-300.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["first_name", "last_name", "username", "password", "is_admin"])
    for i in range(200, 300):
        writer.writerow(["User", "" + str(i),  "user" + str(i), "password" + str(i), "false"])

with open('./user-create-csv/user-create-400.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["first_name", "last_name", "username", "password", "is_admin"])
    for i in range(300, 400):
        writer.writerow(["User", "" + str(i),  "user" + str(i), "password" + str(i), "false"])

with open('./user-create-csv/user-create-500.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["first_name", "last_name", "username", "password", "is_admin"])
    for i in range(400, 500):
        writer.writerow(["User", "" + str(i),  "user" + str(i), "password" + str(i), "false"])
