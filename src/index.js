import { select, color } from 'd3'
import colors from 'tailwindcss/colors'
import pkg from 'tailwindcss/package.json'
import { nearestColor } from './nearestColor'
import './styles/tailwind.css'

// console.log(pkg.version)

select('#tailwind-version').text(pkg.version)

// console.log(colors);

const ignoreColors = [
  'inherit',
  'current',
  'transparent',
  'lightBlue',
  'warmGray',
  'trueGray',
  'coolGray',
  'blueGray',
]

function flattenColorList(colorList) {
  const flatColorList = []
  Object.keys(colorList).forEach(c => {
    // console.log(typeof colors[c], c)
    if (!ignoreColors.includes(c)) {
      if (typeof colors[c] === 'string') {
        flatColorList.push({ name: c, value: colors[c] })
      } else {
        // console.log(Object.keys(colors[c]), c)
        Object.keys(colors[c]).forEach(cc => {
          flatColorList.push({ name: `${c}-${cc}`, value: colors[c][cc] })
        })
      }
    }
  })
  return flatColorList
}

const flatColorList = flattenColorList(colors)

console.log(flatColorList)
const defaultColor = '#000000'

const colorInputText = select('#color-input-text').attr('value', defaultColor)
const colorInput = select('#color-input').attr('value', defaultColor)
const showColor = select('#show-color')
const colorError = select('#color-error')
const showHex = select('#show-hex')
const showRgb = select('#show-rgb')
// const nearestTailwindColor = select('#nearest-tailwind-color')
const showNearestTailwindColorContainer = select(
  '#show-nearest-tailwind-colors-container',
)

colorInput.on('change input', e => {
  // console.log(e.target.value)
  colorInputText.property('value', e.target.value)
  showColor.style('background-color', e.target.value)

  showHex.text(color(e.target.value).formatHex())
  showRgb.text(color(e.target.value).formatRgb())

  const nearestTwColors = nearestColor(e.target.value, flatColorList)

  showNearestTailwindColorContainer.selectAll('.nearest-color').remove()

  const allColorDivs = showNearestTailwindColorContainer
    .selectAll('.nearest-color')
    .data(nearestTwColors)
    .join('div')
    .attr('class', 'nearest-color flex items-center')

  allColorDivs
    .append('div')
    .attr('class', 'w-12 h-8 border-2 border-white rounded-sm m-2 inline-block')
    .style('background-color', d => d.fromValue)

  allColorDivs
    .append('span')
    .text(d => `${d.from}: ${d.fromValue} (distance: ${d.distance.toFixed(0)})`)
})

colorInputText.on('change input', e => {
  // console.log(e.target.value)
  const parsedColor = color(e.target.value)
  console.log(parsedColor)
  if (parsedColor) {
    colorInput.property('value', parsedColor.formatHex())
    showColor.style('background-color', parsedColor.formatHex())
    colorError.text(null)
  } else {
    colorError.text('Invalid color')
  }
  // console.log(parsedColor)
})
