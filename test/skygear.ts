import skygear, { Record, Query } from "skygear";

const NoteRecord = Record.extend("note");
const note = new NoteRecord();
const q1 = new Query(NoteRecord);
skygear.publicDB.save(note).then(savedNote => {});
skygear.publicDB.save([note, note]).then(batchResult => {});
skygear.publicDB.query(q1).then(queryResult => {
  for (const note of queryResult) {
  }
});

skygear
  .lambda("user:signup", { payload: { user: "123", password: "456" } })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });

skygear.auth._authResolve({} as any).then(() => {});
