import { useState, useEffect } from "react";
import validate from "validate.js";

const useForm = (callback, schema, default_values) => {
    const [formState, setFormState] = useState({
        isValid: false,
        values: default_values ? default_values : {},
        errors: {}
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = event => {
        if (event.persist) event.persist();

        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === "checkbox"
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }));
    };

    const hasError = field => (formState.errors[field] ? true : false);

    useEffect(() => {
        if (Object.keys(formState.errors).length === 0 && isSubmitting) {
            console.log("callback");
            console.log("isSubmitting", isSubmitting);
            callback();
        }
    }, [formState.errors, isSubmitting]);

    const handleSubmit = event => {
        if (event) event.preventDefault();
        const errors = validate(formState.values, schema);
        setIsSubmitting(false);
        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
        setIsSubmitting(true);
    };

    const handleResetformValues = () => {
        setIsSubmitting(false);
        setFormState({
            isValid: false,
            values: default_values ? default_values : {},
            errors: {}
        })
    }

    return {
        hasError,
        handleChange,
        handleSubmit,
        handleResetformValues,
        formState
    };
};
export default useForm;
