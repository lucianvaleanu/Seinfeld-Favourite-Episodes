const request = require("supertest");
const app = require("../app");

require("dotenv").config();



describe("GET /season/:season validation", () => {
    it("should return 400 if season parameter is not a number", async () => {
        const res = await request(app).get("/episodes/season/abc");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("value");
    });
});

describe("GET /episodes/search/:title validation", () => {
    it("should return 404 if title parameter is missing", async () => {
        const res = await request(app).get("/episodes/search");
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("route not found");
    });
});

describe("GET /episodes/id/:id validation", () => {
    it("should return 400 if id parameter is not a number", async () => {
        const res = await request(app).get("/episodes/id/abc");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("value");
    });

    it("should return 400 if episode with given id does not exist", async () => {
        const id = 999;
        const res = await request(app).get(`/episodes/id/${id}`);
        expect(res.statusCode).toBe(400);
    });
});


describe("POST /episodes validation", () => {
    it("should return 400 if title is missing", async () => {
        const newEpisode = {
            season: 10,
            ep: 1,
            rating: 5
        };
        const res = await request(app)
            .post("/episodes")
            .send(newEpisode);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("title");
    });

    it("should return 400 if season is missing", async () => {
        const newEpisode = {
            title: "New Episode",
            ep: 1,
            rating: 5
        };
        const res = await request(app)
            .post("/episodes")
            .send(newEpisode);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("season");
    });

    it("should return 400 if episode number is missing", async () => {
        const newEpisode = {
            title: "New Episode",
            season: 10,
            rating: 5
        };
        const res = await request(app)
            .post("/episodes")
            .send(newEpisode);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("ep");
    });

    it("should return 400 if rating is missing", async () => {
        const newEpisode = {
            title: "New Episode",
            season: 10,
            ep: 1
        };
        const res = await request(app)
            .post("/episodes")
            .send(newEpisode);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("rating");
    });
});

describe("PUT /episodes/:id validation", () => {
    it("should return 400 if id is not a number", async () => {
        const id = "abc";
        const updatedEpisode = {
            title: "Updated Title"
        };
        const res = await request(app)
            .put(`/episodes/id/${id}`)
            .send(updatedEpisode);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("value");
    });

    it("should return 400 if episode with given id does not exist", async () => {
        const id = 999;
        const updatedEpisode = {
            title: "Updated Title"
        };
        const res = await request(app)
            .put(`/episodes/id/${id}`)
            .send(updatedEpisode);
        expect(res.statusCode).toBe(400);
    });

    it("should return 400 if title is missing", async () => {
        const id = 1;
        const updatedEpisode = {
            season: 1,
            ep: 1,
            rating: 10
        };
        const res = await request(app)
            .put(`/episodes/id/${id}`)
            .send(updatedEpisode);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("title");
    });

    it("should return 400 if season is missing", async () => {
        const id = 1;
        const updatedEpisode = {
            title: "Updated Title",
            ep: 1,
            rating: 10
        };
        const res = await request(app)
            .put(`/episodes/id/${id}`)
            .send(updatedEpisode);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("season");
    });

    it("should return 400 if episode number is missing", async () => {
        const id = 1;
        const updatedEpisode = {
            title: "Updated Title",
            season: 1,
            rating: 10
        };
        const res = await request(app)
            .put(`/episodes/id/${id}`)
            .send(updatedEpisode);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("ep");
    });

    it("should return 400 if rating is missing", async () => {
        const id = 1;
        const updatedEpisode = {
            title: "Updated Title",
            season: 1,
            ep: 1
        };
        const res = await request(app)
            .put(`/episodes/id/${id}`)
            .send(updatedEpisode);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("rating");
    });
});