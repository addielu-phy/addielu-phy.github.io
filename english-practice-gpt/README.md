# 英文小練習 GPT版

Publication authorized by the user on 2026-11-18; production deployment verification follows the publishing commit.

Student: https://addielu-phy.github.io/english-practice-gpt/
Teacher: https://addielu-phy.github.io/english-practice-gpt/teacher.html

Buildless UTF-8 HTML and ES modules. The original english-flashcards site and its `word-studio-b5-v1` localStorage remain intact. This app uses a separate `english-small-steps-v1` key and a separate QA key for `?qa=1`.

## Scope

77 reference vocabulary items retained from the existing 111-edition Hanlin U3/U4 list. This is not a verified current complete Exam 2 vocabulary list. The current planning page lists B5 L3/L4/Review2 and additional school readings; the latter have not been supplied. 34 original transfer exercises target skills visible on the supplied first-exam paper; 10 Grill me questions ask for evidence and reasoning. Custom vocabulary imports support `3 | English | 中文`, `4 | English | 中文`, or unit 0. These exercises are not predictions of the next exam.

## Practice

3/5/10-item rounds; independent recognition and spelling records; flashcard self-rating; choice, typing, and tap-to-order exercises; one hint before retry; pause/resume and recover after reload; wrong items clear after two consecutive unaided automatically graded correct attempts. Self ratings do not clear objective weaknesses. Viewing a written answer before submitting marks the attempt assisted. Typed grading compares supplied reference variants, ignoring case and final punctuation; it is not a semantic language model.

Backup export downloads JSON and also exposes a copyable fallback. Import merges event IDs without replacing local work or automatically transmitting imported attempts. Same-device resumes are automatic; student cross-device restoration uses a backup, not authenticated student cloud reads. Initial caching allows previously loaded core student exercises to open offline; server operations and speech services are not guaranteed offline.

## Reused cloud service

The existing physics-quiz intentionally public web config is loaded at runtime from its existing public Pages URL rather than copied into this source. It is reused without changing its Auth settings, database rules, existing records or teacher password. Client SDK: pinned Firebase 10.12.2 from official gstatic CDN. Client integration uses the existing Standard Firestore `results` collection and Email/Password teacher provider, not a new project. Only `quizId=english-practice-gpt` is queried in the new teacher dashboard. Teacher uses the original account. No Admin credentials, tokens or passwords are committed.

Each consented answer appends a result, including an event ID, pseudonym, learner ID, question, submitted answer, reference answer, correctness, grading method, assistance marker and estimated foreground interaction time. Upload success is displayed only after acknowledgement. Offline and failed writes remain pending. Delivery retries can physically duplicate documents; the teacher report deduplicates event IDs. Testing records have `qa:true` and are excluded from cloud reports. No private student data is bundled in source.

Before sending, an unauthenticated named-app probe verifies that a `results` document cannot be read. If the database unexpectedly permits that read, uploading stops. Student write access remains inherited from the old system. Student pseudonyms and generated learner IDs do not authenticate identity; this system must not be treated as an official assessment or tamper-proof attendance record. Abuse prevention, per-student authentication, remote student restore, and server-validated answer grading would need a separate backend change.

Teacher Auth persists for the current browser session. Database rules enforce read access; the client email check is not a replacement for those rules. Teacher report supports pseudonym/learner ID, Taiwan date filters, categories, daily summaries, first independent correctness, hints, self-rating, weak items, raw answers, CSV and print. Cloud paging uses 250-document pages and visibly discloses partial coverage. Local teacher coaching notes stay on the teacher device; they are not cloud records.

## Validation (2026-11-17)

- `node --test english-practice-gpt/test.mjs`: 10 meaningful tests pass (streaks, independent/self/assisted separation, separate recognition/spelling keys, normalization, question shapes, review queue, backup validation, CSV injection handling, retry deduplication and UTF-8 integrity).
- Browser UI: empty nickname validation, wrong response and hint retry, typing `tenis` vs `TENNIS`, pause/reload recovery, real backup content extraction and teacher read-only backup report. Teacher report correctly showed 0/2 independent and 2 assisted attempts from the four-event QA scenario.
- Live backend: two clearly marked QA results received write acknowledgements; the preceding unauthenticated read probe was denied. Existing rules and data were not modified.
- Desktop and 390px iframe viewport inspected; no unreadable Chinese or horizontal content clipping observed.
- Remaining live-account check: the owner's actual teacher login and authenticated cloud report read require their existing password and were not performed by the agent. No password guessing or credential reset was attempted.
- Browser download-event automation did not complete reliably; the copyable JSON fallback was verified instead. Device-specific file download and mobile speech availability remain browser-dependent.
