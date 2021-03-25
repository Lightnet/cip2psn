// https://codersociety.com/blog/articles/nodejs-application-monitoring-with-prometheus-and-grafana#what-is-application-monitoring-and-why-is-it-necessary
// https://dev.to/farnabaz/monitor-your-application-with-prometheus-2886
// https://prometheus.io/
// https://pm2.keymetrics.io/
// https://geekflare.com/nodejs-monitoring-tools/
// 
// 
// 
// 

const http = require('http')
const url = require('url')
const client = require('prom-client')
// Create a Registry which registers the metrics
const register = new client.Registry()
// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'localhost-nodejs-app'
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register })
// Create a histogram metric
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})
// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds)


// Define the HTTP server
const server = http.createServer(async (req, res) => {
  // Start the timer
  const end = httpRequestDurationMicroseconds.startTimer()


  // Retrieve route from request object
  const route = url.parse(req.url).pathname;
  if (route === '/') {
    return res.end('Hello world!');
  }

  if (route === '/metrics') {
    // Return all metrics the Prometheus exposition format
    res.setHeader('Content-Type', register.contentType);
    try{
      //console.log( await register.metrics());
      res.end(await register.metrics())
    }catch(e){
      res.end(e);
    }
    res.end(''); 
  }

  // End timer and add labels
  end({ route, code: res.statusCode, method: req.method });
})
// Start the HTTP server which exposes the metrics on http://localhost:8080/metrics
server.listen(3000,()=>{
  console.log('SERVER STARTED');
})



console.log('SERVER');