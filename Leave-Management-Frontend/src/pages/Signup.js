import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SignUp(props) {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    is_admin: props?.role,
    gender: '',
  });

  const onHandleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (
      (signUpData.firstname ||
        signUpData.lastname ||
        signUpData.email ||
        signUpData.password) === ''
    ) {
      showErrorMessage('All fields are required.');
    } else {
      axios
        .post('http://localhost:3300/api/account/addaccount', signUpData)
        .then(function (response) {
          if (response.status === 200) {
            navigate('/');
          }
        })
        .catch(function (error) {});
    }
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
    <section>
      <div className="bg-top relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-cover rounded-xl bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg')]">
        <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-zinc-800 to-zinc-700 opacity-60"></span>
        <div className="container z-10">
          <div className="flex flex-wrap justify-center -mx-3">
            <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
              <h1 className="mt-12 mb-2 text-white">&nbsp;</h1>
              <p className="text-white">&nbsp;</p>
              <p className="text-white">&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="flex flex-wrap -mt-48 md:-mt-56 lg:-mt-48">
          <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
              <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                <h5>Register with</h5>
              </div>
              <div className="flex-auto p-6">
                <form role="form text-left">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="placeholder:text-gray-500 text-sm focus:shadow-blue-500-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      placeholder="First Name"
                      aria-label="firstname"
                      name="firstname"
                      aria-describedby="email-addon"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="placeholder:text-gray-500 text-sm focus:shadow-blue-500-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      placeholder="Last Name"
                      aria-label="lastname"
                      name="lastname"
                      aria-describedby="email-addon"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      className="placeholder:text-gray-500 text-sm focus:shadow-blue-500-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      name="email"
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="email-addon"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      className="placeholder:text-gray-500 text-sm focus:shadow-blue-500-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      name="password"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="password-addon"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="confpassword"
                      className="placeholder:text-gray-500 text-sm focus:shadow-blue-500-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      name="password"
                      placeholder="Confirm Password"
                      aria-label="Password"
                      aria-describedby="password-addon"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>
                  <div className="flex justify-start">
                    <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                      <input
                        className="relative float-left mt-0.5 mr-1 -ml-[1.5rem] h-5 w-5 appearance-none rounded-full border-2 border-solid border-[rgba(0,0,0,0.25)] bg-white before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:bg-white after:content-[''] checked:border-blue-500 checked:bg-white checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-blue-500 checked:after:bg-blue-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-blue-500 checked:focus:bg-white checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                        type="radio"
                        name="gender"
                        id="male"
                        onChange={(e) => onHandleChange(e)}
                        value="Male"
                      />
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="inlineRadio1"
                      >
                        Male
                      </label>
                    </div>
                    <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                      <input
                        className="relative float-left mt-0.5 mr-1 -ml-[1.5rem] h-5 w-5 appearance-none rounded-full border-2 border-solid border-[rgba(0,0,0,0.25)] bg-white before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:bg-white after:content-[''] checked:border-blue-500 checked:bg-white checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-blue-500 checked:after:bg-blue-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-blue-500 checked:focus:bg-white checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                        type="radio"
                        name="gender"
                        id="female"
                        onChange={(e) => onHandleChange(e)}
                        value="Female"
                      />
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="inlineRadio2"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      className="inline-block w-full px-5 py-2.5 mt-6 mb-2 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:-translate-y-px hover:shadow-xs leading-normal text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-zinc-800 to-zinc-700 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Sign up
                    </button>
                  </div>
                  <p className="mt-4 mb-0 leading-normal text-sm">
                    Already have an account?{' '}
                    <span
                      className="font-bold text-slate-700 cursor-pointer"
                      onClick={() => navigate('/')}
                    >
                      Sign in
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
