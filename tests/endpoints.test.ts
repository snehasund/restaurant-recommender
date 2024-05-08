import { describe, it, expect } from "@jest/globals";

let port = 8000;

describe("Ensure endpoints work", () => {
    it("Test home endpoint", async () => {
        let result = await fetch(`http://localhost:${port}/`);
        let text = await result.text();
        expect(result).toBeDefined();
        expect(text).toBe("Hello World");
        expect(result.status).toBe(200);
    });
});

describe("Ensure endpoints work", () => {
    it("Test /utils endpoint", async () => {
        let result = await fetch(`http://localhost:${port}/utils`);
        let text = await result.text();
        expect(result).toBeDefined();
        expect(text).toBe("Hello utils");
        expect(result.status).toBe(200);
    });
});

describe("Ensure endpoints work", () => {
    it("Test /test endpoint", async () => {
        let result = await fetch(`http://localhost:${port}/test`);
        let text = await result.text();
        expect(result).toBeDefined();
        expect(text).toBe("Hello");
        expect(result.status).toBe(200);
    });
});
