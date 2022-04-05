const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
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
  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get(
      '/api/concerts/5d9f1140f10a81216cfd4410'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.data).to.be.an('object');
  });

  it('/random should return one random concert', async () => {
    const res = await request(server).get('/api/concerts/random');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.genre).to.not.be.null;
  });
  it('/performer/:performerid should return concerts by performer', async () => {
    const res = await request(server).get(
      '/api/concerts/performer/5d9f1140f10a81216cfd9999'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.data).to.be.an('array');
    expect(res.body.data).to.not.be.null;
  });
  it('/genre/:genre should return concerts by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.data).to.be.an('array');
    expect(res.body.data).to.not.be.null;
  });
  it('/price/:price_min/:price_max should return concerts by price range', async () => {
    const res = await request(server).get('/api/concerts/price/10/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.data).to.be.an('array');
    expect(res.body.data).to.not.be.null;
  });
  it('/day;:day should return concerts by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.data).to.be.an('array');
    expect(res.body.data).to.not.be.null;
  });
  after(async () => {
    await Concert.deleteMany();
  });
});
