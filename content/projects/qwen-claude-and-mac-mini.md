Title: Qwen, Claude and Mac Mini: A love (code?) story
Category: projects
Date: 2026-10-21 11:30
Slug: qwen-claude-and-mac-mini
Image: localorca-build.gif
Tags: projects, ai, local-llm

A local model on my Mac mini wrote about 20,000 lines of code across four apps. It burned 81M tokens (FREE, it runs on my desk). Claude used 2.8M tokens to plan and check.

That is the split I wanted: 97% of the tokens on a model that costs nothing, 3% on the smart one.

But cheap code is easy. GOOD cheap code is the hard part. This is the log of how I got there (and how I didn't, for a while). I keep updating it as the builds run.

## The setup

One Mac mini (32GB). Qwen 3.6 35B-A3B running in LM Studio. A Python script I call [LocalOrca](https://lastmachine.com/localorca/) that runs all night. The code is on [GitHub](https://github.com/jonromero/localorca).

![The LocalOrca dashboard while Qwen builds](/images/localorca-build.gif)

The loop is dead simple:

1/ Claude interviews me about the app and writes a short spec plus 30 to 60 tiny tasks.<br>
2/ Qwen takes ONE task, with a fresh context every time (no memory between tasks).<br>
3/ The tests decide if it's done. Not Qwen. Not me. The test command exits 0 or it doesn't.<br>
4/ Pass? Commit. Fail? Try again with the error. Stuck? Ask Claude for a hint.

Four apps went through it: a desk display (DivoomApp), a portfolio tracker (WealthNew), an island where an AI agent lives on its own (IslandSurvivor), and a phonics reading app for a 4-year-old (ReadAlong).

## The numbers so far

89% of tasks passed on Qwen's FIRST try (357 of 401). The model is not the problem. What you ask it to build is.

| App | Task runs | Passed 1st try | Build hours | Qwen tokens (in / out) | Claude tokens (in + out + cache write) | Lines of code |
| --- | --- | --- | --- | --- | --- | --- |
| IslandSurvivor | 209 | 175 | 11.6 | 111,755,500 / 1,963,754 | 2,277,252 | 13,948 |
| WealthNew | 151 | 145 | 2.0 | 14,205,114 / 277,136 | 899,909 | 3,254 |
| DivoomApp | 41 | 37 | 1.2 | 7,670,602 / 173,521 | 282,308 | 2,572 |
| ReadAlong (still building) | 2 | 2 | 0.1 | 27,876,529 / 645,611 | 396,088 | 232 |

Look at the Qwen column: 161,507,745 tokens in, 3,060,022 out. Reading is 53 times the writing. (Token counts are exact, whole project, as of Oct 19, 2026: Island includes its 2D restart, ReadAlong is still building. Task and hour columns are from Oct 17.) A local model doesn't care (no meter running). An API would.

The ugly part: IslandSurvivor's 33 struggling tasks ate 7.4 hours. MORE than its 175 easy ones (4.2 hours).

## What went wrong: 554 green tests, blank page

IslandSurvivor finished. Every task green. 554 tests passing. I opened the browser and saw... NOTHING. A dark page.

Here's what was hiding behind the green:

1/ The boot code treated the game object as the game state. The tests passed because they injected a FAKE state. The real one was never wired up.<br>
2/ Block colours were strings ("#5b8c3e"). The renderer did bit math on them as numbers. Every piece of land came out BLACK. The test used a fake colour table, so it never noticed.<br>
3/ The game setup never handed the model to the simulation. So the agent could never take a turn. Nothing moved, EVER.<br>
4/ The 3D mesh code put every block face in the wrong place.

Each module was right on its own. Nobody ever ran them together. The small model wrote tests that fit its own code, and the tests faked exactly the seams where the bugs lived.

Other real failures along the way:

1/ A 584-line file the model could neither read in one step nor rewrite in one reply.<br>
2/ A rollback (git reset --hard) that wiped my own notes and the lessons learned. A test caught it.<br>
3/ The final review added fix tasks... and the build exited right after. They sat there for hours.

## What fixed it

1/ **Walking skeleton first.** Tasks 1 to 5 must produce an app that really RUNS. Ugly is fine. Then every task adds one visible slice to it. No more 170 tasks of invisible plumbing before anything shows up.

2/ **Check the REAL product after every task.** Orca starts the actual app, opens it in a headless browser, and blocks the task on any console error, failed request or blank page. For apps with no screen (a CLI, an API), a script runs the real thing with real input. No fakes allowed.

3/ **Fake only the outside world.** Tests may fake the network, the clock, the model. NEVER code the project wrote itself. That one rule would have caught all four bugs above.

4/ **Tiny tasks, tiny files.** One function per task, at most 3 behaviours, about 150 lines per file. Big tasks are the number one reason a small model gets stuck. Tasks went from 10+ minutes to 1 to 2.

5/ **A code map in every prompt.** A list of every function earlier tasks built, so Qwen stops re-reading the same files (reads before the first write had crept up from 4.6 to 11.1).

6/ **A course check every 8 tasks.** Claude gets a screenshot of the running app plus the task list and answers two questions: what works for a user RIGHT NOW, and what's the shortest path to a demo? Then it can add, remove or reorder open tasks (max 5 each). It's the product manager, not the code reviewer.

7/ **Lessons travel.** When Claude helps a stuck task and spots a repeating mistake, it writes ONE rule to the project's lessons file. Every later task sees it.

## What I cut

The Claude code review. It felt like the responsible thing. The data says it was the most expensive thing.

| App | Task runs that were review fixes | Claude tokens spent on reviews |
| --- | --- | --- |
| WealthNew | 123 of 151 (81%) | 814k |
| IslandSurvivor | 141 of 208 (68%), 5.4 of 11.6 hours | 971k |
| DivoomApp | 14 of 41 (34%) | 241k |

About 73% of ALL Claude tokens went to reviewing diffs. The result? Very polished code. And a blank page. A diff review never looks at the product, so it polished the parts while the whole was broken. The course check replaced it.

Second cut: shortening the lessons file. On one project Claude was called 13 times (161k tokens) just to compress a list of rules. Now the local model does it, and Orca checks the result (still a bullet list? sane size?). If Qwen messes it up, Orca keeps the newest lessons instead.

What I KEPT, because the logs say it earns its keep:

1/ **The second attempt.** 28 of 30 retried tasks passed without any Claude help. Qwen reads the real test failure and fixes it.

2/ **Asking Claude when stuck.** 13 calls, 7 stuck tasks rescued. Expensive per call, worth it.

3/ **The cheap guards.** "Tests pass but no file changed" caught fake passes 7 times. The context budget stopped runaway attempts 12 times. The RAM guard paused the build 14 times before the Mac choked.

## Next: Claude builds the prototype first

Qwen's failures cluster at the START. Wiring a whole app together, the first end-to-end test, a red baseline that poisons every task after it. That's exactly what a small model is bad at. And exactly what Claude is good at.

So the flow flips. Claude spends its tokens ONCE, up front, instead of on rescues later:

1/ **Research.** Claude searches the web for the current stack, how similar products work, the UI patterns people expect. It writes a short spec with every screen, the file layout and the conventions Qwen will copy.

2/ **Prototype.** Claude builds the REAL UI (every screen, real layout, sample data where logic is missing) plus a walking skeleton with green tests. Small files, one pattern. I watch it live in the Orca dashboard: every file it writes, every command it runs.

3/ **I shape it.** The preview opens. I leave notes from the dashboard or the Feedback button on the page. Claude applies them now (a new revision), or they wait and become Qwen's first tasks.

4/ **Hand-off.** Only when tests AND the real app are green. Claude reads the actual code and breaks the rest into small tasks that name real files. Then Qwen takes over, as before.

The bet: Qwen starts every project on a running, tested app it can copy, instead of an empty folder. Not proven yet. ReadAlong or the next app will tell. (Old flow still there: `--qwen-only`.)

## The small ideas that made the biggest difference

Every rule in Orca exists because something went wrong in a real build. Each one has a test now. These are my favourites.

### A small model needs a small world

1/ **Every task starts with a map.** A list of every file and function earlier tasks built. It's made with plain regex, NEVER by a model, so it can't be wrong or stale. Before the map, Qwen once read 7 files, spent 14k of its 22k context, and wrote ZERO lines.

2/ **Read loops get broken.** Re-reading the same part of a file is flagged. After 10 calls without a write, Qwen is told: write the code NOW.

3/ **Big files get split while the build runs.** A source file over 200 lines gets ONE fix task: split it into small modules, keep the old file as a thin re-export so nothing breaks. Once per file, ever. Biggest first.

4/ **Thinking is OFF for the first two attempts.** Qwen's template thinks at the highest effort by default. Great for a chat. Terrible for an agent loop: it's slow, and long thinking can eat the whole reply before the tool call even happens. From attempt 3, medium.

5/ **Pick the stack that talks back.** The house rules push TypeScript checking for JS (`tsc --noEmit` in the test command) and type hints plus mypy for Python. The more the compiler complains, the less the small model has to guess. Boring common libraries only.

### Things that died quietly

1/ **"Done" with zero lines written.** Passing tests prove nothing when the old tests were already green. 7 features were marked done before I noticed. Now an attempt that changes no file fails with NO CHANGES. Test caches don't count as work.

2/ **The history marker in a test file.** Orca shortens old messages to save context, like `<1354 chars>`. Qwen copied that marker straight into a test file. Now it's refused.

3/ **Close but not quite, forever.** Claude used to be called only after the SAME failure 3 times. But a small model can fail differently every time and never get there. Now it's 3 failures, any kind.

4/ **The vanishing files.** A blocked task saves its diff so nothing is lost. Except the diff didn't include NEW files. A 276-line test file and a whole actions.js vanished. Now the saved diff has everything, and `git apply` brings the attempt back.

5/ **Zombies.** Timed-out `node --test` runs stayed alive for DAYS. Now every command runs in its own process group, and a timeout kills the whole group.

6/ **A red start.** Red baseline tests on IslandSurvivor made every task after them fail. Now the hand-off refuses to start Qwen unless the tests AND the real app are green, before a single Claude token goes into planning.

### Steering a build with plain files

The whole build is steered by text files in an `orca/` folder. Qwen and Claude re-read them all the time, so an edit counts from the next task. No restart.

1/ **TASKS.md is WHAT.** The build always takes the first open task. Delete a line, move it up, add one.

2/ **SPEC.md is what the product IS.** Drop a feature? Say so here too, under "Out of scope". Otherwise the next course check sees it missing and adds the tasks back.

3/ **LESSONS.md is HOW.** Rules included in every prompt. When it gets long, the LOCAL model shortens it, and Orca checks the result.

4/ **Edit while it runs.** Open a file in your editor mid-build and Orca asks: keep it and tell Qwen, keep it and PROTECT it (Qwen can't touch it until the task ends), or undo.

5/ **Feedback right on the page.** The live preview restarts your app only after a task passes, never mid-task, so you never see half-written code. A small badge on the page takes your note and turns it into the very next task.

### Numbers you can trust

1/ **No model writes the report.** The build report is computed from the files a build leaves behind: transcripts, task logs, git. So the numbers are exact, not vibes.

2/ **Exact Claude tokens.** Every Claude call logs its real counts, taken from Claude Code's own per-model totals (which also count the small side model Claude Code uses quietly). A killed call still counts. The design stage keeps its own log in git, so you can compare builds.

3/ **The real subscription %.** Orca reads the same plan usage Claude Code's `/usage` screen shows, so the dashboard tells you how much of your 5-hour window is gone. Not a guess.

4/ **Qwen sleeps while Claude designs.** The design stage never uses Qwen, so Orca unloads it from LM Studio and gives the RAM to Claude's builds and the headless browser.

5/ **Speculative decoding? Skip it.** A tiny draft model makes dense models faster. On a MoE like 35B-A3B (only 3B active) there's almost nothing to gain.

## If you want to try this

1/ **A mid-size local model codes FINE.** 89% first-try passes. Stop asking if it's smart enough. Ask if your tasks are small enough.

2/ **Tests are the only judge, so the tests decide everything.** A test that fakes your own code proves nothing. Fake the outside world only.

3/ **Run the real app from day one.** Green unit tests and a dead product is the default outcome, not the exception.

4/ **Spend the expensive model on JUDGMENT, not volume.** Planning, rescuing stuck tasks, looking at the running product. Never line-by-line review.

5/ **Measure everything.** Every rule above came from a log file, not a hunch. Half my favourite safeguards turned out to be waste.

Grab it: [github.com/jonromero/localorca](https://github.com/jonromero/localorca). Clone it, run `python3 orca.py new ~/proj/myapp "your idea"`, and watch.

## Update log

| Date | What changed | Why |
| --- | --- | --- |
| Oct 21, 2026 | LocalOrca is on [GitHub](https://github.com/jonromero/localorca); added the small ideas that made the biggest difference | Splash, orca has landed |
| Oct 19, 2026 | Design stage: Claude researches and builds the prototype, I review it, then hand-off to Qwen | Qwen kept failing at the start, where the whole app gets wired together |
| Oct 17, 2026 | ReadAlong started, the first app planned under the new rules | Test the rules on a fresh build |
| Oct 17, 2026 | Walking skeleton plus a real-app smoke test after every task | 554 green tests, blank page |
| Oct 17, 2026 | IslandSurvivor restarted as a 2D SNES-style map with the agent's thoughts on screen | The 3D renderer was where every bug lived |
| Oct 17, 2026 | Course check every 8 tasks, with a screenshot of the running app | Steer toward a working demo, not polished parts |
| Oct 17, 2026 | Code reviews removed; lessons shortened by the local model | Reviews were 73% of Claude tokens and missed a blank page |
