import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY, // Your Arcjet project API key
  characteristics: ["ip.src"], // Track requests by source IP address
  rules: [
    tokenBucket({
      mode: "LIVE", // Actively block requests (use "DRY_RUN" to test without blocking)
      refillRate: 10, // Refill 10 tokens every interval
      interval: 3600, // Interval duration in seconds (60 = every minute)
      capacity: 10, // Maximum number of tokens in the bucket
    }),
  ],
});

export default aj;
