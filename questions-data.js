/**
 * Restored from the original Hostinger/Vite bundle (assets/index-be93b4f0.js).
 * Male: 9 profile questions + country = 10.
 * Female / Other: 7 profile questions + country = 8 each.
 */
window.QUESTIONS_BY_GENDER = {
  Male: [
    { id: "age", text: "Your age?", type: "numberInput", placeholder: "e.g., 25" },
    { id: "height", text: "Your height?", type: "heightInput", defaultUnit: "ft" },
    {
      id: "hairline",
      text: "Hairline situation?",
      type: "hairlineSelector",
      imageGridClass: "image-option-grid--hairline",
      options: [
        {
          value: "Cooked (Bald)",
          label: "Cooked",
          img: "./assets/hairline-male/cooked.png"
        },
        {
          value: "Just let it go",
          label: "Just let it go",
          img: "./assets/hairline-male/just-let-it-go.png"
        },
        {
          value: "Receding",
          label: "Receding",
          img: "./assets/hairline-male/receding.png"
        },
        {
          value: "Full head of hair",
          label: "Full head of hair",
          img: "./assets/hairline-male/full.png"
        }
      ]
    },
    {
      id: "breakups",
      text: "How many breakups have you had?",
      type: "sliderWithImages",
      min: 0,
      max: 7,
      defaultValue: 1,
      minImageSrc: "./assets/breakups-male/min.png",
      maxImageSrc: "./assets/breakups-male/max.png"
    },
    {
      id: "crypto",
      text: "Have you ever invested in cryptocurrency?",
      type: "radio",
      options: ["No, never.", "I once bought a shitcoin.", "Dabbled a bit.", "HODL, to the moon!"]
    },
    {
      id: "tateOpinion",
      text: "What is your opinion on Andrew Tate?",
      type: "select",
      options: ["Who?", "Rather negative", "Neutral, let him cook", "What color is your Bugatti?"]
    },
    {
      id: "parentsOpinion",
      text: "Do you have mom and dad issues?",
      type: "radio",
      options: ["No issues", "Mommy issues", "Daddy issues", "Both, send help"]
    },
    {
      id: "sexuality",
      text: "Your sexuality?",
      type: "select",
      options: ["Hetero", "Homo", "Bi", "Incel", "Other"]
    },
    {
      id: "hobbies",
      text: "Main hobbies? (Pick all that apply)",
      type: "checkboxGroup",
      minSelections: 1,
      options: ["Anime/Gaming", "Sports", "Partying", "Reading/Learning", "Existential Dread"]
    },
    {
      id: "country",
      text: "Where are you from?",
      type: "select",
      options: ["North America", "South America", "Europe", "Asia", "Africa", "Australia/Oceania", "Antarctica (seriously?)"]
    }
  ],
  Female: [
    {
      id: "zodiacSign",
      text: "What's your zodiac sign?",
      type: "select",
      options: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces", "Mercury is in retrograde, ask later", "I don't believe in stars"]
    },
    {
      id: "bangSituationFemale",
      text: "What's your bang situation?",
      type: "imageSelector",
      options: [
        { value: "Bald", label: "Bald", img: "" },
        { value: "Microbangs", label: "Microbangs", img: "" },
        { value: "Regular Bangs", label: "Regular Bangs", img: "" },
        { value: "Emo Bangs", label: "Emo Bangs", img: "" },
        { value: "Middle Part", label: "Middle Part (Moses style)", img: "" },
        { value: "Afro", label: "Afro", img: "" },
        { value: "Side Part (No Bangs)", label: "Side Part (No Bangs)", img: "" }
      ]
    },
    {
      id: "breakupsFemale",
      text: "How many breakups have you had?",
      type: "sliderWithImages",
      min: 0,
      max: 7,
      defaultValue: 1,
      minImageSrc: "",
      maxImageSrc: ""
    },
    {
      id: "emotionalBaggageFemale",
      text: "Primary emotional baggage? (Select all that apply)",
      type: "checkboxGroup",
      options: ["Mommy issues", "Daddy issues", "Commitment phobia", "My cat judges me", "Fear of missing out (FOMO)", "Imposter syndrome", "Existential dread on Sundays"]
    },
    {
      id: "packagesOrdered",
      text: "How many packages have you ordered in the last 30 days?",
      type: "slider",
      min: 0,
      max: 5,
      defaultValue: 1,
      suffix: "+"
    },
    {
      id: "redFlagsFemale",
      text: 'How many "harmless" red flags do you ignore in others?',
      type: "select",
      options: ["0, I have standards", "1-2, for the plot", "3-5, it builds character", "All of them, I collect them"]
    },
    {
      id: "importantQualitiesFemale",
      text: "Pick your top 3 most important qualities in a partner:",
      type: "checkboxGroup",
      maxSelection: 3,
      options: ["Emotional Intelligence", "Good Sex", "Tall", "Money", "Loyal", "Funny", "Good taste in memes"]
    },
    {
      id: "country",
      text: "Where are you from?",
      type: "select",
      options: ["North America", "South America", "Europe", "Asia", "Africa", "Australia/Oceania", "Antarctica (seriously?)"]
    }
  ],
  Other: [
    {
      id: "pronouns",
      text: "Your preferred pronouns?",
      type: "select",
      options: ["She/Her", "He/Him", "They/Them", "Ze/Hir", "Ze/Zir", "Xe/Xem", "Ey/Em", "Co/Cos", "Fae/Faer", "Ask Me", "Varies", "Any/All", "None", "Prefer not to say", "My pronouns are in my bio"]
    },
    {
      id: "hairColorOther",
      text: "Current hair color vibe?",
      type: "select",
      options: ["Natural Tones", "Single Bold Color (Blue, Pink, etc.)", "Rainbow/Mermaid Magic", "Pastel Dreams", "Stealth Gray/Silver Fox", "Changes with my mood", "Currently experimenting..."]
    },
    {
      id: "relationshipStyleOther",
      text: "Relationship style(s) that resonate?",
      type: "checkboxGroup",
      options: ["Monogamous", "Polyamorous", "Solo Polyamory", "Relationship Anarchy", "Swinging", "Open Relationship", "Celibate", "Asexual Spectrum", "Aromantic Spectrum", "Single and thriving", "It's complicated...", "Still figuring it out"]
    },
    {
      id: "emotionalBaggageOther",
      text: "What unique emotional baggage are you carrying?",
      type: "checkboxGroup",
      options: [
        "Generational trauma (it's vintage!)",
        'Fear of being "too much"',
        "Existential dread (but make it ✨aesthetic✨)",
        "Rejection Sensitive Dysphoria (thanks, neurospicy brain!)",
        "My plants have seen too much",
        "Too many good ideas, not enough spoons",
        "Crippling empathy",
        "The burden of obscure knowledge"
      ]
    },
    {
      id: "importantQualitiesOther",
      text: "Top 3 traits in a connection (partner, friend, chosen fam):",
      type: "checkboxGroup",
      maxSelection: 3,
      options: ["Radical Honesty", "Shared Values", "Intellectual Stimulation", "Creative Synergy", "Comfort in Silence", "Accepts my weird", "Good with boundaries", "Respects my autonomy", "Supports my growth"]
    },
    {
      id: "identityCrisisFrequency",
      text: "How often do you have an identity crisis?",
      type: "radio",
      options: ["Daily", "Weekly", "Monthly", "Only on Tuesdays", "What is identity? My identity is crisis."]
    },
    {
      id: "communicationStyleOther",
      text: "Preferred communication style?",
      type: "select",
      options: ["Direct and to the point", "Memes and sarcasm only", "Long, thoughtful emails", "Voice notes at 2 AM", "Interpretive dance", "Telepathy (still working on it)"]
    },
    {
      id: "country",
      text: "Where are you from?",
      type: "select",
      options: ["North America", "South America", "Europe", "Asia", "Africa", "Australia/Oceania", "Antarctica (seriously?)"]
    }
  ]
};
