const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

describe("API ENDPOINT TESTING", () => {
  it("Attendance Test", (done) => {
    chai
      .request(app)
      .post("/api/absen")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ username: "farabiandrika" })
      .send({ keterangan: "hadir" })
      .end((err, res) => {
        expect(err).to.be.null;
        if (res.status !== 201) {
          console.log(res.text);
        }
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Absensi Sukses");
        expect(res.body).to.have.property("attendant");
        expect(res.body.attendant).to.have.all.keys(
          "status",
          "employeeId",
          "date",
          "_id",
          "__v"
        );

        done();
      });
  });

  it("Getting Report", (done) => {
    chai
      .request(app)
      .get("/api/laporan")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success Getting Data");
        expect(res.body).to.have.property("result");
        done();
      });
  });

  it("Getting Report By Category", (done) => {
    chai
      .request(app)
      .get("/api/laporan/hadir")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");

        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success Getting Data");
        expect(res.body).to.have.property("result");
        expect(res.body.result).to.be.an("array");

        expect(res.body.result[0]).to.have.all.keys(
          "_id",
          "username",
          "name",
          "jumlah",
          "absensi"
        );

        done();
      });
  });

  it("Getting Detail Attendance of User", (done) => {
    chai
      .request(app)
      .get("/api/detail")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");

        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success Getting Data");
        expect(res.body).to.have.property("result");
        expect(res.body.result).to.be.an("array");

        expect(res.body.result[0]).to.have.all.keys(
          "_id",
          "username",
          "name",
          "absensi"
        );

        done();
      });
  });

  it("Add User", (done) => {
    chai
      .request(app)
      .post("/api/user/add")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ username: "farabiandrika23" })
      .send({ name: "Farabi" })
      .end((err, res) => {
        expect(err).to.be.null;
        if (res.status !== 201) {
          console.log(res.text);
        }
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success Add User");
        expect(res.body).to.have.property("employee");
        expect(res.body.employee).to.have.all.keys(
          "username",
          "name",
          "attendantId",
          "_id",
          "__v"
        );

        done();
      });
  });
});
