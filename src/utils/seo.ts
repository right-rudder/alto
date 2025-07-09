// SEO utility functions for Alto Flight Academy

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createArticleSchema(
  title: string,
  description: string,
  image: string,
  datePublished: string,
  dateModified?: string,
  author: string = "Alto Flight Academy",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: `https://altoflight.com${image}`,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Alto Flight Academy",
      logo: {
        "@type": "ImageObject",
        url: "https://altoflight.com/Alto-Flight-Academy-logo-2025-1.png",
      },
    },
  };
}

export function createCourseSchema(
  courseName: string,
  description: string,
  provider: string = "Alto Flight Academy",
  price: string = "Varies",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: courseName,
    description: description,
    provider: {
      "@type": "Organization",
      name: provider,
      address: {
        "@type": "PostalAddress",
        streetAddress: "13000 N Sara Rd",
        addressLocality: "Yukon",
        addressRegion: "OK",
        postalCode: "73099",
        addressCountry: "US",
      },
    },
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "USD",
    },
    educationalCredentialAwarded: "FAA Pilot Certificate",
  };
}

export function createFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createServiceSchema(
  serviceName: string,
  description: string,
  serviceType: string,
  priceRange: string = "$100-$300",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    serviceType: serviceType,
    provider: {
      "@type": "Organization",
      name: "Alto Flight Academy",
    },
    areaServed: {
      "@type": "Place",
      name: "Oklahoma City, OK",
    },
    offers: {
      "@type": "Offer",
      priceRange: priceRange,
      priceCurrency: "USD",
    },
  };
}

export function generateKeywords(
  base: string[],
  location: string[],
  training: string[],
): string {
  const combinations: string[] = [];

  for (const b of base) {
    for (const l of location) {
      combinations.push(`${b} ${l}`);
    }
  }

  for (const t of training) {
    for (const l of location) {
      combinations.push(`${t} ${l}`);
    }
  }

  return [...base, ...location, ...training, ...combinations].join(", ");
}

export function optimizeTitle(
  title: string,
  location: string = "Oklahoma City, OK",
): string {
  // Ensure title is under 60 characters for optimal SEO
  const baseTitle = title.length > 40 ? title.substring(0, 40) + "..." : title;
  const fullTitle = `${baseTitle} | ${location}`;

  return fullTitle.length > 60 ? baseTitle : fullTitle;
}

export function optimizeDescription(description: string): string {
  // Ensure description is between 120-160 characters for optimal SEO
  if (description.length < 120) {
    return (
      description +
      " Contact Alto Flight Academy in Oklahoma City for professional flight training with experienced instructors."
    );
  }

  if (description.length > 160) {
    return description.substring(0, 157) + "...";
  }

  return description;
}
