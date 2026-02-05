import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { signup } from "../api"

const USER_REGEX = /^(?=.{3,}$)/
const PWD_REGEX = /^(?=.{3,}$)/

function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState({value: "", isValid: false})
    const [pwd, setPwd] = useState({value: "", isValid: false})
    const [error, setError] = useState('')

    useEffect(() => {
        setUser(p => ({...p , isValid: USER_REGEX.test(user.value)}))
    }, [user.value])

    useEffect(() => {
        setPwd(p => ({...p, isValid: PWD_REGEX.test(pwd.value)}))
    }, [pwd.value])

    useEffect(() => {
        setError('')
    }, [user.value, pwd.value])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(user.isValid && pwd.isValid)) {
            setError("Invalid Entry")
            return;
        }
        try {
            await signup(user.value, pwd.value)
            navigate('/')
        }
        catch(err) {
            if (!err?.response) {
                setError('No Server Response')
            } else {
                setError('Sign Up Failed')
            }
        }
    }

  return (
    <div className="absolute inset-0 bg-surface-a10 h-screen flex items-center justify-center p-6 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[60px_60px]">
      <div className="w-sm text-primary-a0 bg-surface-a20 p-6 rounded-2xl border border-primary-a40">
        <p className="text-2xl font-semibold text-center mb-6">
           Sign Up
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              className={`w-full px-4 py-2 rounded-lg bg-primary-a50/50 focus:outline-none focus:ring-2 focus:ring-primary-a40 transition ${user.isValid || !user.value ? "ring ring-primary-a40" : "ring-2 ring-error"}`}
              placeholder="Username"
              name="username"
              value={user.value}
              onChange={(e) => setUser(p => ({...p, value: e.target.value}))}
            />
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 rounded-lg bg-primary-a50/50 focus:outline-none focus:ring-2 focus:ring-primary-a40 transition ${pwd.isValid || !pwd.value ? "ring ring-primary-a40" : "ring-2 ring-error"}`}
              placeholder="Password"
              value={pwd.value}
              onChange={(e) => setPwd(p => ({...p, value: e.target.value}))}
            />
            <button
              type="submit"
              className="w-full py-2 mt-4 rounded-lg bg-primary-a0 text-white font-medium hover:bg-primary-a20 cursor-pointer transition">
              Sign Up 
            </button>
            <a className="hover:text-primary-a20 transition text-sm" href="/login">Already have an account?</a>
        </form>
        {error && <p className="text-error font-bold text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>  
    )
}

export default Signup
