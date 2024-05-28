import AuthForm from "../components/AuthForm.jsx"


function Register() {
    return <AuthForm route="api/user/register/" method="register"/>
}

export default Register