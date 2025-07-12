export default function logger(req, res, next) {
  const method = req.method;
  const path = req.path;
  const time = new Date().toISOString();
  console.log(`${time} --- REQUEST_METHOD: ${method} - PATH: ${path}`);
  next();
}
