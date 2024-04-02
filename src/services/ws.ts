import { createProxyMiddleware } from 'http-proxy-middleware';

export default (app: any) => {
  const wsProxy = createProxyMiddleware({
    target: 'http://43.200.219.117:8080',
    ws: true,
  });

  app.use('/ws', wsProxy);
};
