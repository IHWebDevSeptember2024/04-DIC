import { useActionState } from "react";

function NewForm({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    // acepta una callback asíncrona que recibe el estado anterior y los datos del form
    async (previousState, formData) => {
      console.log("Previous state: ", previousState);

      // podemos acceder a los valores del formulario con .get
      console.log(formData.get("name"));
      console.log(formData.get("mail"));
      if (error) {
        return error;
      }

      return null;
    },
    null
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <input type="text" name="mail" />
      <button type="submit" disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default NewForm;
