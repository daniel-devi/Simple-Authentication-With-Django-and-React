import AuthForm from "../components/AuthForm.jsx"

function Login() {
   return <AuthForm route={"api/token/"} method={"login"}/>
}

export default Login