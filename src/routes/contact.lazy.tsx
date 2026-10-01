import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";
import type { SubmitEvent } from "react";

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (e: SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(
        getString(formData, "name"),
        getString(formData, "email"),
        getString(formData, "message"),
      );
    },
  });

  return (
    <div>
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3 className="font-pacifico text-secondary text-center m-12.5 text-[30px] font-normal">
          Submitted!
        </h3>
      ) : (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={mutation.mutate}
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
        </form>
      )}
    </div>
  );
}
