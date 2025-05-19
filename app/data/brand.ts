export async function getBrands() {
  try {
    return [
      { brandId: 1, name: "NutriPure" },
      { brandId: 2, name: "VitalLife" },
      { brandId: 3, name: "BioBalance" },
      { brandId: 4, name: "PureEssentials" },
      { brandId: 5, name: "NatureWay" },
      { brandId: 6, name: "OptimalHealth" },
      { brandId: 7, name: "WellnessWorks" },
      { brandId: 8, name: "HealthFirst" },
      { brandId: 9, name: "FitFuel" },
      { brandId: 10, name: "LifeStrength" },
    ]
  } catch (error) {
    console.error("Error fetching brands:", error)
    return []
  }
}
