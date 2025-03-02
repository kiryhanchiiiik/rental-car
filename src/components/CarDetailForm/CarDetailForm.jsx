import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import css from "./CarDetailForm.module.css";

const CarDetailsPage = () => {
  const [bookingDate, setBookingDate] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name should be at least 3 characters long"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    bookingDate: Yup.date().required("Booking date is required"),
    comment: Yup.string()
      .max(500, "Comment should not exceed 500 characters")
      .optional(),
  });

  const handleSuccess = () => {
    toast.success("Booking successful! Enjoy your ride!", {
      autoClose: 5000,
    });
  };

  return (
    <div className={css.formContainer}>
      <h3 className={css.formTitle}>Book your car now</h3>
      <p className={css.formSubTitle}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          bookingDate: null,
          comment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSuccess();
          resetForm();
          setBookingDate(null);
        }}
      >
        {({ touched, errors, setFieldValue }) => (
          <Form className={css.bookingForm}>
            <div className={css.inputContainer}>
              <Field
                className={css.input}
                type="text"
                name="name"
                placeholder="Name*"
              />
              {touched.name && errors.name && (
                <div className={css.error}>{errors.name}</div>
              )}
            </div>

            <div className={css.inputContainer}>
              <Field
                className={css.input}
                type="email"
                name="email"
                placeholder="Email*"
              />
              {touched.email && errors.email && (
                <div className={css.error}>{errors.email}</div>
              )}
            </div>

            <div className={css.datepickerContainer}>
              <DatePicker
                selected={bookingDate}
                onChange={(date) => {
                  setBookingDate(date);
                  setFieldValue("bookingDate", date);
                }}
                dateFormat="MMMM d, yyyy"
                className={css.datepickerInput}
                placeholderText="Booking date"
                popperPlacement="bottom"
              />
              {touched.bookingDate && errors.bookingDate && (
                <div className={css.error}>{errors.bookingDate}</div>
              )}
            </div>

            <div className={css.inputContainer}>
              <Field
                className={`${css.input} ${css.textarea}`}
                name="comment"
                as="textarea"
                placeholder="Comment"
              />
              {touched.comment && errors.comment && (
                <div className={css.error}>{errors.comment}</div>
              )}
            </div>

            <div className={css.btnContainer}>
              <button type="submit" className={css.submitBtn}>
                Send
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default CarDetailsPage;
