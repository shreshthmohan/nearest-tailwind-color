import { color } from 'd3'

export const evalDistance = (color1, color2) => {
  const { r: r1, g: g1, b: b1 } = color1
  const { r: r2, g: g2, b: b2 } = color2
  const distance = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)

  return distance
}

// get all colors
// get reference color

// reference color list
// A list with each color having a name

export const nearestColor = (inputColor, referenceColorList) => {
  // TODO: tackle opacity
  // For now assuming opacity is 1
  // And object looks like this:
  // {r: 10, g: 45, b: 178, opacity: 1}

  // top 3 closest colors
  // start with #000000

  const colorDistance = [
    {
      from: 'black',
      fromValue: '#000',
      distance: evalDistance(color(inputColor), color('#000')),
    },
    {
      from: 'black',
      fromValue: '#000',
      distance: evalDistance(color(inputColor), color('#000')),
    },
    {
      from: 'black',
      fromValue: '#000',
      distance: evalDistance(color(inputColor), color('#000')),
    },
    {
      from: 'black',
      fromValue: '#000',
      distance: evalDistance(color(inputColor), color('#000')),
    },
    {
      from: 'black',
      fromValue: '#000',
      distance: evalDistance(color(inputColor), color('#000')),
    },
  ]

  referenceColorList.forEach(refColor => {
    const distanceFromRefColor = evalDistance(
      color(inputColor),
      color(refColor.value),
    )

    if (distanceFromRefColor < colorDistance[0].distance) {
      colorDistance[0].from = refColor.name
      colorDistance[0].distance = distanceFromRefColor
      colorDistance[0].fromValue = refColor.value
    } else if (distanceFromRefColor < colorDistance[1].distance) {
      colorDistance[1].from = refColor.name
      colorDistance[1].distance = distanceFromRefColor
      colorDistance[1].fromValue = refColor.value
    } else if (distanceFromRefColor < colorDistance[2].distance) {
      colorDistance[2].from = refColor.name
      colorDistance[2].distance = distanceFromRefColor
      colorDistance[2].fromValue = refColor.value
    } else if (distanceFromRefColor < colorDistance[3].distance) {
      colorDistance[3].from = refColor.name
      colorDistance[3].distance = distanceFromRefColor
      colorDistance[3].fromValue = refColor.value
    } else if (distanceFromRefColor < colorDistance[4].distance) {
      colorDistance[4].from = refColor.name
      colorDistance[4].distance = distanceFromRefColor
      colorDistance[4].fromValue = refColor.value
    }
  })

  return colorDistance
}

// both in rgb, ignoring opacity
