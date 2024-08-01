const mysql = require('mysql');
let instance = null;
const client = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "postman"
  });
client.connect((err) => {
    if (err)
        return console.error(err);
    console.log("Connected to cluster");
});

class dbService {
    static getDbServiceInstance() {

        return instance ? instance : new dbService();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "Select * FROM users;"
                client.query(query, (err, results) => {
                    if (err) reject(new Error(err));
                    resolve(results);
                })
            });
            //console.log(response);
            return response;
        } catch (err) {
            console.log(err)
        }
    }
    async insertRow(rowData) {
        const { email, name, hobby } = rowData;
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `INSERT INTO users VALUES (?,?,?);`
                client.query(query, [email, name, hobby], (err, results) => {
                    if (err) reject(new Error(err));
                    resolve(results);
                })
            });
            return 0;
        } catch (err) {
            console.log(err)
        }
    }
    async deleteRow(email) {
        console.log(email)
        try {
            const response = await new Promise((resolve, reject) => {
                const query = " Delete from users where email = ?"
                client.query(query, [email], (err, results) => {
                    if (err) reject(new Error(err));
                    resolve(results);
                })
            });
            //console.log(response);
            return email;
        } catch (err) {
            console.log(err)
        }
    }
    async ModifyRow(data) {
        const { val, email,col} = data

        try {
            const response = await new Promise((resolve, reject) => {
                const query = `Update users set ${col} = ? where email=?;`;
                client.query(query, [val, email], (err, results) => {
                    if (err) reject(new Error(err));
                    resolve(results);
                })
            });
            console.log(response);
            return response;
        } catch (err) {
            console.log(err)
        }
    }
    async searchByName(val) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `select * from users where name = ?`
                client.query(query, [val], (err, results) => {
                    if (err) reject(new Error(err));
                    resolve(results);
                })
            });
            return response;
        } catch (err) {
            console.log(err)
        }
    }
    async searchByHobby(val) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `select * from users where hobby = ?`
                client.query(query, [val], (err, results) => {
                    if (err) reject(new Error(err));
                    resolve(results);
                })
            });
            return response;
        } catch (err) {
            console.log(err)
        }
    }
}
module.exports = dbService;