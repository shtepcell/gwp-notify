
import { createHash } from "crypto";

import fs from "firebase-admin";
import { credentials } from "./credentials.js";


fs.initializeApp({
  credential: fs.credential.cert(credentials),
});

const db = fs.firestore();

export const isChecked = async (texts) => {
  const joinedText = texts.join("\n–––––––\n");

  const textHash = createHash("md5").update(joinedText).digest("hex");

  const checksDocument = db.doc("checks/main");
  const checks = (await checksDocument.get()).data();

  const checked = Boolean(checks[textHash]);

  if (!checked) {
    await db
      .collection("checks")
      .doc("main")
      .set(
        {
          [textHash]: true,
        },
        { merge: true }
      );
  }

  return checked;
};
