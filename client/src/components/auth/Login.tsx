import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast, Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/AuthSlice";
import { authAxios } from "../../api/axios/authAxios";
import { authEndpoints } from "../../api/endpoints/authEndpoints";
import { useNavigate } from "react-router-dom";

const Login = () => {




    const navigate = useNavigate();
    const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      try {

        const axiosInstance = authAxios(null);
        const response = await axiosInstance.post(authEndpoints.login, values)
        console.log("Login response",response);
        if(response.status==200){
          dispatch(login({token:response.data.token}))
          navigate('/')
        }else{
          toast.error("Credientials doesnt match")
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "Error occure cant login";
        toast.error(errorMessage)
        console.log("Error loggin in",error);
      }
    },
  });

  return (
    <div className="bg-slate-950 min-h-screen w-full flex flex-col md:flex-row">
       <Toaster position="top-center" expand={false} richColors />
 <div className="md:flex-1 flex items-center justify-center p-4">
        <div className="shadow-md shadow-slate-100 border border-white flex flex-col p-4 w-full max-w-[450px] rounded-md bg-zinc-900">
          <h1 className="text-white text-center mb-4 text-xl"> Login </h1>


          <form onSubmit={formik.handleSubmit} className="text-white flex flex-col">

            <label htmlFor="email" className="mb-2">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="mb-4 p-2 rounded-xl bg-slate-800"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 mb-4">{formik.errors.email}</div>
            ) : null}


            <label htmlFor="password" className="mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="mb-4 p-2 rounded-xl bg-slate-800"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 mb-4">{formik.errors.password}</div>
            ) : null}


            <div className="flex justify-center">
              <button type="submit" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full md:w-36 min-h-10 rounded-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="md:flex-1 flex items-center justify-center mr-8 p-4 md:p-0">
        <img
          src="https://images.unsplash.com/photo-1727230497470-765a15f8c36b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Signup"
          className={`object-cover h-[100px] md:h-[400px] w-full rounded-md shadow-sm shadow-white`}
        />
      </div>

    </div>
  )
}

export default Login