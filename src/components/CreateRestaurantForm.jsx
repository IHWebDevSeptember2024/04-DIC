import { useActionState } from "react";

const initialState = {
  name: "Pizza Palace",
  rating: 1,
  type: "Italian",
};

const emptyState = {
  name: "",
  rating: 0,
  type: "",
};

// el
function CreateRestaurantForm({ handleSubmit }) {
  const [formState, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      try {
        const response = await handleSubmit({
          name: formData.get("name"),
          rating: formData.get("rating"),
          type: formData.get("type"),
        });

        if (response.error) {
          throw new Error("Error creating restaurant", response.error.message);
        }

        return emptyState;
      } catch (error) {
        console.log(error);
        return { ...emptyState, error: error.message };
      }
    },
    initialState
  );

  return (
    <>
      <h3>Create a new restaurant:</h3>
      <form action={submitAction}>
        <label htmlFor="">Name</label>
        <input defaultValue={formState.name} name="name" type="text" />
        <label htmlFor="">Rating</label>
        <input
          defaultValue={formState.rating}
          name="rating"
          type="number"
          min={0}
          max={10}
        />
        <label htmlFor="">Type</label>
        <input defaultValue={formState.type} name="type" type="text" />
        <button disabled={isPending} type="submit">
          Create
        </button>
      </form>
      <p>{isPending && "Creating restaurant..."}</p>
      <p className="error">{formState.error && formState.error}</p>
    </>
  );
}

export default CreateRestaurantForm;
