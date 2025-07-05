import express from 'express';

export const dashboardRoute = express.Router();

dashboardRoute.get('/', (req, res) => {
  res.render('dashboard');
});