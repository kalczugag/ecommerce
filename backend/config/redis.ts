import Redis from "ioredis";

if (!process.env.REDIS_URL) {
    throw new Error("REDIS_PORT or REDIS_HOST environment variable is not set");
}

const redisClient = new Redis(process.env.REDIS_URL!);

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});

export { redisClient };
