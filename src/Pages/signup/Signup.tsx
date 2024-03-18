import { ChangeEvent, useEffect, useState } from "react"
import { api } from "../../../convex/_generated/api"
import { useAction } from "convex/react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../auth.module.css"

export const Signup = () => {
    const createUser = useAction(api.userActions.createUser);
    const [error, setError] = useState<string>("")
    const [form, setForm] = useState({
        phone: "",
        firstName: "",
        lastName: "",
        password: "",
        pin: "1234",
        email: "",
        nin: "1234567890",
        bvn: "",
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const handleLogin = async () => {
        if (form.phone && form.password) {
            console.log(form);
            const user = await createUser(form)
            console.log(user);
            if (user.error) setError(user.error)
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
            <h1>Sign Up</h1>
            <div>
                <input value={form.firstName} onChange={handleChange} type="text" name="firstName" id="" placeholder="First name" />
            </div>
            <div>
                <input value={form.lastName} onChange={handleChange} type="text" name="lastName" id="" placeholder="Last name" />
            </div>
            <div>
                <input value={form.email} onChange={handleChange} type="text" name="email" id="" placeholder="Email" />
            </div>
            <div>
                <input value={form.phone} onChange={handleChange} type="text" name="phone" id="" placeholder="Phone" />
            </div>
            <div>
                <input value={form.password} onChange={handleChange} type="text" name="password" id="" placeholder="Password" />
            </div>
            <div>
                <input value={form.pin} onChange={handleChange} type="number" name="pin" id="" placeholder="PIN" />
                <span className={styles.helper_text}>Used to confirm transactions</span>
            </div>
            <div>
                <input value={form.nin} onChange={handleChange} type="text" name="nin" id="" placeholder="National identity number" />
                <span className={styles.helper_text}>Your national identity number</span>
            </div>
            <div>
                <button onClick={handleLogin}>Sign Up</button>
            </div>
            {error ?
                <p style={{ color: "orangered" }}>{error}</p>
                : null}
            <p>Already have an account <Link to="/signin">Sign In</Link></p>
        </section>
    )
}
