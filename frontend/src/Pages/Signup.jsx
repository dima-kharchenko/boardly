import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { signup } from "../api"

const USER_REGEX = /^(?=.{3,}$)/
const PWD_REGEX = /^(?=.*[a-z])/

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
    <div className="absolute inset-0 bg-background h-screen flex items-center justify-center p-6 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[60px_60px]">
      <div className="w-sm bg-card p-6 rounded-2xl border border-border">
        <p className="text-2xl font-semibold text-center text-primary mb-6">
            Sign Up 
        </p>
        <form className="space-y-4 text-foreground" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              className={`w-full px-4 py-2 rounded-[0.5rem] bg-muted ring ring-border placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-border transition ${user.isValid || !user.value ? "" : "ring-2 ring-destructive"}`}
              placeholder="Username"
              name="username"
              value={user.value}
              onChange={(e) => setUser(p => ({...p, value: e.target.value}))}
            />
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 rounded-[0.5rem] bg-muted ring ring-border placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-border transition ${pwd.isValid || !pwd.value ? "" : "ring-2 ring-destructive"}`}
              placeholder="Password"
              value={pwd.value}
              onChange={(e) => setPwd(p => ({...p, value: e.target.value}))}
            />
            <button
              type="submit"
              className="w-full py-2 mt-4 rounded-[0.5rem] bg-primary text-primary-foreground font-medium hover:bg-primary/90 cursor-pointer transition">
              Sign Up 
            </button>
            <a className="text-primary hover:text-secondary transition text-sm" href="/login">Already have an account?</a>
        </form>
        {error && <p className="text-destructive font-bold text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>  
    )
}

export default Signup
