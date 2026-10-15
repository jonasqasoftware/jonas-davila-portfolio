const PERSON_ID = "https://jonasdavila.com.br/#person";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Jonas Davila",
      url: "https://jonasdavila.com.br/",
      jobTitle: "Senior Quality Engineer",
      description:
        "Senior QA Engineer e Quality Engineer com mais de 17 anos em tecnologia, sendo 10 dedicados à Qualidade de Software.",
      sameAs: [
        "https://www.linkedin.com/in/jonasdavila/",
        "https://github.com/jonasqasoftware",
      ],
    },
    {
      "@type": "CreativeWork",
      name: "AIMA 2.0",
      url: "https://aima20.dev",
      creator: { "@id": PERSON_ID },
      description:
        "AIMA 2.0 é um projeto autoral por meio do qual Jonas Davila explora indicadores, inteligência artificial e pensamento estratégico aplicados à atuação de profissionais de Quality Engineering.",
    },
  ],
};
