//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let { app, server } = require('../feathers-server')
let should = chai.should()
let expect = chai.expect

chai.use(chaiHttp)

describe('images', () => {
  beforeEach((done) => {
    app.service('images').create({
      id: 1,
      filename: 'jc.jpg',
      position: { x: 100, y: 50 },
    });

    app.service('images').create({
      id: 2,
      filename: 'paul.jpg',
      position: { x: 300, y: 50 },
    });   
    done();         
  });
  
  afterEach((done => {
    server.close()
    done()
  }))

  const canvasLocation = {
    x1: 0,
    x2: 0,
    y1: 5000,
    y2: 5000,
  }

  describe('/GET images', () => {
    it('it should GET all images', (done) => {
      
      const expected = [
        {
          id: 1,
          filename: 'jc.jpg',
          position: { x: 100, y: 50 },
        },
        {
          id: 2,
          filename: 'paul.jpg',
          position: { x: 300, y: 50 },
        },
      ];
      chai.request(app)
        .get('/images')
        // .query(canvasLocation)
        // .query({ filename: 'jc.jpg' })
        .end((err, res) => {
          res.body.should.be.a('array')
          expect(res.body).to.deep.equal(expected)
          done()
        })
    })
  })

  describe('/PUT', () => {
    const before = [
      {
        id: 1,
        filename: 'jc.jpg',
        position: { x: 100, y: 50 },
      },
      {
        id: 2,
        filename: 'paul.jpg',
        position: { x: 300, y: 50 },
      },
    ]
    const after = [
      {
        id: 1,
        filename: 'jc.jpg',
        position: { x: 100, y: 451 },
      },
      {
        id: 2,
        filename: 'paul.jpg',
        position: { x: 300, y: 50 },
      },
    ]
    it('saves new image position', (done) => {
      chai.request(server)
        .put(`/images/${before[0].id}`)
        .send(after[0])
        .end((err, res) => {
          chai.request(server)
            .get('/images')
            // .query(canvasLocation)
            .end((err, res) => {
              expect(res.body).to.deep.equal(after)
              done()
            })
        })
    })
  })

})