# HighGround — Community, connected

An interactive bilingual flood-support prototype inspired by the teammate's HighGround app screens. It uses HighGround branding from the supplied logo reference, the original care-request flow, and the connected Binnova-style AI chatbot.

## Run

Requires Node.js 22+; no dependencies or build step.

```sh
git clone https://github.com/JesusGTech/Datathon.git
cd Datathon
npm start
```

Open http://127.0.0.1:4173. Stop with Ctrl+C. For an alternate port use `PORT=4174 npm start`.

`npm run check` checks syntax. `npm test` runs eight backend and resource-guide tests.

## Screens and interactions

- **Map:** illustrated neighborhood with sample flood/host markers, selectable layers, refuge exploration and official information links. It is not a geographical navigation service.
- **Explore a refuge:** fictional host profile and illustrative connection. Opens the original demo form with shelter selected; no reservation or travel directions.
- **Guidance:** unverified-route guidance and official resources, including a 911 link. It does not determine whether a person should evacuate or remain in place.
- **Report:** a fixed illustration with explicitly simulated review. Add the sample to the local coordinator queue. No photo/location collection, AI image analysis, depth estimate or official road closure.
- **Host:** demo availability switch, fictional household request and confirmed accept/decline decisions. No real guest contact, identity verification or compensation.
- **Coordinator view:** fixed sample counts and review cards with local demo-action confirmations. No dispatch, external notification or municipal integration.
- **Care:** original four service categories and accessible review/edit/confirm form. Confirmation says request not sent.
- **Reset demo:** clears local operational simulation state; chat has its own Clear chat control.

The layout adapts to desktop and mobile with bottom mobile navigation. English/Spanish selection preserves operational demo state; it clears chat context and cancels pending AI responses.

## AI assistant

The original Binnova-style assistant remains connected to OpenAI through the server. Its knowledge now covers the new screens and their limitations. It supports suggested questions, recent context, loading/error states, clear chat and labeled FAQ fallback. A permanent emergency link remains available; basic urgent-language matching is not comprehensive triage.

AI is optional. Set `OPENAI_API_KEY` and optional `OPENAI_MODEL` in your private server environment, or set `FLOODCARE_ENV_FILE` to an existing private environment file. An ignored `local-config.json` can also reference that file through its `envFile` property. No credentials or developer-specific configuration are included in this repository. Without credentials, the chatbot provides labeled resource-guide fallback answers. Never put secrets in `dist`, source control or chat messages.

Chat messages and recent context go to OpenAI when enabled, with `store: false`. No form details or operational demo state are automatically included. Application chat history is in page memory only; provider retention policies still apply. Use fictional details, not personal or medical information.

Requests are restricted to approved local origins, 500 user characters, nine messages, 16KB bodies, ten AI calls per minute and 200 per day per process. Limits reset on restart and are not durable billing controls. The server binds to loopback only and serves a fixed file allowlist.

## Verification

Browser checks passed for report → coordinator queue, case review/count update, availability disabling acceptance, host acceptance → coordinator summary, refuge → preselected shelter form → not-sent confirmation, official 911 link target (no call placed), language switching with state preservation, and demo reset.

The connected chatbot returned a live answer correctly explaining that the coordinator view cannot dispatch help. Mobile checks passed without horizontal overflow at 390px and 320px; the Spanish chatbot panel fit within the 390px viewport above mobile navigation. Eight backend/knowledge tests pass, covering missing credentials, input validation, emergency fallback, mocked AI responses, provider failure, request limits and bilingual topic routing.

This is not a formal accessibility audit, live-device emergency usability study, comprehensive AI safety evaluation, or production emergency system.

## Source files

- `dist/experience.js` — new screens, illustrated maps, bilingual content and in-memory simulation
- `dist/experience.css` — HighGround-inspired responsive layout
- `dist/app.js` — retained care-request dialogs and emergency/resource content
- `dist/style.css` — base styles and chat widget styles
- `dist/chat.js`, `dist/chat-knowledge.js` — bilingual chat interface and approved knowledge
- `chat-api.mjs` — bounded server-side OpenAI request handling
- `server.mjs`, `start.mjs` — local serving and existing credential-file loading

## Scope and next stage

The teammate's reference was used for the six-screen concept, restrained navy/teal palette, map-led layouts and resident/host/coordinator relationships. This is an adaptation, not a pixel-perfect copy. HighGround's care flow adds a seventh view.

Before real-world use, the demo would need verified data and freshness indicators, staffed and authorized operations, secure role-based access, provider/host agreements, documented verification and consent, durable intake/state, and tested escalation procedures. Do not remove demo labels or substitute claimed dispatch, safe-route scores, or confirmed hosts without functioning verified services.

Official resources: https://www.weather.gov/, https://www.weather.gov/safety/flood-during, https://www.211texas.org/.


## Screenshot-matched coordinator dashboard

The default screen now recreates the supplied coordinator screenshot: navy header, 18/41/5/126 sample statistics, illustrated creek map, and three review cards with matching action labels and colors. The AI chatbot remains available at the bottom right. The artifact viewer's sign-in overlay is omitted. The top-right EN / ES pill switches language. The Demo data button in the footer opens the full simulation explanation; the footer also labels all counts, warning text, timestamps, percentages and routes as fictional. Action buttons open explicit simulation dialogs and never contact emergency services or other people. View photo shows a labeled illustration. The original resident screens remain under Resident view in the footer.

`dist/coordinator.js` and `dist/coordinator.css` implement the new default screen.
