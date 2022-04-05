const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/concerts', () => {
  it('/ should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/concerts').send({
      _id: '5d9f1140f10a81216cfd4408',
      performer: '5d9f1140f10a81216cfd8888',
      genre: 'Rock',
      price: 10,
      day: 1,
      image: '/images/image.img',
    });
    const newConcert = await Concert.find({
      performer: '5d9f1140f10a81216cfd8888',
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.equal('ok');
    expect(newConcert).to.not.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
