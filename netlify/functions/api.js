// ==============================================================================
// SolarWise AI — Netlify Serverless Function Handler
// Bridges Express Application to Netlify Serverless Functions via serverless-http
// ==============================================================================

const serverless = require('serverless-http');
const app = require('../../server');

const serverlessHandler = serverless(app);

exports.handler = async (event, context) => {
  // Allow Netlify Lambda execution
  return await serverlessHandler(event, context);
};
