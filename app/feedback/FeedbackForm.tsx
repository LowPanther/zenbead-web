"use client";

import { useActionState, useState } from "react";
import { submitFeedback, type FeedbackState } from "./actions";

const initialState: FeedbackState = { status: "idle" };

function FeedbackFormInner({ onSendAnother }: { onSendAnother: () => void }) {
  const [state, formAction, isPending] = useActionState(
    submitFeedback,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="feedback-form feedback-form--after-submit">
        <p className="feedback-form__success" role="status">
          Thanks — we received your note. If you left an email, we may follow up
          there.
        </p>
        <p className="contact-card__note" style={{ marginTop: "var(--space-6)" }}>
          Something else to add?{" "}
          <button
            type="button"
            className="feedback-form__link-button"
            onClick={onSendAnother}
          >
            Send another message
          </button>
        </p>
      </div>
    );
  }

  return (
    <form className="feedback-form" action={formAction}>
      {state.status === "error" ? (
        <p className="feedback-form__error" role="alert">
          {state.message}
        </p>
      ) : null}

      <label className="feedback-form__label" htmlFor="email">
        Email <span className="feedback-form__optional">(optional)</span>
      </label>
      <input
        id="email"
        className="feedback-form__input"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
        disabled={isPending}
      />

      <label className="feedback-form__label" htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        className="feedback-form__textarea"
        name="message"
        required
        rows={8}
        placeholder="What’s on your mind?"
        disabled={isPending}
      />

      <input
        type="text"
        name="company"
        className="feedback-form__honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <button
        type="submit"
        className="feedback-form__submit"
        disabled={isPending}
      >
        {isPending ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}

export function FeedbackForm() {
  const [formKey, setFormKey] = useState(0);
  return (
    <FeedbackFormInner
      key={formKey}
      onSendAnother={() => setFormKey((k) => k + 1)}
    />
  );
}
