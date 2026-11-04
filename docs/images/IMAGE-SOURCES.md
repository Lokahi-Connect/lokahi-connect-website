# Website images — November 4, 2026

Owner: Stephanie Steinshouer. These local downloads were selected for the website refresh at Stephanie's request.

| Source download | Website asset stem | Placement |
| --- | --- | --- |
| `remotetutoring.png` | `stephanie-online-learning` | Home and Services |
| `tutoring_KS.png` | `stephanie-story-inquiry` | Our Approach; Resources link preview |
| `tutoring_SB.png` | `stephanie-shared-reading` | Dyslexia and Give |
| `ProfessionalWorkshop.png` | `stephanie-professional-workshop` | Programs, Get Involved, Family & Community Toolkit; About and Community Feedback link previews |
| `LCHIlogo.png` | `lokahi-connect-logo.png` | Shared footer |

The four learning scenes were generated with AI using Stephanie's likeness. They illustrate services and learning settings; they do not document actual clients or completed events. Visible captions and alternative text identify the scenes as illustrations. The original leadership headshot remains on About.

Assets live in `assets/`. Full scenes are preserved without cropping. WebP versions provide desktop and smaller mobile images; JPEG versions support shared-link previews. The logo retains its transparency and is displayed on a light background. `image-refresh.css` adapts the existing layout to these image proportions.

Future image update checklist:

- [ ] Confirm the image source and Stephanie's intended placement.
- [ ] Keep faces, shared materials, and meaningful text visible at phone and desktop widths.
- [ ] Update the image, alternative text, caption, dimensions, and shared-link preview together.
- [ ] Run `node scripts/validate-site.mjs` and the existing inquiry/measurement checks.
- [ ] Review the changed pages, merge the focused PR, and confirm the Pages deployment.

Validation for this refresh: the 14-page site validator and both existing analytics/measurement test scripts passed. The original inquiry destinations, pricing, credential wording, and analytics scripts were retained. Local browser preview was unavailable because the environment did not allow a preview server to bind a port; published-page review is recorded in the pull request.
