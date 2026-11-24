# Security and publishing policy

- Do not upload signing keystores (`.jks`, `.keystore`), `local.properties`, tokens, API keys, auth cookies, `.env`, billing, PAN, identity, or banking data.
- Review source ownership, copyright and dependency licenses before open-sourcing each app.
- A GitHub Release APK can remain source-closed if allowed by the applicable licenses. Do not label it open-source without publishing corresponding licensed source.
- Verify APK checksum and signing certificate before sharing releases; add verified SHA-256 to release notes for users.
- Do not expose testing credentials, broker keys, or trading account data.
- Bug reports should use test data, never real secrets or personal information.
- This site does not accept payments or collect visitor information. It requests only public GitHub release metadata (GitHub receives normal API request metadata).
- Publisher Studio is a local file generator, not an authenticated admin console or remote publishing system.