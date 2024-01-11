// import { createApi } from "@reduxjs/toolkit/dist/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Below function logic represents the' Redux Toolkit Query'
export const api = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://mern-dashboard-project-render-deploy.onrender.com/' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001' }),
  reducerPath: "adminApi",

  // These tags are based on the state & used to query sepecific data (User here)
  tagTypes: ["User", "Products", "Customers", "Transactions", "Geography", "Sales", "Admins", "Performance", "Dashboard", "YearData", "TopicData", "Region", "Overview"],

  // Endpoints are the place where we have our actual working logic (Callback function here)
  endpoints: (build) => ({
    // 'getUser' here is API call we can make
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"]
    }),
    getProducts: build.query({
      query: () => `client/products`,
      providesTags: ["Products"]
    }),
    getCustomers: build.query({
      query: () => `client/customers`,
      providesTags: ["Customers"]
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: `client/transactions`,
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"]
    }),
    // getGeography: build.query({
    //   query: () => `client/geography`,
    //   providesTags: ["Geography"]
    // }),
    getSales: build.query({
      query: () => `sales/sales`,
      providesTags: ["Sales"]
    }),
    getAdmins: build.query({
      query: () => `management/admins`,
      providesTags: ["Admins"]
    }),
    // getUserPerformance: build.query({
    //   query: (id) => `management/performance/${id}`,
    //   providesTags: ["Performance"]
    // }),
    getDashboard: build.query({
      query: (id) => `general/dashboard`,
      providesTags: ["Dashboard"]
    }),












    getYearData: build.query({
      query: () => `general/year`,
      providesTags: ["YearData"]
    }),
    getTopicData: build.query({
      query: () => `general/topic`,
      providesTags: ["TopicData"]
    }),
    getGeoData: build.query({
      query: () => `location/geography`,
      providesTags: ["Geography"]
    }),
    getRegionData: build.query({
      query: () => `location/region`,
      providesTags: ["Region"]
    }),
    getOverviewData: build.query({
      query: () => `stats/data`,
      providesTags: ["Overview"]
    }),
    getPerformanceData: build.query({
      query: () => `stats/performance`,
      providesTags: ["Performance"]
    }),
  })
})

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeoDataQuery, useGetSalesQuery, useGetAdminsQuery, useGetPerformanceDataQuery, useGetDashboardQuery, useGetYearDataQuery, useGetTopicDataQuery, useGetRegionDataQuery, useGetOverviewDataQuery } = api;