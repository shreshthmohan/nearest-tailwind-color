// simply distance between two points in a 3-D space
export function evalEuclideanDistance(color1, color2) {
  const { r: r1, g: g1, b: b1 } = color1
  const { r: r2, g: g2, b: b2 } = color2
  const distance = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)

  return distance
}

export function evalNonLinearApproximationDistance(color1, color2) {
  const { r: r1, g: g1, b: b1 } = color1
  const { r: r2, g: g2, b: b2 } = color2
  const rMean = (r1 + r2) / 2
  let distance = 0
  if (rMean < 128) {
    distance = Math.sqrt(
      2 * (r1 - r2) ** 2 + 4 * (g1 - g2) ** 2 + 3 * (b1 - b2) ** 2,
    )
  } else {
    distance = Math.sqrt(
      3 * (r1 - r2) ** 2 + 4 * (g1 - g2) ** 2 + 2 * (b1 - b2) ** 2,
    )
  }
  return distance
}

export function evalRedmeanApproximationDistance(color1, color2) {
  const { r: r1, g: g1, b: b1 } = color1
  const { r: r2, g: g2, b: b2 } = color2
  const rMean = (r1 + r2) / 2

  const distance = Math.sqrt(
    (2 + rMean / 256) * (r1 - r2) ** 2 +
      4 * (g1 - g2) ** 2 +
      (2 + (255 - rMean) / 256) * (b1 - b2) ** 2,
  )
  return distance
}
