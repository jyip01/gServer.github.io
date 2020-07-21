const app = require('../app')
const supertest = require('supertest')
const { expect } = require('chai')

describe('GET /apps', () => {
    it('should return a json array of books', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1)
                const firstApp = res.body[0]
                expect(firstApp).to.include.all.keys(
                    'Category', 'Rating', 'Genres', 'Current Ver'
                )
            })
    })

    it('should sort by rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'rating' })
            .expect(200)
            .expect('Content-Type', /json/)
    })

    it('should sort by app', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'app' })
            .expect(200)
            .expect('Content-Type', /json/)
    })

    it('should filter by genre', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'Action' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
            })
    })
})