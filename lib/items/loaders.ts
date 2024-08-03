import { Effect as T, Option as O, pipe } from "effect"
import * as FS from '@effect/platform/FileSystem'

// function loadMaterials() {
// return Option.fromNullable(require.main?.filename)
//   .pipe(
//     Option.map(fs.readFile),
//     Effect.andThen(Effect.tryPromise)
//   )
// Option
// Effect.promise<Buffer>(() =>
//   fs.readFile(require.main?.filename)
// )
// }

const readFile = T.promise<string | Buffer>(fs.readFile)

const loadMaterials = pipe(
  O.fromNullable(require.main?.filename),
  O.map(Effect),
  // O.map(T.tryMapPromise)
)
