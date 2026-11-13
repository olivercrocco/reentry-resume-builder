# Reentry Resume Builder

A free resume builder for formerly incarcerated individuals, including those who served long sentences. It asks one question at a time, in plain language, and produces a resume that hiring software can read. It runs entirely in the browser: no account, no server, and nothing typed into it is sent anywhere or stored unless the person chooses to save it.

Try it at https://olivercrocco.com/resume-builder/, or download `resume-builder.html` and open it in any browser. The single file works without the internet, so it can be shared on a USB drive or used on a laptop in a classroom.

It was built for a pre-release employment skills course in Louisiana, for participants within about a month of release. The content is Louisiana-specific in places (the certification lists and colleges), and the rest applies anywhere in the United States.

## What it does

- Walks through eleven short steps: contact details, the job wanted, work history, skills, certifications, education, volunteer and leadership, a summary, review, and an optional cover letter.
- Treats work done while incarcerated as real experience. For those jobs, the person chooses how to name the employer (the state department, the facility, or the program), and every option is honest.
- Suggests lines for 20 kinds of work, most of them common inside (kitchen, maintenance, farm, law clerk, peer mentor, hospice, and others), which the person adds and edits. Suggested numbers are left as blanks to fill in, and the review step will not call a resume finished while a blank remains.
- Offers 75 certifications offered in Louisiana prisons (NCCER trades, OSHA, ASE, HVAC Excellence, ServSafe, IC3, Microsoft Office Specialist, and more) as one-tap choices, with the certifying body filled in. The sources are in `docs/louisiana-prison-credentials.md`.
- Puts skills and certifications ahead of dated work history, so a long gap is not the first thing a reader sees.
- Checks wording. It flags words employers may not understand or that point to prison without describing the work ("inmate," "offender," "tier walker," "counsel substitute," "DOC number," and others), lines that start with "I" or "Responsible for," and lines in all capitals, and it says what to write instead.
- Reads each step aloud on request, using the device's own voices, which work offline.
- Shows a finished example resume, marks finished steps, and shows the plain text that hiring software reads.
- Compares the resume with a pasted job posting and shows which common job words already appear.
- Downloads a Word file (one column, standard headings, no tables or text boxes, contact details in the body), prints or saves as PDF, and copies plain text for online applications.

It leaves the conviction off the resume and the cover letter. That conversation belongs in the interview, and the course practices it there.

## Design choices

- Privacy first. Participants may be using shared computers, so nothing is kept in browser storage. "Save my work" downloads a small file the person controls, and "Clear everything" resets the page.
- No invented content. Suggestions are starting points that must be confirmed and edited, and there is no AI writing help, which would need the internet, send personal information to a provider, and produce wording the person may not be able to explain in an interview.
- No single "ATS score." Hiring systems differ a great deal in how they read resumes, so the tool gives specific fixes instead of a number.
- One plain layout, black and white, Times New Roman 12 with no extra paragraph spacing. Fewer choices make it easier to finish.

## Files

- `resume-builder.html`: the whole tool in one file. This is the source of truth.
- `build-web.mjs`: builds `web/`, a version for sites whose Content-Security-Policy blocks inline scripts. Run `node build-web.mjs` after editing the single file.
- `web/`: the built web version (`index.html`, `core.js`, `ui.js`, and a copy of the single file for download).
- `docs/louisiana-prison-credentials.md`: the programs and credentials offered in Louisiana prisons, with sources, behind the certification and education lists.

## Adapting it

The content lists sit near the top of the first script in `resume-builder.html`: `JOBS` (kinds of work and suggested lines), `SKILL_GROUPS`, `CERT_GROUPS`, `PRISON_SCHOOLS`, and `WORDING_RULES`. Another state's programs can replace the Louisiana lists without touching the rest. The wording list is a first version and is best extended with staff and participants, who know the local terms.

## License

MIT. See `LICENSE`.

Built by Oliver S. Crocco, Louisiana State University.
