import { ChangeEvent, useEffect, useState } from "react"
import { api } from "../../../convex/_generated/api"
import { useMutation } from "convex/react"
import { useDispatch } from "react-redux";
import { login } from "../../store/auth.slice";
import { UserOnClient } from "../../types/user";
import { Link, useNavigate } from "react-router-dom";
import styles from "../auth.module.css"

export const Signin = () => {
    const getUser = useMutation(api.users.loginUser);
    const [error, setError] = useState<string>("")
    const [form, setForm] = useState({
        phone: "",
        password: "",
        pin: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const handleLogin = async () => {
        if (form.phone && form.password && form.pin) {
            const user = await getUser(form)
            console.log(user);
            if (user.error) setError(user.error)
            else {
                dispatch(login(user as UserOnClient))
                navigate("/")
            }
        }
        else
            console.log("Form must be filled!");
    }


    useEffect(() => {
        const timeout = setTimeout(() => {
            setError("")
        }, 4000)

        return () => clearTimeout(timeout)
    }, [error])


    return (
        <section id={styles.form}>
            <h1>Sign In</h1>
            <div>
                <input value={form.phone} onChange={handleChange} type="text" name="phone" id="" placeholder="Phone number" />
            </div>
            <div>
                <input value={form.password} onChange={handleChange} type="text" name="password" id="" placeholder="Password" />
            </div>
            <div>
                <input value={form.pin} onChange={handleChange} type="text" name="pin" id="" placeholder="PIN" />
                <span className={styles.helper_text}>Used to confirm transactions</span>
            </div>
            <div>
                <button onClick={handleLogin}>Login</button>
            </div>
            <p>Don't have an account <Link to="/signup">Sign Up</Link></p>
        </section>
    )
}
