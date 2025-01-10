import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HttpService from "../services/http-service";
const httpSvc = new HttpService();

// list all
export const catListAll = createAsyncThunk(
  "category/catListAll",
  async (data) => {
    try {
      // service
      const result = await httpSvc.getRequest("/category", { auth: true });
      return result.data;
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data) => {
    try {
      const result = await httpSvc.postRequest("/category", data, {
        auth: true,
        file: true,
      });
      return result.data;
    } catch (exception) {
      throw exception;
    }
  }
);

const CategorySlicer = createSlice({
  name: "category",
  initialState: {
    allCatList: null,
    currentCat: null,
    pagination: {
      page: 1,
      limit: 10,
      toNoOfPage: 1,
      total: 0,
    },
  },
  reducers: {
    hello: (state, action) => {
      // state to manipulate state of this slicer,
      // action is a combination of type and payload
      // type is the name of action
      // name: category/hello
      // payload is the parameter/argument passed to this function
      state.allCatList = [{}];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(catListAll.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.allCatList = action.payload.data;
      state.pagination = {
        page: action.payload.options.page,
        limit: action.payload.options.limit,
        toNoOfPage: Math.ceil(
          action.payload.options.total / action.payload.options.limit
        ),
        total: action.payload.options.total,
      };
    });
    builder.addCase(catListAll.rejected, (state, action) => {
      state.allCatList = null;
    });
  },
});

export const { hello } = CategorySlicer.actions;
export default CategorySlicer.reducer;
