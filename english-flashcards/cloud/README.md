# English flashcards cloud sync — draft

This branch is a pending implementation. Production still uses browser-local storage. No Firebase project, credentials, database, or cloud access rules have been deployed by this change.

## Intended behavior

Google sign-in restores one learner's vocabulary, counters, active study sessions, and attempt history across devices. Owners may grant specific verified Google email addresses read-only report access using their learner UID. The UID alone does not grant access. Changes remain in localStorage when offline. Concurrent edits require an explicit version choice and offer a backup; this implementation does not merge conflicting attempts automatically.

## Setup required before merging

1. Connect the official Firebase plugin to the owner's account. Select or create an appropriate free-tier project without upgrading billing.
2. Register a web app, enable Google Authentication, and authorize `addielu-phy.github.io`.
3. Initialize Firestore, review `firestore.rules`, and validate owner, stranger, granted viewer, revoked viewer, malformed writes, and revision conflicts in the rules emulator. For an existing project, merge the dedicated namespace rules without replacing unrelated rules.
4. Copy `firebase-config.example.mjs` to `firebase-config.mjs` using only the public Firebase web config. Never commit service account keys, access tokens, or Admin credentials.
5. Place the cloud modules under `english-flashcards/cloud/` and use the proposed `english-flashcards/index.html` from this branch.
6. Test real Google login, two devices, reload, offline retry, simultaneous edits, account switching, and teacher/parent read-only access. Confirm revocation prevents new reads. Previously downloaded reports cannot be revoked.
7. Assess Firestore usage limits and retained immutable chunks before public rollout. Uploads are throttled to about 30 seconds; old chunks are retained to avoid unsafe concurrent deletion. Usage is not guaranteed to remain free for arbitrary numbers of learners.
8. Merge only after the live backend and cross-device checks pass. Update portfolio wording only after cloud sync actually works.

## Checks completed locally

`node english-flashcards/cloud/test-sync.mjs` tests Unicode chunks, digest validation, interrupted uploads, concurrent revision changes, and account-choice logic with an in-memory driver. Existing tracking and backup bridge tests also passed locally. These checks do not validate deployed Firestore rules, actual sign-in, or cross-device service behavior.

Study time is an estimate from active foreground interaction; it does not establish that a learner was attentive. Data is associated with a Google account rather than multiple student profiles in one shared account. The reference vocabulary and exam-range warning remain unchanged.
