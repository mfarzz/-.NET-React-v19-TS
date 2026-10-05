import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { Route } from "../routes/contact.lazy";
import { Provider } from "react-redux";
import { makeStore } from "../store";

const ContactComponent = Route.options.component;
if (!ContactComponent) {
  throw new Error("ContactComponent is not defined");
}

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("can submit contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
  const screen = render(
    <Provider store={makeStore()}>
      <ContactComponent />
    </Provider>,
  );

  const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
  const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
  const msgTextArea = screen.getByPlaceholderText(
    "Message",
  ) as HTMLTextAreaElement;

  const testData = {
    name: "Brian",
    email: "test@example.com",
    message: "This is a test message",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  msgTextArea.value = testData.message;

  const btn = screen.getByRole("button");

  btn.click();

  const h3 = await screen.findByRole("heading", { level: 3 });

  expect(h3.innerText).toContain("Submitted");

  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1);
  const request = requests[0];

  expect(request.url).toBe("/api/contact");
  expect(request.method).toBe("POST");
  expect(request.headers.get("content-type")).toBe("application/json");
  expect(await request.json()).toEqual(testData);
});
