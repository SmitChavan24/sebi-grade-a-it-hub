const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
const write=(f,s)=>fs.writeFileSync(path.join(ROOT,f),s);
const json=(f,o)=>write(f,JSON.stringify(o,null,2)+'\n');
const extra={
 'reas-puzzles': ['Seating, floor and scheduling puzzles',`Draw slots before reading clues. Record fixed positions first, then relative blocks, then exclusions. In circular seating fix one person to remove rotational duplicates. Facing the centre, left is clockwise; facing outward reverses it. In floor puzzles label bottom as 1 unless the question says otherwise.

## Worked example
A, B, C and D sit left to right facing north. B is immediately right of A; D is at the right end; C is not adjacent to D. The only arrangement is C A B D. Test it against every clue rather than accepting the first arrangement that fits two clues.

## Practice method
Solve one linear, one floor and one scheduling set. Branch when an ambiguous clue has two placements; cross out a branch as soon as it contradicts another clue. If a set is still open after four minutes during a speed drill, move on and return later. Record the clue you misread. Never add assumptions such as one person per month unless stated.`],
 'reas-syllogism':['Syllogisms and logical conclusions',`Translate All A are B as containment, No A is B as disjoint sets, and Some A are B as at least one shared member. Only accept a conclusion that holds in every diagram consistent with the statements. All does not by itself establish existence under formal logic; follow explicit examination conventions if the handout specifies them.

## Worked example
All coders are readers. Some readers are musicians. Conclusion: some coders are musicians. This does not follow: the musician-readers could all lie outside the coders set. Conversely, some musicians are readers follows directly from the second statement.

## Possibility questions
Distinguish must be true from can be true. A possibility is valid if at least one arrangement satisfies both the premises and the proposed possibility. Test universal claims with counterexamples. Practise five questions each of containment, exclusion and possibility; draw the counterexample for each rejected conclusion.`],
 'reas-inequality':['Direct and coded inequalities',`Join chains only when their direction supports a comparison. A > B >= C implies A > C. A > B < C does not compare A and C. Equality can connect either side of a chain. Decode each symbol into its ordinary relation before combining it.

## Worked example
P >= Q, Q > R and R = S. Then P > S follows. S >= Q does not follow. If P > Q and Q <= R, P and R cannot be ordered without more information.

## Drill
Create ten chains of four variables, mixing strict and non-strict signs. For every undetermined conclusion, supply two numerical assignments showing opposite possible orders. For either/or conclusions, check that the alternatives exhaust the possibilities and cannot both be true. Do not decide merely because both individual conclusions are unproved.`],
 'reas-misc':['Directions, relations, ranking and coding',`Use coordinates for direction: east adds x, north adds y. For family relations draw a generation chart and do not infer gender from a name. A rank from the top and a rank from the bottom for the same person give total = top + bottom - 1.

## Worked examples
A person walks 3 km east and 4 km north. Displacement is 5 km northeast; distance travelled is 7 km. A candidate is 8th from the top and 13th from the bottom: there are 20 candidates. If CAT becomes DBU by shifting each letter forward once, DOG becomes EPH.

## Input-output
Compare consecutive steps and identify what is moved, where it goes, and what remains fixed. Test your proposed rule on every visible step. For mixed alphabet-number strings count only the requested adjacent pattern, including boundary positions. Practise with a 60-second cap per standalone question.`],
 'reas-critical':['Data sufficiency and critical reasoning',`For data sufficiency test statement I alone, then II alone, then both only if necessary. Determine whether there is exactly one answer, not whether you can calculate a convenient example. In assumptions distinguish a necessary premise from a merely helpful suggestion.

## Worked example
Question: is integer x positive? I: x squared = 9. Insufficient, because x can be -3 or 3. II: x > 0. Sufficient by itself. A common error is combining I and II before testing independence.

## Argument drill
Claim: a training programme improved scores because its participants scored higher. An alternative explanation is that stronger candidates volunteered. An appropriate study compares equivalent groups or controls prior scores. To test an alleged necessary assumption, negate it and ask whether the argument can still stand. For a course of action prefer a feasible response to the stated problem; do not invent additional facts.`],
 'engd-essay':['Essay writing under a timer',`Use a clear thesis, two developed reasons, a limitation or counterargument, and a practical conclusion. Each paragraph should make one point supported by an explanation or accurate example. Avoid memorised statistics you cannot verify.

## 30-minute practice
Spend 4 minutes planning, 22 drafting and 4 editing. Use the word limit given in the actual question; 250-300 words is a useful practice range, not a declared exam requirement. Type practice answers to develop speed and editing control.

## Example outline: technology and investor protection
Thesis: technology can widen access while requiring stronger safeguards. Paragraph 1: digital onboarding reduces effort and travel. Paragraph 2: monitoring can detect unusual activity, but models need validation and human review. Counterargument: convenience can expose inexperienced investors to impersonation and unsuitable products. Conclusion: combine accessible tools, effective complaints handling and education.

## Self-review rubric
Score relevance, structure, reasoning, language and editing from 0 to 2 each. Rewrite the weakest paragraph. Save the dated draft in Your notes. Do not treat an unreviewed word count as mastery.`],
 'engd-essay-topics':['Essay prompts and weekly writing plan',`Rotate these original prompts: financial literacy in a digital economy; responsible use of AI in supervision; privacy and useful data collection; cyber resilience in capital markets; investor education for first-time savers; inclusion and accessible technology; balancing innovation with oversight; human judgement in automated decisions.

## Weekly routine
Monday: plan two prompts. Tuesday: type one essay. Wednesday: rewrite its introduction and transitions. Thursday: write a counterargument. Friday: type another essay under a timer. Saturday: review both using the five-part rubric. Sunday: save three language errors to your revision notebook.

## Evidence discipline
Use named, dated primary sources for policy examples. Separate an existing rule from your recommendation. If you cannot verify a statistic, use a precise qualitative statement instead. Sample opening: Digital access can lower barriers to participation, but access alone does not ensure informed decisions. Investor education and usable safeguards must develop alongside distribution.`],
 'engd-precis':['Precis writing with a worked example',`A precis preserves the main argument in fewer words, in your own language, without opinion or new examples. Read the passage twice, identify its central claim and supporting chain, remove repetition, then draft. Obey the supplied word limit; one-third length is a practice convention when none is supplied.

## Original practice passage
Digital tools let investors access information quickly and transact without visiting an office. Yet easy access does not ensure that users understand costs or risks. Clear disclosures help only when people can find and understand them. Education and accessible complaint channels therefore remain essential companions to technology.

## Sample precis
Title: Beyond digital access. Digital investing needs understandable disclosures, education and accessible complaint channels so convenience supports informed decisions.

## Check
The compressed version retains access, its limitation, and the proposed response. It omits supporting detail without adding an opinion. Practise with a longer editorial paragraph and compare each sentence of your precis with the original meaning.`],
 'engd-comprehension':['Descriptive comprehension',`Read the questions before the passage to identify what evidence you need. Distinguish the author's claim, examples, qualifications and conclusion. Answer in the requested form; a question asking for two reasons needs two distinct reasons.

## Original passage and answer
Passage: A monitoring tool flags unusual transactions. A flag indicates a need for review, not proof of wrongdoing. Analysts must check data quality and legitimate explanations before escalating a case.
Question: Why is human review necessary? Answer: A statistical anomaly may have a legitimate cause or arise from faulty data, so analysts must assess the evidence before escalation.

## Practice
Explain the distinction between anomaly and proof in one sentence. Identify the passage's tone: cautious and analytical, not dismissive of technology. Mark unsupported inferences explicitly. In a timed session reserve the final minutes to check grammar, completeness and whether you have accidentally copied a large part of the passage.`],
 'engd-letters':['Formal correspondence and short reports — extra writing practice',`Correspondence is supplementary drafting practice; consult the English handout for the actual task types. Use an informative subject, a clear purpose, necessary context and an explicit requested action. Keep tone respectful and specific.

## Original example
Subject: Request for correction of account contact details
Dear Sir or Madam,
I request a correction to the contact details recorded for my account. The current entry contains a typographical error. Please advise which documents are required and the expected processing time. I will submit the information through your approved secure channel.
Yours faithfully,
Applicant

## Reports
Organise an incident report as summary, observed facts, impact, immediate actions, open questions and next steps. Separate confirmed evidence from hypotheses. Avoid including unnecessary personal details. Rewrite the example as a 100-word service report; assess clarity and whether the recipient knows what to do next.`],
 'intv-profile':['Build your interview profile',`Prepare a one-page factual profile: education, two projects, responsibilities, a difficulty you handled, a mistake you corrected and what you learned. Be ready to explain each technical term you use.

## Project explanation
Use problem, constraints, design, tradeoff, result and next improvement. For a database project explain why you chose the keys, how transactions fail safely, and how access is controlled. Describe your own contribution separately from your team's.

## Practice
Record a 90-second introduction. Remove claims you cannot support. Ask yourself three follow-up questions per project: what fails under load; how do you test recovery; what would you change now? Write honest answers with concrete examples. Review your application details before the interview. These are practice prompts, not reported panel questions.`],
 'intv-why-sebi':['Why SEBI and the IT stream',`Build an answer connecting public purpose, your technical experience and the work you want to learn. Understand the regulator's role through its official website and annual report. Avoid claiming knowledge of an internal system you have never used.

## Answer structure
One sentence on investor protection and orderly markets; one example of relevant technical work; one sentence on how you want to contribute and develop. Mention reliability, data quality or secure systems only when you can discuss them concretely.

## Follow-ups
Why regulation rather than a private technology role? How would you handle repetitive operational work? What is one knowledge gap you are actively closing? Prepare truthful answers instead of a memorised speech. Read a recent official report and explain one point in plain language.`],
 'intv-sebi-current':['Prepare current SEBI examples for interview',`Use the official vacancies page for recruitment updates and SEBI publications for institutional information. Keep a dated evidence sheet with the document title, official link, publication date and a short explanation of why it matters.

## Weekly evidence sheet
Choose one annual-report section, one circular and one investor-education page. For each write: problem addressed; affected participants; operational implication; open question. Separate a policy's stated objective from your interpretation of its effect.

## Mock response
Explain a technical control in 60 seconds without jargon, then explain how you would measure whether it works. Do not memorise current officeholders or numerical thresholds from undated notes. Verify those facts again close to the interview.

[Official SEBI website](https://www.sebi.gov.in/)`],
 'intv-it-questions':['IT interview scenarios — original practice prompts',`These prompts are original exercises, not claims about past panel questions.

## Scenario: duplicate transaction messages
Explain idempotency keys, a uniqueness constraint, transaction boundaries and safe retries. Discuss how you would reconcile a timeout when the sender does not know whether processing succeeded.

## Scenario: suspicious login burst
Describe monitoring, evidence preservation, risk-based containment, escalation and recovery. Explain false positives and why you would avoid a blanket response without assessing impact.

## Scenario: recovery readiness
Distinguish recovery time from acceptable data loss. Describe backups, restore drills, dependency checks, access control and communication responsibilities.

## Daily practice
Pick one scenario. Spend two minutes structuring the answer, speak for two minutes and then challenge one assumption. End with a measurable check, such as successfully restoring a test dataset. Use official policy documents when discussing specific regulatory requirements.`],
 'intv-hr':['Ethics and situational interview practice',`A useful response identifies the facts, stakeholders, applicable process, immediate action and how the decision will be recorded. Avoid promising actions beyond your authority.

## Scenario
A colleague asks you to share restricted information to solve an urgent issue. Clarify the legitimate need, verify authorisation, use the approved channel and share only what is necessary. Escalate uncertainty through the appropriate process rather than quietly bypassing controls.

## Failure story
Choose a real example. Explain your responsibility, corrective action and the check you introduced to prevent recurrence. Do not shift all responsibility to others or invent a perfect ending.

## Mock interview routine
Practice one profile, one technical and one situational question aloud. Review clarity, evidence, judgement and honesty. If you do not know a fact, state that and explain how you would verify it. Save recurring weaknesses in the revision queue.`],
 'it-shell':['UNIX commands and shell scripting',`A shell starts programs, expands variables and connects input/output streams. Know pwd, cd, ls, cp, mv, mkdir, cat, head, tail, wc, sort, uniq, grep, find and chmod. A pipe sends standard output of one command to standard input of the next. Quote expansions to preserve spaces.

## Worked script

\`\`\`sh
name="study hub"
printf '%s\\n' "$name"
for n in 1 2 3; do
  printf '%s\\n' "$n"
done
if [ "$#" -gt 0 ]; then
  printf '%s\\n' "$1"
fi
\`\`\`

$0 is the script name, $1 the first argument, $# the argument count and $? the previous exit status. Zero normally means success. A function's return communicates status; output is written separately. Use grep -E for extended regular expressions and distinguish globbing from regex.

## Drill
Trace a loop with a counter; predict the result of a conditional; explain sort names.txt | uniq -c. Repeated values must be adjacent for uniq to combine them. Practise only on disposable example files.

[GNU Bash manual](https://www.gnu.org/software/bash/manual/bash.html)`],
 'it-data-python':['Python analytics: slicing, regex, files and dataframes',`Lists preserve order; sets remove duplicate values; dictionaries map keys to values. A slice a[start:stop:step] excludes stop. A shallow copy creates a new outer collection while retaining references to nested objects.

## Worked examples

\`\`\`python
a = [10, 20, 30, 40, 50]
print(a[1:4:2])  # [20, 40]
print(a[::-1])   # [50, 40, 30, 20, 10]
counts = {}
for x in ['A', 'B', 'A']:
    counts[x] = counts.get(x, 0) + 1
# {'A': 2, 'B': 1}
\`\`\`

In pandas, loc selects labels and iloc selects integer positions. Filter with a boolean mask; combine masks with parenthesised & and |. groupby splits rows into groups before aggregation. pivot reshapes unique index-column pairs; pivot_table can aggregate duplicates. merge performs relational joins; verify key uniqueness to avoid multiplying rows unexpectedly.

## Files and cleaning
Use a context manager for files. Choose encodings explicitly. Distinguish missing values from zeros, validate types and document how duplicates are handled. Regex anchors ^ and $ constrain boundaries; search finds a match anywhere, while fullmatch covers the entire input. Practise predicting shapes and row counts before running code.

[Python tutorial](https://docs.python.org/3/tutorial/) · [pandas user guide](https://pandas.pydata.org/docs/user_guide/index.html)`],
 'it-data-r':['R essentials for data analysis',`R vectors are normally one-indexed. c(2,4,6)[2] gives 4. A negative index excludes a position. Vector operations are elementwise; shorter vectors may be recycled, so check lengths. NA represents missingness and is tested with is.na, not equality.

## Worked example

\`\`\`r
x <- c(2, NA, 6)
mean(x)                 # NA
mean(x, na.rm = TRUE)   # 4
d <- data.frame(team=c("A","A","B"), value=c(2,4,9))
aggregate(value ~ team, data=d, FUN=sum)
# A: 6, B: 9
\`\`\`

Use read.csv and write.csv for tabular files; inspect str, head and summary after import. A data.frame can hold columns of different types. Matrix elements share a type. Lists can contain heterogeneous objects. A factor encodes categories and levels, not arbitrary numeric magnitudes.

## Drill
Predict x[c(TRUE,FALSE,TRUE)], compare list indexing with [ and [[, and reshape a small table from wide to long. Practise missing-value handling, functions and regular expressions. Compare with Python explicitly to avoid confusing zero-based and one-based positions.

[Official R manuals](https://cran.r-project.org/manuals.html)`],
 'it-warehouse':['Data warehousing, ETL and analytical models',`An operational database supports individual transactions; a warehouse combines historical data for analysis. Extract obtains source data, transform standardises and validates it, and load writes the target. ELT loads before performing transformations. Neither acronym alone guarantees data quality.

## Model example
A trade fact table contains measures such as quantity and value plus keys to date, instrument and venue dimensions. Declare its grain: one row per executed trade. A daily aggregate has a different grain and cannot be mixed without care. A star schema connects facts directly to dimensions; a snowflake normalises dimension structures.

## Analytical operations
Roll-up aggregates daily values into months. Drill-down moves to finer detail. Slice selects one dimension value; dice selects a subcube. A data mart focuses on one subject area. Metadata records definitions, provenance and transformations.

## Quality drill
Ten source rows include a duplicated transaction, one missing key and two inconsistent date formats. State which rows you would quarantine and why. Reconcile row counts and totals after each stage; preserve raw data so transformations can be audited. Slowly changing dimension type 1 overwrites history; type 2 retains versions with validity intervals.`],
 'it-strings':['Strings, pattern matching, matrices and JSON',`Strings are sequences; substring bounds and mutability depend on the language. Trace indices explicitly. Repeated concatenation of immutable strings can repeatedly copy existing content. For pattern search, a simple scan compares the pattern at each possible starting position; prefix-based algorithms can avoid repeating comparisons.

## Worked example
Text ABABA contains ABA at zero-based positions 0 and 2. A method that jumps by the entire pattern length after a match may miss the overlap. State whether overlaps are included before counting matches.

## Matrices and JSON
For an m by n matrix, check row and column bounds independently. In row-major storage, offset = row*n + column using zero-based indices. JSON has objects, arrays, strings, numbers, booleans and null; it does not support comments or trailing commas. A JSON object key is a string. Parse before accessing nested values and check whether a key exists.

## Drill
Trace a two-pointer palindrome check on an empty string, one character and abba. Trace the transpose of a 2 by 3 matrix. Count frequencies using a map, then compare the time complexity with a nested-loop solution.`],
 'it-prog-cpp':['C++ fundamentals and object behaviour',`C++ supports value semantics, references, classes and deterministic destruction. A reference aliases an existing object; a pointer holds an address and can be null. std::vector manages a dynamic array, but growth may invalidate pointers and iterators into its storage.

## Worked trace

\`\`\`cpp
int a = 4;
int& b = a;
b += 3;  // a is now 7
int c = a;
c += 1;  // c is 8; a remains 7
\`\`\`

Constructors establish an object's state; destructors release resources owned by it. RAII binds resource lifetime to object lifetime. A virtual function can dispatch according to the dynamic object type through a base reference or pointer. Overloading chooses among signatures; overriding supplies derived behaviour for an inherited virtual function.

## Pitfalls and drills
Do not infer a numeric result from undefined behaviour such as reading out of bounds or using an object after its lifetime ends. Trace one constructor/destructor sequence, one virtual dispatch example and one exception path. Compare pass-by-value and const-reference parameters. Understand strings, loops, arrays and functions before memorising library details.`]
};
for(const [id,[title,body]] of Object.entries(extra)) write('data/notes/'+id+'.md','# '+title+'\n\n'+body+'\n');
const syl=JSON.parse(read('data/syllabus.json'));
syl.source={title:'SEBI Grade A recruitment 2025 — official advertisement',url:'https://www.sebi.gov.in/sebi_data/careerfiles/oct-2025/1761782417659.pdf',checked:'2026-09-12',pages:'6, 7, 24, 25'};
syl.disclaimer='Preparation baseline: official 2025 recruitment notice, checked 12 September 2026. Its exams were in January/February 2026. This is a reusable preparation plan, not an announced next-attempt calendar. Confirm any newer notice on the SEBI vacancies page. Supplementary CS and interview topics are labelled separately.';
syl.phases=[
 {id:'p1',name:'Phase I — screening',when:'Date: consult your recruitment notice',nature:'Two objective papers; screening marks do not enter final merit.',note:'Minimum cut-offs: Paper 1 30%, Paper 2 40%, aggregate 40%. Wrong objective answers lose one-quarter of the marks assigned.',papers:[{id:'p1p1',name:'Paper 1 — common aptitude',marks:100,minutes:60,contents:'General awareness, English, quantitative aptitude and reasoning.'},{id:'p1p2',name:'Paper 2 — IT',marks:100,minutes:40,contents:'IT objective questions; indicative topic weights are listed below.'}]},
 {id:'p2',name:'Phase II — main examination',when:'Date: consult your recruitment notice',nature:'Descriptive English and objective IT.',note:'Paper weights: English 1/3; IT 2/3. Minimums: English 30%, IT 40%, weighted aggregate 50%. IT wrong answers carry one-quarter negative marking.',papers:[{id:'p2p1',name:'Paper 1 — English drafting',marks:100,minutes:60,contents:'Descriptive writing; consult the handout for task types.'},{id:'p2p2',name:'Paper 2 — IT objective',marks:100,minutes:180,contents:'Code tracing, debugging, logic and data-analysis MCQs.'}]},
 {id:'p3',name:'Phase III — interview',when:'After shortlisting',nature:'Final weighting: Phase II 85%, interview 15%.',papers:[],note:'Practice factual profile answers, technical explanations and informed judgement.'}
];
syl.weights={phase1:[['Database concepts',10],['SQL',10],['Programming (C/C++/Java)',30],['Python/R analytics',10],['Algorithms',10],['Networks',10],['Cybersecurity',10],['Warehousing',5],['Shell',5]],phase2:[['Algorithms',30],['Data structures',40],['Strings',10],['OOP',20]]};
const supplemental=['it-os','it-se','it-coa','it-web','it-cloud','it-fin'];
for(const s of syl.subjects){
 if(supplemental.includes(s.id)){s.paper='Supplementary CS / interview reference';s.supplemental=true;s.weightNote='Extra reference material. This subject is not a separate weighted heading in the 2025 IT syllabus. Prioritise the official topic table.';}
 else if(s.id==='it-cn'||s.id==='it-dbms'||s.id==='it-sec')s.paper='Phase I IT; selected material also supports interview';
 if(s.id==='ga')s.weightNote='Practise financial awareness alongside the other common-paper sections. No fixed internal GA topic weights are assumed.';
 if(s.id==='it-sec')s.weightNote='Cybersecurity: indicative 10% of Phase I IT. Detailed regulatory material is supplementary interview reading.';
 if(s.id==='engd')s.weightNote='Practise typing and self-review from the beginning. English has one-third of Phase II weighting.';
}
const prog=syl.subjects.find(s=>s.id==='it-prog');
if(!prog.topics.some(t=>t.id==='pr-cpp'))prog.topics.push({id:'pr-cpp',name:'C++ fundamentals, references and object lifetime',note:'it-prog-cpp',imp:'high',est:5});
const ds=syl.subjects.find(s=>s.id==='it-ds');
if(!ds.topics.some(t=>t.id==='ds-strings'))ds.topics.push({id:'ds-strings',name:'String operations, pattern matching, matrix and JSON tracing',note:'it-strings',imp:'high',est:6});
for(const s of [
 {id:'it-data',name:'Data analytics and warehousing',short:'Data analytics',paper:'Phase I IT',topics:[{id:'data-py',name:'Python analytics and dataframes',note:'it-data-python',est:8,imp:'high'},{id:'data-r',name:'R analytics foundations',note:'it-data-r',est:5,imp:'high'},{id:'data-wh',name:'Warehousing, ETL and data models',note:'it-warehouse',est:5,imp:'high'}]},
 {id:'it-shell',name:'Shell programming',short:'Shell',paper:'Phase I IT',topics:[{id:'shell-01',name:'UNIX commands, variables, arguments and control flow',note:'it-shell',est:6,imp:'high'}]}
]) if(!syl.subjects.some(x=>x.id===s.id))syl.subjects.push(s);
json('data/syllabus.json',syl);
const refMap=new Map();for(const s of syl.subjects)for(const t of s.topics)refMap.set(t.note,{subject:s.id,supplemental:!!s.supplemental});
const notes=fs.readdirSync(path.join(ROOT,'data/notes')).filter(n=>n.endsWith('.md')).sort().map(file=>{
 const id=file.slice(0,-3),txt=read('data/notes/'+file),meta=refMap.get(id)||{subject:id==='resources-free-books'?'resources':id.split('-').slice(0,2).join('-'),supplemental:true};
 return {id,title:txt.match(/^#\s+(.+)$/m)?.[1]||id,...meta,desc:meta.supplemental?'Supplementary reference and interview reading.':'Core lesson with examples and practice guidance.',mins:Math.max(3,Math.ceil(txt.split(/\s+/).length/170)),tags:[meta.subject]};
});
for(const s of syl.subjects)for(const t of s.topics)if(!notes.some(n=>n.id===t.note))throw new Error('Missing note: '+t.note);
json('data/notes/index.json',{notes});
console.log('Indexed '+notes.length+' complete notes.');
