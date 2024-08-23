import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import * as CSV from "csv-parse/sync";

const shapeSchema = z.enum([".", "i", "I", "l", "t", "o", "L", "z"]);

// Base Schemas
const baseItemSchema = z.object({
  name: z.string().min(2),
});
const sellableSchema = baseItemSchema.extend({
  sellPrice: z.number().int().min(1),
});
const stackableSchema = z.object({
  stackSize: z.number().int().min(1),
});
const moduleItemDataSchema = sellableSchema.extend({
  amount: z.number().gt(0),
  shape: shapeSchema,
});

export type SellableItem = z.infer<typeof sellableSchema>;

const materialSchema = baseItemSchema.extend({
  stackSize: z.number().int().min(1),
  buyPrice: z.number().int().min(1),
});
export type MaterialItem = z.infer<typeof materialSchema>;
export const getMaterials = async (): Promise<MaterialItem[]> =>
  loadDataFile("materials", materialSchema);

const componentSchema = z.intersection(sellableSchema, stackableSchema);
export type ComponentItem = z.infer<typeof componentSchema>;
export const getComponents = async (): Promise<ComponentItem[]> =>
  loadDataFile("components", componentSchema);

export type ModuleItem = z.infer<typeof moduleItemDataSchema> & {
  stackSize: number;
};
const moduleLoader =
  (fileName: string, stackSize: number) => async (): Promise<ModuleItem[]> => {
    const fileData = await loadDataFile(fileName, moduleItemDataSchema);
    return fileData.map((item) => ({
      ...item,
      stackSize,
    }));
  };

const caseLoader =
  (fileName: string, stackSize: number) =>
  async (): Promise<SellableItem[]> => {
    const fileData = await loadDataFile(fileName, sellableSchema);
    return fileData.map((item) => ({ ...item, stackSize }));
  };

export const getBatteries = moduleLoader("batteries", 20);
export const getDisplays = moduleLoader("displays", 20);
export const getSpeakers = moduleLoader("speakers", 20);

export const getMediumBotChassis = caseLoader("medium_bot_chassis", 10);
export const getMediumCases = caseLoader("medium_cases", 10);
export const getSmallBotChassis = caseLoader("small_bot_chassis", 20);
export const getSmallCases = caseLoader("small_cases", 20);

const assocItemType =
  (itemType: string) =>
  <T>(items: T[]) =>
    items.map((i) => ({ ...i, itemType }));
export const getAll = async () => {
  return {
    materials: await getMaterials().then(assocItemType("Material")),
    components: await getComponents().then(assocItemType("Component")),
    batteries: await getBatteries().then(assocItemType("Battery")),
    displays: await getDisplays().then(assocItemType("Display")),
    speakers: await getSpeakers().then(assocItemType("Speaker")),
    mediumBotChassis: await getMediumBotChassis().then(
      assocItemType("Medium Bot Chassis"),
    ),
    mediumCases: await getMediumCases().then(assocItemType("Medium Case")),
    smallBotChassis: await getSmallBotChassis().then(
      assocItemType("Small Bot Chassis"),
    ),
    smallCases: await getSmallCases().then(assocItemType("Small Case")),
  };
};

const ROOT_DATA_PATH = path.resolve(process.cwd(), "data/");
async function loadDataFile<T>(
  fileName: string,
  schema: z.ZodType<T>,
): Promise<T[]> {
  const filePath = path.resolve(ROOT_DATA_PATH, `${fileName}.csv`);
  const raw = await fs.readFile(filePath, { encoding: "utf-8" });
  const json = CSV.parse(raw, {
    trim: true,
    cast: true,
    columns: true,
    skipEmptyLines: true,
  });
  return z.array(schema).parse(json);
}
