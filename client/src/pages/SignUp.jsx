import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4">
        <input type="text" id="username" placeholder="Username" className="p-3 border rounded-lg" />
        <input type="email" id="email" placeholder="Email" className="p-3 border rounded-lg" />
        <input type="password" id="password" placeholder="Password" className="p-3 border rounded-lg" />
        <button
          className="bg-slate-700 text-white p-3 rounded lg hover:bg-slate-600 uppercase disabled:opacity-80"
        >Sign up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an acount?</p>
        <Link to={'/sign-in'}>
          <span className="text-blue-700 hover:underline">
            Sign in
          </span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp