var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

// boiler plate of how tests 
describe("App", () => {  // title of the set of tests 
    it('responds with code 404', (done) => { // descibe the test to run
        chai.request(app)
            .get('/')   // send an HTTP GET Request to server 
            .end((err, res) => {
                res.should.have.status(404); // expected result 
                done();
            });
    });
});