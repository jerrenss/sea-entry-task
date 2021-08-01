import csv
with open('./user-login-csv/user-login-all.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["username", "password"])
    for i in range(500):
        writer.writerow(["user" + str(i), "password" + str(i)])

with open('./user-login-csv/user-login-100.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["username", "password"])
    for i in range(0, 100):
        writer.writerow(["user" + str(i), "password" + str(i)])

with open('./user-login-csv/user-login-200.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["username", "password"])
    for i in range(100, 200):
        writer.writerow(["user" + str(i), "password" + str(i)])

with open('./user-login-csv/user-login-300.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["username", "password"])
    for i in range(200, 300):
        writer.writerow(["user" + str(i), "password" + str(i)])

with open('./user-login-csv/user-login-400.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["username", "password"])
    for i in range(300, 400):
        writer.writerow(["user" + str(i), "password" + str(i)])

with open('./user-login-csv/user-login-500.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["username", "password"])
    for i in range(400, 500):
        writer.writerow(["user" + str(i), "password" + str(i)])
