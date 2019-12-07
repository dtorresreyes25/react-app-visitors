import { useState, useEffect } from "react";
import validate from 'validate.js';

const useForm = (callback, validateSchema) => {

    const schema = validateSchema

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    const handleSubmit = event => {
        if (event) event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };
    const hasError = field => formState.errors[field] ? true : false;
    const handleChange = event => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
        if (errors[event.target.name]) {

            setErrors({
                [event.target.name]: " " });
        }
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    };
};

export default useForm;