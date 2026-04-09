"use client";

import { useActionState, useEffect, useState } from "react";
import {
  submitWaitlistDetails,
  submitWaitlistEmail,
  type WaitlistDetailsState,
  type WaitlistEmailState,
} from "./actions";

const initialEmailState: WaitlistEmailState = { status: "idle" };
const initialDetailsState: WaitlistDetailsState = { status: "idle" };

type Phase = "email" | "details" | "complete";

function WaitlistWidgetInner({ onSignUpAgain }: { onSignUpAgain: () => void }) {
  const [phase, setPhase] = useState<Phase>("email");
  const [signedUpEmail, setSignedUpEmail] = useState("");

  const [emailState, emailFormAction, emailPending] = useActionState(
    submitWaitlistEmail,
    initialEmailState,
  );

  const [detailsState, detailsFormAction, detailsPending] = useActionState(
    submitWaitlistDetails,
    initialDetailsState,
  );

  useEffect(() => {
    if (emailState.status === "success" && emailState.email !== "") {
      setSignedUpEmail(emailState.email);
      setPhase("details");
    }
  }, [emailState]);

  useEffect(() => {
    if (detailsState.status === "success") {
      setPhase("complete");
    }
  }, [detailsState]);

  if (phase === "complete") {
    return (
      <div className="waitlist-widget waitlist-widget--done">
        <p className="waitlist-widget__success" role="status">
          Thank you. You&apos;re on the list — we&apos;ll be in touch at the email
          you provided when we open the next wave of beta invites.
        </p>
        <p className="waitlist-widget__note">
          Used a different address?{" "}
          <button
            type="button"
            className="feedback-form__link-button"
            onClick={onSignUpAgain}
          >
            Sign up again
          </button>
        </p>
      </div>
    );
  }

  if (phase === "details") {
    return (
      <div className="waitlist-widget">
        <p className="waitlist-widget__step2-intro" role="status">
          You&apos;re on the list. If you&apos;d like, a few optional questions
          below help us understand what you&apos;re looking for — skip them anytime.
        </p>

        <form
          className="feedback-form feedback-form--waitlist"
          action={detailsFormAction}
        >
          <input type="hidden" name="email" value={signedUpEmail} />

          {detailsState.status === "error" ? (
            <p className="feedback-form__error" role="alert">
              {detailsState.message}
            </p>
          ) : null}

          <label className="feedback-form__label" htmlFor="waitlist-experience">
            What experience do you want to have with a mindfulness and journalling
            app?
          </label>
          <textarea
            id="waitlist-experience"
            className="feedback-form__textarea feedback-form__textarea--compact"
            name="experience"
            rows={4}
            placeholder="A sentence or two is plenty."
            disabled={detailsPending}
          />

          <label
            className="feedback-form__label"
            htmlFor="waitlist-device"
          >
            Are you happy to journal on your phone or would you prefer to do so on
            your PC/laptop?
          </label>
          <textarea
            id="waitlist-device"
            className="feedback-form__textarea feedback-form__textarea--compact"
            name="devicePreference"
            rows={3}
            placeholder="Either is fine — we’re curious what fits your life."
            disabled={detailsPending}
          />

          <label className="feedback-form__label" htmlFor="waitlist-hope">
            What do you hope to gain through your mindfulness and journalling
            practice?
          </label>
          <textarea
            id="waitlist-hope"
            className="feedback-form__textarea feedback-form__textarea--compact"
            name="hope"
            rows={4}
            placeholder="No wrong answers."
            disabled={detailsPending}
          />

          <input
            type="text"
            name="company"
            className="feedback-form__honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="waitlist-widget__details-actions">
            <button
              type="button"
              className="waitlist-widget__skip"
              disabled={detailsPending}
              onClick={() => setPhase("complete")}
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="feedback-form__submit waitlist-widget__submit-details"
              disabled={detailsPending}
            >
              {detailsPending ? "Sending…" : "Send answers"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="waitlist-widget">
      <p className="waitlist-widget__intro">
        We&apos;re accepting beta testers. If you would like to be part of the
        first users to experience ZenBead before its public launch, leave your
        email address here:
      </p>
      <p className="waitlist-widget__privacy">
        We only use this to contact you about early access — never for marketing
        lists you didn&apos;t ask for.
      </p>

      <form
        className="feedback-form feedback-form--waitlist"
        action={emailFormAction}
      >
        {emailState.status === "error" ? (
          <p className="feedback-form__error" role="alert">
            {emailState.message}
          </p>
        ) : null}

        <label className="feedback-form__label" htmlFor="waitlist-email">
          Email
        </label>
        <input
          id="waitlist-email"
          className="feedback-form__input"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={emailPending}
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
          disabled={emailPending}
        >
          {emailPending ? "Sending…" : "Be a beta tester"}
        </button>
      </form>
    </div>
  );
}

export function WaitlistWidget() {
  const [formKey, setFormKey] = useState(0);
  return (
    <WaitlistWidgetInner
      key={formKey}
      onSignUpAgain={() => setFormKey((k) => k + 1)}
    />
  );
}
