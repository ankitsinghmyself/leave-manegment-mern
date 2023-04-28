import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const [logInData, setLogInData] = useState({
    email: '',
    password: '',
  });
  const [userData] = useState(JSON.parse(localStorage.getItem('user')));

  const homeRedirect = () => {
    if (userData?.is_admin) {
      navigate('/admindashboard');
    } else navigate('/userdashboard');
  };

  const onHandleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (userData == null)
      localStorage.setItem('_token', 'Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl');

    axios
      .post('http://localhost:3300/api/account/login', logInData)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data));
          if (response.data.is_admin === true) {
            navigate('/admindashboard');
          } else {
            navigate('/userdashboard');
          }
        }
        if (response.status === 204) {
          showErrorMessage('User not found');
        }
      })
      .catch(function (error) {
        showErrorMessage(error.response.data);
      });
    e.preventDefault();
  };

  const showErrorMessage = (message) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      text: message,
      toast: true,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <section className="text-gray-600 body-font w-full" onLoad={homeRedirect}>
      <main className="mt-0 transition-all duration-200 ease-in-out">
        <section>
          <div className="relative flex dark:bg-black items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
            <div className="container z-1">
              <div className="flex flex-wrap -mx-3">
                <div className="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                  <h2 className="inline h-full m-auto w-30 text-2xl font-bold transition-all duration-200 ease-nav-brand">
                    Leave Management
                  </h2>
                  <div className="relative h-full flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 dark:bg-gray-900 rounded-2xl bg-clip-border">
                    <div className="p-6 pb-0 mb-0 dark:text-white">
                      <h4 className="font-bold dark:text-white">Sign In</h4>
                      <p className="mb-0">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div className="flex-auto p-6">
                      <form role="form">
                        <div className="mb-4">
                          <input
                            type="email"
                            placeholder="Email"
                            className="focus:shadow-primary-outline dark:bg-gray-900 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-themeColor focus:outline-none"
                            name="email"
                            onChange={(e) => onHandleChange(e)}
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            placeholder="Password"
                            className="focus:shadow-primary-outline dark:bg-gray-900 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-themeColor focus:outline-none"
                            name="password"
                            onChange={(e) => onHandleChange(e)}
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            className="inline-block w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all bg-blue-400 border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25"
                            onClick={(e) => handleSubmit(e)}
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 text-center pt-0 px-1 sm:px-6">
                      <p className="mx-auto mb-6 leading-normal text-sm">
                        Don't have an account?{' '}
                        <span
                          className="font-semibold text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 cursor-pointer to-violet-500"
                          onClick={() => navigate('/signup')}
                        >
                          Sign up
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
                  <div className="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')] rounded-xl">
                    <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-blue-500 to-themeColor opacity-60"></span>
                    <h4 className="z-20 mt-12 font-bold text-white">
                      "Attention is the new currency"
                    </h4>
                    <p className="z-20 text-white ">
                      The more effortless the writing looks, the more effort the
                      writer actually put into the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
