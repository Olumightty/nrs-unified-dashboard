import express from 'express';

export const dashboardRoute = express.Router();

dashboardRoute.get('/', (req, res) => {
  res.send('Welcome to the Dashboard!');
});