export type StageKey = "foundation" | "building" | "accelerating" | "glide" | "fi";

export type Stage = {
  key: StageKey;
  badge: string;
  title: string;
  tagline: string;
  summary: string;
  mathContext: string;
  nextSteps: string[];
  pitfalls: string[];
  unlocksNext: string;
  thirtySixtyNinety: { day: 30 | 60 | 90; action: string }[];
  chapter: { name: string; why: string };
  relatedSlugs: string[];
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta: { label: string; to?: string; href?: string };
};

export const stages: Record<StageKey, Stage> = {
  foundation: {
    key: "foundation",
    badge: "Stage 01",
    title: "The Foundation",
    tagline: "Early. On purpose.",
    summary:
      "You're early — which is the best news you could get on a page like this. Ten years is plausible if you build the system before you build the pile. Most people skip the system and wonder why 20 years later they're still behind.",
    mathContext:
      "At $20k/yr saved and 7% real returns, you cross $500k in about 15 years. That's enough to matter — but not enough to live on. The next $500k is where the infrastructure piece decides whether you get there in 8 more years or 18.",
    nextSteps: [
      "Lock a savings rate you can actually sustain. Not just \"max the 401(k).\" Your real, written, in-practice rate.",
      "Pick one income-producing asset class and learn it cold before you add a second. Scattered wins decade one.",
      "Set up the infrastructure piece now, while the balance is small. Setting it up at $500k is ten times more work than setting it up at $50k.",
    ],
    pitfalls: [
      "Maxing the 401(k) before understanding withdrawal and tax drag.",
      "Owning the index fund but not the reserves to ride out a downturn.",
      "Waiting to \"learn a little more\" before starting. Reading is not the work.",
    ],
    unlocksNext:
      "You move to Stage 02 once you cross roughly $50k invested AND have a written plan for your first income-producing asset.",
    thirtySixtyNinety: [
      { day: 30, action: "Nail your real monthly expenses and savings rate. No approximations, no \"roughly.\"" },
      { day: 60, action: "Read Chapters 1–3 of the book. Pick the income asset class you'll actually execute on." },
      { day: 90, action: "Open and fund the infrastructure account. Place the first deposit — even if small." },
    ],
    chapter: {
      name: "Chapter 1 — The Retire-in-10 Setup",
      why: "It's the only chapter that actually describes the sequence: what you do first, what you add, and what you absolutely don't skip.",
    },
    relatedSlugs: ["why-the-4-percent-rule-wasnt-written-for-you"],
    primaryCta: {
      label: "Get the Book $19.97",
      href: "https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d",
      external: true,
    },
    secondaryCta: { label: "Run your numbers →", to: "/tools/fire-calculator" },
  },

  building: {
    key: "building",
    badge: "Stage 02",
    title: "Building",
    tagline: "Capital is accumulating. Now make it work.",
    summary:
      "You've got momentum. Savings are happening, assets are stacking, and you've probably crossed the point where the math is real. The question shifts from \"will I get there\" to \"will the structure underneath me let me\".",
    mathContext:
      "Between $250k and $750k is where compounding starts to bite — both ways. A 1% annual drag on $500k is $5,000 every year, forever. That's not a footnote; that's a vacation, or a Vault deposit, or a down payment.",
    nextSteps: [
      "Audit what you own vs. what actually produces income. Retirement balances aren't income. Separate them on paper.",
      "Fix the infrastructure piece before the next big deposit lands. Every deposit into a leaky bucket is wasted.",
      "Stop adding new asset classes until the existing ones are paying. Stage 02 failures are almost always width, not depth.",
    ],
    pitfalls: [
      "Diversifying into asset #3 before asset #1 is actually cash-flowing.",
      "Letting lifestyle creep match every raise. The savings rate quietly drops.",
      "Treating the 401(k) as the plan rather than one piece of the plan.",
    ],
    unlocksNext:
      "You move to Stage 03 once you have a reliable cash-flow line from an income-producing asset AND the infrastructure to warehouse capital between deals.",
    thirtySixtyNinety: [
      { day: 30, action: "Inventory every account and its real fee drag. Put the numbers on one page." },
      { day: 60, action: "Decide which income asset you'll scale vs. maintain. Say it out loud to someone." },
      { day: 90, action: "Open The Vault if you haven't. Redirect at least one savings stream into it." },
    ],
    chapter: {
      name: "Chapter 3 — Picking the Right Asset, then Chapter 6 — The Vault",
      why: "Chapter 3 stops you adding the wrong asset. Chapter 6 gives you the container that makes every future asset compound harder.",
    },
    relatedSlugs: ["infrastructure-piece-most-investors-dont-see"],
    primaryCta: {
      label: "Get the Book $19.97",
      href: "https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d",
      external: true,
    },
    secondaryCta: { label: "Run your numbers →", to: "/tools/fire-calculator" },
  },

  accelerating: {
    key: "accelerating",
    badge: "Stage 03",
    title: "Accelerating",
    tagline: "The deal pipeline, not the deal.",
    summary:
      "You have real capital. The question isn't whether you'll get there — it's how much of the next decade you spend waiting versus deploying. Most investors in this stage leak 30–50% of their investing life to reserves-rebuilding and financing-waiting. That's the years back on the table.",
    mathContext:
      "From $750k toward $2M, a 10-year finish is realistic — but only if dead time between deals collapses. One missed cycle and the math stretches to 15+.",
    nextSteps: [
      "Read Chapter 6 before anything else. The Vault is the piece you are most likely missing right now.",
      "Inventory your deal pipeline and your reserve position against it. Gap between the two equals missed years.",
      "Pressure-test your 10-year plan with someone who has done it — not just modeled it.",
    ],
    pitfalls: [
      "Chasing the single deal instead of building a pipeline you can pick from.",
      "Under-reserving for volatility. You'll need capital in the month you least want to raise it.",
      "Ignoring tax positioning until the exit. Structure decisions get 10x more expensive later.",
    ],
    unlocksNext:
      "You move to Stage 04 once you have full reserve coverage (6–12 months of all obligations) AND a deal filter you can execute in under 10 minutes.",
    thirtySixtyNinety: [
      { day: 30, action: "Build or audit your deal pipeline + reserves. Reserves first." },
      { day: 60, action: "Run a strategy session. Pressure-test the 10-year version of your plan." },
      { day: 90, action: "Deploy one Vault-funded deal. Prove the infrastructure works before you scale it." },
    ],
    chapter: {
      name: "Chapter 6 — The Vault, then Chapter 4 — The 10-Minute Deal Filter",
      why: "Chapter 6 fixes the dead-time problem. Chapter 4 makes sure the capital lands on deals that survive the next cycle.",
    },
    relatedSlugs: [
      "infrastructure-piece-most-investors-dont-see",
      "what-2008-taught-me-about-reserves",
    ],
    primaryCta: {
      label: "Book a Strategy Session",
      href: "#book-call",
    },
    secondaryCta: {
      label: "Still want the book? Get it $19.97 →",
      href: "https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d",
    },
  },

  glide: {
    key: "glide",
    badge: "Stage 04",
    title: "On the Glide Path",
    tagline: "Protect, sequence, and pass it on.",
    summary:
      "You're close. The job shifts from growing the pile to protecting it, sequencing withdrawals, and deciding what legacy looks like. The risks at this stage aren't running out of money — they're bad tax ordering, bad sequence-of-returns luck, and unwritten inheritance decisions.",
    mathContext:
      "At $2M+ with 3–5 years to retirement, two bad withdrawal years at the wrong moment can cost you a decade of upside. The fix is planned decumulation, not a better return.",
    nextSteps: [
      "Model your withdrawal strategy, not just your accumulation strategy. Which account funds which year.",
      "Do tax positioning now — Roth conversion windows, capital gains harvesting, tax-loss carry setup.",
      "Start making legacy and structure decisions before you're forced to by a health event or a tax change.",
    ],
    pitfalls: [
      "Ignoring Roth conversion windows between retirement and RMDs.",
      "Assuming \"sequence of returns\" is a statistical curiosity. It's the number one destroyer of early retirements.",
      "Leaving the legacy structure unwritten because the conversation is uncomfortable.",
    ],
    unlocksNext:
      "You move to Stage 05 at the point your assets fully cover your lifestyle indefinitely — with reserves, a written decumulation plan, and a legacy structure in place.",
    thirtySixtyNinety: [
      { day: 30, action: "Model your first 10 years of withdrawals by account and tax impact." },
      { day: 60, action: "Meet with Barry on tax sequencing. This is where hours save years of taxes." },
      { day: 90, action: "Put the legacy structure on paper. Trust, Vault, insurance beneficiaries, all of it." },
    ],
    chapter: {
      name: "Chapter 7 — Decumulation & Taxes, and Chapter 8 — Legacy",
      why: "These are the chapters most readers skip on the way up. At this stage they are the whole game.",
    },
    relatedSlugs: [
      "what-2008-taught-me-about-reserves",
      "infrastructure-piece-most-investors-dont-see",
    ],
    primaryCta: {
      label: "Book a Strategy Session",
      href: "#book-call",
    },
    secondaryCta: {
      label: "Still want the book? Get it $19.97 →",
      href: "https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d",
    },
  },

  fi: {
    key: "fi",
    badge: "Stage 05",
    title: "At Financial Independence",
    tagline: "You made it. Now make it last two more generations.",
    summary:
      "You don't need the book to tell you how to build the portfolio. The work now is tax efficiency, legacy structure, and making sure the system you built still works in 20 years when your family is running it — not you.",
    mathContext:
      "At this stage upside isn't the goal. Not losing the last 20 years to tax mistakes, estate mistakes, or health-event liquidity shortfalls is.",
    nextSteps: [
      "Your Vault should be doing double duty — liquidity and inheritance. Verify both.",
      "Audit the legacy structure yearly, not once-a-lifetime.",
      "Decide who you're teaching this to. If the answer is \"nobody,\" you have a problem two generations out.",
    ],
    pitfalls: [
      "Keeping everything in tax-deferred because it's what you know. Your heirs will pay the tax you didn't.",
      "Assuming your estate plan still matches your assets. Estate and asset mix drift apart over time.",
      "Leaving the Vault underused. It is often the best-designed piece of your entire stack.",
    ],
    unlocksNext:
      "There is no next stage. The work is maintenance, optimization, and teaching forward.",
    thirtySixtyNinety: [
      { day: 30, action: "Legacy + estate audit against current asset mix." },
      { day: 60, action: "Meet with Barry on long-term Vault strategy and intergenerational use." },
      { day: 90, action: "Build the structured giving / inheritance scaffold. Document it." },
    ],
    chapter: {
      name: "Chapter 8 — Legacy & the Long Vault",
      why: "This chapter is less about retirement and more about what you leave behind. At your stage, it's the most valuable one in the book.",
    },
    relatedSlugs: ["infrastructure-piece-most-investors-dont-see"],
    primaryCta: {
      label: "Book a Strategy Session",
      href: "#book-call",
    },
    secondaryCta: { label: "Back to the book →", to: "/" },
  },
};

export const stageOrder: StageKey[] = ["foundation", "building", "accelerating", "glide", "fi"];

export const scoreToStage = (score: number): StageKey => {
  if (score <= 15) return "foundation";
  if (score <= 40) return "building";
  if (score <= 65) return "accelerating";
  if (score <= 85) return "glide";
  return "fi";
};
