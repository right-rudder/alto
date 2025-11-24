// find_image_references.js
import fs from "fs";
import path from "path";

// Your provided image list
const IMAGE_LIST = [
  "src/assets/30-years-in-business.png",
  "src/assets/aero-commander-front.jpg",
  "src/assets/aero-commander-side.jpg",
  "src/assets/airliner-cockpit-in-bethany-oklahoma.jpg",
  "src/assets/alto-aircraft-airplane-fleet-on-grass-runway-airport.jpg",
  "src/assets/alto-community.jpg",
  "src/assets/alto-fleet-of-aircraft-at-sundance-airpark-KHSD-bethany-ok.jpg",
  "src/assets/alto-fleet.jpg",
  "src/assets/Alto-flight-academy_KHSD_airport.webp",
  "src/assets/Alto-Flight-Academy-FAA-regulations.png",
  "src/assets/alto-flight-academy-leadership-team.jpg",
  "src/assets/alto-flight-academy-pilot-flying-above-clouds-over-oklahoma-city-bethany.jpg",
  "src/assets/alto-flight-academy-staff-with-jon-and-martha-king.jpg",
  "src/assets/alto-flight-academy-team-at-sundance-airport-touched.jpg",
  "src/assets/alto-flight-academy-team-at-sundance-airport.jpg",
  "src/assets/alto-flight-academy-team-at-sundance-airport(1).jpg",
  "src/assets/alto-flight-book-mockup.png",
  "src/assets/alto-flight-instructors-in-front-of-a-piper-airplane.jpg",
  "src/assets/alto-flight-private-pilot-student-after-solo.jpg",
  "src/assets/alto-flight-sundance-airport-yukon-oklahoma-touched.jpg",
  "src/assets/alto-flight-sundance-airport-yukon-oklahoma.jpg",
  "src/assets/alto-flight-sundance-airport-yukon-oklahoma(1).jpg",
  "src/assets/alto-flight-yukon-group-photo.jpg",
  "src/assets/alto-pilot-thumbs-up-oklahoma.jpg",
  "src/assets/american-airlines-jet-yukon-oklahoma.jpg",
  "src/assets/aopa-logo.png",
  "src/assets/applicants-passed-their-flight-instructor-exam.jpg",
  "src/assets/applicants-passed-their-instrument-instructor-checkrides.jpg",
  "src/assets/atp-students.jpg",
  "src/assets/beech-baron.jpg",
  "src/assets/beech-bonanza-b36tc.jpg",
  "src/assets/beechjet-400.jpeg",
  "src/assets/ben-mullins-oXV3bzR7jxI-unsplash.jpg",
  "src/assets/career-path.jpg",
  "src/assets/cessna-152.jpg",
  "src/assets/cessna-172-n4891j-flying-over-bethany-ok.jpg",
  "src/assets/cessna-172.jpg",
  "src/assets/cessna-172rg.jpg",
  "src/assets/cessna-182a.jpg",
  "src/assets/cfi-cutting-t-shirt-after-student-pilot-solo.jpg",
  "src/assets/cfi-in-cessna.jpg",
  "src/assets/CFI-showing-airplane-model-to-interested-student-pilot.jpg",
  "src/assets/challenge-air-logo.webp",
  "src/assets/citation-jet-hal-harris-oklahoma-city.jpg",
  "src/assets/cody-fitzgerald-O0Tr0mrzXLA-unsplash.jpg",
  "src/assets/commercial-pilot-landing-grass-runway-in-cedar-mills.jpg",
  "src/assets/commercial-pilot-passing-exam-at-alto-flight-oklahoma-city.jpg",
  "src/assets/commercial-pilot-passing-exam-in-bethany-oklahoma.jpg",
  "src/assets/eaa-logo.png",
  "src/assets/evan-corder-alto-flight-team.jpg",
  "src/assets/evan-navarro-alto-flight-team.jpg",
  "src/assets/female-pilot-in-front-of-a-king-air-airplane.jpg",
  "src/assets/female-pilots-at-sundance-airport-in-front-of-planes.jpg",
  "src/assets/flying-above-lake-heffner-in-clouds-cessna-172-instrument-rated-pilot.jpg",
  "src/assets/flying-IMC-and-pitot-tube-iced-up.jpg",
  "src/assets/flying-in-a-multi-engine-aircraft.jpg",
  "src/assets/former-alto-flight-academy-student-flying-jets.jpg",
  "src/assets/former-alto-student-with-cessna-first-trained-in-bethany-oklahoma.jpg",
  "src/assets/grace-manglicmot-alto-flight-team.jpg",
  "src/assets/guide-mockup.webp",
  "src/assets/hal-harris-alto-flight-team.jpg",
  "src/assets/hal-harris-cfi-cutting-shirt-after-a-student-pilot-first-solo.jpg",
  "src/assets/IFR-chart-oklahoma-city-kokc-will-rogers-world.png",
  "src/assets/inside-boeing-737-cockpit.jpg",
  "src/assets/inside-cockpit-flying-airliner-jet-over-bethany-oklahoma.jpg",
  "src/assets/instrument-ground-school-in-oklahoma-city.jpg",
  "src/assets/instrument-rating-training-pilot-flying-in-clouds-above-ardmore-ok.jpg",
  "src/assets/long-exposure-airport-night.jpg",
  "src/assets/luizmonteiro-logo.webp",
  "src/assets/maricris-harris-alto-flight-team.jpg",
  "src/assets/multi-engine-rating-students.jpg",
  "src/assets/multi-single-engines.jpg",
  "src/assets/N99VS.jpg",
  "src/assets/N225P-side.jpg",
  "src/assets/N225P.jpg",
  "src/assets/N553HC.jpg",
  "src/assets/N664JB.jpg",
  "src/assets/N6137Q-side.png",
  "src/assets/N6137Q.png",
  "src/assets/N6190C-cessna.png",
  "src/assets/N67797-cessna-flying-over-sundance-airport.jpg",
  "src/assets/nafi-logo.webp",
  "src/assets/night-landing-sundance-airport-yukon-cessna.jpg",
  "src/assets/opa-logo.png",
  "src/assets/pilot-after-his-private-pilot-checkride-with-flight-instructor.jpg",
  "src/assets/pilot-in-a-cirrus-airplane-programing-garmin-430.jpg",
  "src/assets/pilot-thumbs-up-in-cessna-172-airplane-just-before-a-solo.jpg",
  "src/assets/piper-arrow.jpg",
  "src/assets/plane-placeholder.png",
  "src/assets/post1.jpg",
  "src/assets/post2.jpg",
  "src/assets/post3.jpg",
  "src/assets/post4.jpg",
  "src/assets/post5.jpg",
  "src/assets/private-pilot-ground-materials-for-flight-school-yukon-ok.jpg",
  "src/assets/reid-grigsby-alto-flight-team.webp",
  "src/assets/signature.webp",
  "src/assets/simulator-type-rating-citation-oklahoma.jpg",
  "src/assets/stormy-weather.jpg",
  "src/assets/student-and-cfi-in-cessna.jpg",
  "src/assets/student-at-alto-flight-school-sundance-airport-oklahoma-after-checkride.jpg",
  "src/assets/student-earning-multi-engine-rating.jpeg",
  "src/assets/student-in-atp-lesson.jpg",
  "src/assets/student-in-front-of-cessna.jpg",
  "src/assets/student-obtaining-private-pilot-certificate.jpg",
  "src/assets/student-obtains-commercial-pilot-certificate-from-cfi.jpg",
  "src/assets/student-obtains-commercial-pilot-certificate.jpg",
  "src/assets/student-passed-flight-iinstructor-exam.jpg",
  "src/assets/student-passed-his-atp-exam.jpg",
  "src/assets/student-passed-his-commercial-pilot-exam.jpg",
  "src/assets/student-passed-his-exam.jpg",
  "src/assets/student-passed-his-instrument-practical-exam.jpg",
  "src/assets/student-passed-his-instrument-rating.jpg",
  "src/assets/student-passed-his-multi-engine-rating-practical-exam.jpg",
  "src/assets/student-passed-his-multi-engine-rating.jpg",
  "src/assets/student-passed-his-private-pilot-exam.jpg",
  "src/assets/student-passed-his-private-pilot-practical-exam.jpg",
  "src/assets/student-pilot-in-front-of-cessna-172-in-yukon-ok-after-private-pilot-checkride.jpg",
  "src/assets/student-pilot.jpg",
  "src/assets/student-standing-next-to-his-flight-instructor.jpg",
  "src/assets/student-standing-with-his-cfi.jpg",
  "src/assets/student-with-his-atp-instructor.jpg",
  "src/assets/student-with-his-cfi.jpg",
  "src/assets/student-with-his-instructor.jpg",
  "src/assets/sunset-plane-wing.jpg",
  "src/assets/team-member-1.jpg",
  "src/assets/team-member-2a.jpg",
  "src/assets/team-member-2b.jpg",
  "src/assets/team-member-3.jpg",
  "src/assets/view-from-the-skies-inside-alto-airplane.jpg",
  "src/assets/wall-of-students-passing-checkride-by-sectional.jpg",
  "src/assets/wall-of-students-passing-checkride-near-sectional.jpg",
  "src/assets/wall-of-students-passing-checkride.jpg",
  "src/assets/what-to-expect-on-your-first-discovery-flight-at-alto.jpg",
  "src/assets/young-17-year-old-private-pilot-pass-checkride-at-alto-flight-academy.jpg",
];

// File extensions to search in
const VALID_EXTENSIONS = [
  ".astro",
  ".js",
  ".ts",
  ".css",
  ".md",
  ".json",
  ".html",
];
// Directories to search
const SEARCH_DIRECTORIES = ["src", "components", "layouts"];

function getAllFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return [];
  }

  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath));
    } else {
      if (VALID_EXTENSIONS.includes(path.extname(filePath).toLowerCase())) {
        results.push(filePath);
      }
    }
  });

  return results;
}

function findImageReferencesInFile(text, filePath, imageList) {
  const references = [];

  // Create search patterns for each image
  imageList.forEach((imagePath) => {
    const imageName = path.basename(imagePath);
    const imageNameNoExt = path.basename(imagePath, path.extname(imagePath));

    // Different patterns to search for
    const patterns = [
      imageName, // "filename.jpg"
      `"${imageName}"`, // '"filename.jpg"'
      `'${imageName}'`, // "'filename.jpg'"
      `\`${imageName}\``, // "`filename.jpg`"
      `/${imageName}`, // "/filename.jpg"
      imageNameNoExt, // "filename" (without extension)
      `"${imageNameNoExt}"`, // '"filename"'
      `'${imageNameNoExt}'`, // "'filename'"
      `/${imageNameNoExt}`, // "/filename"
    ];

    patterns.forEach((pattern) => {
      const regex = new RegExp(
        pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g",
      );
      let match;

      while ((match = regex.exec(text)) !== null) {
        references.push({
          image: imageName,
          imagePath: imagePath,
          reference: match[0],
          file: path.relative(process.cwd(), filePath),
          line: text.substring(0, match.index).split("\n").length,
          character: match.index - text.lastIndexOf("\n", match.index) + 1,
        });
      }
    });
  });

  return references;
}

function findImageReferences() {
  console.log("🔍 Scanning for references to specific images...");
  console.log(`📸 Tracking ${IMAGE_LIST.length} images from your list`);

  const allFiles = SEARCH_DIRECTORIES.flatMap((dir) => getAllFiles(dir));
  console.log(`📁 Scanning ${allFiles.length} source files`);

  const allReferences = [];
  const imageReferenceMap = new Map();

  // Initialize map with all images
  IMAGE_LIST.forEach((imagePath) => {
    const imageName = path.basename(imagePath);
    imageReferenceMap.set(imageName, {
      imagePath: imagePath,
      references: [],
      exists: fs.existsSync(imagePath),
    });
  });

  // Scan all files for references
  allFiles.forEach((filePath) => {
    const text = fs.readFileSync(filePath, "utf8");
    const references = findImageReferencesInFile(text, filePath, IMAGE_LIST);

    references.forEach((ref) => {
      allReferences.push(ref);

      // Add to image reference map
      if (imageReferenceMap.has(ref.image)) {
        imageReferenceMap.get(ref.image).references.push({
          file: ref.file,
          line: ref.line,
          character: ref.character,
          reference: ref.reference,
        });
      }
    });
  });

  // Create reports
  createImageReferenceReport(imageReferenceMap);
  createSummaryReport(imageReferenceMap, allReferences);

  console.log(`\n✅ Scan complete!`);
  console.log(
    `📊 Found ${allReferences.length} references to your ${IMAGE_LIST.length} images`,
  );
}

function createImageReferenceReport(imageReferenceMap) {
  const report = {
    scanDate: new Date().toISOString(),
    totalImages: IMAGE_LIST.length,
    imagesWithReferences: Array.from(imageReferenceMap.values()).filter(
      (img) => img.references.length > 0,
    ).length,
    imagesWithoutReferences: Array.from(imageReferenceMap.values()).filter(
      (img) => img.references.length === 0,
    ).length,
    imagesMissing: Array.from(imageReferenceMap.values()).filter(
      (img) => !img.exists,
    ).length,
    imageReferences: Array.from(imageReferenceMap.entries()).map(
      ([imageName, data]) => ({
        image: imageName,
        path: data.imagePath,
        exists: data.exists,
        referenceCount: data.references.length,
        references: data.references,
      }),
    ),
  };

  fs.writeFileSync(
    "specific_image_references.json",
    JSON.stringify(report, null, 2),
  );
}

function createSummaryReport(imageReferenceMap, allReferences) {
  let summaryText = `SPECIFIC IMAGE REFERENCES REPORT
Generated: ${new Date().toISOString()}

SUMMARY:
========
Total images in list: ${IMAGE_LIST.length}
Images with references: ${Array.from(imageReferenceMap.values()).filter((img) => img.references.length > 0).length}
Images without references: ${Array.from(imageReferenceMap.values()).filter((img) => img.references.length === 0).length}
Images missing from filesystem: ${Array.from(imageReferenceMap.values()).filter((img) => !img.exists).length}
Total references found: ${allReferences.length}

IMAGES WITH REFERENCES:
=======================
`;

  // Images with references
  Array.from(imageReferenceMap.entries())
    .filter(([_, data]) => data.references.length > 0)
    .forEach(([imageName, data]) => {
      summaryText += `\n📁 ${imageName} (${data.references.length} references)${!data.exists ? " ❌ MISSING" : ""}\n`;
      data.references.forEach((ref) => {
        summaryText += `   📄 ${ref.file}:${ref.line}:${ref.character} - "${ref.reference}"\n`;
      });
    });

  summaryText += `\nIMAGES WITHOUT REFERENCES:
========================
`;

  // Images without references
  const noRefImages = Array.from(imageReferenceMap.entries()).filter(
    ([_, data]) => data.references.length === 0,
  );

  if (noRefImages.length === 0) {
    summaryText += "All images have references! 🎉\n";
  } else {
    noRefImages.forEach(([imageName, data]) => {
      summaryText += `❌ ${imageName}${!data.exists ? " (FILE MISSING)" : ""}\n`;
    });
  }

  summaryText += `\nMISSING FILES:
==============
`;

  // Missing files
  const missingFiles = Array.from(imageReferenceMap.entries()).filter(
    ([_, data]) => !data.exists,
  );

  if (missingFiles.length === 0) {
    summaryText += "All files exist! ✅\n";
  } else {
    missingFiles.forEach(([imageName, data]) => {
      summaryText += `❌ ${imageName} -> ${data.imagePath}\n`;
    });
  }

  fs.writeFileSync("specific_image_references_summary.txt", summaryText);

  // Console summary
  console.log(`\n📋 QUICK SUMMARY:`);
  console.log(
    `   📸 Images with references: ${Array.from(imageReferenceMap.values()).filter((img) => img.references.length > 0).length}`,
  );
  console.log(
    `   🚫 Images without references: ${Array.from(imageReferenceMap.values()).filter((img) => img.references.length === 0).length}`,
  );
  console.log(
    `   ❌ Missing files: ${Array.from(imageReferenceMap.values()).filter((img) => !img.exists).length}`,
  );

  // Show top referenced images
  const topReferenced = Array.from(imageReferenceMap.entries())
    .filter(([_, data]) => data.references.length > 0)
    .sort((a, b) => b[1].references.length - a[1].references.length)
    .slice(0, 5);

  if (topReferenced.length > 0) {
    console.log(`\n🔝 Top referenced images:`);
    topReferenced.forEach(([imageName, data]) => {
      console.log(`   ${imageName}: ${data.references.length} references`);
    });
  }
}

// Run the script
findImageReferences();
