process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');

let should = chai.should();

chai.use(chaiHttp);


describe('GET /demotests',()=>{
    it('it shoud get demo test', (done)=>{
        chai.request(app)
        .get('/demotests')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('data');
            done();
        })
    })

    /*it('it shoud NOT pass (ONLY TO DEMONSTRATE) ', (done)=>{
        chai.request(app)
        .get('/demotests')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('data', 'Something');
            done();
        })
    })*/

    

})