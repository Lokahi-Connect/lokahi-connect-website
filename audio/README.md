# Lokahi Connect — Read Aloud Audio Files

This folder holds the MP3 audio files that power the "Listen to this page" feature on three pages of lokahiconnect.org. This document tells you everything you need to regenerate any file when the content changes — without touching any code.

---

## Quick Reference

| File | Page | Covers | Likely to change? |
|------|------|--------|-------------------|
| `our-approach-01.mp3` | Our Approach | Intro + Three Pillars | Rarely |
| `our-approach-02.mp3` | Our Approach | 5-Step Process + Research Citations | When research updates |
| `programs-and-impact-01.mp3` | Programs & Impact | The Three Programs | Occasionally |
| `programs-and-impact-02.mp3` | Programs & Impact | Student Story + Session Flow + Reach | **Most likely to change** |
| `nondiscrimination-policy-01.mp3` | Nondiscrimination Policy | Commitment + Protected Characteristics + Scope | Rarely |
| `nondiscrimination-policy-02.mp3` | Nondiscrimination Policy | Prohibitions + Accommodations | Rarely |
| `nondiscrimination-policy-03.mp3` | Nondiscrimination Policy | Legal Compliance + Reporting + Governance | Occasionally |

---

## ElevenLabs Settings — Lock These In

Write these down before you generate. ElevenLabs does **not** automatically save your slider positions between sessions.

### For Our Approach + Programs & Impact (founder cloned voice)

| Setting | Value |
|---------|-------|
| Voice | *Your cloned voice name — fill in here once created* |
| Model | Eleven Multilingual v2 |
| Stability | 50 |
| Similarity Enhancement | 75 |
| Style Exaggeration | 0 |
| Speaker Boost | On |
| Output Format | MP3 · 44100 Hz · 128 kbps |

### For Nondiscrimination Policy (stock voice — Rachel or your chosen alternative)

| Setting | Value |
|---------|-------|
| Voice | Rachel *(or fill in your chosen alternative)* |
| Model | Eleven Multilingual v2 |
| Stability | 62 |
| Similarity Enhancement | 75 |
| Style Exaggeration | 0 |
| Speaker Boost | On |
| Output Format | MP3 · 44100 Hz · 128 kbps |

**Date audio was last generated:** *(fill in each time you regenerate)*

---

## How to Regenerate ONE File (e.g. when Programs & Impact content changes)

Use these steps when you've updated content on a page and need to replace one or more MP3 files.

1. **Log in to ElevenLabs** at elevenlabs.io.

2. **Open the right Project** (or Speech Synthesis if you're not using Projects). If you used Projects, open the Lokahi Connect project for that voice — your settings will already be there.

3. **Find the right script below** in this document. The scripts are labeled to match the file names exactly. Copy the text for whichever chunk you're updating.

4. **Update the text** in ElevenLabs with the new version of the content. If you added a new program, a new student story, or updated statistics — edit only the affected chunk's text.

5. **Confirm your settings match** the table above before generating. Pay special attention to Stability and Model — these are the most common sources of inconsistency if they drift between sessions.

6. **Generate and download** the file. Name it exactly as shown in the table above (e.g. `programs-and-impact-02.mp3`). All lowercase, hyphens only, `.mp3` extension.

7. **Replace the old file** in this `audio/` folder. You can drag the new file into this folder in Finder and say "Replace" when prompted.

8. **Commit the change to GitHub.** In your terminal, in the `lokahi-connect-website` folder, run:

   ```
   git add audio/programs-and-impact-02.mp3
   git commit -m "Update Programs audio: new student story data"
   git push
   ```

9. **Wait about 2 minutes**, then visit lokahiconnect.org/programs-and-impact.html and press "Listen to this page" to confirm the new audio plays correctly.

**Important:** You only need to regenerate the specific file(s) whose content changed. The other files are completely unaffected.

---

## How to Regenerate ALL Files (e.g. after a rebrand or voice change)

Follow the same steps as above, but do all 7 files in one ElevenLabs session. Use Projects if available — it keeps all settings locked together. Generate the cloned-voice files first (5 files), then switch to Rachel and generate the policy files (3 files).

---

## The Scripts

These are the exact texts used to generate each audio file. Copy them directly into ElevenLabs — punctuation and line breaks are intentional and help the AI pace the narration correctly.

---

### `our-approach-01.mp3` — Our Approach, Part 1
*Covers: page introduction + the three pillars (SWI, INT, Mediated Learning)*
*Voice: Founder cloned voice*

```
The Science Behind Lokahi WORD Project: Word Origins & Roots Discovery.

Lokahi Connect's approach is built on decades of morphological research
and evidence from cognitive neuroscience. Here's why it works — and why
phonics alone isn't enough.

The Foundations of Our Practice.

Each pillar is grounded in peer-reviewed research and practitioner
knowledge. Together, they form a coherent, student-centered
instructional framework.

Pillar One: Structured Word Inquiry.

Structured Word Inquiry — or S.W.I. — is a research-validated approach
developed at the University of Manitoba. Rather than drilling
letter-sound correspondences, S.W.I. teaches students to investigate
words using four questions.

The Four S.W.I. Questions:

One: What does this word mean? Use it in context.
Two: How is it structured? Identify morphemes — prefixes, base,
     and suffixes.
Three: What are related words? Word family evidence.
Four: How is it pronounced? After meaning and structure are established.

For example, the base "sign" connects to many words: "sign" plus "al"
makes "signal"; "sign" plus "ature" makes "signature"; "de" plus "sign"
plus "ate" makes "designate." The spelling stays the same because the
meaning stays the same.

Pillar Two: Interactional Neurolinguistics.

Interactional Neurolinguistics — or I.N.T. — is a targeted prompting
protocol drawn from speech-language pathology and neurolinguistics.
Rather than correcting errors, mediators use graduated prompts that help
students self-correct, building metacognitive awareness.

As one core principle puts it: "The goal isn't the right answer.
The goal is the student's ability to reason their way to the right answer."

Pillar Three: Mediated Learning.

Mediated Learning Experience — developed by Reuven Feuerstein — focuses
on how a skilled mediator structures learning interactions to build
cognitive functions. We train educators to mediate, not just instruct.

Key focus areas include: Intentionality, Transcendence, Meaning,
Competence, and Self-regulation.
```

---

### `our-approach-02.mp3` — Our Approach, Part 2
*Covers: the 5-step process + research citations*
*Voice: Founder cloned voice*

```
The Five-Step Meaning-First Process.

Every session follows the same investigative arc — moving from meaning
to structure to transfer. This predictable structure builds confidence
as well as competence.

Step One: Sentence Anchor. The student encounters the target word in
rich context. They read, listen, and connect.

Step Two: Meaning Inquiry. What does this word mean here? Not a
dictionary definition — a use-based, context-grounded meaning.

Step Three: Structure Analysis. What morphemes build this word?
Write a word sum: base plus suffix equals word.

Step Four: Join Convention. What happened at the join? Drop the final E?
Double the consonant? Change Y to I?

Step Five: Family and Transfer. Name related words. Then apply this
reasoning to a new word the student has never seen.

Grounded in Research.

Our practice is shaped by a growing body of morphological intervention
research. These studies inform our curriculum design, session structure,
and outcome measures.

Bowers and Kirby, 2010: "Instruction in morphological analysis improves
reading and spelling in students with reading disabilities."
Journal of Learning Disabilities.

Goodwin and Ahn, 2010: "A meta-analysis of morphological interventions —
effects on literacy achievement of children with literacy difficulties."
Annals of Dyslexia.

Goodwin and Ahn, 2013: "A meta-analysis of morphological interventions
in English — effects on literacy outcomes for school-age children."
Scientific Studies of Reading.

Georgiou and colleagues, 2021: "Is morphological awareness measured
differently in different orthographies, and does it contribute to reading
across orthographies?" Journal of Educational Psychology.

Marks and colleagues, 2024: "Structured Word Inquiry and its effects on
literacy achievement — a systematic review." Reading Research Quarterly.
```

---

### `programs-and-impact-01.mp3` — Programs & Impact, Part 1
*Covers: page introduction + the three programs*
*Voice: Founder cloned voice*
*Note: This section is relatively stable. Regenerate only if a program is added, renamed, or its description changes.*

```
Programs That Move the Needle.

From one-on-one intervention to system-wide educator training, Lokahi
Connect meets students and schools where they are.

Three Ways We Serve.

Whether you're a student, educator, or district administrator, there's a
Lokahi Connect program designed for you.

Direct Student Services — for students.

Individualized S.W.I.-based intervention for students in grades K
through 12 and adult learners. Sessions are 45 to 60 minutes, structured
around the five-step Meaning-First sequence. We serve students with
dyslexia, language-based learning differences, English-language-learner
backgrounds, or persistent spelling difficulties.

Educator Professional Development — for educators.

Multi-day training institutes and ongoing coaching for classroom
teachers, reading specialists, and speech-language pathologists.
We don't just deliver professional development — we model the practice.
We serve K through 12 teachers, reading coaches, special educators,
and speech-language pathologists.

Digital Resources — open access, for everyone.

The Meaning-First Student Lab is a free, open-access web tool for
structured word investigation. Built for neurodivergent learners —
with text-to-speech, adjustable speed, and scaffolded activities.
Students, families, and educators anywhere in the world can use it.
```

---

### `programs-and-impact-02.mp3` — Programs & Impact, Part 2
*Covers: student story + session flow + reach*
*Voice: Founder cloned voice*
*Note: **This is the file most likely to need updating.** Regenerate this file whenever you add new pilot data, update score gains, change the student story, or add geographic reach information. You do NOT need to touch Part 1 when only this section changes.*

```
Real Results for Real Students.

Our outcomes are measured by standardized assessments — and by the
confidence students bring to words they've never seen before.

Student Story.

"Peter came to us reading at a second-grade level in sixth grade.
After 18 months of Meaning-First intervention, his standard scores
shifted dramatically across reading, writing, and math — because
morphological reasoning is domain-general."

Peter's score gains from standardized assessments:
Reading: plus 7 standard score points.
Writing: plus 19 standard score points.
Math: plus 27 standard score points.
Name has been changed to protect privacy.

How a Session Works.

Every session follows the same five-step arc — predictable enough to
build confidence, flexible enough to meet the student where they are.

Step One: Sentence Anchor. Target word encountered in rich context.
Step Two: Meaning Check. Context-based meaning, not dictionary definition.
Step Three: Structure Analysis. Write a word sum — base plus suffix.
Step Four: Join Convention. What happened at the morpheme boundary?
Step Five: Word Family Transfer. Apply reasoning to a new, unseen word.

Where We Work.

Starting from Bainbridge Island, Washington, we're growing to serve
students and educators nationally through remote sessions and
open-access digital tools.

Home Base: Bainbridge Island, Washington — where our direct services
and educator training are rooted.

Remote Sessions: Student interventions and educator coaching delivered
nationwide via secure video.

Digital Tools: The Meaning-First Student Lab is free and accessible
to learners globally.
```

---

### `nondiscrimination-policy-01.mp3` — Nondiscrimination Policy, Part 1
*Covers: commitment statement + protected characteristics + scope of application*
*Voice: Rachel (stock voice)*

```
Lokahi Connect Nondiscrimination Policy.
Effective January 1, 2025. Last reviewed April 2026.

Equal Opportunity and Equal Dignity.

Lokahi Connect believes that every learner deserves access to
evidence-based literacy instruction, and every person deserves to be
treated with dignity. Our name — lōkahi, a Hawaiian value of unity,
harmony, and balanced wholeness — commits us to building programs,
workplaces, and partnerships that reflect that principle.

Lokahi Connect does not discriminate on the basis of any protected
characteristic in any of its programs, services, activities, hiring,
contracting, volunteer engagement, governance, or educational offerings.
We prohibit discrimination, harassment, bullying, and retaliation in
every aspect of our work, and we comply with all applicable federal,
state, and local civil rights laws.

In short: No student is turned away, no family is excluded, no employee
is treated unfairly, and no volunteer or partner is subjected to
harassment on the basis of who they are, what they believe, how they
learn, or where they come from.

Protected Characteristics.

Lokahi Connect prohibits discrimination, harassment, and retaliation on
the basis of any of the following characteristics:

Race, color, ethnicity, ancestry, or national origin — including traits
historically associated with race, such as hair texture and protective
hairstyles. Religion, creed, spiritual practice, or absence thereof.
Sex, including pregnancy, childbirth, lactation, and related medical
conditions. Gender, gender identity, gender expression, and transgender
status. Sexual orientation. Age. Disability — physical, mental, sensory,
learning, neurodevelopmental, or cognitive — including dyslexia, ADHD,
autism spectrum conditions, and other neurodivergent identities. Medical
condition, genetic information, or results of genetic testing. Marital,
partnership, or familial status. Veteran or military status. Citizenship,
immigration, or refugee status. Primary language or
English-language-learner status. Socioeconomic status, source of income,
or receipt of public assistance. Housing status, including unhoused or
transitional housing status. Political affiliation or activity where
protected by law. And any other basis protected by federal, state, or
local law.

Scope of Application.

This policy applies to all programs and services; all employment
practices; volunteers, interns, fellows, contractors, consultants, and
board members; students and families we serve; vendors, grantees,
donors, and partner organizations; our websites and digital tools; and
conduct that occurs off-site when it affects the Lokahi Connect
community.
```

---

### `nondiscrimination-policy-02.mp3` — Nondiscrimination Policy, Part 2
*Covers: what we prohibit + accommodations*
*Voice: Rachel (stock voice)*

```
Discrimination, Harassment, and Retaliation.

Discrimination.

No person will be denied admission, enrollment, employment, advancement,
services, accommodations, or equal access to any program or benefit
because of a protected characteristic. Practices that have the purpose
or effect of excluding or disadvantaging members of a protected group
are also prohibited.

Harassment.

Harassment — including verbal, written, visual, physical, or electronic
conduct — is prohibited when it is based on a protected characteristic
and creates an intimidating, hostile, humiliating, or offensive
environment, or unreasonably interferes with a person's work, learning,
or participation. This includes: slurs or derogatory comments about a
protected class; deliberate misgendering or outing a person's identity
without consent; sexual harassment; bullying, intimidation, or
cyber-harassment; ableist language or mockery of disability-related
accommodations; and display or circulation of discriminatory content.

Retaliation.

Lokahi Connect strictly prohibits retaliation against any person who
reports discrimination or harassment in good faith, participates in an
investigation, requests an accommodation, or exercises any right
protected by law. Retaliation is itself a violation of this policy and
will be treated as seriously as the underlying complaint.

Supporting Every Learner and Every Person.

Students and Families.

Our core mission is to serve learners who have been underserved by
conventional literacy approaches — including students with dyslexia,
ADHD, autism, language-based learning differences, multilingual
learners, and those with other disabilities. We will provide reasonable
instructional accommodations, communication supports, and material
adaptations so that every student can participate meaningfully.

Employees, Volunteers, and Participants with Disabilities.

In accordance with the Americans with Disabilities Act, Section 504, the
Washington Law Against Discrimination, and other applicable laws, Lokahi
Connect provides reasonable accommodations for qualified individuals with
disabilities. To request an accommodation — including accessible
materials, captioning, sign-language interpretation, or assistive
technology — contact the Nondiscrimination Officer.

Religious Accommodations.

We provide reasonable accommodations for sincerely held religious beliefs
and observances, including schedule adjustments and flexibility around
dress or grooming standards, except where doing so would create an
undue hardship.

Pregnancy, Parenting, and Related Conditions.

Lokahi Connect does not discriminate on the basis of pregnancy,
childbirth, lactation, recovery, or parenting status. Reasonable
accommodations, including schedule flexibility and modified duties, are
available upon request.

Language Access.

We will make reasonable efforts to communicate with students, families,
and staff in languages they understand, including providing translated
materials or interpretation where feasible.
```

---

### `nondiscrimination-policy-03.mp3` — Nondiscrimination Policy, Part 3
*Covers: legal compliance + how to report + governance*
*Voice: Rachel (stock voice)*

```
Applicable Civil Rights Laws.

This policy reflects Lokahi Connect's commitment to comply fully with
all applicable anti-discrimination and civil rights laws, including:

Title Six of the Civil Rights Act of 1964 — race, color, national
origin. Title Seven — employment. Title Nine of the Education Amendments
of 1972 — sex in education programs. Section 504 of the Rehabilitation
Act of 1973 — disability in federally assisted programs. The Americans
with Disabilities Act. The Age Discrimination in Employment Act and the
Age Discrimination Act of 1975. The Equal Pay Act and the Lilly
Ledbetter Fair Pay Act. The Genetic Information Nondiscrimination Act.
The Pregnancy Discrimination Act and the Pregnant Workers Fairness Act.
The Uniformed Services Employment and Reemployment Rights Act. The
Washington Law Against Discrimination. The Washington Healthy Starts Act.
And all applicable Kitsap County and local civil rights ordinances.

Where this policy and applicable law differ, the provision most
protective of the affected individual will govern.

Reporting and Complaint Procedures.

Any person who believes they have experienced or witnessed
discrimination, harassment, or retaliation in connection with Lokahi
Connect is strongly encouraged to report it promptly. Reports may be
made informally or formally, in writing or verbally, and — where
permitted by law — anonymously.

To submit a report: send an email to info@lokahiconnect.org with the
subject line "Nondiscrimination Concern"; write by mail to the
Nondiscrimination Officer, Lokahi Connect, Bainbridge Island,
Washington; or request a confidential conversation with the
Nondiscrimination Officer or any member of leadership.

After a report is received: we will acknowledge formal complaints within
five business days. Complaints are reviewed promptly, thoroughly, and
impartially. Investigations are conducted with as much confidentiality
as possible, consistent with a fair process and legal obligations.
Supportive or protective measures may be put in place during an
investigation where appropriate. Findings and corrective action will be
communicated to the parties to the extent permitted by law. Complainants
and respondents may request review of the outcome by the Board of
Directors within fifteen business days.

External Reporting Options.

Individuals may also file complaints with the U.S. Equal Employment
Opportunity Commission; the U.S. Department of Education Office for
Civil Rights; the U.S. Department of Justice Civil Rights Division; the
Washington State Human Rights Commission; or the Washington State
Office of the Attorney General Civil Rights Division. Lokahi Connect
will not retaliate against anyone for using these processes.

Governance, Training, and Ongoing Review.

Lokahi Connect's Board of Directors and Executive Leadership are jointly
responsible for upholding this policy. The Nondiscrimination Officer
oversees implementation, receives complaints, and coordinates
investigations and accommodations. All employees, regular volunteers,
and board members receive training on this policy at onboarding and
periodically thereafter. Hiring, contracting, grantmaking, and
partnership decisions are reviewed for equitable process and outcomes.
This policy is reviewed at least annually and updated as law, research,
and community needs evolve.

For questions, accommodation requests, or concerns about this policy,
contact Lokahi Connect's Nondiscrimination Officer at
info@lokahiconnect.org.
```

---

## When Page Content Changes — What to Update

### If you update the Programs & Impact page

1. Read the updated page and identify what changed.
2. Find the matching script above (`-01` or `-02` depending on what changed).
3. Edit only the changed portion of that script.
4. Regenerate just that one MP3 file using the settings table above.
5. Replace the file in this folder and commit.
6. You do **not** need to touch any HTML or JavaScript files.

### If you update the Our Approach page

Same process. If a citation changes, regenerate `our-approach-02.mp3` only. If a pillar description changes, regenerate `our-approach-01.mp3` only.

### If you update the Nondiscrimination Policy

Same process. Match the changed section to its part number using the Quick Reference table at the top.

### If you change the policy's effective date or review date

That information is at the top of `nondiscrimination-policy-01.mp3`'s script. Update the date in the script above, regenerate only that file.

### If you want to update the ElevenLabs voice (e.g. after retraining your clone)

Regenerate all files that use that voice in one session, using the same settings from the table above. The stock voice (Rachel / policy files) is unaffected by changes to your cloned voice.

---

## Checklist After Any Regeneration

- [ ] New file is named exactly as shown in the Quick Reference table
- [ ] New file is in the `audio/` folder (this folder)
- [ ] Settings (model, stability, similarity) matched the table above
- [ ] Listened to the first 30 seconds to confirm voice and pacing sound right
- [ ] File committed and pushed to GitHub
- [ ] Visited the live page and pressed "Listen to this page" to confirm it plays
- [ ] Updated "Date audio was last generated" in this README
