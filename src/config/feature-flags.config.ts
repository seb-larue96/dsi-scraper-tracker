export const FeatureFlags = {
  FETCH_AND_STORE_CRON: () => process.env.FEATURE_FETCH_AND_STORE_CRON === 'true',
};

export const FeatureFlagEnv = {
  FETCH_AND_STORE_CRON: () => process.env.FEATURE_FETCH_AND_STORE_CRON,
};