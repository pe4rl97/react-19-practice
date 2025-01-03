import { useActionState } from "react"
import { updateNameInDB } from "../utils/api"

const FormActions = () => {
    const [state, actionFunction, isPending] = useActionState(
        updateName, 
        { 
            name: localStorage.getItem("name") || "Anonymous user",
            error: ''
        }
    );

    async function updateName(prevState, formData: FormData) {
        try {
            const checkName = (formData.get('name') !== null) ? formData.get('name') : ''; 
            const newName = await updateNameInDB(checkName);
            return { name: newName, error: ''};
            
        } catch (error) {
            return { name: prevState.name, error: error}
        }
    }

    return (
        <div className="container-md">
            <p className="username">
                Current user: <span>{state.name}</span>
            </p>
            {isPending && <p>Loading...</p>}
            <form action={actionFunction}>
                <input
                    type="text"
                    name="name"
                    required
                />
                <button type="submit">Update</button>
                {!isPending && state.error && <p className="text-danger">{state.error.message}</p>}
            </form>
        </div>
    )
}

export default FormActions