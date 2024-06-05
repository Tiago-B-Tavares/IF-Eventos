
import Link from "next/link";
import {FormLogin} from "../components/FormLogin/login"
import {GoogleLoginBtn} from "../components/googleLoginBtn/googleLoginBtn"


export default function Home() {
  return (
    <main>
      <div className="container">
        <FormLogin/>
      </div>
      <GoogleLoginBtn/>
    </main>
  );
}
