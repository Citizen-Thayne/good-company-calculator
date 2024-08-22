import * as Loaders from "@/lib/items/loaders";

test("Materials", async () => {
  const result = await Loaders.getMaterials();

  expect(result).toContainEqual({
    name: "Plastic",
    buyPrice: 800,
    stackSize: 100,
  });
});

test("Components", async () => {
  expect(await Loaders.getComponents()).toContainEqual({
    name: "Plastic Parts",
    sellPrice: 200,
    stackSize: 10,
  });
});

test.each([
  ["Batteries", Loaders.getBatteries],
  ["Displays", Loaders.getDisplays],
  ["Speakers", Loaders.getSpeakers],
])("%s", async (name, loader) => {
  const result = await loader();
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(1);
  result.forEach((item) => {
    expect(item).toHaveProperty("name");
    expect(item).toHaveProperty("amount");
    expect(item).toHaveProperty("shape");
    expect(item).toHaveProperty("sellPrice");
    expect(item).toHaveProperty("stackSize");
  });
});

test.each([
  ["Medium Bot Chassis", Loaders.getMediumBotChassis],
  ["Medium Cases", Loaders.getMediumCases],
  ["Small Bot Chassis", Loaders.getSmallBotChassis],
  ["Small Cases", Loaders.getSmallCases],
])("%s", async (name, loader) => {
  const result = await loader();
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(1);
  result.forEach((item) => {
    expect(item).toHaveProperty("name");
    expect(item).toHaveProperty("sellPrice");
    expect(item).toHaveProperty("stackSize");
  });
});

describe("All Loaders", async () => {
  const result = await Loaders.getAll();
  test.each([
    ["Batteries", "batteries"],
    ["Displays", "displays"],
    ["Speakers", "speakers"],
  ])("%s", async (_name, key) => {
    const fieldValue = result[key as keyof typeof result];
    expect(Array.isArray(fieldValue)).toBe(true);
    expect(fieldValue.length).toBeGreaterThan(1);
    fieldValue.forEach((item) => {
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("amount");
      expect(item).toHaveProperty("shape");
      expect(item).toHaveProperty("sellPrice");
      expect(item).toHaveProperty("stackSize");
    });
  });

  test.each([
    ["Medium Bot Chassis", "mediumBotChassis"],
    ["Medium Cases", "mediumCases"],
    ["Small Bot Chassis", "smallBotChassis"],
    ["Small Cases", "smallCases"],
  ])("%s", async (_name, key) => {
    const fieldValue = result[key as keyof typeof result];
    expect(Array.isArray(fieldValue)).toBe(true);
    expect(fieldValue.length).toBeGreaterThan(1);
    fieldValue.forEach((item) => {
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("sellPrice");
      expect(item).toHaveProperty("stackSize");
    });
  });
});
