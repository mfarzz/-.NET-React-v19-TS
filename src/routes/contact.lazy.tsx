import { createLazyFileRoute } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { usePlaceContactMutation } from "../api/pizzaApi";
import type { Contact } from "../types/APIResponsesTypes";

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const [ placeContact, { isSuccess, isError}] = usePlaceContactMutation();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const contact : Contact = {
      name: getString(formData, "name"),
      email: getString(formData, "email"),
      message: getString(formData, "message"),
    };
    await placeContact(contact);
  }

  return (
    <div>
      <h2>Contact</h2>
      {isSuccess ? (
        <h3 className="font-pacifico text-secondary text-center m-12.5 text-[30px] font-normal">
          Submitted!
        </h3>
      ) : (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            className="my-3.75 w-[90%] max-w-125 p-2 border-2 border-border rounded-[5px] mb-3.75 mt-3.75 focus:border-primary disabled:bg-[#999]"
            name="name"
            placeholder="Name"
          />
          <input
            className="my-3.75 w-[90%] max-w-125 p-2 border-2 border-border rounded-[5px] mb-3.75 mt-3.75 focus:border-primary disabled:bg-[#999]"
            type="email"
            name="email"
            placeholder="Email"
          />
          <textarea
            className="my-3.75 w-[90%] max-w-125 p-2 border-2 border-border rounded-[5px] mb-3.75 mt-3.75 min-h-50 focus:border-primary disabled:bg-[#999]"
            placeholder="Message"
            name="message"
          ></textarea>
          <button className="btn">
            Submit
          </button>
          {isError && <p className="text-red-500">An error occurred while submitting the form.</p>}
        </form>
      )}
    </div>
  );
}
