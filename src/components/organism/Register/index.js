import ButtonAuth from "@/components/atoms/ButtonAuth";
import InputForm from "@/components/atoms/InputForm";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // buat notifikasi sukses

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API}/user/register`,
        {
          username,
          email,
          password,
        },
        {
          validateStatus: (status) => status < 500,
        },
      )
      .then((res) => {
        if (res.status === 409) {
          setError(res.data.data || "Username or email already exists.");
        } else if (res.status === 400) {
          setError(res.data.data || "Invalid request.");
        } else {
          setSuccessMessage("Registration successful! Redirecting to login...");

          // redirect ke login 3 detik
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      })
      .catch((err) => {
        setError("An unexpected error occurred. Please try again.");
      });
  };

  return (
    <>
      <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleRegister}>
        <InputForm
          name={"nama"}
          text={"Username"}
          type={"text"}
          placeholder={"insert your username here..."}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputForm
          name={"email"}
          text={"Your email"}
          type={"email"}
          placeholder={"name@example.com"}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputForm
          name={"password"}
          text={"Password"}
          type={"password"}
          placeholder={"insert your password here..."}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              required
            />
          </div>
          <div class="ml-3 text-sm">
            <label
              for="terms"
              class="font-light text-gray-500 dark:text-gray-300"
            >
              I accept the{" "}
              <Link
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                href="#"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>
        </div>
        <ButtonAuth text={"Create an account"} />
      </form>
      {successMessage && (
        <div className="mb-4 rounded border border-green-400 bg-green-200 p-3 text-green-700">
          {successMessage}
        </div>
      )}

      {/* nampilin error, kalau ada */}
      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-200 p-3 text-red-700">
          {error}
        </div>
      )}
    </>
  );
};

export default Register;
