import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";

const Form = ({ addUser }) => {

    const initUser = {
        name: "",
        email: "",
        password: "",
        terms: false
    };

    const initError = {
        name: "",
        email: "",
        password: "",
        terms: ""
    };

    const [user, setUser] = useState(initUser);
    const [error, setError] = useState(initError);
    const [isValid, setIsValid] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        if (isValid) {
            axios.post("https://reqres.in/api/users", user)
                .then(response => {
                    addUser(response.data);
                    setUser(initUser)
                })
                .catch(eject => { console.log(eject); })
        }
    };

    const changeHandler = (event) => {
        const { name, value, checked, type } = event.target;
        const inputValue = type === "checkbox" ? checked : value;

        Yup.reach(formSchema, name).validate(inputValue)
            .then(() => {
                setError({ ...error, [name]: "" })
            })
            .catch(eject => {
                setError({ ...error, [name]: eject.message })
            })
        setUser({ ...user, [name]: inputValue });
    };

    const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .required("Name is required")
            .min(3, "Name must not be shorter than 3 characters."),
        email: Yup
            .string()
            .email("Please enter valid e-mail")
            .required("E-mail is required"),
        password: Yup
            .string()
            .min(4, "Password must be minimum 4 characters")
            .matches("^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,}$", "Password must contain at least one number and one uppercase and one lowercase letters.")
            .max(8, "Password must be maximum 8 characters"),
        terms: Yup
            .boolean()
            .oneOf([true], "You must accept Terms of Services to continue")
    });

    useEffect(() => {
        formSchema.isValid(user)
            .then(valid => {
                setIsValid(valid)
            });
        // eslint-disable-next-line
    }, [user]);

    return (
        <form className="userForm" onSubmit={submitHandler}>
            <h1><strong>Create New User</strong></h1>

            <label htmlFor="user-name" >Name :</label>
            <input id="user-name" type="text" name="name" value={user.name} onChange={changeHandler} />
            <span>{error.name}</span>

            <label htmlFor="user-email" >E-mail :</label>
            <input id="user-email" type="email" name="email" value={user.email} onChange={changeHandler} />
            <span>{error.email}</span>

            <label htmlFor="user-password" >Password :</label>
            <input id="user-password" type="password" name="password" value={user.password} onChange={changeHandler} />
            <span>{error.password}</span>

            <div>
                <label htmlFor="user-terms" >Terms of Services</label>
                <input id="user-terms" type="checkbox" name="terms" checked={user.terms} onChange={changeHandler} />
            </div>
            <span>{error.terms}</span>

            <button disabled={!isValid} >Submit</button>
        </form>
    );
};
export default Form;