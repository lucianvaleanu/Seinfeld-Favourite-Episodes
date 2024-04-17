const request = require("supertest");
const app = require("../app");

require("dotenv").config();


describe("GET /episodes", () => {
    it("should return all episodes", async () => {
        const res = await request(app).get("/episodes");
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe("object");
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    });
});

describe("GET /season/:season", () => {
    it("should return no episodes for season 1", async () => {
        const res = await request(app).get("/episodes/season/1");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); 
        expect(res.body.length).toBe(0);
    });
    it("should return no episodes for season 2", async () => {

        const res = await request(app).get("/episodes/season/2");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); 
        expect(res.body.length).toBe(0);
    });
    it("should return 1 episode for season 3", async () => {
        const res = await request(app).get("/episodes/season/3");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
    });
    it("should return 2 episodes for season 4", async () => {
        const res = await request(app).get("/episodes/season/4");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });
    it("should return 3 episodes for season 5", async () => {
        const res = await request(app).get("/episodes/season/5");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(3);
    });
    it("should return 3 episodes for season 6", async () => {
        const res = await request(app).get("/episodes/season/6");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(3);
    });
    it("should return 1 episode for season 7", async () => {
        const res = await request(app).get("/episodes/season/7");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
    });
    it("should return 4 episodes for season 8", async () => {
        const res = await request(app).get("/episodes/season/8");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(4);
    });
    it("should return 2 episodes for season 9", async () => {
        const res = await request(app).get("/episodes/season/9");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });
});

describe("GET /episodes/search", () => {
    it("should return all of the episodes when searching \"the\"", async () => {
        const res = await request(app).get("/episodes/search/the");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(16);
    });
    it("should return nothing when searching something invalid", async () => {
        const res = await request(app).get("/episodes/search/asxkjnann");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });
    it("should return the exact episode from the array when searching for it", async () => {
        const res = await request(app).get("/episodes/search/the soup nazi");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
    });
});

describe("GET /episodes/id/:id", () => {
    it("should return the episode with the given id", async () => {
        const id = 1;
        const res = await request(app).get(`/episodes/id/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("id", id);
    });

    it("should return 400 if episode with given id does not exist", async () => {
        const id = 999;
        const res = await request(app).get(`/episodes/id/${id}`);
        expect(res.statusCode).toBe(400);
    });
});

describe("POST /episodes", () => {
    it("should create a new episode", async () => {
        const newEpisode = {
            title: "New Episode",
            season: 10,
            ep: 1,
            rating: 5
        };
        const res = await request(app)
            .post("/episodes")
            .send(newEpisode);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("newEpisode");
    });
});

describe("PUT /episodes/id/:id", () => {
    it("should update the episode with the given id", async () => {
        const id = 1; 
        const updatedEpisode = {
            title: "New title episode",
            season: 1,
            ep: 1,
            rating: 10
        };
        const res = await request(app)
            .put(`/episodes/id/${id}`)
            .send(updatedEpisode);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Episode updated");
    });
});


describe("DELETE /episodes/:id", () => {
    it("should delete the episode with the given id", async () => {
        const id = 1;
        const res = await request(app).delete(`/episodes/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Episode deleted successfully!");
    });

    it("should return 400 if episode with given id does not exist", async () => {
        const id = 999;
        const res = await request(app).delete(`/episodes/${id}`);
        expect(res.statusCode).toBe(400);
    });
});



