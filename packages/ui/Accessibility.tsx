import { useState } from "react";
import {
  SignOnForm,
  useA11yWatchContext,
  AuditProvider,
  AuditForm,
  AuditList,
} from "@a11ywatch/react-a11ywatch-js";
import { A11yWatchProvider, setAPIURL } from "@a11ywatch/react-a11ywatch-js";

// configure our API
setAPIURL(process.env.API_URL || "http://localhost:3280");

const A11yWatchApp = () => {
  const { account, onLogout } = useA11yWatchContext();
  const [multi, setMulti] = useState<boolean>(false); // todo: bind to state
  const [loginView, setAuthView] = useState<boolean>(false); // todo: bind to state

  // toggle multi page scan
  const onSetMultiEvent = () => setMulti((x) => !x)
  const onLoginFormEvent = () => setAuthView((x) => !x);

  return (
    <div className="px-4 py-2 space-y-2">
      {!account.authed ? <button onClick={onLoginFormEvent} className={"px-2 py-2 border-b"}>Login or Register?</button> : <button onClick={onLogout} className={"px-2 py-2 border-b"}>Logout?</button>}
      {loginView ? <SignOnForm /> : null}
      <AuditProvider persist multi={multi}>
        <div className="flex space-x-2 place-items-center py-2">
          <AuditForm clear />
          <label>
             Full
            <input type={"checkbox"} value={`${multi ? "multi page" : "single page"}`} checked={multi} onChange={onSetMultiEvent} style={{ marginLeft: 2 }} />
          </label>
        </div>
        <div className="py-2">
          <AuditList />
        </div>
      </AuditProvider>
    </div>
  );
};

// wrap in top level provider
export function Accessibility() {
  return <A11yWatchProvider persist><A11yWatchApp /></A11yWatchProvider>;
}