import { login } from "@/services/auth";
import { useRouter } from "next/compat/router";
import React, { useState } from "react";
import Link from "next/link";
import InputForm from "@/components/atoms/InputForm";
import ButtonAuth from "@/components/atoms/ButtonAuth";

const LoginPage = () => {
  const [errorLogin, setErrorLogin] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();

    const payload = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    try {
      const res = await login(payload);

      if (res && res.status) {
        router.push("/products");
      } else {
        console.log("login error : ", res.error.response.data);
        setErrorLogin(res.error.response.data.data);
      }
    } catch (error) {
      console.log("login failed : ", error);
      setErrorLogin(error.response.data.data);
    }
  }

  return (
    <>
      <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
        <InputForm
          name={"username"}
          text={"Username"}
          type={"text"}
          placeholder={"insert your username here..."}
          onChange={(event) => setUsername(event.target.value)}
        />

        <InputForm
          name={"password"}
          text={"Password"}
          type={"password"}
          placeholder={"insert your password here..."}
          onChange={(event) => setPassword(event.target.value)}
        />

        <div class="flex items-center justify-between">
          <div class="flex items-start">
            <div class="flex h-5 items-center">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                required=""
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="remember" class="text-gray-500 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
          <Link
            href="#"
            class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </Link>
        </div>
        <ButtonAuth text={"Sign in"} />
        {errorLogin && (
          <p className="mt-4 text-center text-sm text-red-500">{errorLogin}</p>
        )}
      </form>
    </>
  );
};

export default LoginPage;
