const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: '5d9f1140f10a81216cfd8888',
      genre: 'Rock',
      price: 10,
      day: 1,
      image: '/images/image.img',
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: '5d9f1140f10a81216cfd4410',
      performer: '5d9f1140f10a81216cfd9999',
      genre: 'Pop',
      price: 20,
      day: 2,
      image: '/images/image1.img',
    });
    await testConcertTwo.save();
  });
  it('/:id should update chosen document and return success', async () => {
    const res = await request(server)
      .put('/api/concerts/5d9f1140f10a81216cfd4410')
      .send({
        performer: '5d9f1140f10a81216cfd0000',
        genre: 'Pop',
        price: 20,
      });
    const newConcert = await Concert.find({
      performer: '5d9f1140f10a81216cfd0000',
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.equal('OK');
    expect(newConcert).to.not.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
