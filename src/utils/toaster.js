import React from "react";
import { toast } from "react-toastify";
import { Toaster } from "../components";

export const errorToaster = (content: String, title: String = null, link: Object) =>
  toast(<Toaster {...{ content, title, type: "error", link }} />, {
    autoClose: false,
    className: "toaster-error",
    type: "error"
  });

export const successToaster = (content: String, title: String = null, link: Object) =>
  toast(<Toaster {...{ content, title, type: "success", link }}/>, {
    className: "toaster-success",
    type: "success"
  });
