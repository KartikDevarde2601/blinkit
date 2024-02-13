import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../assets/blinkit.png';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const initialValues = { name: '', email: '', password: '' };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });


  const onSubmit = (values, { setSubmitting }) => {
    signup(values.name, values.email, values.password)
      .then(() => {
        setSubmitting(false);
        navigate('/'); // navigate to home page
      })
      .catch(error => {
        // handle error
        console.error(error);
        setSubmitting(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-sm w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center px-4 py-2 bg-yellow-400">
          <img src={logo} alt="Company Logo" style={{ width: '60px', height: '60px' }} />
          <h2 className="text-lg font-semibold text-black">Signup</h2>
        </div>
        <div className="p-4">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-2">
                  <label htmlFor="name" className="block text-gray-700">Name</label>
                  <Field type="text" name="name" className="form-input mt-1 block w-full border-gray-300 rounded-md border px-3 py-2" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <Field type="email" name="email" className="form-input mt-1 block w-full border-gray-300 rounded-md border px-3 py-2" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="block text-gray-700">Password</label>
                  <Field type="password" name="password" className="form-input mt-1 block w-full border-gray-300 rounded-md border px-3 py-2" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <button type="submit" className="w-full bg-yellow-500 text-black px-3 py-2 m-3 mx-auto rounded-md">
                  {isSubmitting ? 'Signing up...' : 'Signup'}
                </button>
              </Form>
            )}
          </Formik>
          <div className="text-center mt-2">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <NavLink to="/login" className="text-green-600 hover:underline">Login here</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
