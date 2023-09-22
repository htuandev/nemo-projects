import axios from "axios";
import Swal from "sweetalert2";
import { API } from "../utils/config";
import { SweetAlertSuccessful } from "../models/SweetAlertModels";
import { SweetAlertFailure } from "../models/SweetAlertModels";

const alertSuccess = new SweetAlertSuccessful();
const alertFailure = new SweetAlertFailure();

export const getQuotesAction = (isAdmin = true) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "LOADING_TRUE",
      });

      let result = await axios.get(API);

      dispatch({
        type: "GET_QUOTES",
        quotesList: result.data.quotes.reverse(),
      });

      if (!isAdmin) {
        await dispatch({ type: "SET_QUOTE" });
      }

      dispatch({
        type: "LOADING_FALSE",
      });
    } catch (error) {
      Swal.fire({
        ...alertFailure,
      });
      console.log(error);
    }
  };
};

export const createQuotesAction = (formData) => async (dispatch) => {
  try {
    await axios.post(API, formData);

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getQuotesAction());
      },
    });

    window.location.reload();
  } catch (error) {
    Swal.fire({
      ...alertFailure,
    });
    console.log(error);
  }
};

export const updateQuotesAction =
  (formData, id, navigate) => async (dispatch) => {
    try {
      await axios.put(`${API}/${id}`, formData);

      Swal.fire({
        ...alertSuccess,
        didDestroy: () => {
          dispatch(getQuotesAction());
          navigate("/admin");
        },
      });
    } catch (error) {
      Swal.fire({
        ...alertFailure,
      });
      console.log(error);
    }
  };

export const deleteQuotesAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API}/${id}`);

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getQuotesAction());
      },
    });
  } catch (error) {
    Swal.fire({
      ...alertFailure,
    });
    console.log(error);
  }
};
