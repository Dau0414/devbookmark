export const baseUrl=() => {
    const env=process.env.NODE_ENV;
    const baseUrl=env === 'development' ? 'http://localhost:3000' : 'https://your-production-url.com';
    return baseUrl;
}