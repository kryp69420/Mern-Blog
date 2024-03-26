import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/oAuth";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* leftside */}
        <div className="flex-1">
          <Link
            to="/"
            className="sm:text-xl font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1.5 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg ">
              Kryp's
            </span>{" "}
            Blog
          </Link>
          <p className="text-sm mt-5 p-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident,
            quae. Eveniet consectetur alias omnis
          </p>
        </div>
        {/* rightside */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
            <div>
              <Label value="Username" />
              <TextInput
                onChange={handleChange}
                type="text"
                placeholder="Username"
                id="username"
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                onChange={handleChange}
                type="text"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                onChange={handleChange}
                type="password"
                placeholder="Password"
                id="password"
              />
            </div>
            <Button
              gradientDuoTone="redToYellow"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading ...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
