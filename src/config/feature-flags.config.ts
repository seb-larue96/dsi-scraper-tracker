import { registerAs } from "@nestjs/config";

export default registerAs('featureFlags', () => ({
    FETCH_AND_STORE_CRON: process.env.FEATURE_FETCH_AND_STORE_CRON === 'true',
}));