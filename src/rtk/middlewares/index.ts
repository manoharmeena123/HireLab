import { Middleware, configureStore } from '@reduxjs/toolkit';
import { hirelabApiSlice } from '../base-query/index';

// Define your middleware array including the RTK Query middleware
const rtkMiddleware: Middleware[] = [hirelabApiSlice.middleware];

// Function to combine default and custom middlewares
export const storeMiddleware = (
  extraMiddleWares: any,
) => [
  ...rtkMiddleware,
  ...extraMiddleWares,
];
